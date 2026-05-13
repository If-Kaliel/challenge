import tdb1 from '../assets/img/tdb1.jpg';
import { Card } from '../components';

export function Home() {
  return (
    /* Wrapper principal — padding responsivo em todos os 5 breakpoints */
    <div className="max-w-[1140px] w-full mx-auto my-6 xs:my-8 sm:my-10 lg:my-12 xl:my-14 px-3 xs:px-4 sm:px-6 lg:px-7 xl:px-8">

      {/* ===== HERO ===== */}
      {/* padding escala: base → xs → sm → md → lg → xl */}
      <section className="relative overflow-hidden bg-hero-gradient text-white rounded-[20px]
        px-4 py-8
        xs:px-6 xs:py-10
        sm:px-8 sm:py-12
        md:px-12 md:py-14
        lg:px-14 lg:py-16
        xl:px-16 xl:py-20
        mb-6 sm:mb-8 text-center shadow-lg">

        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(circle at 20% 50%, rgba(139,92,246,0.25) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(6,182,212,0.2) 0%, transparent 50%)' }}
        />

        {/* Título — escala progressiva em todos os breakpoints */}
        <h1 className="relative font-extrabold leading-tight mb-4
          text-[1.6rem]
          xs:text-[1.9rem]
          sm:text-[2.2rem]
          md:text-[2.4rem]
          lg:text-[2.6rem]
          xl:text-[3rem]"
          style={{ background: 'linear-gradient(90deg, #fff 30%, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Bem vindos ao Simple Manager
        </h1>

        {/* Subtítulo — tamanho responsivo */}
        <p className="relative text-white/75 max-w-[680px] mx-auto mb-8
          text-[0.9rem] xs:text-[0.95rem] sm:text-[1rem] md:text-[1.05rem] lg:text-[1.1rem]">
          O Simple Manager é um sistema de gestão de equipes desenvolvido para otimizar o trabalho de
          departamentos de Recursos Humanos, integrando informações, produtividade e comunicação em um único ambiente.
        </p>

        {/* Imagem hero */}
        <img
          src={tdb1}
          alt="Ilustração de uma equipe de trabalho utilizando o sistema Simple Manager."
          className="relative w-full rounded-2xl mx-auto block shadow-[0_16px_48px_rgba(0,0,0,0.4)] border border-white/10 transition-transform duration-300 hover:scale-[1.01]
            max-w-full xs:max-w-[560px] sm:max-w-[640px] md:max-w-[700px] lg:max-w-[720px] xl:max-w-[800px]"
        />

        <div className="relative mt-7 bg-white/[0.07] border border-white/[0.12] rounded-lg px-5 xs:px-7 sm:px-9 py-4 xs:py-5 sm:py-6 text-left">
          <h2 className="text-[1rem] sm:text-[1.05rem] lg:text-[1.1rem] font-bold text-accent mb-2">Soluções Integradas</h2>
          <p className="text-white/80 text-[0.88rem] sm:text-[0.95rem]">
            Gerencie suas equipes, cadastre colaboradores, acompanhe desempenho, organize escalas e visualize relatórios em tempo real.
          </p>
        </div>
      </section>

      {/* ===== SIDEBAR / PRINCIPAIS RECURSOS ===== */}
      <aside className="bg-surface rounded-lg p-4 xs:p-5 sm:p-6 lg:p-7 shadow-sm border border-border border-t-4 border-t-accent mb-6">
        <h2 className="text-sm sm:text-base font-bold text-brand-text border-b-2 border-border pb-2.5 mb-3">Principais Recursos</h2>
        <p className="text-muted text-xs sm:text-sm">Controle de presença e produtividade, gestão de cargos e departamentos e emissão de relatórios e gráficos.</p>
      </aside>

      {/* ===== FEATURES — grid responsivo em todos os breakpoints ===== */}
      <section className="bg-surface rounded-lg p-5 xs:p-6 sm:p-7 lg:p-9 xl:p-10 mb-6 shadow-sm border border-border">
        <h2 className="font-bold text-brand-text mb-5 border-l-4 border-primary pl-3.5
          text-[1.2rem] xs:text-[1.3rem] sm:text-[1.4rem] lg:text-[1.5rem] xl:text-[1.6rem]">
          Por que escolher o Simple Manager?
        </h2>

        {/* grid: 1 col → 1 → 2 → 3 → 3 → 3 (com gap crescente) */}
        <div className="grid gap-4 mt-5
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          sm:gap-5 xl:gap-6">
          <Card variant="feature">
            <strong className="block text-[1rem] sm:text-[1.05rem] font-bold text-brand-text mb-2">Eficiência</strong>
            <div className="text-muted text-xs sm:text-sm">Automatize tarefas repetitivas e ganhe tempo no RH.</div>
          </Card>
          <Card variant="feature">
            <strong className="block text-[1rem] sm:text-[1.05rem] font-bold text-brand-text mb-2">Transparência</strong>
            <div className="text-muted text-xs sm:text-sm">Visualize indicadores de desempenho com clareza.</div>
          </Card>
          <Card variant="feature">
            <strong className="block text-[1rem] sm:text-[1.05rem] font-bold text-brand-text mb-2">Conectividade</strong>
            <div className="text-muted text-xs sm:text-sm">Equipe sempre sincronizada e bem informada.</div>
          </Card>
        </div>
      </section>
    </div>
  );
}
