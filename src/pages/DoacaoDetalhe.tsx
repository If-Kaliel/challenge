import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Doacao } from '../types/Doacao';

// Tipo local para edição — usa valorDoacao conforme API
interface DoacaoEditavel {
  idDoador: string;
  valorDoacao: string;
  dtDoacao: string;
  formaPagamento?: string;
  periodicidadePagamento?: string;
}

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export function DoacaoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doacao, setDoacao] = useState<Doacao | null>(null);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState<DoacaoEditavel>({
    idDoador: '',
    valorDoacao: '',
    dtDoacao: '',
    formaPagamento: '',
    periodicidadePagamento: '',
  });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  useEffect(() => {
    const carregar = async () => {
      try {
        const res = await fetch(`${BASE_URL}/doacoes/${id}`);
        if (!res.ok) throw new Error('Doação não encontrada');
        const data: Doacao = await res.json();
        setDoacao(data);
        setFormData({
          idDoador: data.idDoador,
          valorDoacao: String(data.valorDoacao),
          dtDoacao: data.dtDoacao,
          formaPagamento: data.formaPagamento ?? '',
          periodicidadePagamento: data.periodicidadePagamento ?? '',
        });
      } catch {
        setErro('Não foi possível carregar a doação.');
      } finally {
        setLoading(false);
      }
    };
    if (id) carregar();
  }, [id]);

  const handleSalvar = async () => {
    try {
      const payload = {
        idDoador: formData.idDoador,
        valorDoacao: Number(formData.valorDoacao),
        dtDoacao: formData.dtDoacao,
        formaPagamento: formData.formaPagamento ?? '',
        periodicidadePagamento: formData.periodicidadePagamento ?? '',
      };
      const res = await fetch(`${BASE_URL}/doacoes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Erro ao atualizar');
      const atualizado: Doacao = await res.json();
      setDoacao(atualizado);
      setEditando(false);
      setSucesso('Doação atualizada com sucesso!');
      setTimeout(() => setSucesso(''), 3000);
    } catch {
      setErro('Não foi possível salvar as alterações.');
    }
  };

  const handleExcluir = async () => {
    if (!confirm('Deseja excluir esta doação?')) return;
    try {
      const res = await fetch(`${BASE_URL}/doacoes/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erro ao excluir');
      navigate('/doacoes');
    } catch {
      setErro('Não foi possível excluir a doação.');
    }
  };

  if (loading) return <p style={{ padding: '2rem' }}>Carregando...</p>;
  if (!doacao) return <p style={{ padding: '2rem', color: 'red' }}>{erro || 'Doação não encontrada.'}</p>;

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
      <button onClick={() => navigate('/doacoes')} style={{ marginBottom: '1rem', cursor: 'pointer' }}>
        ← Voltar
      </button>
      <h1>Detalhe da Doação #{doacao.id}</h1>

      {sucesso && <p style={{ color: 'green' }}>{sucesso}</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {editando ? (
        <form onSubmit={(e) => { e.preventDefault(); handleSalvar(); }}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="edit-idDoador">ID do Doador</label>
            <input
              id="edit-idDoador"
              value={formData.idDoador}
              onChange={(e) => setFormData({ ...formData, idDoador: e.target.value })}
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="edit-valorDoacao">Valor da Doação (R$)</label>
            <input
              id="edit-valorDoacao"
              type="number"
              step="0.01"
              value={formData.valorDoacao}
              onChange={(e) => setFormData({ ...formData, valorDoacao: e.target.value })}
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="edit-dtDoacao">Data</label>
            <input
              id="edit-dtDoacao"
              type="date"
              value={formData.dtDoacao}
              onChange={(e) => setFormData({ ...formData, dtDoacao: e.target.value })}
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="edit-formaPagamento">Forma de Pagamento</label>
            <input
              id="edit-formaPagamento"
              value={formData.formaPagamento}
              onChange={(e) => setFormData({ ...formData, formaPagamento: e.target.value })}
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="edit-periodicidade">Periodicidade</label>
            <input
              id="edit-periodicidade"
              value={formData.periodicidadePagamento}
              onChange={(e) => setFormData({ ...formData, periodicidadePagamento: e.target.value })}
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <button type="submit" style={{ marginRight: '0.5rem', padding: '0.5rem 1rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
            Salvar
          </button>
          <button type="button" onClick={() => setEditando(false)} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
            Cancelar
          </button>
        </form>
      ) : (
        <dl style={{ lineHeight: 2 }}>
          <dt><strong>ID Doador:</strong></dt>
          <dd>{doacao.idDoador}</dd>
          <dt><strong>Valor:</strong></dt>
          <dd>
            {Number(doacao.valorDoacao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </dd>
          <dt><strong>Data:</strong></dt>
          <dd>{doacao.dtDoacao}</dd>
          <dt><strong>Forma de Pagamento:</strong></dt>
          <dd>{doacao.formaPagamento || '—'}</dd>
          <dt><strong>Periodicidade:</strong></dt>
          <dd>{doacao.periodicidadePagamento || '—'}</dd>
        </dl>
      )}

      {!editando && (
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => setEditando(true)}
            style={{ padding: '0.5rem 1rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
          >
            Editar
          </button>
          <button
            onClick={handleExcluir}
            style={{ padding: '0.5rem 1rem', background: '#dc2626', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
          >
            Excluir
          </button>
        </div>
      )}
    </div>
  );
}
