import type { Doacao } from '../types/Doacao';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const doacaoService = {
  listar: async (): Promise<Doacao[]> => {
    const res = await fetch(`${BASE_URL}/doacoes`);
    if (!res.ok) throw new Error('Erro ao listar doações');
    return res.json();
  },

  buscarPorId: async (id: string): Promise<Doacao> => {
    const res = await fetch(`${BASE_URL}/doacoes/${id}`);
    if (!res.ok) throw new Error('Doação não encontrada');
    return res.json();
  },

  criar: async (dados: Omit<Doacao, 'id'>): Promise<Doacao | void> => {
    const payload = {
      idDoador: dados.idDoador,
      valorDoacao: dados.valorDoacao,   // ← campo correto do back-end
      dtDoacao: dados.dtDoacao,
      formaPagamento: dados.formaPagamento ?? '',
      periodicidadePagamento: dados.periodicidadePagamento ?? '',
    };
    const res = await fetch(`${BASE_URL}/doacoes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Erro ao criar doação');
    // 201 Created pode não ter body
    const text = await res.text();
    return text ? (JSON.parse(text) as Doacao) : undefined;
  },

  atualizar: async (id: string, dados: Partial<Omit<Doacao, 'id'>>): Promise<Doacao> => {
    const res = await fetch(`${BASE_URL}/doacoes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    if (!res.ok) throw new Error('Erro ao atualizar doação');
    return res.json();
  },

  excluir: async (id: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/doacoes/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Erro ao excluir doação');
  },
};
