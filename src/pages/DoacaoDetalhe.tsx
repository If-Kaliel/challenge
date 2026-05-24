import { useState, type ChangeEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import doacaoService from '../services/doacaoService';
import type { Doacao } from '../types/Doacao';
import { Button, SectionHeader } from '../components';
import { useAuth } from '../context/AuthContext';

type DoacaoEditavel = {
  idDoador: string;
  valorDoacao: string;
  dtDoacao: string;
};

function formatarValor(valor?: number) {
  if (valor === undefined || valor === null) return '—';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

function formatarData(data?: string) {
  if (!data) return '—';
  try { return new Date(data).toLocaleDateString('pt-BR'); } catch { return data; }
}

export function DoacaoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin, isFuncionario } = useAuth();

  const [doacao, setDoacao] = useState<Doacao | null>(null);
  const [formData, setFormData] = useState<DoacaoEditavel>({ idDoador: '', valorDoacao: '', dtDoacao: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    const buscar = async () => {
      setLoading(true);
      setError(null);
      try {
        const lista = await doacaoService.listarTodos();
        const encontrada = lista?.find((d) => String(d.id) === id) ?? null;
        setDoacao(encontrada);
        setFormData({
          idDoador: encontrada?.idDoador ?? '',
          valorDoacao: String(encontrada?.valorDoacao ?? ''),
          dtDoacao: encontrada?.dtDoacao ?? '',
        });
      } catch (err) {
        setError('Falha ao carregar dados da doação.');
      } finally {
        setLoading(false);
      }
    };
    buscar();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((curr) => ({ ...curr, [name]: value }));
  };

  const handleSave = async () => {
    if (!id) return;
    setSaving(true);
    setActionError(null);
    try {
      const atualizada = await doacaoService.atualizar(id, {
        idDoador: formData.idDoador.trim(),
        valorDoacao: Number(formData.valorDoacao),
        dtDoacao: formData.dtDoacao,
      });
      setDoacao(atualizada);
      setIsEditing(false);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Falha ao atualizar.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !isAdmin) return;
    if (!window.confirm('Excluir esta doação? Essa ação não pode ser desfeita.')) return;
    setDeleting(true);
    try {
      await doacaoService.deletar(id);
      navigate('/doacoes', { replace: true, state: { message: 'Doação excluída com sucesso.' } });
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Falha ao excluir.');
    } finally {
      setDeleting(false);
    }
  };

  const inputCls = 'w-full px-4 py-3 border-2 border-border rounded-lg bg-white text-brand-text font-semibold focus:outline-none focus:border-primary';

  if (loading) return (
    <div className="max-w-215 mx-auto my-12 px-4 md:px-7 animate-pulse">
      <div className="h-4 bg-border rounded w-24 mb-6" />
      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        <div className="h-32 bg-border" />
        <div className="p-8 space-y-4">
          <div className="h-6 bg-border rounded w-1/2" />
        </div>
      </div>
    </div>
  );

  if (error) return (
      <div className="max-w-215 mx-auto my-12 px-4 md:px-7 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => navigate('/doacoes')}>Voltar para Doações</Button>
      </div>
    );

  if (!doacao) return (
      <div className="max-w-215 mx-auto my-12 px-4 md:px-7">
        <div className="bg-surface rounded-xl border border-border shadow-sm p-10 text-center">
          <div className="text-[4rem] mb-4"></div>
          <h1 className="text-[1.5rem] font-extrabold text-brand-text mb-2">Doação não encontrada</h1>
          <p className="text-brand-text/70 mb-6">Não existe uma doação com o ID <code className="bg-border px-2 py-0.5 rounded font-mono text-primary">{id}</code>.</p>
          <Button onClick={() => navigate('/doacoes')}>Ver todas as doações</Button>
        </div>
      </div>
    );

  return (
    <div className="max-w-215 w-full mx-auto my-8 md:my-12 px-4 md:px-7">
      <button onClick={() => navigate('/doacoes')} className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-6 hover:gap-3 transition-all duration-200">
        ← Voltar para Doações
      </button>

      <div className="bg-surface rounded-xl border border-border shadow-md overflow-hidden">
        <div className="relative px-8 py-10 text-white text-center bg-gradient-to-br from-emerald-500 to-teal-600">
          <div className="text-[4rem] mb-2"></div>
          <h1 className="text-[1.8rem] font-extrabold mb-1">{formatarValor(doacao.valorDoacao)}</h1>
          <p className="text-white/90">Doação #{doacao.id} — {formatarData(doacao.dtDoacao)}</p>
        </div>

        <div className="p-7 xs:p-10 grid grid-cols-1 xs:grid-cols-2 gap-8">
          <div>
            <SectionHeader title={isEditing ? 'Editar doação' : 'Informações'} />
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="edit-doador" className="block text-[0.74rem] font-semibold text-brand-text/60 uppercase tracking-wide mb-1.5">ID do Doador</label>
                  <input id="edit-doador" name="idDoador" value={formData.idDoador} onChange={handleChange} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="edit-valor" className="block text-[0.74rem] font-semibold text-brand-text/60 uppercase tracking-wide mb-1.5">Valor (R$)</label>
                  <input id="edit-valor" name="valorDoacao" type="number" step="0.01" value={formData.valorDoacao} onChange={handleChange} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="edit-data" className="block text-[0.74rem] font-semibold text-brand-text/60 uppercase tracking-wide mb-1.5">Data</label>
                  <input id="edit-data" name="dtDoacao" type="date" value={formData.dtDoacao} onChange={handleChange} className={inputCls} />
                </div>
                <div className="text-[0.8rem] text-brand-text/60">ID: #{doacao.id}</div>
              </div>
            ) : (
              <dl className="space-y-4">
                {[
                  { label: 'ID', value: `#${doacao.id}` },
                  { label: 'Doador (ID)', value: doacao.idDoador },
                  { label: 'Valor', value: formatarValor(doacao.valorDoacao) },
                  { label: 'Data', value: formatarData(doacao.dtDoacao) },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <dt className="text-[0.74rem] font-semibold text-brand-text/60 uppercase tracking-wide">{label}</dt>
                    <dd className="text-brand-text font-semibold text-[1rem]">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
          <div>
            {actionError && (
                <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-[0.9rem] font-medium">{actionError}</p>
            )}
          </div>
        </div>

        <div className="border-t border-border px-7 xs:px-10 py-5 flex flex-col xs:flex-row gap-3">
          {isEditing ? (
            <>
              <Button onClick={handleSave} disabled={saving} id="btn-salvar-doacao-edicao">
                {saving ? 'Salvando...' : 'Salvar alterações'}
              </Button>
              <Button variant="outline" onClick={() => { setIsEditing(false); setActionError(null); }}>Cancelar</Button>
            </>
          ) : (
            <>
              {(isAdmin || isFuncionario) && (
                <Button variant="outline" onClick={() => setIsEditing(true)} id="btn-editar-doacao">Editar</Button>
              )}
              {isAdmin && (
                <Button
                  variant="outline"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                  id="btn-excluir-doacao"
                >
                  {deleting ? 'Excluindo...' : 'Excluir'}
                </Button>
              )}
              <Link to="/doacoes" className="no-underline"><Button variant="ghost">← Todas as doações</Button></Link>
              <Link to="/dashboard" className="no-underline"><Button variant="ghost">Dashboard</Button></Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoacaoDetalhe;
