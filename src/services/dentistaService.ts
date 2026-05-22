import { api } from './api';
import type { Dentista } from '../types/Dentista';
import { registrarAtividade } from './activityLog';

const unwrapResponse = <T>(response: T | { data?: T } | undefined): T | undefined => {
  if (response === undefined) return undefined;
  if (Array.isArray(response)) return response as T;
  if (response && typeof response === 'object' && 'data' in response) {
    return ((response as { data?: T }).data ?? response) as T;
  }
  return response as T;
};

export const dentistaService = {
  listarTodos: async (): Promise<Dentista[]> => {
    const response = await api.get<Dentista[]>('/dentistas');
    const dados = unwrapResponse<Dentista[]>(response);
    return dados || [];
  },

  buscarPorId: async (id: string): Promise<Dentista> => {
    const response = await api.get<Dentista>(`/dentistas/${id}`);
    const dentista = unwrapResponse<Dentista | Dentista[]>(response);
    if (!dentista) throw new Error(`Dentista com id ${id} não encontrado.`);
    return Array.isArray(dentista) ? dentista[0] : dentista;
  },

  criar: async (dados: Omit<Dentista, 'id'>): Promise<void> => {
    await api.post('/dentistas', dados);
    registrarAtividade({
      tipo: 'cadastro',
      entidade: 'colaborador',
      descricao: `Dentista ${dados.nome} (CRO: ${dados.cro}) cadastrado no sistema`,
    });
  },

  atualizar: async (id: string, dados: Partial<Dentista>): Promise<Dentista> => {
    const response = await api.put<Dentista>(`/dentistas/${id}`, dados);
    const dentista = unwrapResponse<Dentista | Dentista[]>(response);
    if (!dentista) throw new Error(`Falha ao atualizar dentista ${id}.`);

    registrarAtividade({
      tipo: 'atualizacao',
      entidade: 'colaborador',
      descricao: `Dentista ${Array.isArray(dentista) ? dentista[0].nome : dentista.nome} atualizado`,
    });

    return Array.isArray(dentista) ? dentista[0] : dentista;
  },

  deletar: async (id: string): Promise<void> => {
    let nomeDentista = `ID ${id}`;
    try {
      const atual = await dentistaService.buscarPorId(id);
      nomeDentista = atual.nome;
    } catch {
      // usa ID como fallback
    }

    await api.delete(`/dentistas/${id}`);

    registrarAtividade({
      tipo: 'exclusao',
      entidade: 'colaborador',
      descricao: `Dentista ${nomeDentista} excluído do sistema`,
    });
  },
};

export default dentistaService;
