import { api } from './api';
import type { Funcionario } from '../types/Funcionario';
import { registrarAtividade } from './activityLog';

const unwrapResponse = <T>(response: T | { data?: T } | undefined): T | undefined => {
  if (response === undefined) return undefined;
  if (Array.isArray(response)) return response as T;
  if (response && typeof response === 'object' && 'data' in response) {
    return ((response as { data?: T }).data ?? response) as T;
  }
  return response as T;
};

export const funcionarioService = {
  listarTodos: async (): Promise<Funcionario[]> => {
    const response = await api.get<Funcionario[]>('/funcionarios');
    const dados = unwrapResponse<Funcionario[]>(response);
    return dados || [];
  },

  buscarPorId: async (id: string): Promise<Funcionario> => {
    const response = await api.get<Funcionario>(`/funcionarios/${id}`);
    const funcionario = unwrapResponse<Funcionario | Funcionario[]>(response);
    if (!funcionario) throw new Error(`Funcionário com id ${id} não encontrado.`);
    return Array.isArray(funcionario) ? funcionario[0] : funcionario;
  },

  criar: async (dados: Omit<Funcionario, 'id'>): Promise<void> => {
    await api.post('/funcionarios', dados);
    registrarAtividade({
      tipo: 'cadastro',
      entidade: 'colaborador',
      descricao: `Colaborador ${dados.nome} cadastrado no sistema`,
    });
  },

  atualizar: async (id: string, dados: Partial<Funcionario>): Promise<Funcionario> => {
    const response = await api.put<Funcionario>(`/funcionarios/${id}`, dados);
    const funcionario = unwrapResponse<Funcionario | Funcionario[]>(response);
    if (!funcionario) throw new Error(`Falha ao atualizar funcionário ${id}.`);

    registrarAtividade({
      tipo: 'atualizacao',
      entidade: 'colaborador',
      descricao: `Colaborador ${Array.isArray(funcionario) ? funcionario[0].nome : funcionario.nome} atualizado`,
    });

    return Array.isArray(funcionario) ? funcionario[0] : funcionario;
  },

  deletar: async (id: string): Promise<void> => {
    let nomeColaborador = `ID ${id}`;

    try {
      const atual = await funcionarioService.buscarPorId(id);
      nomeColaborador = atual.nome;
    } catch {
      // fallback para o ID
    }

    await api.delete(`/funcionarios/${id}`);

    registrarAtividade({
      tipo: 'exclusao',
      entidade: 'colaborador',
      descricao: `Colaborador ${nomeColaborador} excluído do sistema`,
    });
  },
};

export default funcionarioService;