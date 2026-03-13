import kalielImg from '../assets/img/Kaliel.jpg';
import matheusImg from '../assets/img/Matheus Maciel.jpg';
import guilhermeImg from '../assets/img/Guilherme.jpg';

export function Equipe() {
  return (
    <div className="container">
      <main>
        <section className="section">
          <h2>Criadores do Projeto</h2>
          <div className="time">
            <div className="membro">
              <img src={kalielImg} alt="Integrante 1" />
              <h3>Kaliel Conceição de Aquino</h3>
              <div className="muted">RM: 567587 • Turma: 1TDSPB</div>
              <div style={{ marginTop: '8px' }}>
                <a href="https://github.com/If-Kaliel" target="_blank" rel="noopener noreferrer" aria-label="GitHub Kaliel">GitHub</a> • 
                <a href="https://www.linkedin.com/in/kaliel-aquino-a034332b6" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Kaliel"> LinkedIn</a>
              </div>
              <div className="bio">
                <h3>Biografia</h3>
                <p>Estudante de ADS</p>
              </div>
            </div>
            <div className="membro">
              <img src={matheusImg} alt="Integrante 2" />
              <h3>Matheus Carneiro Maciel</h3>
              <div className="muted">RM: 567753 • Turma: 1TDSPB</div>
              <div style={{ marginTop: '8px' }}>
                <a href="https://github.com/kakarneiro" target="_blank" rel="noopener noreferrer" aria-label="GitHub Matheus">GitHub</a> • 
                <a href="https://www.linkedin.com/in/matheus-carneiro-maciel" target="_blank" rel="noopener noreferrer" aria-label="Linkedin Matheus"> LinkedIn</a>
              </div>
              <div className="bio">
                <h3>Biografia</h3>
                <p>Estudante de ADS</p>
              </div>
            </div>
            <div className="membro">
              <img src={guilhermeImg} alt="Integrante 3" />
              <h3>Guilherme Anitelli</h3>
              <div className="muted">RM: 566744 • Turma: 1TDSPB</div>
              <div style={{ marginTop: '8px' }}>
                <a href="https://github.com/GuilhermeAnitelli" target="_blank" rel="noopener noreferrer" aria-label="GitHub Guilherme">GitHub</a> • 
                <a href="https://www.linkedin.com/in/guilherme-anitelli" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Guilherme"> LinkedIn</a>
              </div>
              <div className="bio">
                <h3>Biografia</h3>
                <p>Estudante de ADS</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
