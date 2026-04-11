import produtividadeImg from '../img/Produtividade.jpg';
import { Card } from '../components';

export function Sobre() {

  return (
    <div className="max-w-[1140px] w-full mx-auto my-8 md:my-12 px-4 md:px-7">

      {/* Hero */}
      <div className="relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-hero-gradient rounded-[20px] px-6 py-10 md:px-12 md:py-14 mb-7 text-white">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(circle at 10% 50%, rgba(139,92,246,0.3) 0%, transparent 50%), radial-gradient(circle at 90% 20%, rgba(6,182,212,0.2) 0%, transparent 50%)' }}
        />
        <div className="flex-1 relative z-10">
          <span className="inline-block bg-accent/15 text-accent border border-accent/35 rounded-full px-4 py-1 text-[0.8rem] font-semibold uppercase tracking-[0.06em] mb-4">
            Sobre nós
          </span>
          <h1 className="text-[2.4rem] font-extrabold leading-tight mb-4">
            Gestão de equipes <br />
            <span style={{ background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              simples e eficiente
            </span>
          </h1>
          <p className="text-white/75 text-[1.05rem] leading-[1.7] max-w-[480px]">
            O Simple Manager nasceu da necessidade de centralizar e simplificar os processos de RH, colocando gestores e colaboradores em sintonia com poucos cliques.
          </p>
        </div>
        <div className="shrink-0 w-full md:w-[340px] relative z-10">
          <img src={produtividadeImg} alt="Interface do Simple Manager"
            loading="eager"
            decoding="async"
            className="w-full rounded-2xl object-cover shadow-[0_20px_60px_rgba(0,0,0,0.45)] border border-white/10 transition-transform duration-300 hover:scale-[1.02]"
          />
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
        {[
          { number: '+500', label: 'Empresas atendidas' },
          { number: '98%',  label: 'Satisfação dos clientes' },
          { number: '24/7', label: 'Suporte disponível' },
          { number: '100%', label: 'Online e seguro' },
        ].map(({ number, label }) => (
          <Card key={label} variant="stat">
            <span className="block text-[2rem] font-extrabold mb-1.5"
              style={{ background: 'linear-gradient(135deg,#4f46e5,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {number}
            </span>
            <span className="block text-[0.82rem] text-muted font-medium uppercase tracking-[0.05em]">{label}</span>
          </Card>
        ))}
      </div>

      {/* Missão */}
      <div className="bg-surface rounded-lg p-9 mb-6 shadow-sm border border-border flex flex-col md:flex-row gap-10 items-start">
        <div className="flex-1">
          <h2 className="text-[1.5rem] font-bold text-brand-text mb-5 border-l-4 border-primary pl-3.5">Nossa Missão</h2>
          <p className="text-muted leading-[1.8] mb-3.5">Transformar a gestão de pessoas em uma experiência intuitiva, acessível e estratégica para empresas de todos os tamanhos.</p>
          <p className="text-muted leading-[1.8]">Acreditamos que boas ferramentas liberam o potencial das equipes — por isso desenvolvemos o Simple Manager com foco em usabilidade, segurança e resultados reais.</p>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          {[
            { icon: '🎯', title: 'Foco em resultados',         desc: 'Cada funcionalidade foi pensada para gerar impacto direto na produtividade.' },
            { icon: '🔒', title: 'Segurança em primeiro lugar', desc: 'Dados criptografados e armazenados com os mais altos padrões de proteção.' },
            { icon: '⚡', title: 'Simplicidade e agilidade',   desc: 'Interface intuitiva para que qualquer pessoa possa usar sem treinamento.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex gap-3.5 items-start p-4 bg-feature-gradient rounded-xl border border-border transition-transform duration-200 hover:translate-x-1 hover:shadow-sm">
              <span className="text-2xl leading-none shrink-0">{icon}</span>
              <div>
                <strong className="block text-[0.95rem] font-bold text-brand-text mb-1">{title}</strong>
                <p className="text-[0.85rem] text-muted leading-snug m-0">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Funções principais */}
      <div className="bg-surface rounded-lg p-9 mb-6 shadow-sm border border-border">
        <h2 className="text-[1.5rem] font-bold text-brand-text mb-5 border-l-4 border-primary pl-3.5">Funções Principais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          {[
            { icon: '👥', title: 'Gestão de Colaboradores',      desc: 'Cadastro completo, histórico de cargos e controle de dados de cada membro da equipe.' },
            { icon: '📊', title: 'Controle de Produtividade',    desc: 'Acompanhe indicadores de desempenho e gere relatórios personalizados em tempo real.' },
            { icon: '🗓️', title: 'Gestão de Férias e Licenças', desc: 'Controle de afastamentos, solicitações e calendário integrado por departamento.' },
            { icon: '📈', title: 'Relatórios e Insights',        desc: 'Visualizações gráficas e exportação em PDF e CSV para tomada de decisão estratégica.' },
          ].map(({ icon, title, desc }) => (
            <Card key={title} variant="function">
              <div className="text-2xl mb-3">{icon}</div>
              <strong className="block text-base font-bold text-brand-text mb-2">{title}</strong>
              <p className="text-[0.88rem] text-muted leading-relaxed m-0">{desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
