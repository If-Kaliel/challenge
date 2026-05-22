export interface Procedimento {
  id: string;
  idAtendimento: string; // Chave estrangeira
  descricao: string;
  valor: number; // O double do Java
}