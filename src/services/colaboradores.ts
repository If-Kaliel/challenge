import { api } from './api';
import type { Colaborador, ColaboradorPayload } from '../types';

// ===== DADOS MOCK =====
// Usados como fallback quando a API Java não está disponível
const MOCK_COLABORADORES: Colaborador[] = [
  { id: 1, nome: 'Ana Beatriz Costa',    cargo: 'Analista de RH',         departamento: 'Recursos Humanos', email: 'ana.costa@simplemanager.com'    },
  { id: 2, nome: 'Carlos Eduardo Lima',  cargo: 'Desenvolvedor Back-End',  departamento: 'Tecnologia',       email: 'carlos.lima@simplemanager.com'  },
  { id: 3, nome: 'Fernanda Rodrigues',   cargo: 'Designer UX/UI',          departamento: 'Produto',          email: 'fernanda.r@simplemanager.com'   },
  { id: 4, nome: 'Gabriel Nascimento',   cargo: 'Gerente de Projetos',     departamento: 'Operações',        email: 'gabriel.n@simplemanager.com'    },
  { id: 5, nome: 'Helena Martins',       cargo: 'Analista Financeira',     departamento: 'Financeiro',       email: 'helena.m@simplemanager.com'     },
  { id: 6, nome: 'Lucas Ferreira',       cargo: 'Desenvolvedor Front-End', departamento: 'Tecnologia',       email: 'lucas.f@simplemanager.com'      },
];

/** Busca todos os colaboradores da API Java */
export async function getColaboradores(): Promise<Colaborador[]> {
  try {
    return await api.get<Colaborador[]>('/colaboradores');
  } catch {
    // Fallback: retorna dados mock enquanto a API não está disponível
    console.warn('[API] Usando dados mock — API Java não disponível');
    return MOCK_COLABORADORES;
  }
}

/** Cadastra um novo colaborador via API Java */
export async function createColaborador(data: ColaboradorPayload): Promise<Colaborador> {
  try {
    return await api.post<Colaborador>('/colaboradores', data);
  } catch {
    // Fallback mock: simula criação local
    console.warn('[API] Usando mock — API Java não disponível');
    const novo: Colaborador = { id: Date.now(), ...data };
    MOCK_COLABORADORES.push(novo);
    return novo;
  }
}
