import { NavLink } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-brand">
          <span className="footer-logo">SM</span>
          <p className="footer-desc">
            Sistema de gestão de equipes moderno,<br />
            desenvolvido para otimizar o RH.
          </p>
        </div>

        <nav className="footer-nav" aria-label="Links do rodapé">
          <h3 className="footer-nav-title">Navegação</h3>
          <ul>
            <li><NavLink to="/">Início</NavLink></li>
            <li><NavLink to="/equipe">Equipe</NavLink></li>
            <li><NavLink to="/sobre">Sobre</NavLink></li>
            <li><NavLink to="/faq">FAQ</NavLink></li>
            <li><NavLink to="/contato">Contato</NavLink></li>
            <li><NavLink to="/solucao">Solução</NavLink></li>
          </ul>
        </nav>

        <div className="footer-contact">
          <h3 className="footer-nav-title">Contato</h3>
          <ul>
            <li>
              <a href="https://github.com/If-Kaliel" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:contato@simplemanager.com">
                contato@simplemanager.com
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {currentYear} Simple Manager — Todos os direitos reservados.</p>
        <p className="footer-credits">Desenvolvido por Kaliel, Matheus e Guilherme • Turma 1TDSPB</p>
      </div>
    </footer>
  );
}
