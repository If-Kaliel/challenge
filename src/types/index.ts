// ===== TIPOS COMPARTILHADOS =====

/** Variantes do componente Button */
export type ButtonVariant = 'primary' | 'outline' | 'ghost';

/** Variantes do componente Card */
export type CardVariant = 'default' | 'feature' | 'stat' | 'function';

/** Estrutura de um item de navegação */
export interface NavItem {
  label: string;
  path: string;
}

/** Estrutura de um membro da equipe */
export interface TeamMember {
  name: string;
  rm: string;
  turma: string;
  github: string;
  linkedin: string;
  bio: string;
  image: string;
}

/** Estrutura de uma pergunta do FAQ */
export interface FAQItem {
  question: string;
  answer: string;
}

/** Status de um formulário */
export type FormStatus = {
  type: 'success' | 'error' | null;
  text: string;
};
