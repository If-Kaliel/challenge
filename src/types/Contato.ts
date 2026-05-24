export interface Contato {
  id: string;
  nome: string;
  email: string;
  mensagem: string;
  dtEnvio?: string; // preenchido automaticamente pelo back-end
}
