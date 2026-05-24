import { Link } from 'react-router-dom';
import { ProfileCard } from '../components';
import kalielImg from '../assets/img/Kaliel.jpg';
import matheusImg from '../assets/img/MatheuxMaciel.jpg';
import guilhermeImg from '../assets/img/Guilherme.jpg';

export function Equipe() {
  const membros = [
    {
      id: 'kaliel',
      img: kalielImg,
      nome: 'Kaliel Aquino',
      rm: 'RM: 567587',
      github: 'https://github.com/If-Kaliel',
      linkedin: 'https://www.linkedin.com/in/kaliel-aquino-a034332b6',
      bio: 'Desenvolvedor Front-end e idealizador da estrutura de rotas.',
    },
    {
      id: 'matheus',
      img: matheusImg,
      nome: 'Matheus Maciel',
      rm: 'RM: 567753',
      github: 'https://github.com/kakarneiro',
      linkedin: 'https://www.linkedin.com/in/matheus-carneiro-maciel',
      bio: 'Contribuiu com a criação de páginas dinâmicas e componentes.',
    },
    {
      id: 'guilherme',
      img: guilhermeImg,
      nome: 'Guilherme Anitelli',
      rm: 'RM: 566744',
      github: 'https://github.com/GuilhermeAnitelli',
      linkedin: 'https://www.linkedin.com/in/guilherme-anitelli',
      bio: 'Responsável pelo design e estilização da interface UI/UX.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <section className="relative overflow-hidden bg-gradient-to-tr from-white via-cyan-50/40 to-emerald-50/30 pt-16 pb-20 border-b border-slate-100">
        <div className="absolute inset-0 opacity-60 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-200/30 blur-3xl" />
        </div>
        <div className="max-w-[1240px] mx-auto px-6 relative z-10 text-center">
          <span className="inline-block text-blue-600 font-bold uppercase tracking-widest text-xs mb-3">
            Corpo Técnico
          </span>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">Nossa Equipe</h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Conheça os desenvolvedores por trás do Simple Manager — estudantes da FIAP, Turma 1TDSPB.
          </p>
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {membros.map((m) => (
            <ProfileCard key={m.id} {...m} />
          ))}
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-6 pb-16">
        <div className="bg-slate-950 text-white p-12 md:p-16 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-5">
            <h2 className="text-3xl font-black tracking-tight">Pronto para acessar o sistema?</h2>
            <div>
              <Link
                to="/login"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-base transition-all active:scale-95 shadow-lg"
              >
                Entrar agora
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Equipe;
