import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { Doacao } from '../types/Doacao';

interface DoacaoFormData {
  idDoador: string;
  valorDoacao: number;
  dtDoacao: string;
  formaPagamento?: string;
  periodicidadePagamento?: string;
}

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function formatarValor(valor: number) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function Doacoes() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DoacaoFormData>();

  const carregarDoacoes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/doacoes`);
      if (!res.ok) throw new Error('Erro ao carregar doações');
      const data: Doacao[] = await res.json();
      setDoacoes(data);
    } catch {
      setErro('Não foi possível carregar as doações.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDoacoes();
  }, []);

  const onSubmit: SubmitHandler<DoacaoFormData> = async (data) => {
    try {
      const payload = {
        idDoador: data.idDoador,
        valorDoacao: Number(data.valorDoacao),
        dtDoacao: data.dtDoacao,
        formaPagamento: data.formaPagamento ?? '',
        periodicidadePagamento: data.periodicidadePagamento ?? '',
      };
      const res = await fetch(`${BASE_URL}/doacoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Erro ao registrar doação');
      setSucesso('Doação registrada com sucesso!');
      setErro('');
      reset();
      await carregarDoacoes();
      setTimeout(() => setSucesso(''), 3000);
    } catch {
      setErro('Não foi possível registrar a doação.');
    }
  };

  const total = doacoes.reduce((acc, d) => acc + Number(d.valorDoacao), 0);

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Doações</h1>

      {/* Formulário */}
      <section style={{ background: '#f8f9fa', borderRadius: 8, padding: '1.5rem', marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Nova Doação</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="idDoador">ID do Doador</label>
            <input
              id="idDoador"
              type="text"
              {...register('idDoador', { required: 'Informe o ID do doador' })}
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
            {errors.idDoador && <p style={{ color: 'red' }}>{errors.idDoador.message}</p>}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="valorDoacao">Valor da Doação (R$)</label>
            <input
              id="valorDoacao"
              type="number"
              step="0.01"
              {...register('valorDoacao', { required: 'Informe o valor', min: { value: 0.01, message: 'Valor deve ser maior que zero' } })}
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
            {errors.valorDoacao && <p style={{ color: 'red' }}>{errors.valorDoacao.message}</p>}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="dtDoacao">Data da Doação</label>
            <input
              id="dtDoacao"
              type="date"
              {...register('dtDoacao', { required: 'Informe a data' })}
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
            {errors.dtDoacao && <p style={{ color: 'red' }}>{errors.dtDoacao.message}</p>}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="formaPagamento">Forma de Pagamento</label>
            <input
              id="formaPagamento"
              type="text"
              {...register('formaPagamento')}
              placeholder="Ex: PIX, Boleto, Cartão"
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="periodicidadePagamento">Periodicidade</label>
            <input
              id="periodicidadePagamento"
              type="text"
              {...register('periodicidadePagamento')}
              placeholder="Ex: Mensal, Anual, Único"
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>

          <button type="submit" style={{ padding: '0.6rem 1.5rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
            Registrar Doação
          </button>
        </form>

        {sucesso && <p style={{ color: 'green', marginTop: '1rem' }}>{sucesso}</p>}
        {erro && <p style={{ color: 'red', marginTop: '1rem' }}>{erro}</p>}
      </section>

      {/* Listagem */}
      <section>
        <h2>Histórico de Doações</h2>
        {loading ? (
          <p>Carregando...</p>
        ) : doacoes.length === 0 ? (
          <p>Nenhuma doação encontrada.</p>
        ) : (
          <>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
              <thead>
                <tr style={{ background: '#e2e8f0' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>ID Doador</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Valor</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Data</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Forma Pagamento</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Periodicidade</th>
                </tr>
              </thead>
              <tbody>
                {doacoes.map((d) => (
                  <tr key={d.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.75rem' }}>{d.idDoador}</td>
                    <td style={{ padding: '0.75rem' }}>{formatarValor(Number(d.valorDoacao))}</td>
                    <td style={{ padding: '0.75rem' }}>{d.dtDoacao}</td>
                    <td style={{ padding: '0.75rem' }}>{d.formaPagamento || '—'}</td>
                    <td style={{ padding: '0.75rem' }}>{d.periodicidadePagamento || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>
              Total arrecadado: {formatarValor(total)}
            </p>
          </>
        )}
      </section>
    </div>
  );
}
