export interface Doacao {
  id: string;
  idDoador: string;
  valorDoacao: number;
  dtDoacao: string;
  formaPagamento?: string;
  periodicidadePagamento?: string;
}
