import kalielImg from '../assets/img/Kaliel.jpg';
import matheusImg from '../assets/img/Matheus Maciel.jpg';
import guilhermeImg from '../assets/img/Guilherme.jpg';

const membros = [
  {
    img: kalielImg,
    nome: 'Kaliel Conceição de Aquino',
    rm: 'RM: 567587 • Turma: 1TDSPB',
    github: 'https://github.com/If-Kaliel',
    linkedin: 'https://www.linkedin.com/in/kaliel-aquino-a034332b6',
    githubLabel: 'GitHub Kaliel',
    linkedinLabel: 'LinkedIn Kaliel',
    bio: 'Estudante de ADS',
  },
  {
    img: matheusImg,
    nome: 'Matheus Carneiro Maciel',
    rm: 'RM: 567753 • Turma: 1TDSPB',
    github: 'https://github.com/kakarneiro',
    linkedin: 'https://www.linkedin.com/in/matheus-carneiro-maciel',
    githubLabel: 'GitHub Matheus',
    linkedinLabel: 'LinkedIn Matheus',
    bio: 'Estudante de ADS',
  },
  {
    img: guilhermeImg,
    nome: 'Guilherme Anitelli',
    rm: 'RM: 566744 • Turma: 1TDSPB',
    github: 'https://github.com/GuilhermeAnitelli',
    linkedin: 'https://www.linkedin.com/in/guilherme-anitelli',
    githubLabel: 'GitHub Guilherme',
    linkedinLabel: 'LinkedIn Guilherme',
    bio: 'Estudante de ADS',
  },
];

export function Equipe() {
  return (
    <div className="max-w-[1140px] w-full mx-auto my-12 px-7">
      <section className="bg-surface rounded-lg p-6 md:p-9 mb-6 shadow-sm border border-border">
        <h1 className="text-[1.5rem] font-bold text-brand-text mb-5 border-l-4 border-primary pl-3.5">
          Criadores do Projeto
        </h1>

        <div className="flex flex-wrap gap-7">
          {membros.map((m) => (
            <div
              key={m.nome}
              className="relative overflow-hidden bg-surface rounded-[18px] px-6 py-8 md:px-8 md:py-9 text-center w-full md:w-[280px] shadow-md border border-border transition-transform duration-300 hover:-translate-y-2.5 hover:shadow-lg
                before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-[5px] before:bg-gradient-to-r before:from-primary before:via-accent2 before:to-accent"
            >
              <img
                src={m.img}
                alt={m.nome}
                className="w-[110px] h-[110px] rounded-full object-cover mx-auto mb-4 shadow-[0_4px_16px_rgba(79,70,229,0.2)]"
                style={{ border: '4px solid transparent', background: 'linear-gradient(#fff,#fff) padding-box, linear-gradient(135deg,#4f46e5,#06b6d4) border-box' }}
              />
              <h3 className="text-base font-bold text-brand-text mb-1">{m.nome}</h3>
              <div className="text-muted text-sm mb-2">{m.rm}</div>
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
              <div className="mt-5 pt-4.5 border-t border-border text-left">
                <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.08em] text-accent mb-2">Biografia</h3>
                <p className="text-[0.88rem] text-muted leading-relaxed">{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
