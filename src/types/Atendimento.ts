export interface Atendimento {
  id: string;
  idDentista: string;
  idBeneficiario: string;
  idTriagem: string;
  dtAtendimento: string; // O LocalDate do Java chega aqui como string
  diagnostico: string;
}