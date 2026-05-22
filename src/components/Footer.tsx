import { NavLink } from 'react-router-dom';
import type { NavItem } from '../types';

const publicLinks: NavItem[] = [
  { to: '/',        label: 'Início'   },
  { to: '/sobre',   label: 'Sobre'    },
  { to: '/equipe',  label: 'Equipe'   },
  { to: '/noticias', label: 'Notícias' },
  { to: '/premios', label: 'Prêmios'  },
  { to: '/faq',     label: 'FAQ'      },
  { to: '/contato', label: 'Contato'  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-footer-gradient text-white/80 mt-auto pt-4 sm:pt-6 px-4 xs:px-6 sm:px-8 lg:px-10 xl:px-14" aria-label="Rodapé">
      <div className="max-w-285 mx-auto flex flex-col xs:flex-row flex-wrap gap-4 sm:gap-6 justify-between pb-4 border-b border-white/12 items-start">

        <div className="flex-1 min-w-0">
          <span className="block font-extrabold text-lg text-accent tracking-tight mb-2">SM</span>
          <p className="text-sm leading-5 text-white/75">
            Plataforma de gestão odontológica integrada,<br />
            desenvolvida por estudantes da FIAP.
          </p>
        </div>

        <nav className="flex-1 min-w-0" aria-label="Links do rodapé">
          <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Navegação</h3>
          <ul className="grid grid-cols-2 gap-2 list-none p-0">
            {publicLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className="text-white/80 no-underline text-sm transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark rounded-sm"
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Contato</h3>
          <ul className="flex flex-col gap-2 list-none p-0">
            <li>
              <a
                href="https://github.com/If-Kaliel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 no-underline text-sm transition-colors duration-200 hover:text-white"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 no-underline text-sm transition-colors duration-200 hover:text-white"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="mailto:contato@simplemanager.com"
                className="text-white/80 no-underline text-sm transition-colors duration-200 hover:text-white"
              >
                contato@simplemanager.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-285 mx-auto flex flex-wrap justify-between items-center gap-2 py-3 text-sm text-white/60">
        <p>© {currentYear} Simple Manager — Todos os direitos reservados.</p>
        <p className="text-xs">Desenvolvido por Kaliel, Matheus e Guilherme • Turma 1TDSPB</p>
      </div>
    </footer>
  );
}
