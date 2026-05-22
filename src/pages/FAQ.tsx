import { useState } from 'react';
import { Link } from 'react-router-dom';

const faqCategories = [
  {
    title: 'Visão Geral & Acessos',
    items: [
      { q: 'O Simple Manager é gratuito?', a: 'Oferecemos um plano básico gratuito focado em clínicas em estágio inicial. Para clínicas com maior volume, nossos planos premium desbloqueiam relatórios avançados, gestão de múltiplas agendas e dashboards personalizados.' },
      { q: 'Preciso instalar algum software no computador da clínica?', a: 'Zero instalações. O Simple Manager é 100% cloud-based (baseado na nuvem). Você acessa pelo navegador de qualquer dispositivo, como se estivesse acessando seu e-mail.' },
      { q: 'Consigo acessar do meu celular ou tablet?', a: 'Com certeza. Toda a interface foi desenhada de forma responsiva. Você pode conferir escalas, métricas e aprovar solicitações de qualquer lugar, direto do smartphone.' },
      { q: 'O sistema permite gerenciar mais de uma filial?', a: 'Sim! Nosso plano Corporativo oferece suporte multi-clínicas. Você pode alternar entre as unidades usando um único login, consolidando as métricas de produtividade de todas elas.' },
    ]
  },
  {
    title: 'Segurança & Privacidade',
    items: [
      { q: 'Meus dados e de meus pacientes estão seguros?', a: 'Sim. Utilizamos criptografia de ponta a ponta e armazenamos seus dados em servidores de alta segurança (AWS). Ninguém da nossa equipe tem acesso aos prontuários ou dados sensíveis da sua clínica.' },
      { q: 'O sistema está adequado à LGPD?', a: 'Totalmente. O Simple Manager foi construído sob o conceito de "Privacy by Design". Oferecemos logs de auditoria e controle rigoroso de consentimento para garantir que sua clínica esteja 100% dentro da lei.' },
      { q: 'Com que frequência são feitos os backups?', a: 'Realizamos backups automáticos a cada 12 horas em servidores distribuídos geograficamente. Se acontecer algum imprevisto, seus dados estarão sãos e salvos.' },
    ]
  },
  {
    title: 'Gestão & Equipe',
    items: [
      { q: 'É possível configurar diferentes níveis de acesso?', a: 'Sim. Você pode definir perfis específicos: o Administrador vê as finanças e relatórios, o Dentista acessa apenas as agendas e prontuários, e a Recepcionista foca no atendimento e triagem.' },
      { q: 'Consigo exportar os relatórios de produtividade?', a: 'Sim! A qualquer momento você pode exportar planilhas em formato CSV (para Excel) ou relatórios consolidados em PDF para apresentar em reuniões de auditoria.' },
      { q: 'Como funciona o suporte caso a equipe tenha dúvidas?', a: 'Oferecemos suporte humano via chat em tempo real dentro da plataforma, além de uma central de ajuda completa com tutoriais em vídeo para treinar seus novos colaboradores.' },
    ]
  }
];

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-50 antialiased py-12 px-6">
      <div className="max-w-[800px] w-full mx-auto">
        
        {/* Header Centralizado e Consistente */}
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100/50 text-blue-600 border border-blue-200/50 rounded-full px-4 py-1 text-[0.75rem] sm:text-[0.8rem] font-semibold uppercase tracking-[0.06em] mb-4">
            Central de Ajuda
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Perguntas Frequentes
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto">
            Tudo o que você precisa saber sobre o funcionamento, segurança e implementação do Simple Manager na sua clínica.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          {faqCategories.map((category, catIndex) => (
            <section key={category.title} className="animate-fade-in-up">
                <div className="flex items-center gap-3 mb-5 px-2 justify-center md:justify-start">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 text-blue-600 text-xl shadow-sm border border-blue-200/50" />
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  {category.title}
                </h3>
              </div>

              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
                <div className="flex flex-col divide-y divide-slate-100">
                  {category.items.map(({ q, a }, itemIndex) => {
                    const currentId = `${catIndex}-${itemIndex}`;
                    const isOpen = openId === currentId;

                    return (
                      <div key={q} className="group transition-colors">
                        <button
                          className={`w-full flex justify-between items-center px-6 md:px-8 py-5 text-left cursor-pointer transition-colors outline-none focus-visible:bg-slate-50 ${
                            isOpen ? 'bg-slate-50/50' : 'hover:bg-slate-50'
                          }`}
                          onClick={() => toggle(currentId)}
                          aria-expanded={isOpen}
                        >
                          <span className={`font-bold text-[0.95rem] transition-colors pr-6 ${
                            isOpen ? 'text-blue-600' : 'text-slate-800 group-hover:text-blue-600'
                          }`}>
                            {q}
                          </span>
                          <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border ${
                            isOpen 
                              ? 'bg-blue-600 border-blue-600 text-white rotate-180 shadow-md shadow-blue-600/20' 
                              : 'bg-white border-slate-200 text-slate-400 group-hover:border-blue-300 group-hover:text-blue-500'
                          }`}>
                            <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                          </div>
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          <div className="px-6 md:px-8 pb-6 pt-2 text-slate-500 text-sm leading-relaxed border-t border-transparent">
                            {a}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Call to Action Final */}
        <div className="mt-16 p-8 bg-slate-900 rounded-[2.5rem] text-center text-white shadow-xl">
  <h4 className="text-xl font-black mb-2">Ainda tem dúvidas?</h4>
  <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
    Nossa equipe técnica está pronta para analisar a infraestrutura da sua clínica e tirar todas as suas dúvidas.
  </p>
  <Link 
    to="/contato" 
    className="inline-block bg-white text-slate-900 font-bold px-8 py-3.5 rounded-2xl text-sm transition-all hover:bg-blue-600 hover:text-white hover:scale-105 active:scale-95 shadow-lg"
  >
    Falar com Especialista
  </Link>
</div>

      </div>
    </div>
  );
}