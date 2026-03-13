export function FAQ() {
  return (
    <div className="container">
      <main>
        <section className="section">
          <h2>Perguntas Frequentes</h2>

          <details className="faq-item">
            <summary>1. O Simple Manager é gratuito?</summary>
            <p>Oferecemos um plano básico gratuito com recursos limitados. Planos premium incluem relatórios avançados e dashboards personalizados.</p>
          </details>

          <details className="faq-item">
            <summary>2. Preciso instalar algo?</summary>
            <p>Não. O Simple Manager é 100% online e pode ser acessado de qualquer dispositivo conectado à internet.</p>
          </details>

          <details className="faq-item">
            <summary>3. É possível exportar relatórios?</summary>
            <p>Sim, o sistema permite exportar relatórios em PDF e CSV, conforme o nível de acesso do usuário.</p>
          </details>

          <details className="faq-item">
            <summary>4. O sistema é seguro?</summary>
            <p>Sim, todas as informações são criptografadas e armazenadas com segurança em nossos servidores.</p>
          </details>

          <details className="faq-item">
            <summary>5. Posso usar em dispositivos móveis?</summary>
            <p>Sim, o Simple Manager é totalmente responsivo e funciona em smartphones, tablets e desktops.</p>
          </details>
        </section>
      </main>
    </div>
  );
}
