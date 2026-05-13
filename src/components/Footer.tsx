import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/',              label: 'Início'        },
  { to: '/equipe',        label: 'Equipe'        },
  { to: '/sobre',         label: 'Sobre'         },
  { to: '/colaboradores', label: 'Colaboradores' },
  { to: '/faq',           label: 'FAQ'           },
  { to: '/contato',       label: 'Contato'       },
  { to: '/solucao',       label: 'Solução'       },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-footer-gradient text-white/70 mt-auto pt-14 px-10">

      {/* Corpo do footer */}
      <div className="max-w-[1140px] mx-auto flex flex-col xs:flex-row flex-wrap gap-8 xs:gap-12 justify-between pb-10 border-b border-white/[0.08]">

        {/* Brand */}
        <div className="flex-[1.2] min-w-[180px]">
          <span className="block font-extrabold text-[1.4rem] text-accent tracking-[-1px] mb-3.5">
            SM
          </span>
          <p className="text-[0.88rem] leading-[1.7] text-white/55">
            Sistema de gestão de equipes moderno,<br />
            desenvolvido para otimizar o RH.
          </p>
        </div>

        {/* Navegação */}
        <nav className="flex-1 min-w-[140px]" aria-label="Links do rodapé">
          <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-accent mb-4">
            Navegação
          </h3>
          <ul className="flex flex-col gap-2.5 list-none p-0">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className="text-white/60 no-underline text-[0.9rem] transition-colors duration-200 hover:text-white"
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contato */}
        <div className="flex-1 min-w-[140px]">
          <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-accent mb-4">
            Contato
          </h3>
          <ul className="flex flex-col gap-2.5 list-none p-0">
            <li>
              <a href="https://github.com/If-Kaliel" target="_blank" rel="noopener noreferrer"
                className="text-white/60 no-underline text-[0.9rem] transition-colors duration-200 hover:text-white">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"
                className="text-white/60 no-underline text-[0.9rem] transition-colors duration-200 hover:text-white">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:contato@simplemanager.com"
                className="text-white/60 no-underline text-[0.9rem] transition-colors duration-200 hover:text-white">
                contato@simplemanager.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className="max-w-[1140px] mx-auto flex flex-wrap justify-between items-center gap-2 py-5 text-[0.82rem] text-white/35">
        <p>© {currentYear} Simple Manager — Todos os direitos reservados.</p>
        <p className="text-[0.78rem]">Desenvolvido por Kaliel, Matheus e Guilherme • Turma 1TDSPB</p>
      </div>
    </footer>
  );
}
