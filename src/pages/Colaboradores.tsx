import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { funcionarioService } from '../services/funcionarioService';
import type { Funcionario } from '../types/Funcionario';
import { Button, ListToolbar, PageHero, PaginationBar, SectionHeader, PersonList, ColaboradorCard } from '../components';
import { ApiError as RemoteApiError } from '../services/api';

type ColaboradorPayload = Omit<Funcionario, 'id'> & {
  departamento?: string;
  email?: string;
};

type Colaborador = Funcionario & {
  departamento?: string;
  email?: string;
};

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
      <div className="space-y-2">
        <div className="h-3 bg-border rounded w-full" />
        <div className="h-3 bg-border rounded w-2/3" />
      </div>
    </div>
  );
}



export function Colaboradores() {
  const location = useLocation() as { state?: { message?: string } };
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [busca, setBusca] = useState('');
  const [filtroDepartamento, setFiltroDepartamento] = useState('todos');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 8;

  const carregarColaboradores = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const dados = await funcionarioService.listarTodos();
      setColaboradores(dados || []);
    } catch (err: unknown) {
      console.error('Erro ao buscar colaboradores:', err);

      if (err instanceof RemoteApiError) {
        setError(`Falha ao buscar os dados da API Java (status ${err.status}).`);
      } else if (err instanceof Error) {
        setError(`Falha ao buscar os dados da API Java. ${err.message}`);
      } else {
        setError('Falha ao buscar os dados da API Java. Erro desconhecido.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarColaboradores();
  }, [carregarColaboradores]);

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMsg(location.state.message);
      const timer = window.setTimeout(() => setSuccessMsg(''), 4000);
      return () => window.clearTimeout(timer);
    }

    return undefined;
  }, [location.state?.message]);

  useEffect(() => {
    setPaginaAtual(1);
  }, [busca, filtroDepartamento]);

  const departamentos = useMemo(
    () => Array.from(new Set(colaboradores.map((item) => item.departamento?.trim() || 'Geral'))).sort(),
    [colaboradores]
  );

  const colaboradoresFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return colaboradores.filter((item) => {
      const departamentoItem = item.departamento?.trim() || 'Geral';
      const correspondeDepartamento =
        filtroDepartamento === 'todos' || departamentoItem === filtroDepartamento;

      const textoAlvo = [item.nome, item.cargo, item.email, departamentoItem]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const correspondeBusca = !termo || textoAlvo.includes(termo);

      return correspondeDepartamento && correspondeBusca;
    });
  }, [busca, filtroDepartamento, colaboradores]);

  const totalPaginas = Math.max(1, Math.ceil(colaboradoresFiltrados.length / itensPorPagina));
  const colaboradoresPagina = colaboradoresFiltrados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  useEffect(() => {
    if (paginaAtual > totalPaginas) {
      setPaginaAtual(totalPaginas);
    }
  }, [paginaAtual, totalPaginas]);

  const inputBase =
    'w-full px-4 py-3 border-2 border-border rounded-lg text-[0.95rem] font-sans text-brand-text bg-white transition-all duration-200 focus:outline-none focus:border-primary focus:shadow-sm hover:border-[#c7d2fe]';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ColaboradorPayload>();

  const onSubmit: SubmitHandler<ColaboradorPayload> = async (data) => {
    setCreating(true);

    try {
      await funcionarioService.criar(data as Omit<Funcionario, 'id'>);
      reset();
      setShowForm(false);
      setSuccessMsg(`Colaborador(a) "${data.nome}" cadastrado(a) com sucesso no Oracle!`);
      setTimeout(() => setSuccessMsg(''), 4000);
      carregarColaboradores();
    } catch (err: unknown) {
      alert('Erro ao cadastrar funcionário: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-285 w-full mx-auto my-6 xs:my-8 sm:my-10 lg:my-12 xl:my-14 px-3 xs:px-4 sm:px-6 lg:px-7 xl:px-8">
      <PageHero
        badge="API Java"
        title="Colaboradores"
        description="Lista de colaboradores conectada diretamente ao banco Oracle."
        layout="split"
        actions={
          <Button
            id="btn-novo-colaborador"
            onClick={() => {
              setShowForm((s) => !s);
              setSuccessMsg('');
            }}
            variant="outline"
            className="border-white! text-white! hover:bg-white! hover:text-primary!"
          >
            {showForm ? 'Cancelar' : '+ Novo Colaborador'}
          </Button>
        }
      />

      {successMsg && (
        <div
          aria-live="polite"
          className="mb-5 px-5 py-4 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 font-semibold text-[0.95rem]"
        >
          {successMsg}
        </div>
      )}

      {showForm && (
        <section className="bg-surface rounded-xl border border-border shadow-sm p-6 xs:p-8 mb-7">
          <SectionHeader title="Cadastrar Novo Colaborador" />

          <form
            id="form-colaborador"
            aria-label="Formulário de cadastro de colaborador"
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 xs:grid-cols-2 gap-5"
          >
            <div className="xs:col-span-2">
              <label htmlFor="col-nome" className="block font-semibold text-[0.9rem] text-brand-text mb-1.5">
                Nome completo
              </label>
              <input
                id="col-nome"
                type="text"
                placeholder="Nome do colaborador"
                className={`${inputBase} ${errors.nome ? 'border-red-500' : ''}`}
                {...register('nome', { required: 'Preencha o nome' })}
              />
              {errors.nome && <p className="text-red-600 text-[0.82rem] mt-1">{errors.nome.message}</p>}
            </div>

            <div>
              <label htmlFor="col-cargo" className="block font-semibold text-[0.9rem] text-brand-text mb-1.5">
                Cargo
              </label>
              <input
                id="col-cargo"
                type="text"
                placeholder="Ex: Analista de RH"
                className={`${inputBase} ${errors.cargo ? 'border-red-500' : ''}`}
                {...register('cargo', { required: 'Preencha o cargo' })}
              />
              {errors.cargo && <p className="text-red-600 text-[0.82rem] mt-1">{errors.cargo.message}</p>}
            </div>

            <div>
              <label htmlFor="col-departamento" className="block font-semibold text-[0.9rem] text-brand-text mb-1.5">
                Departamento
              </label>
              <input
                id="col-departamento"
                type="text"
                placeholder="Ex: Tecnologia"
                className={inputBase}
                {...register('departamento')}
              />
            </div>

            <div className="xs:col-span-2">
              <label htmlFor="col-email" className="block font-semibold text-[0.9rem] text-brand-text mb-1.5">
                E-mail
              </label>
              <input
                id="col-email"
                type="email"
                placeholder="colaborador@empresa.com"
                className={inputBase}
                {...register('email')}
              />
            </div>

            <div className="xs:col-span-2 flex flex-col xs:flex-row gap-3">
              <Button type="submit" disabled={creating} id="btn-salvar-colaborador">
                {creating ? 'Salvando no Banco...' : 'Salvar Colaborador'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  reset();
                  setShowForm(false);
                }}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </section>
      )}

      <section className="bg-surface rounded-xl border border-border shadow-sm p-6 xs:p-8">
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 mb-6">
          <SectionHeader title="Equipe Cadastrada (Oracle DB)" />
          <button
            id="btn-atualizar-lista"
            onClick={carregarColaboradores}
            className="text-primary text-[0.88rem] font-semibold hover:underline self-start xs:self-auto"
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Atualizar'}
          </button>
        </div>

        <ListToolbar
          searchId="busca-colaboradores"
          searchLabel="Buscar colaborador"
          searchPlaceholder="Nome, cargo, e-mail ou departamento"
          searchValue={busca}
          onSearchChange={setBusca}
          filterId="filtro-departamento"
          filterLabel="Departamento"
          filterValue={filtroDepartamento}
          onFilterChange={setFiltroDepartamento}
          filterOptions={[
            { value: 'todos', label: 'Todos' },
            ...departamentos.map((departamento) => ({ value: departamento, label: departamento })),
          ]}
        />

        {!loading && colaboradores.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-[0.85rem] text-muted">
            <p>
              Mostrando {colaboradoresFiltrados.length} de {colaboradores.length} colaboradores
            </p>
            <p>Página {paginaAtual} de {totalPaginas}</p>
          </div>
        )}

        {error && !loading && (
            <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-5 py-4 text-[0.9rem] font-medium mb-4">
            {error}
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!loading && colaboradores.length === 0 && (
          <p className="text-muted text-center py-12 text-[0.95rem]">
            Nenhum colaborador encontrado no banco de dados. Adicione o primeiro no botão acima!
          </p>
        )}

        {!loading && colaboradores.length > 0 && colaboradoresFiltrados.length === 0 && (
          <p className="text-muted text-center py-12 text-[0.95rem]">
            Nenhum colaborador encontrado para os filtros aplicados.
          </p>
        )}

        <PersonList
          items={colaboradoresPagina}
          loading={loading}
          skeleton={<SkeletonCard />}
          gridClass="grid gap-4 sm:gap-5 lg:gap-5 xl:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
          keyExtractor={(c) => (c as Colaborador).id ?? Math.random()}
          emptyMessage={
            loading
              ? ''
              : colaboradores.length === 0
              ? 'Nenhum colaborador encontrado no banco de dados. Adicione o primeiro no botão acima!'
              : 'Nenhum colaborador encontrado para os filtros aplicados.'
          }
          renderItem={(c) => {
            const col = c as Colaborador;
            return (
              <ColaboradorCard
                id={col.id}
                nome={col.nome}
                cargo={col.cargo}
                departamento={col.departamento}
                email={col.email}
              />
            );
          }}
        />

        <PaginationBar
          currentPage={paginaAtual}
          totalPages={totalPaginas}
          onPageChange={setPaginaAtual}
        />

        {!loading && colaboradores.length > 0 && (
          <p className="mt-6 text-[0.8rem] text-muted text-right">
            {colaboradoresFiltrados.length} colaborador{colaboradoresFiltrados.length !== 1 ? 'es' : ''} exibido{colaboradoresFiltrados.length !== 1 ? 's' : ''} de {colaboradores.length} cadastrado{colaboradores.length !== 1 ? 's' : ''} no Oracle
          </p>
        )}
      </section>
    </div>
  );
}