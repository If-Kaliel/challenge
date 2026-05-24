import { Link } from 'react-router-dom';
import { Card } from './Card';
import type { ReactNode } from 'react';

type ProfileCardProps = {
  id: string;
  img: string;
  nome: string;
  rm?: string;
  github?: string;
  linkedin?: string;
  githubLabel?: string;
  linkedinLabel?: string;
  bio?: string;
  children?: ReactNode;
};

export function ProfileCard({
  id,
  img,
  nome,
  rm,
  github,
  linkedin,
  githubLabel,
  linkedinLabel,
  bio,
  children,
}: ProfileCardProps) {
  return (
    <Card variant="feature" className="text-center">
      <img
        src={img}
        alt={nome}
        className="w-22.5 h-22.5 xs:w-25 xs:h-25 sm:w-27.5 sm:h-27.5 rounded-full object-cover mx-auto mb-4 shadow-[0_4px_16px_rgba(79,70,229,0.2)] profile-border"
      />

      <h3 className="text-base font-bold text-brand-text mb-1">{nome}</h3>
      {rm && <div className="text-muted text-sm mb-2">{rm}</div>}

      <div className="flex justify-center gap-2 mt-2">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={githubLabel}
            className="text-primary font-semibold text-[0.88rem] px-2.5 py-1 rounded-md transition-all duration-200 hover:bg-primary hover:text-white no-underline"
          >
            GitHub
          </a>
        )}
        {github && linkedin && <span className="text-muted">•</span>}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={linkedinLabel}
            className="text-primary font-semibold text-[0.88rem] px-2.5 py-1 rounded-md transition-all duration-200 hover:bg-primary hover:text-white no-underline"
          >
            LinkedIn
          </a>
        )}
      </div>

      {bio && (
        <div className="mt-5 pt-4 border-t border-border text-left">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.08em] text-accent mb-2">Biografia</p>
          <p className="text-[0.88rem] text-muted leading-relaxed">{bio}</p>
        </div>
      )}

      <Link
        to={`/equipe/${id}`}
        className="mt-4 inline-block w-full text-center text-[0.82rem] font-semibold text-primary border border-primary rounded-lg py-1.5 no-underline transition-all duration-200 hover:bg-primary hover:text-white"
      >
        Ver perfil completo →
      </Link>

      {children}
    </Card>
  );
}

export default ProfileCard;
