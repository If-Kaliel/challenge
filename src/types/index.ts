// ===== TIPOS COMPARTILHADOS =====

/** Variantes do componente Button */
export type ButtonVariant = 'primary' | 'outline' | 'ghost';

/** Variantes do componente Card */
export type CardVariant = 'default' | 'feature' | 'stat' | 'function';

/** Status de retorno de um formulário */
export type FormStatus = {
  type: 'success' | 'error' | null;
  text: string;
};
