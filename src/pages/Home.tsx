import tdb1 from '../assets/img/tdb1.jpg';

export function Home() {
  return (
    <div className="container">
      <main>
        <section className="hero">
          <h1>Bem vindos ao Simple Manager</h1>
          <p className="lead">
            O Simple Manager é um sistema de gestão de equipes desenvolvido para otimizar o trabalho de
            departamentos de Recursos Humanos,
            integrando informações, produtividade e comunicação em um único ambiente.
          </p>
          <img 
            src={tdb1} 
            alt="Ilustração de uma equipe de trabalho utilizando o sistema Simple Manager para gestão de equipes e recursos humanos." 
          />
          <div className="section">
            <h2 className="strong">Soluções Integradas</h2>
            <p>Gerencie suas equipes, cadastre colaboradores, acompanhe desempenho, organize escalas e visualize
              relatórios em tempo real.</p>
          </div>
        </section>

        <aside className="sidebar">
          <h2 className="strong">Principais Recursos</h2>
          <p>Controle de presença e produtividade, gestão de cargos e departamentos e emissão de relatórios e gráficos</p>
        </aside>
      </main>

      <section className="section">
        <h2 className="strong">Por que escolher o Simple Manager?</h2>
        <div className="features">
          <div className="feature">
            <strong>Eficiência</strong>
            <div className="muted">Automatize tarefas repetitivas e ganhe tempo no RH.</div>
          </div>
          <div className="feature">
            <strong>Transparência</strong>
            <div className="muted">Visualize indicadores de desempenho com clareza.</div>
          </div>
          <div className="feature">
            <strong>Conectividade</strong>
            <div className="muted">Equipe sempre sincronizada e bem informada.</div>
          </div>
        </div>
      </section>
    </div>
  );
}
