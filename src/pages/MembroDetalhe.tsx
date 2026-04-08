import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components';
import { membros } from '../data/membros';

export function MembroDetalhe() {
  // useParams: captura o parâmetro dinâmico :id da rota /equipe/:id
  const { id } = useParams<{ id: string }>();

  // useNavigate: navegação programática (voltar para equipe)
  const navigate = useNavigate();

  const membro = membros.find((m) => m.id === id);

  if (!membro) {
    return (
      <div className="max-w-[1140px] mx-auto my-12 px-4 md:px-7 text-center">
        <h1 className="text-2xl font-bold text-brand-text mb-4">Membro não encontrado</h1>
        <Button onClick={() => navigate('/equipe')}>Voltar para Equipe</Button>
      </div>
    );
  }

  return (
    <div className="max-w-[1140px] w-full mx-auto my-8 md:my-12 px-4 md:px-7">
      {/* Botão voltar */}
      <button
        onClick={() => navigate('/equipe')}
        className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-6 hover:gap-3 transition-all duration-200"
      >
        ← Voltar para Equipe
      </button>

      <div className="bg-surface rounded-[18px] border border-border shadow-md overflow-hidden">
        {/* Cabeçalho do perfil */}
        <div className="relative bg-hero-gradient px-8 py-12 text-white text-center">
          <div className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(circle at 30% 50%, rgba(139,92,246,0.3) 0%, transparent 60%)' }}
          />
          <div className="relative z-10">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent2 flex items-center justify-center text-4xl font-black mx-auto mb-4 shadow-lg">
              {membro.nome.charAt(0)}
            </div>
            <h1 className="text-2xl font-extrabold mb-1">{membro.nome}</h1>
            <p className="text-white/60 text-sm">RM: {membro.rm} • Turma: {membro.turma}</p>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-8 md:p-12 grid md:grid-cols-2 gap-10">
          {/* Biografia */}
          <div>
            <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-accent mb-3">Biografia</h2>
            <p className="text-muted leading-relaxed text-[0.95rem]">{membro.bio}</p>
          </div>

          {/* Habilidades */}
          <div>
            <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-accent mb-3">Habilidades</h2>
            <div className="flex flex-wrap gap-2">
              {membro.habilidades.map((h) => (
                <span key={h} className="px-3 py-1 bg-feature-gradient border border-border text-primary text-sm font-semibold rounded-full">
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="border-t border-border px-8 md:px-12 py-6 flex gap-3 flex-wrap">
          <a href={membro.github} target="_blank" rel="noopener noreferrer" aria-label={membro.githubLabel}>
            <Button variant="outline">GitHub</Button>
          </a>
          <a href={membro.linkedin} target="_blank" rel="noopener noreferrer" aria-label={membro.linkedinLabel}>
            <Button variant="primary">LinkedIn</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
