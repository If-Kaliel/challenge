import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import type { NavItem } from '../types';
import { useAuth } from '../context/AuthContext';

const ALL_NAV_LINKS: (NavItem & { roles?: string[] })[] = [
  { to: '/',              label: 'Início',          end: true,  isPublic: true  },
  { to: '/premios',       label: 'Prêmios',         end: false, isPublic: true  },
  { to: '/noticias',      label: 'Notícias',        end: false, isPublic: true  },
  { to: '/faq',           label: 'FAQ',             end: false, isPublic: true  },
  { to: '/contato',       label: 'Contato',         end: false, isPublic: true  },
  // Sistema — visibilidade por papel
  { to: '/dashboard',     label: 'Dashboard',       end: false, isPublic: false },
  { to: '/colaboradores', label: 'Colaboradores',   end: false, isPublic: false, roles: ['admin'] },
  { to: '/dentistas',     label: 'Dentistas',       end: false, isPublic: false, roles: ['admin', 'funcionario'] },
  { to: '/beneficiarios', label: 'Beneficiários',   end: false, isPublic: false, roles: ['admin', 'funcionario', 'dentista'] },
  { to: '/doacoes',       label: 'Doações',         end: false, isPublic: false, roles: ['admin', 'funcionario'] },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const closeMenu = () => setMenuOpen(false);
  const { usuario, logout } = useAuth();

  const PAPEL_LABEL: Record<string, string> = {
    admin:       '👑 Admin',
    funcionario: '💼 Func',
    dentista:    '🦷 Dentista',
  };

  const systemRoutes = ['/dashboard', '/colaboradores', '/beneficiarios', '/dentistas', '/doacoes'];
  const isSystemArea = systemRoutes.some((r) => pathname.startsWith(r));

  const filteredLinks = ALL_NAV_LINKS.filter((link) => {
    // Sempre mostra Início e Prêmios
    if (link.to === '/premios' || link.to === '/') return true;

    if (!isSystemArea) return link.isPublic === true;

    // Área de sistema: só links privados
    if (link.isPublic !== false) return false;

    // Se tem restricão de papel, valida
    if (link.roles && usuario) {
      return link.roles.includes(usuario.papel);
    }
    if (link.roles && !usuario) return false;

    return true;
  });

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    closeMenu();
    navigate('/');
  };

  return (
    <header className="bg-header-gradient sticky top-0 z-50 flex items-center justify-between px-6 sm:px-10 py-3 shadow-sm border-b border-white/10">
      <div className="flex items-center gap-3">
        <span className="font-extrabold text-xl text-accent tracking-tight">SM</span>

        {isSystemArea && (
          <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded font-bold uppercase tracking-widest hidden sm:block">
            Painel Administrativo
          </span>
        )}

        <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-widest bg-slate-800/50 border border-slate-700/50 flex items-center gap-1.5 ml-2">
          {usuario ? (
            <><div className="w-1.5 h-1.5 rounded-full bg-green-400" /> <span className="text-green-400">{PAPEL_LABEL[usuario.papel] ?? usuario.nome}</span></>
          ) : (
            <><div className="w-1.5 h-1.5 rounded-full bg-slate-400" /> <span className="text-slate-400">Offline</span></>
          )}
        </span>
      </div>

      <button
        className="desktop:hidden p-2 text-white border border-white/30 rounded"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menu"
      >
        ☰
      </button>

      <nav className={`${menuOpen ? 'flex flex-col fixed top-16 left-0 right-0 bg-slate-900 p-4' : 'hidden desktop:flex'} gap-2 items-center`}>
        {filteredLinks.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={closeMenu}
            className={({ isActive }) =>
              `text-sm font-medium px-3 py-1 rounded transition-all ${
                isActive ? 'bg-primary text-white shadow-lg' : 'text-white/80 hover:text-white'
              }`
            }
          >
            {label}
          </NavLink>
        ))}

        {!usuario ? (
          <NavLink to="/login" onClick={closeMenu} className="ml-2 bg-accent text-slate-900 px-4 py-1 rounded text-sm font-black hover:scale-105 transition-transform">
            ACESSAR
          </NavLink>
        ) : (
          <button onClick={handleLogout} className="ml-2 text-red-400 text-xs font-bold hover:text-white transition-colors cursor-pointer uppercase">
            Sair do Sistema
          </button>
        )}
      </nav>
    </header>
  );
}