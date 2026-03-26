import { useState } from 'react';

const faqs = [
  { q: '1. O Simple Manager é gratuito?',      a: 'Oferecemos um plano básico gratuito com recursos limitados. Planos premium incluem relatórios avançados e dashboards personalizados.' },
  { q: '2. Preciso instalar algo?',             a: 'Não. O Simple Manager é 100% online e pode ser acessado de qualquer dispositivo conectado à internet.' },
  { q: '3. É possível exportar relatórios?',   a: 'Sim, o sistema permite exportar relatórios em PDF e CSV, conforme o nível de acesso do usuário.' },
  { q: '4. O sistema é seguro?',               a: 'Sim, todas as informações são criptografadas e armazenadas com segurança em nossos servidores.' },
  { q: '5. Posso usar em dispositivos móveis?', a: 'Sim, o Simple Manager é totalmente responsivo e funciona em smartphones, tablets e desktops.' },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="max-w-[1140px] w-full mx-auto my-12 px-7">
      <section className="bg-surface rounded-lg p-9 mb-6 shadow-sm border border-border">
        <h2 className="text-[1.5rem] font-bold text-brand-text mb-5 border-l-4 border-primary pl-3.5">
          Perguntas Frequentes
        </h2>

        <div className="flex flex-col gap-3.5 mt-2">
          {faqs.map(({ q, a }, i) => (
            <div
              key={i}
              className={`rounded-lg border overflow-hidden transition-all duration-200 ${
                openIndex === i
                  ? 'border-primary shadow-md'
                  : 'border-border hover:border-primary hover:shadow-sm'
              }`}
            >
              <button
                className="w-full flex justify-between items-center px-5 py-4 text-left font-semibold text-[0.95rem] text-brand-text bg-feature-gradient cursor-pointer select-none"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span>{q}</span>
                <span className="text-primary text-2xl font-light ml-4 shrink-0">
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>
              {openIndex === i && (
                <p className="px-5 py-4 text-muted bg-surface border-t border-border leading-[1.7] m-0">
                  {a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
