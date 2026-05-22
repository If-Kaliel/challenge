import { api } from './api';
import type { Beneficiario } from '../types/Beneficiario';
import { registrarAtividade } from './activityLog';

const unwrapResponse = <T>(response: T | { data?: T } | undefined): T | undefined => {
  if (response === undefined) return undefined;
  if (Array.isArray(response)) return response as T;
  if (response && typeof response === 'object' && 'data' in response) {
    return ((response as { data?: T }).data ?? response) as T;
  }
  return response as T;
};

export const beneficiarioService = {
  listarTodos: async (): Promise<Beneficiario[]> => {
    const response = await api.get<Beneficiario[]>('/beneficiarios');
    const dados = unwrapResponse<Beneficiario[]>(response);
    return dados || [];
  },

  buscarPorId: async (id: string | number): Promise<Beneficiario> => {
    const response = await api.get<Beneficiario>(`/beneficiarios/${id}`);
    const ben = unwrapResponse<Beneficiario | Beneficiario[]>(response);
    if (!ben) throw new Error(`Beneficiário com id ${id} não encontrado.`);
    return Array.isArray(ben) ? ben[0] : ben;
  },

  criar: async (dados: Omit<Beneficiario, 'id'>): Promise<Beneficiario | void> => {
  const res = await api.post<Beneficiario>('/beneficiarios', dados);
  const criado = (res as Beneficiario) || undefined;

  registrarAtividade({
    tipo: 'cadastro',
    entidade: 'beneficiario',
    descricao: `Beneficiário ${criado?.nome || dados.nome} cadastrado no sistema`,
  });

  return criado;
},

  atualizar: async (id: string | number, dados: Partial<Beneficiario>): Promise<Beneficiario> => {
    const response = await api.put<Beneficiario>(`/beneficiarios/${id}`, dados);
    const ben = unwrapResponse<Beneficiario | Beneficiario[]>(response);
    if (!ben) throw new Error(`Falha ao atualizar beneficiário ${id}.`);

    registrarAtividade({
      tipo: 'atualizacao',
      entidade: 'beneficiario',
      descricao: `Beneficiário ${Array.isArray(ben) ? ben[0].nome : ben.nome} atualizado`,
    });

    return Array.isArray(ben) ? ben[0] : ben;
  },

  deletar: async (id: string | number): Promise<void> => {
    let nomeBeneficiario = `ID ${id}`;

    try {
      const atual = await beneficiarioService.buscarPorId(id);
      nomeBeneficiario = atual.nome;
    } catch {
      // fallback para o ID quando o item não puder ser carregado
    }

    await api.delete(`/beneficiarios/${id}`);

    registrarAtividade({
      tipo: 'exclusao',
      entidade: 'beneficiario',
      descricao: `Beneficiário ${nomeBeneficiario} excluído do sistema`,
    });
  },
};

export default beneficiarioService;