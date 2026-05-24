import { useState, useEffect, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import beneficiarioService from '../services/beneficiarioService';
import { funcionarioService } from '../services/funcionarioService';
import type { Beneficiario } from '../types/Beneficiario';
import type { Funcionario } from '../types/Funcionario';
import { Button, ListToolbar, PageHero, PaginationBar, SectionHeader, PersonList, BeneficiarioCard } from '../components';
import { ApiError as RemoteApiError } from '../services/api';

export function Beneficiarios() {
  const location = useLocation() as { state?: { message?: string } };
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
  const [colaboradores, setColaboradores] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingColabs, setLoadingColabs] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [busca, setBusca] = useState('');
  const [filtroVinculo, setFiltroVinculo] = useState('todos');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 6;

  const carregar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const dados = await beneficiarioService.listarTodos();
      setBeneficiarios(dados || []);
    } catch (err: unknown) {
      console.error('Erro ao buscar beneficiários:', err);
      if (err instanceof RemoteApiError) {
        setError(`Falha na API (status ${err.status}).`);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro desconhecido ao buscar beneficiários.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const carregarColaboradores = useCallback(async () => {
    setLoadingColabs(true);
    try {
      const dados = await funcionarioService.listarTodos();
      setColaboradores(dados || []);
    } catch (err) {
      console.error('Erro ao buscar colaboradores para select:', err);
    } finally {
      setLoadingColabs(false);
    }
  }, []);

  useEffect(() => {
    carregar();
    carregarColaboradores();
  }, [carregar, carregarColaboradores]);

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
  }, [busca, filtroVinculo]);

  const inputBase =
    'w-full px-4 py-3 border-2 border-border rounded-lg text-[0.95rem] bg-white focus:outline-none focus:border-primary focus:shadow-sm';

  type BeneficiarioWithColab = Beneficiario & { colaboradorId?: number | string };
  type FormData = Partial<BeneficiarioWithColab>;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const beneficiariosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return beneficiarios.filter((item) => {
      const possuiVinculo = Boolean((item as BeneficiarioWithColab).colaboradorId);
      const correspondeVinculo =
        filtroVinculo === 'todos' ||
        (filtroVinculo === 'com-vinculo' && possuiVinculo) ||
        (filtroVinculo === 'sem-vinculo' && !possuiVinculo);

      const textoAlvo = [
        item.nome,
        item.cpf,
        item.email,
        item.parentesco,
        item.endereco,
        item.telefone,
        item.celular,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const correspondeBusca = !termo || textoAlvo.includes(termo);

      return correspondeVinculo && correspondeBusca;
    });
  }, [busca, filtroVinculo, beneficiarios]);

  const totalPaginas = Math.max(1, Math.ceil(beneficiariosFiltrados.length / itensPorPagina));
  const beneficiariosPagina = beneficiariosFiltrados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  useEffect(() => {
    if (paginaAtual > totalPaginas) {
      setPaginaAtual(totalPaginas);
    }
  }, [paginaAtual, totalPaginas]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
  setCreating(true);
  try {
    // Envia apenas os campos que o back-end (Java) aceita
    const payload = {
      nome: data.nome || '',
      dtNascimento: data.nascimento || undefined,
      endereco: data.endereco || '',
      idPrograma: 'P1',
    };
    const created = await beneficiarioService.criar(payload);
    if (created && created.id) {
      setBeneficiarios(prev => [created, ...prev]);
    } else {
      await carregar();
    }
    reset();
    setShowForm(false);
    setSuccessMsg(`✓ Beneficiário "${data.nome}" cadastrado com sucesso.`);
    setTimeout(() => setSuccessMsg(''), 4000);
  } catch (err) {
    alert('Erro ao cadastrar beneficiário: ' + (err instanceof Error ? err.message : String(err)));
  } finally {
    setCreating(false);
  }
};

  const getColaboradorNome = (id?: number | string) => {
    if (!id) return '—';
    const found = colaboradores.find((c) => String(c.id) === String(id));
    return found ? found.nome : '—';
  };

  return (
    <div className="max-w-285 w-full mx-auto my-8 px-4">
      <PageHero
        badge="Cadastro"
        title="Beneficiários"
        description="Cadastre e gerencie os beneficiários vinculados aos colaboradores."
        layout="split"
        actions={
          <Button onClick={() => { setShowForm(s => !s); setSuccessMsg(''); }} variant="outline" className="text-white!">
            {showForm ? '✕ Cancelar' : '+ Novo Beneficiário'}
          </Button>
        }
      />

      {successMsg && <div className="mb-5 px-5 py-4 rounded bg-emerald-50 border border-emerald-300 text-emerald-800">{successMsg}</div>}

      {showForm && (
        <section className="bg-surface rounded-xl border border-border p-6 mb-6">
          <SectionHeader title="Cadastrar Beneficiário" />

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-semibold mb-1">Nome completo</label>
              <input className={`${inputBase} ${errors.nome ? 'border-red-500' : ''}`} {...register('nome', { required: 'Preencha o nome' })} />
              {errors.nome && <p className="text-red-600 text-sm mt-1">{errors.nome.message}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-1">CPF</label>
              <input className={inputBase} {...register('cpf')} />
            </div>

            <div>
              <label className="block font-semibold mb-1">Nascimento</label>
              <input type="date" className={inputBase} {...register('nascimento')} />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold mb-1">Endereço</label>
              <input
                className={inputBase}
                placeholder="Rua, número, bairro, cidade"
                {...register('endereco')}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Telefone</label>
              <input
                className={inputBase}
                placeholder="(00) 0000-0000"
                {...register('telefone')}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Celular</label>
              <input
                className={inputBase}
                placeholder="(00) 00000-0000"
                {...register('celular')}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Parentesco</label>
              <input className={inputBase} {...register('parentesco')} />
            </div>

            <div>
              <label className="block font-semibold mb-1">E-mail</label>
              <input type="email" className={inputBase} {...register('email')} />
            </div>

            <div>
              <label className="block font-semibold mb-1">Vínculo (Colaborador)</label>
              <select className={inputBase} {...register('colaboradorId')}>
                <option value="">— Sem vínculo —</option>
                {loadingColabs ? <option disabled>Carregando...</option> :
                  colaboradores.map(c => <option key={c.id} value={String(c.id)}>{c.nome}</option>)
                }
              </select>
            </div>

            <div className="sm:col-span-2 flex gap-3">
              <Button type="submit" disabled={creating}>{creating ? 'Salvando...' : 'Salvar Beneficiário'}</Button>
              <Button type="button" variant="outline" onClick={() => { reset(); setShowForm(false); }}>Cancelar</Button>
            </div>
          </form>
        </section>
      )}

      <section className="bg-surface rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <SectionHeader title="Lista de Beneficiários" />
          <button onClick={() => { carregar(); carregarColaboradores(); }} className="text-primary font-semibold">{loading ? 'Carregando...' : '↻ Atualizar'}</button>
        </div>

        <ListToolbar
          searchId="busca-beneficiarios"
          searchLabel="Buscar beneficiário"
          searchPlaceholder="Nome, CPF, parentesco, contato ou endereço"
          searchValue={busca}
          onSearchChange={setBusca}
          filterId="filtro-vinculo"
          filterLabel="Vínculo"
          filterValue={filtroVinculo}
          onFilterChange={setFiltroVinculo}
          filterOptions={[
            { value: 'todos', label: 'Todos' },
            { value: 'com-vinculo', label: 'Com vínculo' },
            { value: 'sem-vinculo', label: 'Sem vínculo' },
          ]}
        />

        {!loading && beneficiarios.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-[0.85rem] text-muted">
            <p>
              Mostrando {beneficiariosFiltrados.length} de {beneficiarios.length} beneficiários
            </p>
            <p>Página {paginaAtual} de {totalPaginas}</p>
          </div>
        )}

        {error && <div className="text-red-600 bg-red-50 border border-red-200 rounded px-4 py-3 mb-4">{error}</div>}

        {loading ? <p>Carregando...</p> :
          beneficiarios.length === 0 ? <p className="text-muted">Nenhum beneficiário encontrado.</p> :
          beneficiariosFiltrados.length === 0 ? <p className="text-muted">Nenhum beneficiário encontrado para os filtros aplicados.</p> :
          <PersonList
            items={beneficiariosPagina}
            loading={loading}
            gridClass="grid sm:grid-cols-2 gap-4"
            keyExtractor={(b: Beneficiario) => b.id ?? Math.random()}
            emptyMessage={
              loading
                ? ''
                : beneficiarios.length === 0
                ? 'Nenhum beneficiário encontrado.'
                : 'Nenhum beneficiário encontrado para os filtros aplicados.'
            }
            renderItem={(b: Beneficiario) => {
                const ben = b as Beneficiario & { colaboradorId?: number | string };
                const colId = ben.colaboradorId;
                return (
                  <BeneficiarioCard
                    id={ben.id}
                    nome={ben.nome}
                    parentesco={ben.parentesco}
                    cpf={ben.cpf}
                    endereco={ben.endereco}
                    telefone={ben.telefone}
                    celular={ben.celular}
                    email={ben.email}
                    colaboradorNome={getColaboradorNome(colId)}
                  />
                );
              }}
          />
        }

        <PaginationBar
          currentPage={paginaAtual}
          totalPages={totalPaginas}
          onPageChange={setPaginaAtual}
        />
      </section>
    </div>
  );
}

export default Beneficiarios;