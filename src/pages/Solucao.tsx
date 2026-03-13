export function Solucao() {
  return (
    <div className="container">
      <main>
        <section className="section">
          <h2>Nossa Solução</h2>
          <p className="lead" style={{ marginBottom: '32px' }}>
             O Simple Manager é a resposta para os desafios complexos enfrentados por departamentos de Recursos Humanos modernos. Nosso projeto foi desenvolvido do zero para garantir escalabilidade, segurança e foco no usuário.
          </p>

          <div className="features">
            <div className="feature">
              <strong>Arquitetura Moderna</strong>
              <div className="muted">
                Construído em formato Single Page Application (SPA) para garantir uma navegação fluida e sem interrupções por recarregamento.
              </div>
            </div>
            
            <div className="feature">
              <strong>Integração Eficiente</strong>
              <div className="muted">
                Componentização total dos elementos-chave da aplicação, proporcionando reaproveitamento de código e manutenção facilitada.
              </div>
            </div>

            <div className="feature">
              <strong>Interface Intuitiva</strong>
              <div className="muted">
                Design System focado e planejado para a melhor experiência dos colaboradores no dia a dia, desde acessos de entrada até gerenciamento de dados críticos.
              </div>
            </div>
          </div>

          <div style={{ marginTop: '48px' }}>
            <h3 className="strong" style={{ marginBottom: '16px' }}>O Desafio e Nossa Resposta</h3>
            <p style={{ marginBottom: '16px', lineHeight: '1.8' }}>
              Muitas empresas carecem de um controle consolidado que una desde a gestão de presença de colaboradores até a mensuração individual de performance de equipes. Vários sistemas são comprados separadamente e não "conversam" entre si.
            </p>
            <p style={{ lineHeight: '1.8' }}>
              Nossa solução no <strong>Simple Manager</strong> aborda isso aplicando de fato um gerenciamento modular: um banco de dados unificado, uma interface de alta responsividade e total disponibilidade para extração de relatórios essenciais que alavancam a tomada de decisão gerencial.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
