import produtividadeImg from '../assets/img/Produtividade.jpg';
import { Card } from '../components';

export function Sobre() {
  return (
    <div className="max-w-[1140px] w-full mx-auto my-6 xs:my-8 sm:my-10 lg:my-12 xl:my-14 px-3 xs:px-4 sm:px-6 lg:px-7 xl:px-8">

      {/* ===== HERO ===== */}
      {/* Layout: coluna em mobile → linha em sm+ */}
      <div className="relative overflow-hidden flex flex-col sm:flex-row items-center
        gap-6 sm:gap-8 lg:gap-10 xl:gap-14
        bg-hero-gradient rounded-[20px]
        px-4 py-8 xs:px-6 xs:py-10 sm:px-10 sm:py-12 md:px-12 md:py-14 lg:px-14 lg:py-16
        mb-6 sm:mb-7 text-white">

        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(circle at 10% 50%, rgba(139,92,246,0.3) 0%, transparent 50%), radial-gradient(circle at 90% 20%, rgba(6,182,212,0.2) 0%, transparent 50%)' }}
        />

        <div className="flex-1 relative z-10 text-center sm:text-left">
          <span className="inline-block bg-accent/15 text-accent border border-accent/35 rounded-full px-4 py-1 text-[0.75rem] sm:text-[0.8rem] font-semibold uppercase tracking-[0.06em] mb-3 xs:mb-4">
            Sobre nós
          </span>
          {/* Título — escala em todos os breakpoints */}
          <h1 className="font-extrabold leading-tight mb-3 xs:mb-4
            text-[1.7rem] xs:text-[2rem] sm:text-[2.2rem] lg:text-[2.4rem] xl:text-[2.6rem]">
            Gestão de equipes <br className="hidden sm:block" />
            <span style={{ background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              simples e eficiente
            </span>
          </h1>
          <p className="text-white/75 leading-[1.7] max-w-[480px] mx-auto sm:mx-0
            text-[0.9rem] xs:text-[0.95rem] sm:text-[1rem] lg:text-[1.05rem]">
            O Simple Manager nasceu da necessidade de centralizar e simplificar os processos de RH, colocando gestores e colaboradores em sintonia com poucos cliques.
          </p>
        </div>

        {/* Imagem — escala de largura em cada breakpoint */}
        <div className="shrink-0 relative z-10 w-full xs:w-[90%] sm:w-[300px] md:w-[320px] lg:w-[360px] xl:w-[400px]">
          <img src={produtividadeImg} alt="Interface do Simple Manager"
            className="w-full rounded-2xl object-cover shadow-[0_20px_60px_rgba(0,0,0,0.45)] border border-white/10 transition-transform duration-300 hover:scale-[1.02]"
          />
        </div>
      </div>

      {/* ===== ESTATÍSTICAS — grid 2→2→4→4→4 ===== */}
      <div className="grid gap-3 xs:gap-4 sm:gap-4 lg:gap-5 xl:gap-6 mb-6 sm:mb-7
        grid-cols-2 md:grid-cols-4">
        {[
          { number: '+500', label: 'Empresas atendidas'     },
          { number: '98%',  label: 'Satisfação dos clientes' },
          { number: '24/7', label: 'Suporte disponível'     },
          { number: '100%', label: 'Online e seguro'        },
        ].map(({ number, label }) => (
          <Card key={label} variant="stat">
            <span className="block font-extrabold mb-1.5
              text-[1.6rem] xs:text-[1.8rem] sm:text-[2rem] lg:text-[2.2rem] xl:text-[2.4rem]"
              style={{ background: 'linear-gradient(135deg,#4f46e5,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {number}
            </span>
            <span className="block text-[0.72rem] xs:text-[0.78rem] sm:text-[0.82rem] text-muted font-medium uppercase tracking-[0.05em]">
              {label}
            </span>
          </Card>
        ))}
      </div>

      {/* ===== MISSÃO — lado a lado em lg+ ===== */}
      <div className="bg-surface rounded-lg shadow-sm border border-border mb-6
        p-5 xs:p-6 sm:p-7 lg:p-9 xl:p-10
        flex flex-col lg:flex-row gap-7 lg:gap-10 xl:gap-14 items-start">
        <div className="flex-1">
          <h2 className="font-bold text-brand-text mb-4 border-l-4 border-primary pl-3.5
            text-[1.2rem] sm:text-[1.35rem] lg:text-[1.5rem]">
            Nossa Missão
          </h2>
          <p className="text-muted leading-[1.8] mb-3 text-[0.88rem] sm:text-[0.95rem] lg:text-base">
            Transformar a gestão de pessoas em uma experiência intuitiva, acessível e estratégica para empresas de todos os tamanhos.
          </p>
          <p className="text-muted leading-[1.8] text-[0.88rem] sm:text-[0.95rem] lg:text-base">
            Acreditamos que boas ferramentas liberam o potencial das equipes — por isso desenvolvemos o Simple Manager com foco em usabilidade, segurança e resultados reais.
          </p>
        </div>
        <div className="flex-1 w-full flex flex-col gap-3 xs:gap-4">
          {[
            { icon: '🎯', title: 'Foco em resultados',         desc: 'Cada funcionalidade foi pensada para gerar impacto direto na produtividade.' },
            { icon: '🔒', title: 'Segurança em primeiro lugar', desc: 'Dados criptografados e armazenados com os mais altos padrões de proteção.' },
            { icon: '⚡', title: 'Simplicidade e agilidade',   desc: 'Interface intuitiva para que qualquer pessoa possa usar sem treinamento.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex gap-3 xs:gap-3.5 items-start p-3 xs:p-4 bg-feature-gradient rounded-xl border border-border transition-transform duration-200 hover:translate-x-1 hover:shadow-sm">
              <span className="text-xl xs:text-2xl leading-none shrink-0">{icon}</span>
              <div>
                <strong className="block text-[0.88rem] sm:text-[0.95rem] font-bold text-brand-text mb-1">{title}</strong>
                <p className="text-[0.8rem] sm:text-[0.85rem] text-muted leading-snug m-0">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== FUNÇÕES — grid 1→1→2→2→2 ===== */}
      <div className="bg-surface rounded-lg shadow-sm border border-border p-5 xs:p-6 sm:p-7 lg:p-9 xl:p-10 mb-6">
        <h2 className="font-bold text-brand-text mb-5 border-l-4 border-primary pl-3.5
          text-[1.2rem] sm:text-[1.35rem] lg:text-[1.5rem]">
          Funções Principais
        </h2>
        {/* grid: 1 col mobile → 2 cols sm+ */}
        <div className="grid gap-4 sm:gap-5 xl:gap-6 mt-4
          grid-cols-1 sm:grid-cols-2">
          {[
            { icon: '👥', title: 'Gestão de Colaboradores',      desc: 'Cadastro completo, histórico de cargos e controle de dados de cada membro da equipe.' },
            { icon: '📊', title: 'Controle de Produtividade',    desc: 'Acompanhe indicadores de desempenho e gere relatórios personalizados em tempo real.' },
            { icon: '🗓️', title: 'Gestão de Férias e Licenças', desc: 'Controle de afastamentos, solicitações e calendário integrado por departamento.' },
            { icon: '📈', title: 'Relatórios e Insights',        desc: 'Visualizações gráficas e exportação em PDF e CSV para tomada de decisão estratégica.' },
          ].map(({ icon, title, desc }) => (
            <Card key={title} variant="function">
              <div className="text-xl xs:text-2xl mb-3">{icon}</div>
              <strong className="block text-sm sm:text-base font-bold text-brand-text mb-2">{title}</strong>
              <p className="text-[0.82rem] sm:text-[0.88rem] text-muted leading-relaxed m-0">{desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
