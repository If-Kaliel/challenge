import { useState, useEffect, type ChangeEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { funcionarioService } from '../services/funcionarioService';
import type { Funcionario } from '../types/Funcionario';
import { Button, SectionHeader } from '../components';

type FuncionarioDetalhado = Funcionario & {
  departamento?: string;
  email?: string;
};

type FuncionarioEditavel = FuncionarioDetalhado & {
  departamento: string;
  email: string;
};

function departamentoClass(d?: string) {
  const key = (d || 'geral').normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
  const map: Record<string, string> = {
    tecnologia: 'bg-dept-tecnologia',
    'recursos humanos': 'bg-dept-rh',
    produto: 'bg-dept-produto',
    operacoes: 'bg-dept-operacoes',
    financeiro: 'bg-dept-financeiro',
    geral: 'bg-dept-tecnologia',
  };
  return map[key] || map.geral;
}

function initials(nome: string) {
  if (!nome) return 'SM';
  return nome.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}

export function ColaboradorDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [colaborador, setColaborador] = useState<FuncionarioDetalhado | null>(null);
  const [formData, setFormData] = useState<FuncionarioEditavel>({
    id: '',
    nome: '',
    cargo: '',
    departamento: '',
    email: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    const buscarDados = async () => {
      setLoading(true);
      setActionError(null);
      try {
        const lista = await funcionarioService.listarTodos();
        const encontrado = lista?.find((c: Funcionario) => String(c.id) === id);

        const dados = (encontrado as FuncionarioDetalhado) || null;
        setColaborador(dados);
        setFormData({
          id: dados?.id ?? '',
          nome: dados?.nome ?? '',
          cargo: dados?.cargo ?? '',
          departamento: dados?.departamento ?? '',
          email: dados?.email ?? '',
        });
        setIsEditing(false);
      } catch (err: unknown) {
        console.error(err);
        setError('Falha ao buscar os dados da API Java.');
      } finally {
        setLoading(false);
      }
    };

    buscarDados();
  }, [id]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSave = async () => {
    if (!id) return;

    setSaving(true);
    setActionError(null);

    try {
      const atualizado = await funcionarioService.atualizar(
        id,
        {
          nome: formData.nome.trim(),
          cargo: formData.cargo.trim(),
          email: formData.email.trim() || undefined,
          departamento: formData.departamento.trim() || undefined,
        } as Partial<FuncionarioDetalhado>
      );

      setColaborador({
        ...atualizado,
        departamento: formData.departamento.trim(),
        email: formData.email.trim(),
      });
      setIsEditing(false);
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : 'Falha ao atualizar o colaborador.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    const confirmed = window.confirm(
      `Excluir o colaborador ${colaborador?.nome || ''}? Essa ação não pode ser desfeita.`
    );

    if (!confirmed) return;

    setDeleting(true);
    setActionError(null);

    try {
      await funcionarioService.deletar(id);
      navigate('/colaboradores', {
        replace: true,
        state: { message: `Colaborador ${colaborador?.nome || ''} excluído com sucesso.` },
      });
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : 'Falha ao excluir o colaborador.');
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
        <p className="text-red-600 text-[0.95rem] mb-4">Erro ao carregar dados: {error}</p>
        <Button onClick={() => navigate('/colaboradores')}>Voltar para Colaboradores</Button>
      </div>
    );
  }

  if (!colaborador) {
    return (
      <div className="max-w-215 mx-auto my-12 px-4 md:px-7">
        <div className="bg-surface rounded-xl border border-border shadow-sm p-10 text-center">
          <div className="text-[4rem] mb-4"></div>
          <h1 className="text-[1.5rem] font-extrabold text-brand-text mb-2">
            Colaborador não encontrado no Oracle
          </h1>
          <p className="text-brand-text/70 text-[0.95rem] mb-2">
            Não existe um colaborador com o ID <code className="bg-border px-2 py-0.5 rounded font-mono text-primary text-[0.88rem]">{id}</code> no sistema.
          </p>
          <div className="flex flex-col xs:flex-row gap-3 justify-center mt-6">
            <Button onClick={() => navigate('/colaboradores')} id="btn-voltar-lista-colaboradores">
              Ver todos os colaboradores
            </Button>
            <Button variant="outline" onClick={() => navigate(-1)}>
              ← Voltar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const departamentoBruto = colaborador.departamento?.trim() || '';
  const departamento = departamentoBruto || 'Geral';
  const deptClass = departamentoClass(colaborador.departamento);
  const mostrandoEdicao = isEditing;

  return (
    <div className="max-w-215 w-full mx-auto my-8 md:my-12 px-4 md:px-7">
      <button
        id="btn-voltar-colaborador"
        onClick={() => navigate('/colaboradores')}
        className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-6 hover:gap-3 transition-all duration-200"
      >
        ← Voltar para Colaboradores
      </button>

      <div className="bg-surface rounded-xl border border-border shadow-md overflow-hidden">
        <div className={`relative px-8 py-12 text-white text-center ${deptClass}`}>
          <div className="pointer-events-none absolute inset-0 bg-radial-white-12" />
          <div className="relative z-10">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-black mx-auto mb-4 shadow-lg border-4 border-white/25 bg-avatar-overlay">
              {initials(colaborador.nome)}
            </div>
            <h1 className="text-[1.8rem] xs:text-[2rem] font-extrabold mb-1">{colaborador.nome}</h1>
            <p className="text-white/90 text-[1rem] font-medium">{colaborador.cargo}</p>
          </div>
        </div>

        <div className="p-7 xs:p-10 grid grid-cols-1 xs:grid-cols-2 gap-8">
          <div>
            <SectionHeader title={mostrandoEdicao ? 'Editar cadastro' : 'Informações'} />
            {mostrandoEdicao ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="edit-nome" className="block text-[0.74rem] font-semibold text-brand-text/60 uppercase tracking-wide mb-1.5">
                    Nome completo
                  </label>
                  <input
                    id="edit-nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-border rounded-lg bg-white text-brand-text font-semibold focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="edit-cargo" className="block text-[0.74rem] font-semibold text-brand-text/60 uppercase tracking-wide mb-1.5">
                    Cargo
                  </label>
                  <input
                    id="edit-cargo"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-border rounded-lg bg-white text-brand-text font-semibold focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="edit-departamento" className="block text-[0.74rem] font-semibold text-brand-text/60 uppercase tracking-wide mb-1.5">
                    Departamento
                  </label>
                  <input
                    id="edit-departamento"
                    name="departamento"
                    value={formData.departamento}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-border rounded-lg bg-white text-brand-text font-semibold focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="edit-email" className="block text-[0.74rem] font-semibold text-brand-text/60 uppercase tracking-wide mb-1.5">
                    E-mail
                  </label>
                  <input
                    id="edit-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-border rounded-lg bg-white text-brand-text font-semibold focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="text-[0.8rem] text-brand-text/60">
                  ID: #{colaborador.id}
                </div>
              </div>
            ) : (
              <dl className="space-y-4">
                {[
                  { label: 'Departamento', value: departamento },
                  { label: 'Cargo', value: colaborador.cargo },
                  { label: 'ID', value: `#${colaborador.id}` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <dt className="text-[0.74rem] font-semibold text-brand-text/60 uppercase tracking-wide">
                      {label}
                    </dt>
                    <dd className="text-brand-text font-semibold text-[1rem] truncate">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div>
            <SectionHeader title="Contato" />
            {mostrandoEdicao ? (
              <div className="p-4 bg-white border border-border rounded-xl text-brand-text font-semibold space-y-2">
                <div className="text-sm text-brand-text/70">Pré-visualização</div>
                <div className="font-bold">{formData.nome || 'Nome do colaborador'}</div>
                <div className="text-sm text-brand-text/70">{formData.cargo || 'Cargo'}</div>
                <div className="text-sm text-brand-text/70 truncate">{formData.email || 'Nenhum e-mail cadastrado'}</div>
              </div>
            ) : (
              <a
                href={`mailto:${colaborador.email || ''}`}
                className="flex items-center gap-3 p-4 bg-white border border-border rounded-xl text-brand-text font-semibold text-[0.95rem] no-underline transition-all duration-200 hover:border-primary hover:shadow-sm hover:-translate-y-0.5"
              >
                <span className="truncate">{colaborador.email || 'Nenhum e-mail cadastrado'}</span>
              </a>
            )}

            {actionError && (
              <p className="mt-4 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-[0.9rem] font-medium">
                {actionError}
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-border px-7 xs:px-10 py-5 flex flex-col xs:flex-row gap-3">
          {mostrandoEdicao ? (
            <>
              <Button onClick={handleSave} disabled={saving} id="btn-salvar-edicao-colaborador">
                {saving ? 'Salvando...' : 'Salvar alterações'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setActionError(null);
                  setFormData({
                    id: colaborador.id,
                    nome: colaborador.nome,
                    cargo: colaborador.cargo,
                    departamento: colaborador.departamento ?? '',
                    email: colaborador.email ?? '',
                  });
                }}
              >
                Cancelar
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditing(true)} id="btn-editar-colaborador">
                Editar cadastro
              </Button>
              <Button
                variant="outline"
                onClick={handleDelete}
                disabled={deleting}
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                id="btn-excluir-colaborador"
              >
                {deleting ? 'Excluindo...' : 'Excluir cadastro'}
              </Button>
              <Link to="/colaboradores" className="no-underline">
                <Button variant="ghost" id="btn-todos-colaboradores">
                  ← Todos os colaboradores
                </Button>
              </Link>
              <Link to="/dashboard" className="no-underline">
                <Button variant="ghost" id="btn-ir-dashboard">
                  Ver Dashboard
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}