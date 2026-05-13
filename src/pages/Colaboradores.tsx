import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useColaboradores } from '../hooks';
import type { ColaboradorPayload } from '../types';
import { Button } from '../components';

// ===== SKELETON CARD =====
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

// ===== DEPARTAMENT BADGE COLOR =====
const deptColor: Record<string, string> = {
  'Recursos Humanos': 'bg-violet-100 text-violet-700 border-violet-200',
  'Tecnologia':       'bg-cyan-100    text-cyan-700   border-cyan-200',
  'Produto':          'bg-indigo-100  text-indigo-700 border-indigo-200',
  'Operações':        'bg-amber-100   text-amber-700  border-amber-200',
  'Financeiro':       'bg-emerald-100 text-emerald-700 border-emerald-200',
};
function deptBadge(dep: string) {
  return deptColor[dep] ?? 'bg-gray-100 text-gray-700 border-gray-200';
}

// ===== INICIAIS DO AVATAR =====
function initials(nome: string) {
  return nome
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

// ===== PÁGINA COLABORADORES =====
export function Colaboradores() {
  const { colaboradores, loading, error, refetch, create, creating } = useColaboradores();
  const [showForm, setShowForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const inputBase =
    'w-full px-4 py-3 border-2 border-border rounded-lg text-[0.95rem] font-sans text-brand-text bg-[#fafbff] transition-all duration-200 focus:outline-none focus:border-primary focus:shadow-[0_0_0_4px_rgba(79,70,229,0.12)] hover:border-[#c7d2fe]';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ColaboradorPayload>();

  const onSubmit: SubmitHandler<ColaboradorPayload> = async (data) => {
    const result = await create(data);
    if (result) {
      reset();
      setShowForm(false);
      setSuccessMsg(`✓ Colaborador "${result.nome}" cadastrado com sucesso!`);
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  return (
    <div className="max-w-[1140px] w-full mx-auto my-6 xs:my-8 sm:my-10 lg:my-12 xl:my-14 px-3 xs:px-4 sm:px-6 lg:px-7 xl:px-8">

      {/* Cabeçalho da página */}
      <section className="relative overflow-hidden bg-hero-gradient text-white rounded-[20px]
        px-4 py-8 xs:px-6 xs:py-10 sm:px-8 sm:py-11 md:px-12 md:py-12 lg:px-14 lg:py-14
        mb-7 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-6">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(circle at 10% 50%, rgba(139,92,246,0.28) 0%, transparent 55%), radial-gradient(circle at 90% 20%, rgba(6,182,212,0.18) 0%, transparent 50%)' }}
        />
        <div className="relative z-10">
          <span className="inline-block bg-accent/15 text-accent border border-accent/35 rounded-full px-4 py-1 text-[0.8rem] font-semibold uppercase tracking-[0.06em] mb-3">
            API Java
          </span>
          <h1 className="text-[1.9rem] xs:text-[2.2rem] font-extrabold leading-tight mb-2">
            Colaboradores
          </h1>
          <p className="text-white/70 text-[0.95rem] max-w-[480px]">
            Lista de colaboradores cadastrados no sistema, gerenciada via API Java.
          </p>
        </div>
        <div className="relative z-10 shrink-0">
          <Button
            id="btn-novo-colaborador"
            onClick={() => { setShowForm((s) => !s); setSuccessMsg(''); }}
            variant="outline"
            className="!border-white !text-white hover:!bg-white hover:!text-primary"
          >
            {showForm ? '✕ Cancelar' : '+ Novo Colaborador'}
          </Button>
        </div>
      </section>

      {/* Feedback de sucesso */}
      {successMsg && (
        <div
          aria-live="polite"
          className="mb-5 px-5 py-4 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 font-semibold text-[0.95rem]"
        >
          {successMsg}
        </div>
      )}

      {/* Formulário de cadastro */}
      {showForm && (
        <section className="bg-surface rounded-xl border border-border shadow-sm p-6 xs:p-8 mb-7">
          <h2 className="text-[1.1rem] font-bold text-brand-text mb-5 border-l-4 border-primary pl-3.5">
            Cadastrar Novo Colaborador
          </h2>
          <form
            id="form-colaborador"
            aria-label="Formulário de cadastro de colaborador"
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 xs:grid-cols-2 gap-5"
          >
            {/* Nome */}
            <div className="xs:col-span-2">
              <label htmlFor="col-nome" className="block font-semibold text-[0.9rem] text-brand-text mb-1.5">Nome completo</label>
              <input id="col-nome" type="text" placeholder="Nome do colaborador"
                className={`${inputBase} ${errors.nome ? 'border-red-500' : ''}`}
                {...register('nome', { required: 'Preencha o nome' })}
              />
              {errors.nome && <p className="text-red-600 text-[0.82rem] mt-1">{errors.nome.message}</p>}
            </div>

            {/* Cargo */}
            <div>
              <label htmlFor="col-cargo" className="block font-semibold text-[0.9rem] text-brand-text mb-1.5">Cargo</label>
              <input id="col-cargo" type="text" placeholder="Ex: Analista de RH"
                className={`${inputBase} ${errors.cargo ? 'border-red-500' : ''}`}
                {...register('cargo', { required: 'Preencha o cargo' })}
              />
              {errors.cargo && <p className="text-red-600 text-[0.82rem] mt-1">{errors.cargo.message}</p>}
            </div>

            {/* Departamento */}
            <div>
              <label htmlFor="col-dep" className="block font-semibold text-[0.9rem] text-brand-text mb-1.5">Departamento</label>
              <input id="col-dep" type="text" placeholder="Ex: Tecnologia"
                className={`${inputBase} ${errors.departamento ? 'border-red-500' : ''}`}
                {...register('departamento', { required: 'Preencha o departamento' })}
              />
              {errors.departamento && <p className="text-red-600 text-[0.82rem] mt-1">{errors.departamento.message}</p>}
            </div>

            {/* Email */}
            <div className="xs:col-span-2">
              <label htmlFor="col-email" className="block font-semibold text-[0.9rem] text-brand-text mb-1.5">E-mail</label>
              <input id="col-email" type="email" placeholder="colaborador@empresa.com"
                className={`${inputBase} ${errors.email ? 'border-red-500' : ''}`}
                {...register('email', {
                  required: 'Preencha o e-mail',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Digite um e-mail válido' },
                })}
              />
              {errors.email && <p className="text-red-600 text-[0.82rem] mt-1">{errors.email.message}</p>}
            </div>

            {/* Ações */}
            <div className="xs:col-span-2 flex flex-col xs:flex-row gap-3">
              <Button type="submit" disabled={creating} id="btn-salvar-colaborador">
                {creating ? 'Salvando...' : 'Salvar Colaborador'}
              </Button>
              <Button type="button" variant="outline" onClick={() => { reset(); setShowForm(false); }}>
                Cancelar
              </Button>
            </div>
          </form>
        </section>
      )}

      {/* Lista de colaboradores */}
      <section className="bg-surface rounded-xl border border-border shadow-sm p-6 xs:p-8">
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 mb-6">
          <h2 className="text-[1.2rem] font-bold text-brand-text border-l-4 border-primary pl-3.5">
            Equipe Cadastrada
          </h2>
          <button
            id="btn-atualizar-lista"
            onClick={refetch}
            className="text-primary text-[0.88rem] font-semibold hover:underline self-start xs:self-auto"
            disabled={loading}
          >
            {loading ? 'Carregando...' : '↻ Atualizar'}
          </button>
        </div>

        {/* Estado de erro */}
        {error && !loading && (
          <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-5 py-4 text-[0.9rem] font-medium mb-4">
            ⚠️ {error}
          </div>
        )}

        {/* Skeletons de loading */}
        {loading && (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Cards de colaboradores */}
        {!loading && colaboradores.length === 0 && (
          <p className="text-muted text-center py-12 text-[0.95rem]">Nenhum colaborador cadastrado.</p>
        )}

        {!loading && colaboradores.length > 0 && (
          <div className="grid gap-4 sm:gap-5 lg:gap-5 xl:gap-6
            grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {colaboradores.map((c) => (
              <article
                key={c.id}
                className="group relative bg-surface rounded-xl border border-border p-5 transition-all duration-250 hover:-translate-y-1 hover:shadow-md hover:border-primary/40
                  before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:rounded-t-xl before:bg-gradient-to-r before:from-primary before:to-accent2 before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-250 overflow-hidden"
              >
                {/* Avatar + info */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-base font-black shrink-0 shadow-sm"
                    style={{ background: 'linear-gradient(135deg, #4f46e5, #8b5cf6)' }}
                    aria-hidden="true"
                  >
                    {initials(c.nome)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-brand-text text-[0.95rem] leading-tight truncate">{c.nome}</p>
                    <p className="text-muted text-[0.82rem] truncate">{c.cargo}</p>
                  </div>
                </div>

                {/* Departamento */}
                <span className={`inline-block text-[0.75rem] font-semibold px-2.5 py-0.5 rounded-full border mb-3 ${deptBadge(c.departamento)}`}>
                  {c.departamento}
                </span>

                {/* Email */}
                <a
                  href={`mailto:${c.email}`}
                  className="block text-[0.82rem] text-muted hover:text-primary transition-colors duration-150 truncate mb-4"
                  title={c.email}
                >
                  ✉ {c.email}
                </a>

                {/* Link para rota dinâmica /colaboradores/:id */}
                <Link
                  to={`/colaboradores/${c.id}`}
                  className="mt-auto inline-block w-full text-center text-[0.82rem] font-semibold text-primary border border-primary rounded-lg py-1.5 no-underline transition-all duration-200 hover:bg-primary hover:text-white"
                >
                  Ver perfil completo →
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* Contador */}
        {!loading && colaboradores.length > 0 && (
          <p className="mt-6 text-[0.8rem] text-muted text-right">
            {colaboradores.length} colaborador{colaboradores.length !== 1 ? 'es' : ''} cadastrado{colaboradores.length !== 1 ? 's' : ''}
          </p>
        )}
      </section>

      {/* Nota sobre mock */}
      <p className="mt-4 text-[0.78rem] text-muted text-center">
        ℹ️ Dados carregados via API Java · Fallback para mock quando a API não está disponível
      </p>
    </div>
  );
}
