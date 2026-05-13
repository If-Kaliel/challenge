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

// ===== TIPOS DA API JAVA =====

/** Colaborador retornado pela API Java */
export interface Colaborador {
  id: number;
  nome: string;
  cargo: string;
  departamento: string;
  email: string;
}

/** Payload para criação de colaborador (POST /colaboradores) */
export type ColaboradorPayload = Omit<Colaborador, 'id'>;
