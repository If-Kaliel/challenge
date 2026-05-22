import { Link } from 'react-router-dom';
import fotoCriancasImg from '../assets/img/criancas.jpg';

export function Sobre() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <section className="relative overflow-hidden bg-gradient-to-tr from-white via-blue-50/30 to-cyan-50/20 pt-16 pb-20 border-b border-slate-100">
        <div className="absolute inset-0 opacity-60 pointer-events-none">
          <div className="absolute -top-40 -left-20 w-[500px] h-[500px] rounded-full bg-cyan-200/30 blur-3xl" />
        </div>
        <div className="max-w-[1240px] mx-auto px-6 relative z-10 text-center">
          <span className="inline-block text-blue-600 font-bold uppercase tracking-widest text-xs mb-3">
            Sobre o projeto
          </span>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">Simple Manager</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Uma plataforma de gestão odontológica integrada, desenvolvida por estudantes da FIAP como projeto acadêmico de fim de semestre.
          </p>
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs block">Nossa Missão</span>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              Mais do que organizar processos, geramos impacto social.
            </h2>
            <p className="text-slate-600 leading-relaxed">
              O Simple Manager elimina o gargalo burocrático e integra a gestão clínica e social, junto da conexão humanizada no atendimento.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Desenvolvido com React, TypeScript e conectado a uma API Java com banco Oracle, o sistema gerencia colaboradores, dentistas, beneficiários e doações com controle granular de permissões por papel.
            </p>

            <div className="grid grid-cols-1 gap-4 pt-2">
              {[
                { title: 'Foco em resultados técnicos', desc: 'Funcionalidades desenhadas para mitigar a perda de tempo na gestão.' },
                { title: 'Segurança e conformidade LGPD', desc: 'Controle de acesso granular por papel: Admin, Funcionário e Dentista.' },
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
      </section>

      <section className="bg-slate-50 py-16 border-y border-slate-100">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="mb-10">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs block mb-1">Stack Técnica</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Tecnologias utilizadas</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'React 19', desc: 'Interface moderna com hooks' },
              { label: 'TypeScript', desc: 'Tipagem estática e segura' },
              { label: 'Vite 8', desc: 'Build ultrarrápido' },
              { label: 'Java + Oracle', desc: 'API backend robusta' },
            ].map((tech) => (
              <div key={tech.label} className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm text-center">
                <span className="text-3xl block mb-3" />
                <h3 className="font-bold text-slate-900 text-sm mb-1">{tech.label}</h3>
                <p className="text-xs text-slate-500">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-6 py-16">
        <div className="bg-slate-950 text-white p-12 md:p-16 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-5">
            <h2 className="text-3xl font-black tracking-tight">Conheça o sistema</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-base transition-all active:scale-95 shadow-lg">
                Acessar o sistema
              </Link>
              <Link to="/equipe" className="inline-block bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-xl font-bold text-base transition-all border border-white/20">
                Conhecer a equipe
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sobre;
