import { useState, useEffect, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useLocation, Link } from 'react-router-dom';
import doacaoService from '../services/doacaoService';
import type { Doacao } from '../types/Doacao';
import { Button, ListToolbar, PageHero, PaginationBar, SectionHeader } from '../components';
import { ApiError as RemoteApiError } from '../services/api';
import { useAuth } from '../context/AuthContext';

type DoacaoPayload = Omit<Doacao, 'id'>;

function SkeletonRow() {
  return <div className="h-14 bg-border rounded-lg animate-pulse" />;
}

function formatarData(data?: string) {
  if (!data) return 'â€”';
  try {
    return new Date(data).toLocaleDateString('pt-BR');
  } catch {
    return data;
  }
}

function formatarValor(valor?: number) {
  if (valor === undefined || valor === null) return 'â€”';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

export function Doacoes() {
  const location = useLocation() as { state?: { message?: string } };
  const { isAdmin } = useAuth();

  const [doacoes, setDoacoes] = useState<Doacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [busca, setBusca] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  const inputBase =
    'w-full px-4 py-3 border-2 border-border rounded-lg text-[0.95rem] font-sans text-brand-text bg-white transition-all duration-200 focus:outline-none focus:border-primary focus:shadow-sm hover:border-[#c7d2fe]';

  const { register, handleSubmit, reset, formState: { errors } } = useForm<DoacaoPayload>();

  const carregar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const dados = await doacaoService.listarTodos();
      setDoacoes(dados || []);
    } catch (err: unknown) {
      if (err instanceof RemoteApiError) {
        setError(`Falha na API (status ${err.status}).`);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro desconhecido ao buscar doaÃ§Ãµes.');
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

  useEffect(() => { setPaginaAtual(1); }, [busca]);

  const doacoesFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return doacoes.filter((d) => {
      const texto = [d.id, d.idDoador, String(d.valorDoacao), d.dtDoacao].filter(Boolean).join(' ').toLowerCase();
      return !termo || texto.includes(termo);
    });
  }, [busca, doacoes]);

  const totalPaginas = Math.max(1, Math.ceil(doacoesFiltradas.length / itensPorPagina));
  const doacoesPagina = doacoesFiltradas.slice((paginaAtual - 1) * itensPorPagina, paginaAtual * itensPorPagina);

  useEffect(() => {
    if (paginaAtual > totalPaginas) setPaginaAtual(totalPaginas);
  }, [paginaAtual, totalPaginas]);

  const onSubmit: SubmitHandler<DoacaoPayload> = async (data) => {
    setCreating(true);
    try {
      await doacaoService.criar({ ...data, valorDoacao: Number(data.valorDoacao) });
      reset();
      setShowForm(false);
      setSuccessMsg(`DoaÃ§Ã£o de ${formatarValor(Number(data.valorDoacao))} registrada com sucesso!`);
      setTimeout(() => setSuccessMsg(''), 4000);
      carregar();
    } catch (err: unknown) {
      alert('Erro ao registrar doaÃ§Ã£o: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-285 w-full mx-auto my-6 xs:my-8 sm:my-10 lg:my-12 xl:my-14 px-3 xs:px-4 sm:px-6 lg:px-7 xl:px-8">
      <PageHero
        badge="Financeiro"
        title="DoaÃ§Ãµes"
        description="Registre e acompanhe todas as doaÃ§Ãµes recebidas pela clÃ­nica."
        layout="split"
        actions={
          <Button
            id="btn-nova-doacao"
            onClick={() => { setShowForm((s) => !s); setSuccessMsg(''); }}
            variant="outline"
            className="border-white! text-white! hover:bg-white! hover:text-primary!"
          >
              {showForm ? 'Cancelar' : '+ Nova DoaÃ§Ã£o'}
          </Button>
        }
      />

      {successMsg && (
        <div aria-live="polite" className="mb-5 px-5 py-4 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 font-semibold text-[0.95rem]">
          {successMsg}
        </div>
      )}

      {showForm && (
        <section className="bg-surface rounded-xl border border-border shadow-sm p-6 xs:p-8 mb-7">
          <SectionHeader title="Registrar Nova DoaÃ§Ã£o" />
          <form
            id="form-doacao"
            aria-label="FormulÃ¡rio de cadastro de doaÃ§Ã£o"
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 xs:grid-cols-2 gap-5"
          >
            <div>
              <label htmlFor="doac-doador" className="block font-semibold text-[0.9rem] text-brand-text mb-1.5">ID do Doador</label>
              <input
                id="doac-doador"
                type="text"
                placeholder="Ex: 1"
                className={`${inputBase} ${errors.idDoador ? 'border-red-500' : ''}`}
                {...register('idDoador', { required: 'Preencha o ID do doador' })}
              />
              {errors.idDoador && <p className="text-red-600 text-[0.82rem] mt-1">{errors.idDoador.message}</p>}
            </div>

            <div>
              <label htmlFor="doac-valor" className="block font-semibold text-[0.9rem] text-brand-text mb-1.5">Valor (R$)</label>
              <input
                id="doac-valor"
                type="number"
                step="0.01"
                min="0"
                placeholder="0,00"
                className={`${inputBase} ${errors.valorDoacao ? 'border-red-500' : ''}`}
                {...register('valorDoacao', { required: 'Preencha o valor', min: { value: 0.01, message: 'Valor deve ser maior que zero' } })}
              />
              {errors.valorDoacao && <p className="text-red-600 text-[0.82rem] mt-1">{errors.valorDoacao.message}</p>}
            </div>

            <div>
              <label htmlFor="doac-data" className="block font-semibold text-[0.9rem] text-brand-text mb-1.5">Data da DoaÃ§Ã£o</label>
              <input
                id="doac-data"
                type="date"
                className={`${inputBase} ${errors.dtDoacao ? 'border-red-500' : ''}`}
                {...register('dtDoacao', { required: 'Preencha a data' })}
              />
              {errors.dtDoacao && <p className="text-red-600 text-[0.82rem] mt-1">{errors.dtDoacao.message}</p>}
            </div>

            <div className="xs:col-span-2 flex flex-col xs:flex-row gap-3">
              <Button type="submit" disabled={creating} id="btn-salvar-doacao">
                {creating ? 'Salvando...' : 'Registrar DoaÃ§Ã£o'}
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
          <SectionHeader title="Lista de DoaÃ§Ãµes" />
          <button
            id="btn-atualizar-doacoes"
            onClick={carregar}
            className="text-primary text-[0.88rem] font-semibold hover:underline self-start xs:self-auto"
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Atualizar'}
          </button>
        </div>

        <ListToolbar
          searchId="busca-doacoes"
          searchLabel="Buscar doaÃ§Ã£o"
          searchPlaceholder="ID do doador, valor ou data"
          searchValue={busca}
          onSearchChange={setBusca}
          filterId="filtro-doacoes-placeholder"
          filterLabel="PerÃ­odo"
          filterValue="todos"
          onFilterChange={() => {}}
          filterOptions={[{ value: 'todos', label: 'Todos' }]}
        />

        {!loading && doacoes.length > 0 && (
          <div className="flex justify-between text-[0.85rem] text-muted mb-4">
            <p>Mostrando {doacoesFiltradas.length} de {doacoes.length} doaÃ§Ãµes</p>
            <p>PÃ¡gina {paginaAtual} de {totalPaginas}</p>
          </div>
        )}

        {error && !loading && (
            <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-5 py-4 text-[0.9rem] font-medium mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}
          </div>
        ) : doacoes.length === 0 ? (
          <p className="text-muted text-center py-12">Nenhuma doaÃ§Ã£o registrada. Adicione a primeira!</p>
        ) : doacoesFiltradas.length === 0 ? (
          <p className="text-muted text-center py-12">Nenhuma doaÃ§Ã£o encontrada para a busca aplicada.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-[0.88rem]">
              <thead className="bg-brand-bg">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-brand-text/70">ID</th>
                  <th className="text-left px-4 py-3 font-semibold text-brand-text/70">Doador</th>
                  <th className="text-right px-4 py-3 font-semibold text-brand-text/70">Valor</th>
                  <th className="text-left px-4 py-3 font-semibold text-brand-text/70">Data</th>
                  <th className="text-left px-4 py-3 font-semibold text-brand-text/70">AÃ§Ãµes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {doacoesPagina.map((d) => (
                  <tr key={d.id} className="bg-white hover:bg-brand-bg/50 transition-colors">
                    <td className="px-4 py-3 text-muted font-mono">#{d.id}</td>
                    <td className="px-4 py-3 font-semibold text-brand-text">{d.idDoador}</td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-700">{formatarValor(d.valorDoacao)}</td>
                    <td className="px-4 py-3 text-muted">{formatarData(d.dtDoacao)}</td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/doacoes/${d.id}`}
                        className="text-primary font-semibold text-[0.82rem] hover:underline"
                      >
                        {isAdmin ? 'Editar' : 'Ver'}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <PaginationBar currentPage={paginaAtual} totalPages={totalPaginas} onPageChange={setPaginaAtual} />

        {!loading && doacoes.length > 0 && (
          <div className="mt-4 p-4 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <span className="text-emerald-800 font-semibold text-[0.9rem]">Total arrecadado:</span>
            <span className="text-emerald-700 font-extrabold text-[1.1rem]">
              {formatarValor(doacoes.reduce((acc, d) => acc + (Number(d.valorDoacao) || 0), 0))}
            </span>
          </div>
        )}
      </section>
    </div>
  );
}

export default Doacoes;
