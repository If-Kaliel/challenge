import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useColaboradores } from '../hooks';
// Importa tipos específicos — demonstra uso de interfaces, union types e intersection types
import type {
  KpiData,            // interface
  Atividade,          // interface
  ColaboradorComStatus, // intersection type: Colaborador & { status, dataAdmissao, diasNaEmpresa }
  TipoAtividade,      // union type: 'cadastro' | 'ferias' | 'relatorio' | 'avaliacao'
  StatusColaborador,  // union type: 'ativo' | 'inativo' | 'ferias' | 'licenca'
} from '../types';

// ===== DADOS DE ATIVIDADES (tipados com a interface Atividade) =====
const ATIVIDADES: Atividade[] = [
  { id: 1, tipo: 'cadastro',   descricao: 'Ana Beatriz Costa foi cadastrada no sistema',         tempo: 'há 5 min',  lida: false },
  { id: 2, tipo: 'ferias',     descricao: 'Solicitação de férias de Carlos Lima aprovada',        tempo: 'há 32 min', lida: false },
  { id: 3, tipo: 'relatorio',  descricao: 'Relatório mensal de produtividade gerado',             tempo: 'há 1h',     lida: true  },
  { id: 4, tipo: 'avaliacao',  descricao: 'Avaliação de desempenho de Fernanda Rodrigues aberta', tempo: 'há 2h',     lida: true  },
  { id: 5, tipo: 'cadastro',   descricao: 'Gabriel Nascimento promovido a Gerente de Projetos',  tempo: 'há 3h',     lida: true  },
  { id: 6, tipo: 'ferias',     descricao: 'Licença médica de Helena Martins registrada',          tempo: 'há 5h',     lida: true  },
];

// Maps tipados com TipoAtividade (union type) como chave
const TIPO_ICON: Record<TipoAtividade, string> = {
  cadastro:  '👤',
  ferias:    '🏖️',
  relatorio: '📊',
  avaliacao: '⭐',
};

const TIPO_COLOR: Record<TipoAtividade, string> = {
  cadastro:  'bg-indigo-100 text-indigo-600',
  ferias:    'bg-cyan-100   text-cyan-600',
  relatorio: 'bg-violet-100 text-violet-600',
  avaliacao: 'bg-amber-100  text-amber-600',
};

// Badge de status — StatusColaborador (union type) como chave
const STATUS_BADGE: Record<StatusColaborador, string> = {
  ativo:   'bg-emerald-100 text-emerald-700 border-emerald-200',
  inativo: 'bg-gray-100   text-gray-600   border-gray-200',
  ferias:  'bg-cyan-100   text-cyan-700   border-cyan-200',
  licenca: 'bg-amber-100  text-amber-700  border-amber-200',
};

// ===== BAR CHART CSS ONLY =====
interface MetricaDepto {
  departamento: string;
  total: number;
  cor: string;
}

