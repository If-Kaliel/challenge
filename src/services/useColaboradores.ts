import { useState, useEffect, useCallback } from 'react';
import { funcionarioService } from './funcionarioService'; 
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
      const data = await funcionarioService.listarTodos();
      
      // SOLUÇÃO ERRO 1: Mapeamos os dados injetando um 'departamento' padrão 
      // para transformar Funcionario em Colaborador sem quebrar a tipagem ou a tela
      const formatados = data.map((f: any) => ({
        ...f,
        departamento: f.departamento || 'Geral'
      })) as Colaborador[];
      
      setColaboradores(formatados);
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
      // SOLUÇÃO ERRO 2: Convertemos o retorno para 'any' antes do teste 
      // para o TS permitir checar se o objeto realmente veio (contornando o tipo void)
      const res = await funcionarioService.criar(data) as any;
      
      if (res && typeof res === 'object') {
        const novoColaborador = res as Colaborador;
        
        // Garante que o novo objeto também possua o campo exigido pelo tipo
        if (!novoColaborador.departamento) {
          novoColaborador.departamento = 'Geral';
        }
        
        setColaboradores((prev) => [...prev, novoColaborador]);
        return novoColaborador;
      }
      
      await fetch();
      return null;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao cadastrar colaborador.');
      return null;
    } finally {
      setCreating(false);
    }
  }, [fetch]);

  return { colaboradores, loading, error, refetch: fetch, create, creating };
}