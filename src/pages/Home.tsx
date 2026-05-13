import tdb1 from '../assets/img/tdb1.jpg';
import { Card } from '../components';


export function Home() {
  return (
    <div className="max-w-[1140px] w-full mx-auto my-8 md:my-12 px-4 md:px-7">

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient text-white rounded-[20px] px-6 py-12 md:px-12 md:py-16 mb-8 text-center shadow-lg">
        {/* Radial gradient overlay */}
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(circle at 20% 50%, rgba(139,92,246,0.25) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(6,182,212,0.2) 0%, transparent 50%)' }}
        />
        <h1 className="relative text-[1.8rem] xs:text-[2rem] md:text-[2.6rem] font-extrabold leading-tight mb-4"
          style={{ background: 'linear-gradient(90deg, #fff 30%, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Bem vindos ao Simple Manager
        </h1>
        <p className="relative text-[0.95rem] xs:text-[1rem] md:text-[1.1rem] text-white/75 max-w-[680px] mx-auto mb-8">
          O Simple Manager é um sistema de gestão de equipes desenvolvido para otimizar o trabalho de
          departamentos de Recursos Humanos, integrando informações, produtividade e comunicação em um único ambiente.
        </p>
        <img
          src={tdb1}
          alt="Ilustração de uma equipe de trabalho utilizando o sistema Simple Manager."
          className="relative w-full max-w-[720px] rounded-2xl mx-auto block shadow-[0_16px_48px_rgba(0,0,0,0.4)] border border-white/10 transition-transform duration-300 hover:scale-[1.01]"
        />
        <div className="relative mt-7 bg-white/[0.07] border border-white/[0.12] rounded-lg px-9 py-6 text-left">
          <h2 className="text-[1.1rem] font-bold text-accent mb-2">Soluções Integradas</h2>
          <p className="text-white/80">
            Gerencie suas equipes, cadastre colaboradores, acompanhe desempenho, organize escalas e visualize relatórios em tempo real.
          </p>
        </div>
      </section>

      {/* Sidebar + Hero grid */}
      <aside className="bg-surface rounded-lg p-6 shadow-sm border border-border border-t-4 border-t-accent mb-6">
        <h2 className="text-base font-bold text-brand-text border-b-2 border-border pb-2.5 mb-3">Principais Recursos</h2>
        <p className="text-muted text-sm">Controle de presença e produtividade, gestão de cargos e departamentos e emissão de relatórios e gráficos.</p>
      </aside>

      {/* Features */}
      <section className="bg-surface rounded-lg p-9 mb-6 shadow-sm border border-border">
        <h2 className="text-[1.5rem] font-bold text-brand-text mb-5 border-l-4 border-primary pl-3.5">
          Por que escolher o Simple Manager?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          <Card variant="feature">
            <strong className="block text-[1.05rem] font-bold text-brand-text mb-2">Eficiência</strong>
            <div className="text-muted text-sm">Automatize tarefas repetitivas e ganhe tempo no RH.</div>
          </Card>
          <Card variant="feature">
            <strong className="block text-[1.05rem] font-bold text-brand-text mb-2">Transparência</strong>
            <div className="text-muted text-sm">Visualize indicadores de desempenho com clareza.</div>
          </Card>
          <Card variant="feature">
            <strong className="block text-[1.05rem] font-bold text-brand-text mb-2">Conectividade</strong>
            <div className="text-muted text-sm">Equipe sempre sincronizada e bem informada.</div>
          </Card>
        </div>
      </section>
    </div>
  );
}
