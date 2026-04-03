import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logoTexto from '../assets/img/logo_nome.png';

const navLinks = [
  { to: '/',        label: 'Início',  end: true  },
  { to: '/equipe',  label: 'Equipe',  end: false },
  { to: '/sobre',   label: 'Sobre',   end: false },
  { to: '/faq',     label: 'FAQ',     end: false },
  { to: '/contato', label: 'Contato', end: false },
  { to: '/solucao', label: 'Solução', end: false },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-header-gradient sticky top-0 z-[100] flex items-center justify-between px-6 md:px-10 py-3.5 shadow-[0_4px_24px_rgba(79,70,229,0.25)] border-b border-white/[0.06] min-h-[60px]">

      {/* Brand / Logo */}
      <img
        src={logoTexto}
        alt="Simple Manager"
        className="h-9 w-auto shrink-0 select-none"
      />

      {/* Hamburger — visível abaixo de 992px (desktop) */}
      <button
        className="flex desktop:hidden items-center justify-center w-10 h-10 rounded-lg bg-transparent border-2 border-white/30 text-white text-lg cursor-pointer transition-all duration-200 hover:bg-white/10 hover:border-accent hover:text-accent"
        aria-label="Abrir menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Navegação */}
      <nav
        role="navigation"
        aria-label="Menu principal"
        className={
          menuOpen
            ? 'flex flex-col fixed top-[60px] left-0 right-0 bg-gradient-to-b from-[#0f0f1a] to-[#1e1b4b] px-2.5 py-3 gap-1 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-b border-white/[0.06] z-[99]'
            : 'hidden desktop:flex gap-1 items-center'
        }
      >
        {navLinks.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={closeMenu}
            className={({ isActive }) =>
              [
                'text-[0.9rem] font-medium px-4 py-[7px] rounded-lg transition-all duration-200 no-underline',
                'desktop:inline block w-full desktop:w-auto text-left',
                isActive
                  ? 'bg-primary text-white shadow-[0_2px_12px_rgba(79,70,229,0.4)]'
                  : 'text-white/75 hover:bg-white/10 hover:text-white',
              ].join(' ')
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
