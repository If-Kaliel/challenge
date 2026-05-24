import { Link } from 'react-router-dom';
import { ProfileCard } from '../components';
import produtividadeImg from '../assets/img/Produtividade.jpg';
import fotoEquipeImg from '../assets/img/foto-equipe.jpg';
import atendimentoImg from '../assets/img/atendimento.jpg';
import fotoCriancasImg from '../assets/img/criancas.jpg';
import kalielImg from '../assets/img/Kaliel.jpg';
import matheusImg from '../assets/img/MatheuxMaciel.jpg';
import guilhermeImg from '../assets/img/Guilherme.jpg';

export function Home() {
  const membros = [
    { id: 'kaliel', img: kalielImg, nome: 'Kaliel Aquino', rm: 'RM: 567587', github: 'https://github.com/If-Kaliel', linkedin: 'https://www.linkedin.com/in/kaliel-aquino-a034332b6', bio: 'Desenvolvedor Front-end e idealizador da estrutura de rotas.' },
    { id: 'matheus', img: matheusImg, nome: 'Matheus Maciel', rm: 'RM: 567753', github: 'https://github.com/kakarneiro', linkedin: 'https://www.linkedin.com/in/matheus-carneiro-maciel', bio: 'Contribuiu com a criação de páginas dinâmicas e componentes.' },
    { id: 'guilherme', img: guilhermeImg, nome: 'Guilherme Anitelli', rm: 'RM: 566744', github: 'https://github.com/GuilhermeAnitelli', linkedin: 'https://www.linkedin.com/in/guilherme-anitelli', bio: 'Responsável pelo design e estilização da interface UI/UX.' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-blue-500 selection:text-white">

      <header className="relative overflow-hidden bg-gradient-to-tr from-white via-cyan-50/40 to-emerald-50/30 pt-12 pb-24 border-b border-slate-100">
        <div className="absolute inset-0 opacity-70 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute top-20 -left-20 w-[500px] h-[500px] rounded-full bg-blue-200/20 blur-3xl" />
        </div>

        <div className="max-w-[1240px] mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 bg-emerald-100/60 border border-emerald-200 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Sua clínica na nuvem v3.0
            </div>

            <h1 className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.05]">
              Plataforma de <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                gestão integrada
              </span> <br />
              odontológica.
            </h1>

            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              Sua dashboard de gestão para todas as necessidades.
            </p>

            <div className="pt-2">
              <Link
                to="/login"
                className="inline-block bg-slate-950 hover:bg-blue-600 text-white font-bold px-10 py-4 rounded-xl text-sm tracking-wide transition-all duration-200 whitespace-nowrap active:scale-95 shadow-lg shadow-slate-950/10"
              >
                Começar agora
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-12 gap-4">
            <div className="col-span-8 rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
              <img src={produtividadeImg} alt="Dashboard Preview" className="w-full h-full object-cover" />
            </div>

            <div className="col-span-4 bg-slate-950 text-white p-5 rounded-3xl flex flex-col items-center shadow-xl">
              <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Produtividade</span>
              <div className="flex flex-col flex-grow justify-center items-center">
                <span className="text-2xl font-black block">94.8%</span>
                <span className="text-xs text-emerald-400 font-bold flex justify-center items-center gap-1 mt-1">
                  <i className="fas fa-arrow-up text-[10px]" /> +2,3% este mês
                </span>
              </div>
            </div>

            <div className="col-span-5 bg-white p-4 rounded-2xl border border-slate-100 shadow-xl flex items-start gap-3">
              <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl shrink-0 text-sm">
                <i className="fas fa-bell" />
              </div>
              <div>
                <strong className="block text-xs font-bold text-slate-800">Simple Manager</strong>
                <p className="text-[11px] text-slate-500 mt-0.5">Escala atualizada sempre.</p>
                <span className="text-[9px] text-slate-400 block mt-1">Agora mesmo</span>
              </div>
            </div>

            <div className="col-span-7 rounded-2xl overflow-hidden border border-slate-100 shadow-lg h-32">
              <img src={atendimentoImg} alt="Atendimento clínico" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-[1240px] mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs block">Nosso Propósito</span>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                Mais do que organizar processos, geramos impacto social.
              </h2>
              <p className="text-slate-600 leading-relaxed">
                O Simple Manager elimina o gargalo burocrático e integra a gestão clínica e social, junto da conexão humanizada no atendimento.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { title: 'Foco em resultados técnicos', desc: 'Funcionalidades desenhadas para mitigar a perda de tempo na gestão.' },
                { title: 'Segurança Máxima', desc: 'Conformidade rigorosa com a LGPD para proteção de prontuários.' },
                { title: 'Simplicidade operacional', desc: 'Interface limpa e de rápida adoção para toda a equipe médica.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <span className="text-2xl shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent rounded-3xl transform translate-x-3 translate-y-3 pointer-events-none" />
              <img
                src={fotoCriancasImg}
                alt="Ação preventiva com crianças"
                className="rounded-3xl shadow-xl w-full object-cover aspect-[4/3] relative z-10 border border-slate-100"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl z-20 border border-slate-100 hidden sm:block max-w-xs">
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  <strong className="text-slate-900 font-bold block mb-1">Ações Preventivas Coletivas</strong>
                  Apoiamos clínicas a organizarem mutirões de triagem e orientação de higiene bucal infantil.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 border-y border-slate-100">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="mb-12">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs block mb-1">Recursos Básicos</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Arquitetura de Gestão Modular</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Gestão de Colaboradores', text: 'Mapeamento completo de escalas, controle de cargos e históricos funcionais unificados.' },
              { label: 'Monitor de Produtividade', text: 'Métricas de rendimento operacional estruturadas para tomadas de decisões céleres.' },
              { label: 'Calendário de Afastamentos', text: 'Gerenciamento integrado de férias, licenças médicas e substituições sem gargalos.' },
              { label: 'Exportador de Relatórios', text: 'Geração estruturada de dados consolidados em formato PDF e CSV para auditorias.' },
            ].map((mod) => (
              <div key={mod.label} className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-3xl block mb-4" />
                  <h3 className="font-bold text-slate-900 mb-2 text-base">{mod.label}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{mod.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-6 py-20">
        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative h-72 md:h-96 border border-slate-200">
          <img src={fotoEquipeImg} alt="Corpo docente e discente" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex items-end p-8 md:p-12">
            <div className="text-white max-w-xl">
              <h3 className="text-2xl md:text-3xl font-black tracking-tight">Construído em cooperação técnica</h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Nosso ecossistema une a experiência prática de cirurgiões-dentistas às melhores práticas de governança tecnológica.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-6 pb-24">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs block mb-1">Corpo Técnico</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Criadores do Projeto</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {membros.map((m) => (
            <ProfileCard key={m.id} {...m} />
          ))}
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-6 pb-16">
        <div className="bg-slate-950 text-white p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Pronto para começar sua gestão operacional?
            </h2>
            <div className="pt-4">
              <Link
                to="/login"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-base shadow-lg transition-transform active:scale-95"
              >
                Acessar Área do Colaborador
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}