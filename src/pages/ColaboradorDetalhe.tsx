import { useParams, useNavigate, Link } from 'react-router-dom';
import { useColaboradores } from '../hooks';
import { Button } from '../components';

// Gradiente por departamento para o header do perfil
const DEPT_GRADIENT: Record<string, string> = {
  'Tecnologia':       'linear-gradient(135deg, #4f46e5 0%, #8b5cf6 100%)',
  'Recursos Humanos': 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
  'Produto':          'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
  'Operações':        'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
  'Financeiro':       'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
};

function initials(nome: string) {
  return nome.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}

/**
 * Perfil detalhado de um Colaborador — Rota Dinâmica /colaboradores/:id
 * Usa useParams para capturar o :id da URL e useNavigate para navegação programática.
 */
export function ColaboradorDetalhe() {
  // useParams: captura o parâmetro dinâmico :id da rota /colaboradores/:id
  const { id } = useParams<{ id: string }>();
  // useNavigate: navegação programática (voltar, redirecionar)
  const navigate = useNavigate();

  const { colaboradores, loading, error } = useColaboradores();

  // Loading state
  if (loading) {
    return (
      <div className="max-w-[860px] mx-auto my-12 px-4 md:px-7 animate-pulse">
        <div className="h-4 bg-border rounded w-24 mb-6" />
        <div className="bg-surface rounded-[18px] border border-border overflow-hidden">
          <div className="h-40 bg-border" />
          <div className="p-8 space-y-4">
            <div className="h-6 bg-border rounded w-1/2" />
            <div className="h-4 bg-border rounded w-1/3" />
            <div className="h-20 bg-border rounded" />
          </div>
        </div>
      </div>
    );
  }

  // Erro na API
  if (error) {
    return (
      <div className="max-w-[860px] mx-auto my-12 px-4 md:px-7 text-center">
        <p className="text-red-600 text-[0.95rem] mb-4">⚠️ Erro ao carregar dados: {error}</p>
        <Button onClick={() => navigate('/colaboradores')}>Voltar para Colaboradores</Button>
      </div>
    );
  }

  // Busca o colaborador pelo :id
  const colaborador = colaboradores.find((c) => String(c.id) === id);

  // Colaborador não encontrado — feedback personalizado com redirecionamento
  if (!colaborador) {
    return (
      <div className="max-w-[860px] mx-auto my-12 px-4 md:px-7">
        <div className="bg-surface rounded-[18px] border border-border shadow-sm p-10 text-center">
          <div className="text-[4rem] mb-4">🔍</div>
          <h1 className="text-[1.5rem] font-extrabold text-brand-text mb-2">
            Colaborador não encontrado
          </h1>
          <p className="text-muted text-[0.95rem] mb-2">
            Não existe um colaborador com o ID{' '}
            <code className="bg-border px-2 py-0.5 rounded font-mono text-primary text-[0.88rem]">
              {id}
            </code>{' '}
            no sistema.
          </p>
          <p className="text-muted text-[0.88rem] mb-8">
            O colaborador pode ter sido removido ou o link está incorreto.
          </p>
          <div className="flex flex-col xs:flex-row gap-3 justify-center">
            <Button onClick={() => navigate('/colaboradores')} id="btn-voltar-lista-colaboradores">
              Ver todos os colaboradores
            </Button>
            <Button variant="outline" onClick={() => navigate(-1)}>
              ← Voltar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const gradiente = DEPT_GRADIENT[colaborador.departamento] ?? 'linear-gradient(135deg, #4f46e5, #8b5cf6)';

  return (
    <div className="max-w-[860px] w-full mx-auto my-8 md:my-12 px-4 md:px-7">

      {/* Botão voltar */}
      <button
        id="btn-voltar-colaborador"
        onClick={() => navigate('/colaboradores')}
        className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-6 hover:gap-3 transition-all duration-200"
      >
        ← Voltar para Colaboradores
      </button>

      <div className="bg-surface rounded-[18px] border border-border shadow-md overflow-hidden">

        {/* Cabeçalho do perfil — gradiente por departamento */}
        <div
          className="relative px-8 py-12 text-white text-center"
          style={{ background: gradiente }}
        >
          <div className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)' }}
          />
          <div className="relative z-10">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-black mx-auto mb-4 shadow-lg border-4 border-white/20"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
            >
              {initials(colaborador.nome)}
            </div>
            <h1 className="text-[1.8rem] xs:text-[2rem] font-extrabold mb-1">{colaborador.nome}</h1>
            <p className="text-white/70 text-[0.95rem]">{colaborador.cargo}</p>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-7 xs:p-10 grid grid-cols-1 xs:grid-cols-2 gap-8">

          {/* Informações */}
          <div>
            <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-accent mb-4">
              Informações
            </h2>
            <dl className="space-y-4">
              {[
                { label: 'Departamento', value: colaborador.departamento },
                { label: 'Cargo',        value: colaborador.cargo        },
                { label: 'ID',           value: `#${colaborador.id}`     },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <dt className="text-[0.75rem] font-semibold text-muted uppercase tracking-wide">{label}</dt>
                  <dd className="text-brand-text font-semibold text-[0.95rem]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Contato */}
          <div>
            <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-accent mb-4">
              Contato
            </h2>
            <a
              href={`mailto:${colaborador.email}`}
              className="flex items-center gap-3 p-4 bg-feature-gradient border border-border rounded-xl text-primary font-semibold text-[0.9rem] no-underline transition-all duration-200 hover:border-primary hover:shadow-sm hover:-translate-y-0.5"
            >
              <span className="text-xl">✉️</span>
              <span className="truncate">{colaborador.email}</span>
            </a>
          </div>
        </div>

        {/* Ações */}
        <div className="border-t border-border px-7 xs:px-10 py-5 flex flex-col xs:flex-row gap-3">
          <Link to="/colaboradores" className="no-underline">
            <Button variant="outline" id="btn-todos-colaboradores">
              ← Todos os colaboradores
            </Button>
          </Link>
          <Link to="/dashboard" className="no-underline">
            <Button variant="ghost" id="btn-ir-dashboard">
              📊 Ver Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
