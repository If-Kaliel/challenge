import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { SectionHeader } from '../components';

/**
 * Página 404 — Not Found
 * Exibida para qualquer rota não reconhecida (catch-all *).
 * Usa useNavigate para redirecionamento automático com countdown.
 */
export function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(5);

  // Countdown regressivo — redireciona para / ao chegar em 0
  useEffect(() => {
    if (countdown <= 0) {
      navigate('/', { replace: true });
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-130 mx-auto">

        {/* Código de erro animado */}
        <div
          className="text-[7rem] xs:text-[9rem] font-extrabold leading-none mb-4 select-none bg-text-gradient-indigo bg-clip-text text-transparent"
          aria-label="Erro 404"
        >
          404
        </div>

        {/* Título */}
        <h1 className="text-[1.6rem] xs:text-[2rem] font-extrabold text-brand-text mb-3">
          Página não encontrada
        </h1>

        {/* Rota que causou o erro */}
        <p className="text-muted text-[0.95rem] mb-2">
          A rota{' '}
          <code className="bg-border text-primary px-2 py-0.5 rounded font-mono text-[0.88rem]">
            {location.pathname}
          </code>{' '}
          não existe nesta aplicação.
        </p>

        {/* Mensagem de redirecionamento */}
        <p className="text-muted text-[0.9rem] mb-8">
          Você será redirecionado para a página inicial em{' '}
          <span className="font-extrabold text-primary text-[1.1rem]">{countdown}</span>{' '}
          segundo{countdown !== 1 ? 's' : ''}...
        </p>

        {/* Barra de progresso do countdown */}
        <div className="w-full h-1.5 bg-border rounded-full overflow-hidden mb-8">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-linear bg-role-dentista`}
            style={{ width: `${(countdown / 5) * 100}%` }}
          />
        </div>

        {/* Ações */}
        <div className="flex flex-col xs:flex-row gap-3 justify-center">
          <Link
            to="/"
            id="btn-voltar-home-404"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg border-2 border-transparent bg-btn-gradient text-white font-bold text-[0.95rem] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-btn"
          >
            🏠 Ir para o Início agora
          </Link>
          <button
            onClick={() => navigate(-1)}
            id="btn-voltar-anterior-404"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg border-2 border-primary text-primary font-bold text-[0.95rem] bg-transparent transition-all duration-200 hover:bg-primary hover:text-white hover:-translate-y-0.5"
          >
            ← Voltar à página anterior
          </button>
        </div>

        {/* Links sugeridos */}
        <div className="mt-10 pt-7 border-t border-border">
          <SectionHeader title="Páginas disponíveis" />
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { to: '/',              label: 'Início'        },
              { to: '/dashboard',     label: 'Dashboard'     },
              { to: '/colaboradores', label: 'Colaboradores' },
              { to: '/equipe',        label: 'Equipe'        },
              { to: '/contato',       label: 'Contato'       },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="px-3 py-1.5 rounded-full border border-border text-primary text-[0.82rem] font-medium no-underline transition-all duration-150 hover:bg-primary hover:text-white hover:border-primary"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