function BarChart({ dados }: { dados: MetricaDepto[] }) {
  const max = Math.max(...dados.map((d) => d.total), 1);
  return (
    <div className="flex flex-col gap-3 mt-2">
      {dados.map(({ departamento, total, cor }) => (
        <div key={departamento}>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[0.82rem] font-medium text-brand-text truncate max-w-[60%]">{departamento}</span>
            <span className="text-[0.82rem] font-bold text-muted">{total}</span>
          </div>
          <div className="w-full h-2.5 bg-border rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${(total / max) * 100}%`, background: cor }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ===== KPI CARD — usa a interface KpiData =====
function KpiCard({ icon, label, value, sub, gradient }: KpiData) {
  return (
    <div className={`relative overflow-hidden rounded-xl p-5 text-white shadow-md ${gradient}`}>
      <div className="pointer-events-none absolute -right-4 -top-4 text-[5rem] opacity-10 select-none">{icon}</div>
      <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-white/70 mb-1">{label}</p>
      <p className="text-[2rem] font-extrabold leading-none mb-1">{value}</p>
      {sub && <p className="text-[0.78rem] text-white/65">{sub}</p>}
    </div>
  );
}

// ===== PÁGINA DASHBOARD =====
export function Dashboard() {
  const { colaboradores, loading } = useColaboradores();
  const [animado, setAnimado] = useState<boolean>(false);   // boolean explícito

  useEffect(() => {
    const t = setTimeout(() => setAnimado(true), 100);
    return () => clearTimeout(t);
  }, []);

  // ===== KPIs — array tipado com a interface KpiData =====
  const kpis: KpiData[] = [
    {
      icon: '👥', label: 'Colaboradores',
      value: loading ? '—' : colaboradores.length,
      sub: 'cadastrados no sistema',
      gradient: 'bg-gradient-to-br from-indigo-600 to-violet-600',
    },
    {
      icon: '🏢', label: 'Departamentos',
      value: loading ? '—' : new Set(colaboradores.map((c) => c.departamento)).size,
      sub: 'ativos na empresa',
      gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600',
    },
    {
      icon: '📈', label: 'Satisfação',
      value: '98%',
      sub: 'índice geral de clima',
      gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    },
    {
      icon: '⏱️', label: 'Tempo Médio',
      value: '4,2h',
      sub: 'de resolução de chamados',
      gradient: 'bg-gradient-to-br from-amber-500 to-orange-500',
    },
  ];

  // ===== INTERSECTION TYPE em uso: ColaboradorComStatus =====
  // Combina Colaborador (interface) com status (union type) e metadados (number | string)
  const colaboradoresComStatus: ColaboradorComStatus[] = colaboradores.slice(0, 4).map((c, i) => ({
    ...c,
    status: (['ativo', 'ativo', 'ferias', 'licenca'] as StatusColaborador[])[i] ?? 'ativo',
    dataAdmissao: `2024-0${i + 1}-15`,
    diasNaEmpresa: (i + 1) * 90,
  }));

  // Métricas por departamento
  const CORES_DEPTO: Record<string, string> = {
    'Tecnologia':       'linear-gradient(90deg,#4f46e5,#8b5cf6)',
    'Recursos Humanos': 'linear-gradient(90deg,#06b6d4,#3b82f6)',
    'Produto':          'linear-gradient(90deg,#8b5cf6,#ec4899)',
    'Operações':        'linear-gradient(90deg,#f59e0b,#f97316)',
    'Financeiro':       'linear-gradient(90deg,#10b981,#06b6d4)',
  };

  const porDepto = colaboradores.reduce<Record<string, number>>((acc, c) => {
    acc[c.departamento] = (acc[c.departamento] ?? 0) + 1;
    return acc;
  }, {});

  const metricasDepto: MetricaDepto[] = Object.entries(porDepto)
    .map(([dep, total]) => ({ departamento: dep, total, cor: CORES_DEPTO[dep] ?? '#6b7280' }))
    .sort((a, b) => b.total - a.total);

  return (
    <div className="max-w-[1140px] w-full mx-auto my-6 xs:my-8 sm:my-10 lg:my-12 xl:my-14 px-3 xs:px-4 sm:px-6 lg:px-7 xl:px-8">

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient text-white rounded-[20px] px-6 py-10 xs:px-10 xs:py-12 md:px-14 md:py-14 mb-7">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(circle at 15% 50%, rgba(139,92,246,0.3) 0%, transparent 55%), radial-gradient(circle at 85% 15%, rgba(6,182,212,0.2) 0%, transparent 50%)' }}
        />
        <div className="relative z-10 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-6">
          <div>
            <span className="inline-block bg-accent/15 text-accent border border-accent/35 rounded-full px-4 py-1 text-[0.8rem] font-semibold uppercase tracking-[0.06em] mb-3">
              Solução — Simple Manager
            </span>
            <h1 className="text-[1.8rem] xs:text-[2.2rem] md:text-[2.6rem] font-extrabold leading-tight mb-2">
              Dashboard de RH
            </h1>
            <p className="text-white/70 text-[0.95rem] max-w-[500px]">
              Visão consolidada dos indicadores de pessoas, departamentos e atividades em tempo real.
            </p>
          </div>
          <Link to="/colaboradores"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-white/40 text-white font-semibold text-[0.88rem] no-underline transition-all duration-200 hover:bg-white hover:text-primary hover:border-white"
          >
            Gerenciar Colaboradores →
          </Link>
        </div>
      </section>

      {/* KPI Cards — usa interface KpiData */}
      <div className={`grid gap-3 xs:gap-4 sm:gap-5 xl:gap-6 mb-7 transition-all duration-700 ${animado ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        grid-cols-2 lg:grid-cols-4`}>
        {kpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
      </div>

      {/* Grid principal */}
      <div className="grid gap-5 sm:gap-6 xl:gap-7 mb-6
        grid-cols-1 md:grid-cols-2">

        {/* Distribuição por departamento */}
        <section className="bg-surface rounded-xl border border-border shadow-sm p-6 xs:p-7">
          <h2 className="text-[1.05rem] font-bold text-brand-text mb-1 border-l-4 border-primary pl-3.5">
            Colaboradores por Departamento
          </h2>
          <p className="text-muted text-[0.82rem] mb-5 pl-[1.125rem]">Distribuição atual da equipe</p>
          {loading ? (
            <div className="space-y-4 animate-pulse">
              {[80, 55, 40, 65, 30].map((w) => (
                <div key={w}>
                  <div className="flex justify-between mb-1">
                    <div className="h-3 bg-border rounded w-1/2" /><div className="h-3 bg-border rounded w-6" />
                  </div>
                  <div className="h-2.5 bg-border rounded-full" style={{ width: `${w}%` }} />
                </div>
              ))}
            </div>
          ) : (
            <BarChart dados={metricasDepto} />
          )}
        </section>

        {/* Feed de atividades — usa interface Atividade e union types TipoAtividade */}
        <section className="bg-surface rounded-xl border border-border shadow-sm p-6 xs:p-7">
          <h2 className="text-[1.05rem] font-bold text-brand-text mb-1 border-l-4 border-accent pl-3.5">
            Atividades Recentes
          </h2>
          <p className="text-muted text-[0.82rem] mb-5 pl-[1.125rem]">Últimos eventos do sistema</p>
          <ul className="flex flex-col gap-3" aria-label="Atividades recentes">
            {ATIVIDADES.map((a: Atividade) => (
              <li key={a.id} className={`flex items-start gap-3 p-3 rounded-lg border transition-colors duration-150 ${a.lida ? 'bg-feature-gradient border-border' : 'bg-indigo-50 border-indigo-200'}`}>
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 ${TIPO_COLOR[a.tipo]}`}>
                  {TIPO_ICON[a.tipo]}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.85rem] text-brand-text font-medium leading-snug">{a.descricao}</p>
                  <p className="text-[0.75rem] text-muted mt-0.5">{a.tempo}</p>
                </div>
                {!a.lida && (
                  <span className="shrink-0 w-2 h-2 rounded-full bg-primary mt-1.5" title="Não lida" />
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Colaboradores com Status — usa ColaboradorComStatus (INTERSECTION TYPE) */}
      {!loading && colaboradoresComStatus.length > 0 && (
        <section className="bg-surface rounded-xl border border-border shadow-sm p-6 xs:p-8 mb-6">
          <h2 className="text-[1.05rem] font-bold text-brand-text mb-1 border-l-4 border-accent2 pl-3.5">
            Situação da Equipe
          </h2>
          <p className="text-muted text-[0.82rem] mb-5 pl-[1.125rem]">
            Colaboradores com status de vínculo — <code className="text-primary text-[0.78rem]">ColaboradorComStatus</code> (Intersection Type)
          </p>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4">
            {colaboradoresComStatus.map((c: ColaboradorComStatus) => (
              <div key={c.id} className="p-4 rounded-xl border border-border bg-feature-gradient hover:border-primary/40 transition-all duration-200">
                <p className="font-bold text-brand-text text-[0.88rem] truncate mb-1">{c.nome}</p>
                <p className="text-muted text-[0.78rem] truncate mb-2">{c.cargo}</p>
                <span className={`inline-block text-[0.72rem] font-semibold px-2 py-0.5 rounded-full border capitalize ${STATUS_BADGE[c.status]}`}>
                  {c.status}
                </span>
                <p className="text-[0.72rem] text-muted mt-2">{c.diasNaEmpresa} dias na empresa</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Ações rápidas */}
      <section className="bg-surface rounded-xl border border-border shadow-sm p-6 xs:p-8">
        <h2 className="text-[1.05rem] font-bold text-brand-text mb-5 border-l-4 border-primary pl-3.5">
          Ações Rápidas
        </h2>
        <div className="grid grid-cols-2 xs:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '➕', label: 'Novo Colaborador',   to: '/colaboradores', color: 'from-indigo-50 to-violet-50 border-indigo-200 text-indigo-700 hover:border-indigo-400' },
            { icon: '📋', label: 'Ver Solução',         to: '/solucao',       color: 'from-cyan-50   to-blue-50   border-cyan-200   text-cyan-700   hover:border-cyan-400'   },
            { icon: '📞', label: 'Contato / Suporte',   to: '/contato',       color: 'from-violet-50 to-pink-50   border-violet-200 text-violet-700 hover:border-violet-400' },
            { icon: '❓', label: 'Central de Ajuda',    to: '/faq',           color: 'from-amber-50  to-orange-50 border-amber-200  text-amber-700  hover:border-amber-400'  },
          ].map(({ icon, label, to, color }) => (
            <Link key={to} to={to}
              className={`flex flex-col items-center justify-center gap-2.5 p-4 xs:p-5 rounded-xl border-2 bg-gradient-to-br font-semibold text-[0.85rem] text-center no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${color}`}
            >
              <span className="text-2xl">{icon}</span>
              {label}
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-5 text-center text-[0.78rem] text-muted">
        Dashboard atualizado em tempo real · Dados sincronizados com a API Java do Simple Manager
      </p>
    </div>
  );
}
