import { useState, useEffect, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useLocation, Link } from 'react-router-dom';
import dentistaService from '../services/dentistaService';
import type { Dentista } from '../types/Dentista';
import { Button, ListToolbar, PageHero, PaginationBar, SectionHeader, PersonList } from '../components';
import { ApiError as RemoteApiError } from '../services/api';
import { useAuth } from '../context/AuthContext';

type DentistaPayload = Omit<Dentista, 'id'>;

function SkeletonCard() {
  return (
    <div className="bg-surface rounded-xl border border-border p-5 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-border shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-border rounded w-3/4" />
          <div className="h-3 bg-border rounded w-1/2" />
        </div>
      </div>
      <div className="h-3 bg-border rounded w-full" />
    </div>
  );
}

function initials(nome: string) {
  if (!nome) return 'DT';
  return nome.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}

interface DentistaCardProps {
  id: string;
  nome: string;
  cro: string;
  especialidade: string;
  email?: string;
  telefone?: string;
}

function DentistaCard({ id, nome, cro, especialidade, email, telefone }: DentistaCardProps) {
  return (
    <div className="bg-surface rounded-xl border border-border p-5 hover:border-primary/40 hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-role-dentista flex items-center justify-center text-white font-extrabold text-lg shrink-0">
          {initials(nome)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-brand-text truncate">{nome}</p>
          <p className="text-[0.82rem] text-muted truncate">CRO: {cro}</p>
        </div>
      </div>
      <div className="space-y-1 mb-4">
        <p className="text-[0.82rem] text-muted">{especialidade}</p>
        {email && <p className="text-[0.82rem] text-muted truncate">{email}</p>}
        {telefone && <p className="text-[0.82rem] text-muted">{telefone}</p>}
      </div>
      <Link
        to={`/dentistas/${id}`}
        className="inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-primary hover:underline"
      >
        Ver detalhes →
      </Link>
    </div>
  );
}

export function Dentistas() {
  const location = useLocation() as { state?: { message?: string } };
  const { podeGerenciarDentistas, isAdmin } = useAuth();

  const [dentistas, setDentistas] = useState<Dentista[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [busca, setBusca] = useState('');
  const [filtroEspecialidade, setFiltroEspecialidade] = useState('todos');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 8;

  const inputBase =
    'w-full px-4 py-3 border-2 border-border rounded-lg text-[0.95rem] font-sans text-brand-text bg-white transition-all duration-200 focus:outline-none focus:border-primary focus:shadow-sm hover:border-[#c7d2fe]';

  const { register, handleSubmit, reset, formState: { errors } } = useForm<DentistaPayload>();

  const carregar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const dados = await dentistaService.listarTodos();
      setDentistas(dados || []);
    } catch (err: unknown) {
      if (err instanceof RemoteApiError) {
        setError(`Falha na API (status ${err.status}).`);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro desconhecido ao buscar dentistas.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { carregar(); }, [carregar]);

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMsg(location.state.message);
      const t = window.setTimeout(() => setSuccessMsg(''), 4000);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [location.state?.message]);

  useEffect(() => { setPaginaAtual(1); }, [busca, filtroEspecialidade]);

  const especialidades = useMemo(
    () => Array.from(new Set(dentistas.map((d) => d.especialidade?.trim() || 'Geral'))).sort(),
    [dentistas]
  );

  const dentistasFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return dentistas.filter((d) => {
      const espItem = d.especialidade?.trim() || 'Geral';
      const correspEsp = filtroEspecialidade === 'todos' || espItem === filtroEspecialidade;
      const texto = [d.nome, d.cro, d.especialidade, d.email, d.telefone].filter(Boolean).join(' ').toLowerCase();
      return correspEsp && (!termo || texto.includes(termo));
    });
  }, [busca, filtroEspecialidade, dentistas]);

  const totalPaginas = Math.max(1, Math.ceil(dentistasFiltrados.length / itensPorPagina));
  const dentistasPagina = dentistasFiltrados.slice((paginaAtual - 1) * itensPorPagina, paginaAtual * itensPorPagina);

  useEffect(() => {
    if (paginaAtual > totalPaginas) setPaginaAtual(totalPaginas);
  }, [paginaAtual, totalPaginas]);

  const onSubmit: SubmitHandler<DentistaPayload> = async (data) => {
    setCreating(true);
    try {
      await dentistaService.criar(data);
      reset();
      setShowForm(false);
      setSuccessMsg(`Dentista "${data.nome}" cadastrado com sucesso!`);
      setTimeout(() => setSuccessMsg(''), 4000);
      carregar();
    } catch (err: unknown) {
      alert('Erro ao cadastrar dentista: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-285 w-full mx-auto my-6 xs:my-8 sm:my-10 lg:my-12 xl:my-14 px-3 xs:px-4 sm:px-6 lg:px-7 xl:px-8">
      <PageHero
        badge="Equipe Odontológica"
        title="Dentistas"
        description="Gerencie os dentistas da clínica cadastrados no banco de dados."
        layout="split"
        actions={
          podeGerenciarDentistas ? (
            <Button
              id="btn-novo-dentista"
              onClick={() => { setShowForm((s) => !s); setSuccessMsg(''); }}
              variant="outline"
              className="border-white! text-white! hover:bg-white! hover:text-primary!"
            >
              {showForm ? 'Cancelar' : '+ Novo Dentista'}
            </Button>
          ) : undefined
        }
      />

      {successMsg && (
        <div aria-live="polite" className="mb-5 px-5 py-4 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 font-semibold text-[0.95rem]">
          {successMsg}
        </div>
      )}

      {showForm && podeGerenciarDentistas && (
        <section className="bg-surface rounded-xl border border-border shadow-sm p-6 xs:p-8 mb-7">
          <SectionHeader title="Cadastrar Novo Dentista" />
          <form
            id="form-dentista"
            aria-label="Formulário de cadastro de dentista"
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 xs:grid-cols-2 gap-5"
          >
            <div className="xs:col-span-2">
              <label htmlFor="dent-nome" className="block font-semibold text-[0.9rem] text-brand-text mb-1.5">Nome completo</label>
              <input
                id="dent-nome"
                type="text"
                placeholder="Dr. Nome do Dentista"
                className={`${inputBase} ${errors.nome ? 'border-red-500' : ''}`}
                {...register('nome', { required: 'Preencha o nome' })}
              />
              {errors.nome && <p className="text-red-600 text-[0.82rem] mt-1">{errors.nome.message}</p>}
            </div>

            <div>
              <label htmlFor="dent-cro" className="block font-semibold text-[0.9rem] text-brand-text mb-1.5">CRO</label>
              <input
                id="dent-cro"
                type="text"
                placeholder="SP-12345"
                className={`${inputBase} ${errors.cro ? 'border-red-500' : ''}`}
                {...register('cro', { required: 'Preencha o CRO' })}
              />
              {errors.cro && <p className="text-red-600 text-[0.82rem] mt-1">{errors.cro.message}</p>}
            </div>

            <div>
              <label htmlFor="dent-especialidade" className="block font-semibold text-[0.9rem] text-brand-text mb-1.5">Especialidade</label>
              <input
                id="dent-especialidade"
                type="text"
                placeholder="Ex: Ortodontia"
                className={`${inputBase} ${errors.especialidade ? 'border-red-500' : ''}`}
                {...register('especialidade', { required: 'Preencha a especialidade' })}
              />
              {errors.especialidade && <p className="text-red-600 text-[0.82rem] mt-1">{errors.especialidade.message}</p>}
            </div>

            <div>
              <label htmlFor="dent-email" className="block font-semibold text-[0.9rem] text-brand-text mb-1.5">E-mail</label>
              <input
                id="dent-email"
                type="email"
                placeholder="dentista@clinica.com"
                className={inputBase}
                {...register('email')}
              />
            </div>

            <div>
              <label htmlFor="dent-telefone" className="block font-semibold text-[0.9rem] text-brand-text mb-1.5">Telefone</label>
              <input
                id="dent-telefone"
                type="text"
                placeholder="(00) 90000-0000"
                className={inputBase}
                {...register('telefone')}
              />
            </div>

            <div className="xs:col-span-2 flex flex-col xs:flex-row gap-3">
              <Button type="submit" disabled={creating} id="btn-salvar-dentista">
                {creating ? 'Salvando...' : 'Salvar Dentista'}
              </Button>
              <Button type="button" variant="outline" onClick={() => { reset(); setShowForm(false); }}>
                Cancelar
              </Button>
            </div>
          </form>
        </section>
      )}

      <section className="bg-surface rounded-xl border border-border shadow-sm p-6 xs:p-8">
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 mb-6">
          <SectionHeader title="Dentistas Cadastrados" />
          <button
            id="btn-atualizar-dentistas"
            onClick={carregar}
            className="text-primary text-[0.88rem] font-semibold hover:underline self-start xs:self-auto"
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Atualizar'}
          </button>
        </div>

        <ListToolbar
          searchId="busca-dentistas"
          searchLabel="Buscar dentista"
          searchPlaceholder="Nome, CRO, especialidade ou e-mail"
          searchValue={busca}
          onSearchChange={setBusca}
          filterId="filtro-especialidade"
          filterLabel="Especialidade"
          filterValue={filtroEspecialidade}
          onFilterChange={setFiltroEspecialidade}
          filterOptions={[
            { value: 'todos', label: 'Todas' },
            ...especialidades.map((e) => ({ value: e, label: e })),
          ]}
        />

        {!loading && dentistas.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-[0.85rem] text-muted">
            <p>Mostrando {dentistasFiltrados.length} de {dentistas.length} dentistas</p>
            <p>Página {paginaAtual} de {totalPaginas}</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-5 py-4 text-[0.9rem] font-medium mb-4">
            {error}
          </div>
        )}

        {/* Admin only: alert para não-admin */}
        {!isAdmin && !loading && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-[0.88rem]">
            Apenas administradores podem excluir dentistas.
          </div>
        )}

        <PersonList
          items={dentistasPagina}
          loading={loading}
          skeleton={<SkeletonCard />}
          gridClass="grid gap-4 sm:gap-5 lg:gap-5 xl:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
          keyExtractor={(d) => (d as Dentista).id ?? Math.random()}
          emptyMessage={
            loading ? '' :
              dentistas.length === 0
                ? 'Nenhum dentista encontrado no banco. Adicione o primeiro!'
                : 'Nenhum dentista encontrado para os filtros aplicados.'
          }
          renderItem={(d) => {
            const dent = d as Dentista;
            return (
              <DentistaCard
                id={dent.id}
                nome={dent.nome}
                cro={dent.cro}
                especialidade={dent.especialidade}
                email={dent.email}
                telefone={dent.telefone}
              />
            );
          }}
        />

        <PaginationBar currentPage={paginaAtual} totalPages={totalPaginas} onPageChange={setPaginaAtual} />
      </section>
    </div>
  );
}

export default Dentistas;
