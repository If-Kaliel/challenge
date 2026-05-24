import { api } from './api';
import type { Doacao } from '../types/Doacao';
import { registrarAtividade } from './activityLog';

const unwrapResponse = <T>(response: T | { data?: T } | undefined): T | undefined => {
  if (response === undefined) return undefined;
  if (Array.isArray(response)) return response as T;
  if (response && typeof response === 'object' && 'data' in response) {
    return ((response as { data?: T }).data ?? response) as T;
  }
  return response as T;
};

export const doacaoService = {
  listarTodos: async (): Promise<Doacao[]> => {
    const response = await api.get<Doacao[]>('/doacoes');
    const dados = unwrapResponse<Doacao[]>(response);
    return dados || [];
  },

  buscarPorId: async (id: string): Promise<Doacao> => {
    const response = await api.get<Doacao>(`/doacoes/${id}`);
    const doacao = unwrapResponse<Doacao | Doacao[]>(response);
    if (!doacao) throw new Error(`Doacao com id ${id} nao encontrada.`);
    return Array.isArray(doacao) ? doacao[0] : doacao;
  },

  criar: async (dados: Omit<Doacao, 'id'>): Promise<Doacao | void> => {
    // Mapeia corretamente para o campo esperado pelo back-end Java
    const payload = {
      idDoador: dados.idDoador,
      valorDoacao: dados.valorDoacao,
      dtDoacao: dados.dtDoacao,
      formaPagamento: dados.formaPagamento ?? '',
      periodicidadePagamento: dados.periodicidadePagamento ?? '',
    };
    const res = await api.post<Doacao>('/doacoes', payload);
    const criada = (res as Doacao) || undefined;
    registrarAtividade({
      tipo: 'cadastro',
      entidade: 'colaborador',
      descricao: `Doacao de R$ ${Number(dados.valorDoacao).toFixed(2)} registrada no sistema`,
    });
    return criada;
  },

  atualizar: async (id: string, dados: Partial<Doacao>): Promise<Doacao> => {
    const response = await api.put<Doacao>(`/doacoes/${id}`, dados);
    const doacao = unwrapResponse<Doacao | Doacao[]>(response);
    if (!doacao) throw new Error(`Falha ao atualizar doacao ${id}.`);
    registrarAtividade({
      tipo: 'atualizacao',
      entidade: 'colaborador',
      descricao: `Doacao ID ${id} atualizada`,
    });
    return Array.isArray(doacao) ? doacao[0] : doacao;
  },

  deletar: async (id: string): Promise<void> => {
    await api.delete(`/doacoes/${id}`);
    registrarAtividade({
      tipo: 'exclusao',
      entidade: 'colaborador',
      descricao: `Doacao ID ${id} excluida do sistema`,
    });
  },
};

export default doacaoService;