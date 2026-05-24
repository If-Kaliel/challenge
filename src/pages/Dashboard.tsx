import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import funcionarioService from '../services/funcionarioService';
import beneficiarioService from '../services/beneficiarioService';
import { listarAtividadesRecentes } from '../services/activityLog';
import type { Funcionario } from '../types/Funcionario';
import type { Beneficiario } from '../types/Beneficiario';
import type { KpiData, Atividade, TipoAtividade } from '../types';
import { PageHero, SectionHeader } from '../components';
import { useAuth } from '../context/AuthContext';

type FuncionarioDashboard = Funcionario & { departamento?: string; email?: string };
type BeneficiarioDashboard = Beneficiario & { colaboradorId?: number | string };


const TIPO_COLOR: Record<TipoAtividade, string> = {
  cadastro: 'bg-indigo-100 text-indigo-600',
  atualizacao: 'bg-sky-100 text-sky-600',
  exclusao: 'bg-rose-100 text-rose-600',
  ferias: 'bg-cyan-100 text-cyan-600',
  relatorio: 'bg-violet-100 text-violet-600',
  avaliacao: 'bg-amber-100 text-amber-600',
};

interface MetricaCargo { cargo: string; total: number; cor: string }

function formatarTempoRelativo(timestamp?: string) {
  if (!timestamp) return 'agora mesmo';
  const dataEvento = new Date(timestamp).getTime();
  if (Number.isNaN(dataEvento)) return 'agora mesmo';
  const diffMin = Math.max(1, Math.floor((Date.now() - dataEvento) / 60000));
  if (diffMin < 60) return `há ${diffMin} min`;
  const diffHoras = Math.floor(diffMin / 60);
  if (diffHoras < 24) return `há ${diffHoras}h`;
  return `há ${Math.floor(diffHoras / 24)}d`;
}

