import { Link } from 'react-router-dom';
import { membros } from '../data/membros';

export function Equipe() {
  return (
    <div className="max-w-[1140px] w-full mx-auto my-8 md:my-12 px-4 md:px-7">
      <section className="bg-surface rounded-lg p-6 md:p-9 mb-6 shadow-sm border border-border">
        <h1 className="text-[1.5rem] font-bold text-brand-text mb-5 border-l-4 border-primary pl-3.5">
          Criadores do Projeto
        </h1>

        <div className="flex flex-wrap gap-7">
          {membros.map((m) => (
            <div
              key={m.id}
              className="relative overflow-hidden bg-surface rounded-[18px] px-6 py-8 md:px-8 md:py-9 text-center w-full md:w-[280px] shadow-md border border-border transition-transform duration-300 hover:-translate-y-2.5 hover:shadow-lg
                before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-[5px] before:bg-gradient-to-r before:from-primary before:via-accent2 before:to-accent"
            >
              <img
                src={m.img}
                alt={m.nome}
                loading="lazy"
                decoding="async"
                className="w-[110px] h-[110px] rounded-full object-cover mx-auto mb-4 shadow-[0_4px_16px_rgba(79,70,229,0.2)]"
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
