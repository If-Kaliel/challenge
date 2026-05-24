import { api } from './api';
import type { Atendimento } from '../types/Atendimento';

function garantirRetorno<T>(valor: T | undefined, mensagem: string): T {
  if (valor === undefined) throw new Error(mensagem);
  return valor;
}

export const atendimentoService = {
  // ...existing code...
  listarTodos: async (): Promise<Atendimento[]> => {
    const response = await api.get<Atendimento[]>('/atendimentos');
    return response ?? [];
  },

  buscarPorId: async (id: string): Promise<Atendimento> => {
    const response = await api.get<Atendimento>(`/atendimentos/${id}`);
    return garantirRetorno(response, `Atendimento com id ${id} não encontrado.`);
  },

  // Criar um novo registro
  criar: async (dados: Omit<Atendimento, 'id'>): Promise<Atendimento> => {
    const response = await api.post<Atendimento>('/atendimentos', dados);
    return garantirRetorno(response, 'Falha ao criar atendimento.');
  }
  // ...existing code...
};

export default atendimentoService;