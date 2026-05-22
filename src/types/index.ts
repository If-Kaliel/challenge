// =============================================================================
// TIPOS COMPARTILHADOS — Simple Manager
// Cobre: tipos básicos, union types, intersection types e interfaces (TypeScript)
// =============================================================================


// =============================================================================
// I.a — TIPOS BÁSICOS: string | number | boolean | object
// =============================================================================

/** ID numérico de qualquer entidade do sistema */
export type EntityId = number;

/** Texto genérico (alias semântico para string) */
export type TextoLabel = string;

/** Flag de visibilidade ou estado ativo */
export type IsActive = boolean;


// =============================================================================
// I.b — UNION TYPES: tipos que admitem múltiplos valores literais
// =============================================================================

/** Variantes visuais do componente Button */
export type ButtonVariant = 'primary' | 'outline' | 'ghost';

/** Variantes visuais do componente Card */
export type CardVariant = 'default' | 'feature' | 'stat' | 'function';

/** Status de retorno de formulários e operações assíncronas */
export type StatusTipo = 'success' | 'error' | 'loading' | null;

/** Departamentos válidos da empresa */
export type Departamento =
  | 'Tecnologia'
  | 'Recursos Humanos'
  | 'Produto'
  | 'Operações'
  | 'Financeiro'
  | string; // extensível para novos departamentos

/** Status de vínculo de um colaborador */
export type StatusColaborador = 'ativo' | 'inativo' | 'ferias' | 'licenca';

/** Tipo de evento registrado no feed de atividades */
export type TipoAtividade = 'cadastro' | 'ferias' | 'relatorio' | 'avaliacao';

/** Métodos HTTP suportados pelo cliente da API */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';


// =============================================================================
// I.b — INTERSECTION TYPES: combinação de múltiplos tipos em um único
// =============================================================================

/**
 * Colaborador base + status de vínculo e data de admissão.
 * Usado no Dashboard para exibir indicadores operacionais.
 * Intersection: Colaborador & { campos adicionais }
 */
export type ColaboradorComStatus = Colaborador & {
  status: StatusColaborador;
  dataAdmissao: string;
  diasNaEmpresa: number;
};

/**
 * Colaborador base + métricas de desempenho individuais.
 * Usado em relatórios de RH e avaliação de performance.
 * Intersection: Colaborador & { métricas numéricas }
 */
export type ColaboradorComMetricas = Colaborador & {
  produtividade: number;  // 0–100 (percentual)
  presenca: number;       // 0–100 (percentual de presença)
  avaliacoes: number;     // quantidade de avaliações recebidas
  nota: number;           // média das avaliações (0–5)
};

/**
 * Combinação de identificação básica com metadados de auditoria.
 * Intersection: EntidadeBase & RegistroAuditoria
 */
export type EntidadeAuditada = EntidadeBase & RegistroAuditoria;


// =============================================================================
// I.c — INTERFACES: contratos tipados para objetos complexos
// =============================================================================

/** Entidade base compartilhada por qualquer recurso do sistema */
export interface EntidadeBase {
  id: EntityId;
  nome: string;
}

/** Metadados de auditoria (criação e atualização) */
export interface RegistroAuditoria {
  criadoEm: string;
  atualizadoEm: string;
  criadoPor: string;
}

/** Colaborador retornado pela API Java (GET /colaboradores) */
export interface Colaborador {
  id: number;
  nome: string;
  cargo: string;
  departamento: Departamento;
  email: string;
}

/** Payload para criação de colaborador (POST /colaboradores) */
export type ColaboradorPayload = Omit<Colaborador, 'id'>;

/** Item de navegação do Header e Footer */
export interface NavItem {
  to: string;
  label: string;
  end?: boolean;    // boolean — usado pelo NavLink para match exato da rota
}

/** Status de retorno de um formulário */
export interface FormStatus {
  type: StatusTipo;
  text: string;
}

/** Resposta genérica padronizada da API Java */
export interface ApiResponse<T> {
  data: T;
  success: boolean;   // boolean
  message: string;
  total?: number;     // opcional — paginação
}

/** Atividade registrada no feed do Dashboard */
export interface Atividade {
  id: number;
  tipo: TipoAtividade;
  descricao: string;
  tempo: string;
  lida: boolean;   // boolean — indica se o usuário já visualizou
}

/** KPI (indicador-chave) exibido no Dashboard */
export interface KpiData {
  icon: string;
  label: string;
  value: string | number;   // union: pode ser texto ("98%") ou número (6)
  sub?: string;
  gradient: string;
}
