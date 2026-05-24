export interface Atendimento {
  id: string;
  idDentista: string;
  idBeneficiario: string;
  idPrograma: string;
  dtHora: string;
  descricaoTratamento: string;
  cronogramaProcedimentos?: string;
  status?: string;
}
