import { useState, useEffect, useCallback } from 'react';
import { getColaboradores, createColaborador } from '../services';
import type { Colaborador, ColaboradorPayload } from '../types';

interface UseColaboradoresReturn {
  colaboradores: Colaborador[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  create: (data: ColaboradorPayload) => Promise<Colaborador | null>;
  creating: boolean;
}

/** Hook que gerencia o estado de colaboradores (fetch + create) */
export function useColaboradores(): UseColaboradoresReturn {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState<string | null>(null);
  const [creating, setCreating]           = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getColaboradores();
      setColaboradores(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao carregar colaboradores.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const create = useCallback(async (data: ColaboradorPayload): Promise<Colaborador | null> => {
    setCreating(true);
    try {
      const novo = await createColaborador(data);
      setColaboradores((prev) => [...prev, novo]);
      return novo;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao cadastrar colaborador.');
      return null;
    } finally {
      setCreating(false);
    }
  }, []);

  return { colaboradores, loading, error, refetch: fetch, create, creating };
}
