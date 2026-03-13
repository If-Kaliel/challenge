import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header>
      <button 
        className="hamburger" 
        aria-label="Abrir menu" 
        aria-expanded={menuOpen}
        onClick={toggleMenu}
      >
        ☰
      </button>
      <nav 
        role="navigation" 
        aria-label="Menu principal" 
        className={menuOpen ? 'open' : ''}
      >
        <NavLink to="/" onClick={closeMenu} end>Início</NavLink>
        <NavLink to="/equipe" onClick={closeMenu}>Equipe</NavLink>
        <NavLink to="/sobre" onClick={closeMenu}>Sobre</NavLink>
        <NavLink to="/faq" onClick={closeMenu}>FAQ</NavLink>
        <NavLink to="/contato" onClick={closeMenu}>Contato</NavLink>
      </nav>
    </header>
  );
}
