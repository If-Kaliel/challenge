export interface Triagem {
  id: string;
  idBeneficiario: string; // Chave estrangeira
  dtTriagem: string;      // LocalDate
  necessidade: string;
  prioridade: string;
}