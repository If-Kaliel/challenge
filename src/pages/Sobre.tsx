import produtividadeImg from '../assets/img/Produtividade.jpg';
import { Card } from '../components/Card';

export function Sobre() {
  return (
    <div className="container">
      <div role="main" className="about-main">

        {/* Hero da página Sobre */}
        <div className="about-hero">
          <div className="about-hero-content">
            <span className="about-badge">Sobre nós</span>
            <h1>Gestão de equipes <br /><span className="highlight">simples e eficiente</span></h1>
            <p>O Simple Manager nasceu da necessidade de centralizar e simplificar os processos de RH, colocando gestores e colaboradores em sintonia com poucos cliques.</p>
          </div>
          <div className="about-hero-image">
            <img src={produtividadeImg} alt="Interface do Simple Manager" />
          </div>
        </div>

        {/* Estatísticas */}
        <div className="about-stats">
          <Card variant="stat">
            <span className="stat-number">+500</span>
            <span className="stat-label">Empresas atendidas</span>
          </Card>
          <Card variant="stat">
            <span className="stat-number">98%</span>
            <span className="stat-label">Satisfação dos clientes</span>
          </Card>
          <Card variant="stat">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Suporte disponível</span>
          </Card>
          <Card variant="stat">
            <span className="stat-number">100%</span>
            <span className="stat-label">Online e seguro</span>
          </Card>
        </div>

        {/* Missão e valores */}
        <div className="section about-mission">
          <div className="mission-text">
            <h2>Nossa Missão</h2>
            <p>Transformar a gestão de pessoas em uma experiência intuitiva, acessível e estratégica para empresas de todos os tamanhos.</p>
            <p>Acreditamos que boas ferramentas liberam o potencial das equipes — por isso desenvolvemos o Simple Manager com foco em usabilidade, segurança e resultados reais.</p>
          </div>
          <div className="mission-values">
            <div className="value-item">
              <span className="value-icon">🎯</span>
              <div>
                <strong>Foco em resultados</strong>
                <p>Cada funcionalidade foi pensada para gerar impacto direto na produtividade.</p>
              </div>
            </div>
            <div className="value-item">
              <span className="value-icon">🔒</span>
              <div>
                <strong>Segurança em primeiro lugar</strong>
                <p>Dados criptografados e armazenados com os mais altos padrões de proteção.</p>
              </div>
            </div>
            <div className="value-item">
              <span className="value-icon">⚡</span>
              <div>
                <strong>Simplicidade e agilidade</strong>
                <p>Interface intuitiva para que qualquer pessoa possa usar sem treinamento.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Funções principais */}
        <div className="section">
          <h2>Funções Principais</h2>
          <div className="about-functions">
            <Card variant="function">
              <div className="function-icon">👥</div>
              <strong>Gestão de Colaboradores</strong>
              <p>Cadastro completo, histórico de cargos e controle de dados de cada membro da equipe.</p>
            </Card>
            <Card variant="function">
              <div className="function-icon">📊</div>
              <strong>Controle de Produtividade</strong>
              <p>Acompanhe indicadores de desempenho e gere relatórios personalizados em tempo real.</p>
            </Card>
            <Card variant="function">
              <div className="function-icon">🗓️</div>
              <strong>Gestão de Férias e Licenças</strong>
              <p>Controle de afastamentos, solicitações e calendário integrado por departamento.</p>
            </Card>
            <Card variant="function">
              <div className="function-icon">📈</div>
              <strong>Relatórios e Insights</strong>
              <p>Visualizações gráficas e exportação em PDF e CSV para tomada de decisão estratégica.</p>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}
