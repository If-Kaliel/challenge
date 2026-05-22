import type { Atividade, TipoAtividade } from '../types';

const STORAGE_KEY = 'simple-manager:activity-log';
const MAX_ENTRIES = 30;

type ActivityInput = {
  tipo: TipoAtividade;
  descricao: string;
  entidade?: 'colaborador' | 'beneficiario';
};

type StoredActivity = Atividade;

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readActivities(): StoredActivity[] {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredActivity[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeActivities(activities: StoredActivity[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(activities.slice(0, MAX_ENTRIES)));
}

export function registrarAtividade(input: ActivityInput) {
  const activity: StoredActivity = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    tipo: input.tipo,
    descricao: input.descricao,
    tempo: 'agora mesmo',
    lida: false,
    entidade: input.entidade,
    timestamp: new Date().toISOString(),
  };

  const atuais = readActivities();
  writeActivities([activity, ...atuais]);

  if (isBrowser()) {
    window.dispatchEvent(new Event('simple-manager:activity-log-changed'));
  }

  return activity;
}

export function listarAtividadesRecentes(limit = 6): StoredActivity[] {
  return readActivities().slice(0, limit);
}

export function limparAtividadesRecentes() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event('simple-manager:activity-log-changed'));
}
