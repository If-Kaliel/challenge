import { useParams, useNavigate } from 'react-router-dom';
import { Button, SectionHeader } from '../components';

interface Membro {
  id: string;
  nome: string;
  rm: string;
  turma: string;
  bio: string;
  github: string;
  linkedin: string;
  github_label: string;
  linkedin_label: string;
  habilidades: string[];
}

const membros: Membro[] = [
  {
    id: 'kaliel',
    nome: 'Kaliel Conceição de Aquino',
    rm: '567587',
    turma: '1TDSPB',
    bio: 'Estudante de Análise e Desenvolvimento de Sistemas na FIAP. Desenvolvedor front-end com interesse em React, TypeScript e experiência do usuário. Responsável pela arquitetura principal do projeto Simple Manager.',
    github: 'https://github.com/If-Kaliel',
    linkedin: 'https://www.linkedin.com/in/kaliel-aquino-a034332b6',
    github_label: 'GitHub Kaliel',
    linkedin_label: 'LinkedIn Kaliel',
    habilidades: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'Git'],
  },
  {
    id: 'matheus',
    nome: 'Matheus Carneiro Maciel',
    rm: '567753',
    turma: '1TDSPB',
    bio: 'Estudante de ADS na FIAP com foco em desenvolvimento web e mobile. Contribuiu com a estruturação das páginas e componentização do projeto Simple Manager.',
    github: 'https://github.com/kakarneiro',
    linkedin: 'https://www.linkedin.com/in/matheus-carneiro-maciel',
    github_label: 'GitHub Matheus',
    linkedin_label: 'LinkedIn Matheus',
    habilidades: ['React', 'JavaScript', 'CSS', 'HTML', 'Git'],
  },
  {
    id: 'guilherme',
    nome: 'Guilherme Anitelli',
    rm: '566744',
    turma: '1TDSPB',
    bio: 'Estudante de ADS na FIAP. Contribuiu com o design e estilização das páginas do projeto, além de auxiliar na validação do formulário de contato.',
    github: 'https://github.com/GuilhermeAnitelli',
    linkedin: 'https://www.linkedin.com/in/guilherme-anitelli',
    github_label: 'GitHub Guilherme',
    linkedin_label: 'LinkedIn Guilherme',
    habilidades: ['UI Design', 'CSS', 'React', 'TailwindCSS', 'Git'],
  },
];

export function MembroDetalhe() {
  // useParams: captura o parâmetro dinâmico :id da rota /equipe/:id
  const { id } = useParams<{ id: string }>();

  // useNavigate: navegação programática (voltar para equipe)
  const navigate = useNavigate();

  const membro = membros.find((m) => m.id === id);

  if (!membro) {
    return (
      <div className="max-w-285 mx-auto my-12 px-4 md:px-7 text-center">
        <h1 className="text-2xl font-bold text-brand-text mb-4">Membro não encontrado</h1>
        <Button onClick={() => navigate('/equipe')}>Voltar para Equipe</Button>
      </div>
    );
  }

  return (
    <div className="max-w-285 w-full mx-auto my-8 md:my-12 px-4 md:px-7">
      {/* Botão voltar */}
      <button
        onClick={() => navigate('/equipe')}
        className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-6 hover:gap-3 transition-all duration-200"
      >
        ← Voltar para Equipe
      </button>

      <div className="bg-surface rounded-xl border border-border shadow-md overflow-hidden">
        {/* Cabeçalho do perfil */}
        <div className="relative bg-hero-gradient px-8 py-12 text-white text-center">
          <div className="pointer-events-none absolute inset-0 bg-radial-purple-30" />
          <div className="relative z-10">
            <div className="w-24 h-24 rounded-full bg-avatar-colaborador flex items-center justify-center text-4xl font-black mx-auto mb-4 shadow-lg border border-white/20">
              {membro.nome.charAt(0)}
            </div>
            <h1 className="text-2xl font-extrabold mb-1">{membro.nome}</h1>
            <p className="text-white/80 text-sm">RM: {membro.rm} • Turma: {membro.turma}</p>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-8 md:p-12 grid md:grid-cols-2 gap-10">
          {/* Biografia */}
          <div>
            <SectionHeader title="Biografia" accentClassName="border-accent" />
            <p className="text-muted leading-relaxed text-[0.95rem]">{membro.bio}</p>
          </div>

          {/* Habilidades */}
          <div>
            <SectionHeader title="Habilidades" accentClassName="border-accent" />
            <div className="flex flex-wrap gap-2">
              {membro.habilidades.map((h) => (
                <span key={h} className="px-3 py-1 bg-white border border-border text-brand-text text-sm font-semibold rounded-full shadow-sm">
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="border-t border-border px-8 md:px-12 py-6 flex gap-3 flex-wrap">
          <a href={membro.github} target="_blank" rel="noopener noreferrer" aria-label={membro.github_label}>
            <Button variant="outline">GitHub</Button>
          </a>
          <a href={membro.linkedin} target="_blank" rel="noopener noreferrer" aria-label={membro.linkedin_label}>
            <Button variant="primary">LinkedIn</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
