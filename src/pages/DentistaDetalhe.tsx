import { useState, useEffect, type ChangeEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import dentistaService from '../services/dentistaService';
import type { Dentista } from '../types/Dentista';
import { Button, SectionHeader } from '../components';
import { useAuth } from '../context/AuthContext';

type DentistaEditavel = {
  nome: string;
  cro: string;
  especialidade: string;
  email: string;
  telefone: string;
};

function initials(nome: string) {
  if (!nome) return 'DT';
  return nome.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}

export function DentistaDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin, isFuncionario } = useAuth();

  const [dentista, setDentista] = useState<Dentista | null>(null);
  const [formData, setFormData] = useState<DentistaEditavel>({ nome: '', cro: '', especialidade: '', email: '', telefone: '' });
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
        const lista = await dentistaService.listarTodos();
        const encontrado = lista?.find((d) => String(d.id) === id) ?? null;
        setDentista(encontrado);
        setFormData({
          nome: encontrado?.nome ?? '',
          cro: encontrado?.cro ?? '',
          especialidade: encontrado?.especialidade ?? '',
          email: encontrado?.email ?? '',
          telefone: encontrado?.telefone ?? '',
        });
        setIsEditing(false);
      } catch (err) {
        console.error(err);
        setError('Falha ao buscar os dados da API.');
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
      const atualizado = await dentistaService.atualizar(id, {
        nome: formData.nome.trim(),
        cro: formData.cro.trim(),
        especialidade: formData.especialidade.trim(),
        email: formData.email.trim() || undefined,
        telefone: formData.telefone.trim() || undefined,
      });
      setDentista(atualizado);
      setIsEditing(false);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Falha ao atualizar.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !isAdmin) return;
    if (!window.confirm(`Excluir o dentista ${dentista?.nome || ''}? Essa ação não pode ser desfeita.`)) return;
    setDeleting(true);
    setActionError(null);
    try {
      await dentistaService.deletar(id);
      navigate('/dentistas', { replace: true, state: { message: `Dentista ${dentista?.nome || ''} excluído com sucesso.` } });
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
      <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-sm">
        <div className="h-40 bg-border" />
        <div className="p-8 space-y-4">
          <div className="h-6 bg-border rounded w-1/2" />
          <div className="h-4 bg-border rounded w-1/3" />
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="max-w-215 mx-auto my-12 px-4 md:px-7 text-center">
      <p className="text-red-600 text-[0.95rem] mb-4">{error}</p>
      <Button onClick={() => navigate('/dentistas')}>Voltar para Dentistas</Button>
    </div>
  );

  if (!dentista) return (
    <div className="max-w-215 mx-auto my-12 px-4 md:px-7">
      <div className="bg-surface rounded-xl border border-border shadow-sm p-10 text-center">
        <div className="text-[4rem] mb-4"></div>
        <h1 className="text-[1.5rem] font-extrabold text-brand-text mb-2">Dentista não encontrado</h1>
        <p className="text-brand-text/70 text-[0.95rem] mb-6">Não existe um dentista com o ID <code className="bg-border px-2 py-0.5 rounded font-mono text-primary text-[0.88rem]">{id}</code>.</p>
        <div className="flex flex-col xs:flex-row gap-3 justify-center">
          <Button onClick={() => navigate('/dentistas')}>Ver todos os dentistas</Button>
          <Button variant="outline" onClick={() => navigate(-1)}>← Voltar</Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-215 w-full mx-auto my-8 md:my-12 px-4 md:px-7">
      <button
        id="btn-voltar-dentista"
        onClick={() => navigate('/dentistas')}
        className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-6 hover:gap-3 transition-all duration-200"
      >
        ← Voltar para Dentistas
      </button>

      <div className="bg-surface rounded-xl border border-border shadow-md overflow-hidden">
        <div className="relative px-8 py-12 text-white text-center bg-role-dentista">
          <div className="pointer-events-none absolute inset-0 bg-radial-white-12" />
          <div className="relative z-10">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-black mx-auto mb-4 shadow-lg border-4 border-white/25 bg-avatar-overlay">
              {initials(dentista.nome)}
            </div>
            <h1 className="text-[1.8rem] xs:text-[2rem] font-extrabold mb-1">{dentista.nome}</h1>
            <p className="text-white/90 text-[1rem] font-medium">{dentista.especialidade}</p>
          </div>
        </div>

        <div className="p-7 xs:p-10 grid grid-cols-1 xs:grid-cols-2 gap-8">
          <div>
            <SectionHeader title={isEditing ? 'Editar cadastro' : 'Informações'} />
            {isEditing ? (
              <div className="space-y-4">
                {[
                  { id: 'edit-nome', name: 'nome', label: 'Nome completo', value: formData.nome },
                  { id: 'edit-cro', name: 'cro', label: 'CRO', value: formData.cro },
                  { id: 'edit-especialidade', name: 'especialidade', label: 'Especialidade', value: formData.especialidade },
                  { id: 'edit-email', name: 'email', label: 'E-mail', value: formData.email },
                  { id: 'edit-telefone', name: 'telefone', label: 'Telefone', value: formData.telefone },
                ].map(({ id: fId, name, label, value }) => (
                  <div key={name}>
                    <label htmlFor={fId} className="block text-[0.74rem] font-semibold text-brand-text/60 uppercase tracking-wide mb-1.5">{label}</label>
                    <input id={fId} name={name} value={value} onChange={handleChange} className={inputCls} />
                  </div>
                ))}
                <div className="text-[0.8rem] text-brand-text/60">ID: #{dentista.id}</div>
              </div>
            ) : (
              <dl className="space-y-4">
                {[
                  { label: 'ID', value: `#${dentista.id}` },
                  { label: 'CRO', value: dentista.cro },
                  { label: 'Especialidade', value: dentista.especialidade },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <dt className="text-[0.74rem] font-semibold text-brand-text/60 uppercase tracking-wide">{label}</dt>
                    <dd className="text-brand-text font-semibold text-[1rem] truncate">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div>
            <SectionHeader title="Contato" />
            <div className="space-y-3">
              {dentista.email ? (
                <a href={`mailto:${dentista.email}`} className="flex items-center gap-3 p-4 bg-white border border-border rounded-xl text-brand-text font-semibold text-[0.95rem] no-underline hover:border-primary hover:shadow-sm transition-all">
                  <span className="truncate">{dentista.email}</span>
                </a>
              ) : (
                <div className="p-4 bg-white border border-border rounded-xl text-muted text-[0.9rem]">Nenhum e-mail cadastrado</div>
              )}
              {dentista.telefone && (
                <div className="flex items-center gap-3 p-4 bg-white border border-border rounded-xl text-brand-text font-semibold">
                  <span>{dentista.telefone}</span>
                </div>
              )}
              {actionError && (
                <p className="mt-4 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-[0.9rem] font-medium">{actionError}</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-border px-7 xs:px-10 py-5 flex flex-col xs:flex-row gap-3">
          {isEditing ? (
            <>
              <Button onClick={handleSave} disabled={saving} id="btn-salvar-edicao-dentista">
                {saving ? 'Salvando...' : 'Salvar alterações'}
              </Button>
              <Button variant="outline" onClick={() => { setIsEditing(false); setActionError(null); }}>
                Cancelar
              </Button>
            </>
          ) : (
            <>
              {(isAdmin || isFuncionario) && (
                <Button variant="outline" onClick={() => setIsEditing(true)} id="btn-editar-dentista">
                  Editar cadastro
                </Button>
              )}
              {isAdmin && (
                <Button
                  variant="outline"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                  id="btn-excluir-dentista"
                >
                  {deleting ? 'Excluindo...' : 'Excluir cadastro'}
                </Button>
              )}
              <Link to="/dentistas" className="no-underline">
                <Button variant="ghost">← Todos os dentistas</Button>
              </Link>
              <Link to="/dashboard" className="no-underline">
                <Button variant="ghost">Dashboard</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DentistaDetalhe;
