import { Card } from '../components';


export function Solucao() {
  return (
    <div className="max-w-[1140px] w-full mx-auto my-8 md:my-12 px-4 md:px-7">
      <section className="bg-surface rounded-lg p-9 mb-6 shadow-sm border border-border">
        <h2 className="text-[1.5rem] font-bold text-brand-text mb-5 border-l-4 border-primary pl-3.5">
          Nossa Solução
        </h2>
        <p className="text-[1.05rem] text-muted leading-relaxed mb-8">
          O Simple Manager é a resposta para os desafios complexos enfrentados por departamentos de Recursos Humanos modernos.
          Nosso projeto foi desenvolvido do zero para garantir escalabilidade, segurança e foco no usuário.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          <Card variant="feature">
            <strong className="block text-[1.05rem] font-bold text-brand-text mb-2">Arquitetura Moderna</strong>
            <div className="text-muted text-sm">
              Construído em formato Single Page Application (SPA) para garantir uma navegação fluida e sem interrupções por recarregamento.
            </div>
          </Card>
          <Card variant="feature">
            <strong className="block text-[1.05rem] font-bold text-brand-text mb-2">Integração Eficiente</strong>
            <div className="text-muted text-sm">
              Componentização total dos elementos-chave da aplicação, proporcionando reaproveitamento de código e manutenção facilitada.
            </div>
          </Card>
          <Card variant="feature">
            <strong className="block text-[1.05rem] font-bold text-brand-text mb-2">Interface Intuitiva</strong>
            <div className="text-muted text-sm">
              Design System focado para a melhor experiência dos colaboradores no dia a dia, desde acessos de entrada até gerenciamento de dados críticos.
            </div>
          </Card>
        </div>

        <div>
          <h3 className="text-[1.1rem] font-bold text-brand-text mb-4">O Desafio e Nossa Resposta</h3>
          <p className="leading-[1.8] mb-4 text-muted">
            Muitas empresas carecem de um controle consolidado que una desde a gestão de presença de colaboradores até a
            mensuração individual de performance de equipes. Vários sistemas são comprados separadamente e não "conversam" entre si.
          </p>
          <p className="leading-[1.8] text-muted">
            Nossa solução no <strong className="text-brand-text">Simple Manager</strong> aborda isso aplicando de fato um gerenciamento modular:
            um banco de dados unificado, uma interface de alta responsividade e total disponibilidade para extração de relatórios
            essenciais que alavancam a tomada de decisão gerencial.
          </p>
        </div>
      </section>
    </div>
  );
}
