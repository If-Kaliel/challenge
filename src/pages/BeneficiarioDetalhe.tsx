import { useState, useEffect, type ChangeEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import beneficiarioService from '../services/beneficiarioService';
import { funcionarioService } from '../services/funcionarioService';
import type { Beneficiario } from '../types/Beneficiario';
import type { Funcionario } from '../types/Funcionario';
import { Button, SectionHeader } from '../components';

function parentescoClass(p?: string) {
  const key = (p || 'outros').normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
  const map: Record<string, string> = {
    filho: 'bg-parentesco-filho',
    conjuge: 'bg-parentesco-conjuge',
    pai: 'bg-parentesco-pai',
    mae: 'bg-parentesco-mae',
    outros: 'bg-parentesco-outros',
  };
  return map[key] || map['outros'];
}

function initials(nome?: string) {
  if (!nome) return 'BF';
  return nome.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}

type BeneficiarioComVinculo = Beneficiario & {
  colaboradorId?: string | number | null;
};

type BeneficiarioEditavel = {
  nome: string;
  cpf: string;
  nascimento: string;
  endereco: string;
  telefone: string;
  celular: string;
  email: string;
  parentesco: string;
  observacoes: string;
  colaboradorId: string;
};

export function BeneficiarioDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [beneficiario, setBeneficiario] = useState<BeneficiarioComVinculo | null>(null);
  const [colaborador, setColaborador] = useState<Funcionario | null>(null);
  const [colaboradores, setColaboradores] = useState<Funcionario[]>([]);
  const [formData, setFormData] = useState<BeneficiarioEditavel>({
    nome: '',
    cpf: '',
    nascimento: '',
    endereco: '',
    telefone: '',
    celular: '',
    email: '',
    parentesco: '',
    observacoes: '',
    colaboradorId: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      setActionError(null);
      try {
        const list = await beneficiarioService.listarTodos();
        const found = (list?.find((b) => String(b.id) === id) ?? null) as BeneficiarioComVinculo | null;
        setBeneficiario(found);

        setFormData({
          nome: found?.nome ?? '',
          cpf: found?.cpf ?? '',
          nascimento: found?.nascimento ?? '',
          endereco: found?.endereco ?? '',
          telefone: found?.telefone ?? '',
          celular: found?.celular ?? '',
          email: found?.email ?? '',
          parentesco: found?.parentesco ?? '',
          observacoes: found?.observacoes ?? '',
          colaboradorId: found?.colaboradorId ? String(found.colaboradorId) : '',
        });
        setIsEditing(false);

        const funcionarios = await funcionarioService.listarTodos();
        setColaboradores(funcionarios || []);

        const colaboradorId = found?.colaboradorId;

        if (colaboradorId) {
          try {
            const col = await funcionarioService.buscarPorId(String(colaboradorId));
            setColaborador(col ?? null);
          } catch {
            const cols = await funcionarioService.listarTodos();
            setColaborador(cols?.find((c) => String(c.id) === String(colaboradorId)) ?? null);
          }
        } else {
          setColaborador(null);
        }
      } catch (err) {
        console.error('Erro ao buscar beneficiário:', err);
        setError('Falha ao carregar dados da API.');
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [id]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSave = async () => {
    if (!id) return;

    setSaving(true);
    setActionError(null);

    try {
      const atualizado = await beneficiarioService.atualizar(id, {
        nome: formData.nome.trim(),
        cpf: formData.cpf.trim() || undefined,
        nascimento: formData.nascimento || undefined,
        endereco: formData.endereco.trim() || undefined,
        telefone: formData.telefone.trim() || undefined,
        celular: formData.celular.trim() || undefined,
        email: formData.email.trim() || undefined,
        parentesco: formData.parentesco.trim() || undefined,
        observacoes: formData.observacoes.trim() || undefined,
        colaboradorId: formData.colaboradorId || null,
      } as Partial<Beneficiario> & { colaboradorId?: string | number | null });

      const vinculoAtualizado = formData.colaboradorId
        ? colaboradores.find((c) => String(c.id) === formData.colaboradorId) ?? null
        : null;

      setBeneficiario({ ...(atualizado as BeneficiarioComVinculo), colaboradorId: formData.colaboradorId || null });
      setColaborador(vinculoAtualizado);
      setIsEditing(false);
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : 'Falha ao atualizar o beneficiário.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    const confirmed = window.confirm(`Excluir o beneficiário ${beneficiario?.nome || ''}? Essa ação não pode ser desfeita.`);
    if (!confirmed) return;

    setDeleting(true);
    setActionError(null);

    try {
      await beneficiarioService.deletar(id);
      navigate('/beneficiarios', { replace: true, state: { message: `Beneficiário ${beneficiario?.nome || ''} excluído com sucesso.` } });
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : 'Falha ao excluir o beneficiário.');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-215 mx-auto my-12 px-4 md:px-7 animate-pulse">
        <div className="h-4 bg-border rounded w-24 mb-6" />
        <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-sm">
          <div className="h-40 bg-border" />
          <div className="p-8 space-y-4">
            <div className="h-6 bg-border rounded w-1/2" />
            <div className="h-4 bg-border rounded w-1/3" />
            <div className="h-20 bg-border rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-215 mx-auto my-12 px-4 md:px-7 text-center">
        <p className="text-red-600 text-[0.95rem] mb-4">Erro: {error}</p>
        <Button onClick={() => navigate('/beneficiarios')}>Voltar para Beneficiários</Button>
      </div>
    );
  }

  if (!beneficiario) {
    return (
      <div className="max-w-215 mx-auto my-12 px-4 md:px-7">
        <div className="bg-surface rounded-xl border border-border shadow-sm p-10 text-center">
          <div className="text-[4rem] mb-4"></div>
          <h1 className="text-[1.5rem] font-extrabold text-brand-text mb-2">Beneficiário não encontrado</h1>
          <p className="text-brand-text/70 text-[0.95rem] mb-2">Não existe um beneficiário com o ID <code className="bg-border px-2 py-0.5 rounded font-mono text-primary text-[0.88rem]">{id}</code>.</p>
          <div className="flex flex-col xs:flex-row gap-3 justify-center mt-6">
            <Button onClick={() => navigate('/beneficiarios')}>Ver todos os beneficiários</Button>
            <Button variant="outline" onClick={() => navigate(-1)}>← Voltar</Button>
          </div>
        </div>
      </div>
    );
  }

  const parentesco = beneficiario.parentesco?.trim() || 'Outros';
  const gradClass = parentescoClass(beneficiario.parentesco);
  const mostrandoEdicao = isEditing;

  return (
    <div className="max-w-215 w-full mx-auto my-8 md:my-12 px-4 md:px-7">
      <button onClick={() => navigate('/beneficiarios')} className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-6 hover:gap-3 transition-all duration-200">← Voltar para Beneficiários</button>

      <div className="bg-surface rounded-xl border border-border shadow-md overflow-hidden">
        <div className={`relative px-8 py-12 text-white text-center ${gradClass}`}>
          <div className="pointer-events-none absolute inset-0 bg-radial-white-12" />
          <div className="relative z-10">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-black mx-auto mb-4 shadow-lg border-4 border-white/25 bg-avatar-overlay">{initials(beneficiario.nome)}</div>
            <h1 className="text-[1.8rem] xs:text-[2rem] font-extrabold mb-1">{beneficiario.nome}</h1>
            <p className="text-white/90 text-[1rem] font-medium">{parentesco}</p>
          </div>
        </div>

        <div className="p-7 xs:p-10 grid grid-cols-1 xs:grid-cols-2 gap-8">
          <div>
            <SectionHeader title={mostrandoEdicao ? 'Editar cadastro' : 'Informações'} />
            {mostrandoEdicao ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="edit-nome" className="block text-[0.74rem] font-semibold text-brand-text/60 uppercase tracking-wide mb-1.5">Nome completo</label>
                  <input id="edit-nome" name="nome" value={formData.nome} onChange={handleChange} className="w-full px-4 py-3 border-2 border-border rounded-lg bg-white text-brand-text font-semibold focus:outline-none focus:border-primary" />
                </div>

                <div>
                  <label htmlFor="edit-cpf" className="block text-[0.74rem] font-semibold text-brand-text/60 uppercase tracking-wide mb-1.5">CPF</label>
                  <input id="edit-cpf" name="cpf" value={formData.cpf} onChange={handleChange} className="w-full px-4 py-3 border-2 border-border rounded-lg bg-white text-brand-text font-semibold focus:outline-none focus:border-primary" />
                </div>

                <div>
                  <label htmlFor="edit-endereco" className="block text-[0.74rem] font-semibold text-brand-text/60 uppercase tracking-wide mb-1.5">Endereço</label>
                  <input id="edit-endereco" name="endereco" value={formData.endereco} onChange={handleChange} className="w-full px-4 py-3 border-2 border-border rounded-lg bg-white text-brand-text font-semibold focus:outline-none focus:border-primary" placeholder="Rua, número, bairro, cidade" />
                </div>

                <div>
                  <label htmlFor="edit-nascimento" className="block text-[0.74rem] font-semibold text-brand-text/60 uppercase tracking-wide mb-1.5">Nascimento</label>
                  <input id="edit-nascimento" name="nascimento" type="date" value={formData.nascimento} onChange={handleChange} className="w-full px-4 py-3 border-2 border-border rounded-lg bg-white text-brand-text font-semibold focus:outline-none focus:border-primary" />
                </div>

                <div>
                  <label htmlFor="edit-telefone" className="block text-[0.74rem] font-semibold text-brand-text/60 uppercase tracking-wide mb-1.5">Telefone</label>
                  <input id="edit-telefone" name="telefone" value={formData.telefone} onChange={handleChange} className="w-full px-4 py-3 border-2 border-border rounded-lg bg-white text-brand-text font-semibold focus:outline-none focus:border-primary" />
                </div>

                <div>
                  <label htmlFor="edit-celular" className="block text-[0.74rem] font-semibold text-brand-text/60 uppercase tracking-wide mb-1.5">Celular</label>
                  <input id="edit-celular" name="celular" value={formData.celular} onChange={handleChange} className="w-full px-4 py-3 border-2 border-border rounded-lg bg-white text-brand-text font-semibold focus:outline-none focus:border-primary" placeholder="(00) 00000-0000" />
                </div>

                <div>
                  <label htmlFor="edit-parentesco" className="block text-[0.74rem] font-semibold text-brand-text/60 uppercase tracking-wide mb-1.5">Parentesco</label>
                  <input id="edit-parentesco" name="parentesco" value={formData.parentesco} onChange={handleChange} className="w-full px-4 py-3 border-2 border-border rounded-lg bg-white text-brand-text font-semibold focus:outline-none focus:border-primary" />
                </div>

                <div>
                  <label htmlFor="edit-colaboradorId" className="block text-[0.74rem] font-semibold text-brand-text/60 uppercase tracking-wide mb-1.5">Vínculo (Colaborador)</label>
                  <select id="edit-colaboradorId" name="colaboradorId" value={formData.colaboradorId} onChange={handleChange} className="w-full px-4 py-3 border-2 border-border rounded-lg bg-white text-brand-text font-semibold focus:outline-none focus:border-primary">
                    <option value="">— Sem vínculo —</option>
                    {colaboradores.map((item) => (
                      <option key={item.id} value={String(item.id)}>{item.nome}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="edit-email" className="block text-[0.74rem] font-semibold text-brand-text/60 uppercase tracking-wide mb-1.5">E-mail</label>
                  <input id="edit-email" name="email" type="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border-2 border-border rounded-lg bg-white text-brand-text font-semibold focus:outline-none focus:border-primary" />
                </div>

                <div>
                  <label htmlFor="edit-observacoes" className="block text-[0.74rem] font-semibold text-brand-text/60 uppercase tracking-wide mb-1.5">Observações</label>
                  <textarea id="edit-observacoes" name="observacoes" value={formData.observacoes} onChange={handleChange} rows={4} className="w-full px-4 py-3 border-2 border-border rounded-lg bg-white text-brand-text font-semibold focus:outline-none focus:border-primary resize-y" />
                </div>

                <div className="text-[0.8rem] text-brand-text/60">ID: #{beneficiario.id}</div>
              </div>
            ) : (
              <dl className="space-y-4">
                {[
                  { label: 'ID', value: `#${beneficiario.id}` },
                  { label: 'Nascimento', value: beneficiario.nascimento || '—' },
                  { label: 'Endereço', value: beneficiario.endereco || '—' },
                  { label: 'CPF', value: beneficiario.cpf || '—' },
                  { label: 'Telefone', value: beneficiario.telefone || '—' },
                  { label: 'Celular', value: beneficiario.celular || '—' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <dt className="text-[0.74rem] font-semibold text-brand-text/60 uppercase tracking-wide">{label}</dt>
                    <dd className="text-brand-text font-semibold text-[1rem] truncate">{value}</dd>
                  </div>
                ))}
                {beneficiario.observacoes && (
                  <div className="flex flex-col gap-0.5">
                    <dt className="text-[0.74rem] font-semibold text-brand-text/60 uppercase tracking-wide">Observações</dt>
                    <dd className="text-brand-text font-semibold text-[1rem] whitespace-pre-wrap">{beneficiario.observacoes}</dd>
                  </div>
                )}
              </dl>
            )}
          </div>

          <div>
            <SectionHeader title="Contato & Vínculo" />

            <div className="space-y-3">
              {mostrandoEdicao ? (
                <div className="p-4 bg-white border border-border rounded-xl text-brand-text font-semibold space-y-2">
                  <div className="text-sm text-brand-text/70">Pré-visualização</div>
                  <div className="font-bold">{formData.nome || 'Nome do beneficiário'}</div>
                  <div className="text-sm text-brand-text/70">{formData.parentesco || 'Parentesco'}</div>
                  <div className="text-sm text-brand-text/70">{formData.endereco || 'Endereço'}</div>
                  <div className="text-sm text-brand-text/70">{formData.telefone || 'Telefone'}</div>
                  <div className="text-sm text-brand-text/70">{formData.celular || 'Celular'}</div>
                  <div className="text-sm text-brand-text/70 truncate">{formData.email || 'Nenhum e-mail cadastrado'}</div>
                </div>
              ) : (
                <a href={`mailto:${beneficiario.email || ''}`} className="flex items-center gap-3 p-4 bg-white border border-border rounded-xl text-brand-text font-semibold text-[0.95rem] no-underline transition-all duration-200 hover:border-primary hover:shadow-sm">
                  <span className="text-xl"></span>
                  <span className="truncate">{beneficiario.email || 'Nenhum e-mail cadastrado'}</span>
                </a>
              )}

              {colaborador ? (
                <Link to={`/colaboradores/${colaborador.id}`} className="block no-underline">
                  <div className="p-4 bg-white border border-border rounded-xl text-brand-text font-semibold hover:border-primary transition-all">
                    <div className="text-sm text-brand-text/70">Vínculo</div>
                    <div className="font-bold">{colaborador.nome}</div>
                    <div className="text-xs text-muted">Ver perfil do colaborador →</div>
                  </div>
                </Link>
              ) : (
                <div className="p-4 bg-white border border-border rounded-xl text-brand-text font-semibold">
                  <div className="text-sm text-brand-text/70">Vínculo</div>
                  <div className="font-bold">— Sem vínculo cadastrado</div>
                </div>
              )}

              {actionError && (
                <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-[0.9rem] font-medium"> {actionError}</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-border px-7 xs:px-10 py-5 flex flex-col xs:flex-row gap-3">
          {mostrandoEdicao ? (
            <>
              <Button onClick={handleSave} disabled={saving} id="btn-salvar-edicao-beneficiario">{saving ? 'Salvando...' : 'Salvar alterações'}</Button>
              <Button variant="outline" onClick={() => { setIsEditing(false); setActionError(null); setFormData({ nome: beneficiario.nome, cpf: beneficiario.cpf || '', nascimento: beneficiario.nascimento || '', endereco: beneficiario.endereco || '', telefone: beneficiario.telefone || '', celular: beneficiario.celular || '', email: beneficiario.email || '', parentesco: beneficiario.parentesco || '', observacoes: beneficiario.observacoes || '', colaboradorId: beneficiario.colaboradorId ? String(beneficiario.colaboradorId) : '', }); }}>Cancelar</Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditing(true)} id="btn-editar-beneficiario">Editar cadastro</Button>
              <Button variant="outline" onClick={handleDelete} disabled={deleting} className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300" id="btn-excluir-beneficiario">{deleting ? 'Excluindo...' : 'Excluir cadastro'}</Button>
              <Link to="/beneficiarios" className="no-underline"><Button variant="outline">← Todos os beneficiários</Button></Link>
              <Link to="/dashboard" className="no-underline"><Button variant="ghost"> Ver Dashboard</Button></Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BeneficiarioDetalhe;