function BarChart({ dados }: { dados: MetricaCargo[] }) {
  const max = Math.max(...dados.map((d) => d.total), 1);
  return (
    <div className="flex flex-col gap-3 mt-2">
      {dados.map(({ cargo, total, cor }) => (
        <div key={cargo}>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[0.82rem] font-medium text-brand-text truncate max-w-[60%]">{cargo}</span>
            <span className="text-[0.82rem] font-bold text-brand-text/70">{total}</span>
          </div>
          <div className="w-full h-2.5 bg-border rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${typeof cor === 'string' && cor.startsWith('bg-') ? cor : ''}`}
              style={{ width: `${(total / max) * 100}%`, ...(typeof cor === 'string' && !cor.startsWith('bg-') ? { background: cor } : {}) }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function KpiCard({ icon, label, value, sub, gradient }: KpiData) {
  return (
    <div className={`relative overflow-hidden rounded-xl p-5 text-white shadow-md ${gradient}`}>
      <div className="pointer-events-none absolute -right-4 -top-4 text-[5rem] opacity-10 select-none">{icon}</div>
      <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-white/85 mb-1">{label}</p>
      <p className="text-[2rem] font-extrabold leading-none mb-1">{value}</p>
      {sub && <p className="text-[0.78rem] text-white/80">{sub}</p>}
    </div>
  );
}

// ─── PAPEL-BADGE ───────────────────────────────────────────────────────────
const PAPEL_LABEL: Record<string, string> = {
  admin:       'Administrador',
  funcionario: 'Funcionário',
  dentista:    'Dentista',
};

export function Dashboard() {
  const { usuario, isAdmin, isFuncionario, podeGerenciarColaboradores } = useAuth();

  const [colaboradores, setColaboradores] = useState<FuncionarioDashboard[]>([]);
  const [beneficiarios, setBeneficiarios] = useState<BeneficiarioDashboard[]>([]);
  const [atividadesLog, setAtividadesLog] = useState<Atividade[]>(() => listarAtividadesRecentes(30));
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingBenef, setLoadingBenef] = useState<boolean>(true);
  const [animado, setAnimado] = useState<boolean>(false);

  const carregarAtividades = () => setAtividadesLog(listarAtividadesRecentes(30));

  const atividadesRecentes = useMemo(
    () => atividadesLog.slice(0, 6).map((a) => ({ ...a, tempo: formatarTempoRelativo(a.timestamp), lida: true })),
    [atividadesLog]
  );

  const totalAtividades = atividadesLog.length;
  const beneficiosSemVinculo = beneficiarios.filter((b) => !b.colaboradorId).length;

  const [beneficiariosUltimos7Dias, setBeneficiariosUltimos7Dias] = useState<number>(0);

  useEffect(() => {
    const now = Date.now();
    const count = atividadesLog.filter(
      (a) => a.entidade === 'beneficiario' && a.tipo === 'cadastro' && a.timestamp && now - new Date(a.timestamp).getTime() <= 7 * 24 * 60 * 60 * 1000
    ).length;
    const t = setTimeout(() => setBeneficiariosUltimos7Dias(count), 0);
    return () => clearTimeout(t);
  }, [atividadesLog]);

  const colaboradoresRecentes = useMemo(
    () => atividadesLog.filter((a) => a.entidade === 'colaborador').slice(0, 4).map((a) => ({ ...a, tempo: formatarTempoRelativo(a.timestamp) })),
    [atividadesLog]
  );

  useEffect(() => {
    const t = setTimeout(() => setAnimado(true), 100);

    // Admin e Funcionário buscam colaboradores
    if (isAdmin || isFuncionario) {
      funcionarioService.listarTodos()
        .then((d) => setColaboradores((d || []) as FuncionarioDashboard[]))
        .catch((e) => console.error('Colaboradores:', e))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }

    // Todos buscam beneficiários
    beneficiarioService.listarTodos()
      .then((d) => setBeneficiarios((d || []) as BeneficiarioDashboard[]))
      .catch((e) => console.error('Beneficiários:', e))
      .finally(() => setLoadingBenef(false));

    const atualizarAtividades = () => carregarAtividades();
    window.addEventListener('simple-manager:activity-log-changed', atualizarAtividades);
    window.addEventListener('storage', atualizarAtividades);

    return () => {
      clearTimeout(t);
      window.removeEventListener('simple-manager:activity-log-changed', atualizarAtividades);
      window.removeEventListener('storage', atualizarAtividades);
    };
  }, [isAdmin, isFuncionario]);

  // ─── KPIs por papel ─────────────────────────────────────────────────────
  const kpisAdmin: KpiData[] = [
    { icon: '', label: 'Colaboradores', value: loading ? '—' : colaboradores.length, sub: 'cadastrados no sistema', gradient: 'bg-gradient-to-br from-indigo-600 to-violet-600' },
    { icon: '', label: 'Cargos Ativos', value: loading ? '—' : new Set(colaboradores.map((c) => c.cargo)).size, sub: 'cargos distintos', gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600' },
    { icon: '', label: 'Atividades', value: totalAtividades, sub: 'eventos no log', gradient: 'bg-gradient-to-br from-amber-500 to-orange-500' },
    { icon: '', label: 'Beneficiários', value: loadingBenef ? '—' : beneficiarios.length, sub: 'total registrados', gradient: 'bg-gradient-to-br from-pink-500 to-rose-500' },
  ];

  const kpisFuncionario: KpiData[] = [
    { icon: '', label: 'Beneficiários', value: loadingBenef ? '—' : beneficiarios.length, sub: 'total registrados', gradient: 'bg-gradient-to-br from-pink-500 to-rose-500' },
    { icon: '', label: 'Sem vínculo', value: loadingBenef ? '—' : beneficiosSemVinculo, sub: 'necessitam associação', gradient: 'bg-gradient-to-br from-yellow-500 to-amber-500' },
    { icon: '', label: 'Últimos 7 dias', value: loadingBenef ? '—' : beneficiariosUltimos7Dias, sub: 'novos cadastros', gradient: 'bg-gradient-to-br from-violet-500 to-pink-500' },
    { icon: '', label: 'Atividades', value: totalAtividades, sub: 'eventos no log', gradient: 'bg-gradient-to-br from-amber-500 to-orange-500' },
  ];

  const kpisDentista: KpiData[] = [
    { icon: '', label: 'Beneficiários', value: loadingBenef ? '—' : beneficiarios.length, sub: 'total cadastrados', gradient: 'bg-gradient-to-br from-pink-500 to-rose-500' },
    { icon: '', label: 'Últimos 7 dias', value: loadingBenef ? '—' : beneficiariosUltimos7Dias, sub: 'novos cadastros', gradient: 'bg-gradient-to-br from-violet-500 to-pink-500' },
  ];

  const kpisExibidos = isAdmin ? kpisAdmin : isFuncionario ? kpisFuncionario : kpisDentista;

  // ─── Ações rápidas por papel ─────────────────────────────────────────────
  const acoesAdmin = [
    { icon: '', label: 'Colaboradores', to: '/colaboradores', color: 'from-indigo-50 to-violet-50 border-indigo-200 text-indigo-700 hover:border-indigo-400' },
    { icon: '', label: 'Dentistas', to: '/dentistas', color: 'from-cyan-50 to-blue-50 border-cyan-200 text-cyan-700 hover:border-cyan-400' },
    { icon: '', label: 'Beneficiários', to: '/beneficiarios', color: 'from-pink-50 to-rose-50 border-pink-200 text-pink-700 hover:border-pink-400' },
    { icon: '', label: 'Doações', to: '/doacoes', color: 'from-emerald-50 to-teal-50 border-emerald-200 text-emerald-700 hover:border-emerald-400' },
  ];

  const acoesFuncionario = [
    { icon: '', label: 'Dentistas', to: '/dentistas', color: 'from-cyan-50 to-blue-50 border-cyan-200 text-cyan-700 hover:border-cyan-400' },
    { icon: '', label: 'Beneficiários', to: '/beneficiarios', color: 'from-pink-50 to-rose-50 border-pink-200 text-pink-700 hover:border-pink-400' },
    { icon: '', label: 'Doações', to: '/doacoes', color: 'from-emerald-50 to-teal-50 border-emerald-200 text-emerald-700 hover:border-emerald-400' },
    { icon: '', label: 'Suporte', to: '/contato', color: 'from-violet-50 to-pink-50 border-violet-200 text-violet-700 hover:border-violet-400' },
  ];

  const acoesDentista = [
    { icon: '', label: 'Beneficiários', to: '/beneficiarios', color: 'from-pink-50 to-rose-50 border-pink-200 text-pink-700 hover:border-pink-400' },
    { icon: '', label: 'Suporte', to: '/contato', color: 'from-violet-50 to-pink-50 border-violet-200 text-violet-700 hover:border-violet-400' },
  ];

  const acoesExibidas = isAdmin ? acoesAdmin : isFuncionario ? acoesFuncionario : acoesDentista;

  // ─── Gráfico colaboradores por função (só admin/funcionario) ─────────────
  const CORES_CARGO: Record<string, string> = {
    Dentista: 'bg-role-dentista', Recepcionista: 'bg-role-recepcionista',
    Administrador: 'bg-role-administrador', Gerente: 'bg-role-gerente', Assistente: 'bg-role-assistente',
  };

  const porCargo = colaboradores.reduce<Record<string, number>>((acc, c) => {
    acc[c.cargo] = (acc[c.cargo] ?? 0) + 1; return acc;
  }, {});

  const metricasCargo: MetricaCargo[] = Object.entries(porCargo)
    .map(([cargo, total]) => ({ cargo, total, cor: CORES_CARGO[cargo] ?? '#6b7280' }))
    .sort((a, b) => b.total - a.total);

  const porParentesco = beneficiarios.reduce<Record<string, number>>((acc, b) => {
    const key = b.parentesco?.trim() || 'Outros'; acc[key] = (acc[key] ?? 0) + 1; return acc;
  }, {});

  const metricasParentesco: MetricaCargo[] = Object.entries(porParentesco)
    .map(([k, total]) => ({ cargo: k, total, cor: '#8b5cf6' }))
    .sort((a, b) => b.total - a.total);

  const ultimosBeneficiarios = beneficiarios.slice(0, 6);

  return (
    <div className="max-w-285 w-full mx-auto my-6 xs:my-8 sm:my-10 lg:my-12 xl:my-14 px-3 xs:px-4 sm:px-6 lg:px-7 xl:px-8">
      <PageHero
        badge={`Simple Manager — ${PAPEL_LABEL[usuario?.papel ?? ''] ?? 'Sistema'}`}
        title={`Olá, ${usuario?.nome ?? 'usuário'}`}
        description={
          isAdmin
            ? 'Visão completa: colaboradores, dentistas, beneficiários, doações e atividades em tempo real.'
            : isFuncionario
            ? 'Gerencie dentistas, beneficiários e doações da clínica.'
            : 'Cadastre e acompanhe os beneficiários vinculados ao seu atendimento.'
        }
        layout="split"
        actions={
          <>
            {podeGerenciarColaboradores && (
              <Link to="/colaboradores" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-white/40 text-white font-semibold text-[0.88rem] no-underline transition-all duration-200 hover:bg-white hover:text-primary hover:border-white">
                Gerenciar Equipe →
              </Link>
            )}
            <Link to="/beneficiarios" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-white/40 text-white font-semibold text-[0.88rem] no-underline transition-all duration-200 hover:bg-white hover:text-primary hover:border-white">
              Beneficiários →
            </Link>
          </>
        }
      />

      {/* KPIs */}
      <div className={`grid gap-3 xs:gap-4 sm:gap-5 xl:gap-6 mb-7 transition-all duration-700 ${animado ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} grid-cols-2 lg:grid-cols-4`}>
        {kpisExibidos.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
      </div>

      {/* Gráficos — apenas admin e funcionário */}
      {(isAdmin || isFuncionario) && (
        <div className="grid gap-5 sm:gap-6 xl:gap-7 mb-6 grid-cols-1 md:grid-cols-2">
          {isAdmin && (
            <section className="bg-surface rounded-xl border border-border shadow-sm p-6 xs:p-7">
              <SectionHeader title="Colaboradores por Função" description="Distribuição atual com base nos registros" />
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  {[80, 55, 40].map((w) => (
                    <div key={w}><div className="flex justify-between mb-1"><div className="h-3 bg-border rounded w-1/2" /><div className="h-3 bg-border rounded w-6" /></div><div className="h-2.5 bg-border rounded-full" style={{ width: `${w}%` }} /></div>
                  ))}
                </div>
              ) : <BarChart dados={metricasCargo} />}
            </section>
          )}

          <section className="bg-surface rounded-xl border border-border shadow-sm p-6 xs:p-7">
            <SectionHeader title="Atividades Recentes" description="Últimos eventos do sistema" accentClassName="border-accent" />
            {atividadesRecentes.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border bg-white/70 p-4 text-sm text-muted">
                Nenhuma atividade registrada ainda. Cadastros, alterações e exclusões aparecerão aqui.
              </div>
            ) : (
              <ul className="flex flex-col gap-3" aria-label="Atividades recentes">
                {atividadesRecentes.map((a: Atividade) => (
                  <li key={a.id} className="flex items-start gap-3 p-3 rounded-lg border bg-white border-border">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 ${TIPO_COLOR[a.tipo]}`}></span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[0.85rem] text-brand-text font-medium leading-snug">{a.descricao}</p>
                      <p className="text-[0.75rem] text-brand-text/65 mt-0.5">{a.tempo}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}

      {/* Beneficiários — todos os papéis */}
      <div className="grid gap-5 sm:gap-6 xl:gap-7 mb-6 grid-cols-1 md:grid-cols-2">
        <section className="bg-surface rounded-xl border border-border shadow-sm p-6 xs:p-7">
          <SectionHeader title="Beneficiários por Parentesco" description="Distribuição por vínculo familiar" accentClassName="border-accent2" />
          {loadingBenef ? (
            <div className="space-y-4 animate-pulse">{[60, 40, 30].map((w) => (<div key={w}><div className="flex justify-between mb-1"><div className="h-3 bg-border rounded w-1/2" /><div className="h-3 bg-border rounded w-6" /></div><div className="h-2.5 bg-border rounded-full" style={{ width: `${w}%` }} /></div>))}</div>
          ) : <BarChart dados={metricasParentesco} />}
        </section>

        <section className="bg-surface rounded-xl border border-border shadow-sm p-6 xs:p-7">
          <SectionHeader title="Últimos Beneficiários" description="Registros mais recentes" />
          {loadingBenef ? (
            <div className="space-y-3 animate-pulse">{Array.from({ length: 4 }).map((_, i) => (<div key={i} className="h-16 bg-border rounded" />))}</div>
          ) : ultimosBeneficiarios.length === 0 ? (
            <p className="text-muted">Nenhum beneficiário cadastrado.</p>
          ) : (
            <ul className="space-y-3">
              {ultimosBeneficiarios.map((b) => (
                <li key={b.id} className="p-3 rounded-lg border bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold">{b.nome}</p>
                      <p className="text-sm text-muted">{b.parentesco || '—'} • {b.email || 'sem e-mail'}</p>
                    </div>
                    <div className="text-xs text-muted">CPF: {b.cpf || '—'}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Cadastros recentes da equipe — admin e funcionário */}
      {(isAdmin || isFuncionario) && !loading && colaboradoresRecentes.length > 0 && (
        <section className="bg-surface rounded-xl border border-border shadow-sm p-6 xs:p-8 mb-6">
          <SectionHeader title="Cadastros recentes da equipe" description="Eventos reais registrados no histórico do sistema" accentClassName="border-accent2" />
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4">
            {colaboradoresRecentes.map((atividade) => (
              <div key={atividade.id} className="p-4 rounded-xl border border-border bg-white hover:border-primary/40 transition-all duration-200 shadow-sm">
                <p className="font-bold text-brand-text text-[0.88rem] truncate mb-1">{atividade.descricao}</p>
                <p className="text-[0.72rem] text-brand-text/60 mt-2">{atividade.tempo}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Ações rápidas */}
      <section className="bg-surface rounded-xl border border-border shadow-sm p-6 xs:p-8">
        <SectionHeader title="Ações Rápidas" />
        <div className="grid grid-cols-2 xs:grid-cols-2 md:grid-cols-4 gap-4">
          {acoesExibidas.map(({ icon, label, to, color }) => (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center justify-center gap-2.5 p-4 xs:p-5 rounded-xl border-2 bg-linear-to-br font-semibold text-[0.85rem] text-center no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${color}`}
            >
              <span className="text-2xl">{icon}</span>
              {label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;