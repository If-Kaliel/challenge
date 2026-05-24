export type Beneficiario = {
  id: number | string;
  idPrograma?: string;
  nome: string;
  dtNascimento?: string;
  endereco?: string;
  // campos opcionais usados apenas no formulario (ignorados pelo back)
  cpf?: string;
  nascimento?: string;
  telefone?: string;
  celular?: string;
  email?: string;
  parentesco?: string;
  observacoes?: string;
  createdAt?: string;
  colaboradorId?: number | string | null;
};