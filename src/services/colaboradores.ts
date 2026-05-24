import { api } from './api';
import type { Colaborador, ColaboradorPayload } from '../types';

export async function getColaboradores(): Promise<Colaborador[]> {
  const response = await api.get<Colaborador[]>('/colaboradores');
  if (!response) return [];
  return response;
}

export async function createColaborador(data: ColaboradorPayload): Promise<Colaborador> {
  const response = await api.post<Colaborador>('/colaboradores', data);
  if (!response) throw new Error('Resposta vazia da API');
  return response;
}
