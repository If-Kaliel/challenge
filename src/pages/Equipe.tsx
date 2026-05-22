import { Link } from 'react-router-dom';
import kalielImg from '../assets/img/Kaliel.jpg';
import matheusImg from '../assets/img/MatheuxMaciel.jpg';
import guilhermeImg from '../assets/img/Guilherme.jpg';

const membros = [
  {
    id: 'kaliel',
    img: kalielImg,
    nome: 'Kaliel Conceição de Aquino',
    rm: 'RM: 567587 • Turma: 1TDSPB',
    github: 'https://github.com/If-Kaliel',
    linkedin: 'https://www.linkedin.com/in/kaliel-aquino-a034332b6',
    githubLabel: 'GitHub Kaliel',
    linkedinLabel: 'LinkedIn Kaliel',
    bio: 'Estudante de ADS — desenvolvedor front-end do projeto.',
  },
  {
    id: 'matheus',
    img: matheusImg,
    nome: 'Matheus Carneiro Maciel',
    rm: 'RM: 567753 • Turma: 1TDSPB',
    github: 'https://github.com/kakarneiro',
    linkedin: 'https://www.linkedin.com/in/matheus-carneiro-maciel',
    githubLabel: 'GitHub Matheus',
    linkedinLabel: 'LinkedIn Matheus',
    bio: 'Estudante de ADS — contribuiu com páginas e componentes.',
  },
  {
    id: 'guilherme',
    img: guilhermeImg,
    nome: 'Guilherme Anitelli',
    rm: 'RM: 566744 • Turma: 1TDSPB',
    github: 'https://github.com/GuilhermeAnitelli',
    linkedin: 'https://www.linkedin.com/in/guilherme-anitelli',
    githubLabel: 'GitHub Guilherme',
    linkedinLabel: 'LinkedIn Guilherme',
    bio: 'Estudante de ADS — design e estilização da interface.',
  },
];

export function Equipe() {
  return (
    <div className="max-w-[1140px] w-full mx-auto my-6 xs:my-8 sm:my-10 lg:my-12 xl:my-14 px-3 xs:px-4 sm:px-6 lg:px-7 xl:px-8">
      <section className="bg-surface rounded-lg shadow-sm border border-border p-5 xs:p-6 sm:p-7 lg:p-9 xl:p-10 mb-6">
        <h1 className="font-bold text-brand-text mb-5 border-l-4 border-primary pl-3.5
          text-[1.2rem] xs:text-[1.35rem] sm:text-[1.4rem] lg:text-[1.5rem] xl:text-[1.6rem]">
          Criadores do Projeto
        </h1>

        {/* grid: 1 col mobile → 2 cols sm → 3 cols lg */}
        <div className="grid gap-5 sm:gap-6 lg:gap-7 xl:gap-8
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {membros.map((m) => (
            <div
              key={m.id}
              className="relative overflow-hidden bg-surface rounded-[18px] px-4 py-6 xs:px-5 xs:py-7 sm:px-6 sm:py-8 lg:px-7 lg:py-9 text-center shadow-md border border-border transition-transform duration-300 hover:-translate-y-2.5 hover:shadow-lg
                before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-[5px] before:bg-gradient-to-r before:from-primary before:via-accent2 before:to-accent"
            >
              <img
                src={m.img}
                alt={m.nome}
                className="w-[90px] h-[90px] xs:w-[100px] xs:h-[100px] sm:w-[110px] sm:h-[110px] rounded-full object-cover mx-auto mb-4 shadow-[0_4px_16px_rgba(79,70,229,0.2)]"
                style={{ border: '4px solid transparent', background: 'linear-gradient(#fff,#fff) padding-box, linear-gradient(135deg,#4f46e5,#06b6d4) border-box' }}
              />
              <h3 className="text-base font-bold text-brand-text mb-1">{m.nome}</h3>
              <div className="text-muted text-sm mb-2">RM: {m.rm} • Turma: {m.turma}</div>

              {/* Links externos */}
              <div className="flex justify-center gap-2 mt-2">
                <a href={m.github} target="_blank" rel="noopener noreferrer" aria-label={m.githubLabel}
                  className="text-primary font-semibold text-[0.88rem] px-2.5 py-1 rounded-md transition-all duration-200 hover:bg-primary hover:text-white no-underline">
                  GitHub
                </a>
                <span className="text-muted">•</span>
                <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={m.linkedinLabel}
                  className="text-primary font-semibold text-[0.88rem] px-2.5 py-1 rounded-md transition-all duration-200 hover:bg-primary hover:text-white no-underline">
                  LinkedIn
                </a>
              </div>

              <div className="mt-5 pt-4 border-t border-border text-left">
                <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.08em] text-accent mb-2">Biografia</h3>
                <p className="text-[0.88rem] text-muted leading-relaxed">{m.bio}</p>
              </div>

              {/* Link para rota dinâmica /equipe/:id — usa useParams na MembroDetalhe */}
              <Link
                to={`/equipe/${m.id}`}
                className="mt-4 inline-block w-full text-center text-[0.82rem] font-semibold text-primary border border-primary rounded-lg py-1.5 no-underline transition-all duration-200 hover:bg-primary hover:text-white"
              >
                Ver perfil completo →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
