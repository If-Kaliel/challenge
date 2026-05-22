export type EntityId = number;
export type TextoLabel = string;
export type IsActive = boolean;

export type ButtonVariant = 'primary' | 'outline' | 'ghost';
export type CardVariant = 'default' | 'feature' | 'stat' | 'function';
export type StatusTipo = 'success' | 'error' | 'loading' | null;

export type Departamento =
  | 'Tecnologia'
  | 'Recursos Humanos'
  | 'Produto'
  | 'Operações'
  | 'Financeiro'
  | string;

export type StatusColaborador = 'ativo' | 'inativo' | 'ferias' | 'licenca';
export type TipoAtividade = 'cadastro' | 'atualizacao' | 'exclusao' | 'ferias' | 'relatorio' | 'avaliacao';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type ColaboradorComStatus = Colaborador & {
  status: StatusColaborador;
  dataAdmissao: string;
  diasNaEmpresa: number;
};

export type ColaboradorComMetricas = Colaborador & {
  produtividade: number;
  presenca: number;
  avaliacoes: number;
  nota: number;
};

export type EntidadeAuditada = EntidadeBase & RegistroAuditoria;

export interface EntidadeBase {
  id: EntityId;
  nome: string;
}

export interface RegistroAuditoria {
  criadoEm: string;
  atualizadoEm: string;
  criadoPor: string;
}

export interface Colaborador {
  id: number;
  nome: string;
  cargo: string;
  departamento: Departamento;
  email: string;
}

export type ColaboradorPayload = Omit<Colaborador, 'id'>;

export interface NavItem {
  to: string;
  label: string;
  end?: boolean;
  isPublic?: boolean;
}

export interface FormStatus {
  type: StatusTipo;
  text: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
  total?: number;
}

export interface Atividade {
  id: number;
  tipo: TipoAtividade;
  descricao: string;
  tempo: string;
  lida: boolean;
  entidade?: 'colaborador' | 'beneficiario';
  timestamp?: string;
}

export interface KpiData {
  icon: string;
  label: string;
  value: string | number;
  sub?: string;
  gradient: string;
}
