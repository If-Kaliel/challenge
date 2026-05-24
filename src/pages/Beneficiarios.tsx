import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { Beneficiario } from '../types/Beneficiario';

interface BeneficiarioFormData {
  nome: string;
  nascimento?: string;
  endereco?: string;
  // campos extras usados apenas no formulário (o back ignora)
  cpf?: string;
  telefone?: string;
  celular?: string;
  email?: string;
  parentesco?: string;
  observacoes?: string;
}

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export function Beneficiarios() {
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BeneficiarioFormData>();

  const carregar = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/beneficiarios`);
      if (!res.ok) throw new Error('Erro ao carregar beneficiários');
      const data: Beneficiario[] = await res.json();
      setBeneficiarios(data);
    } catch {
      setErro('Não foi possível carregar os beneficiários.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const onSubmit: SubmitHandler<BeneficiarioFormData> = async (data) => {
    try {
      // Envia apenas os campos que o back-end Java aceita
      const payload = {
        nome: data.nome || '',
        dtNascimento: data.nascimento || undefined,
        endereco: data.endereco || '',
        idPrograma: 'P1',
      };

      const res = await fetch(`${BASE_URL}/beneficiarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Erro ao cadastrar beneficiário');
      setSucesso('Beneficiário cadastrado com sucesso!');
      setErro('');
      reset();
      await carregar();
      setTimeout(() => setSucesso(''), 3000);
    } catch {
      setErro('Não foi possível cadastrar o beneficiário.');
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Beneficiários</h1>

      {/* Formulário */}
      <section style={{ background: '#f8f9fa', borderRadius: 8, padding: '1.5rem', marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Novo Beneficiário</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="nome">Nome *</label>
            <input
              id="nome"
              type="text"
              {...register('nome', { required: 'Informe o nome' })}
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
            {errors.nome && <p style={{ color: 'red' }}>{errors.nome.message}</p>}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="nascimento">Data de Nascimento</label>
            <input
              id="nascimento"
              type="date"
              {...register('nascimento')}
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="endereco">Endereço</label>
            <input
              id="endereco"
              type="text"
              {...register('endereco')}
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="cpf">CPF</label>
            <input
              id="cpf"
              type="text"
              {...register('cpf')}
              placeholder="000.000.000-00"
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="telefone">Telefone</label>
            <input
              id="telefone"
              type="text"
              {...register('telefone')}
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="celular">Celular</label>
            <input
              id="celular"
              type="text"
              {...register('celular')}
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="parentesco">Parentesco</label>
            <input
              id="parentesco"
              type="text"
              {...register('parentesco')}
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="observacoes">Observações</label>
            <textarea
              id="observacoes"
              {...register('observacoes')}
              rows={3}
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>

          <button
            type="submit"
            style={{ padding: '0.6rem 1.5rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
          >
            Cadastrar
          </button>
        </form>

        {sucesso && <p style={{ color: 'green', marginTop: '1rem' }}>{sucesso}</p>}
        {erro && <p style={{ color: 'red', marginTop: '1rem' }}>{erro}</p>}
      </section>

      {/* Listagem */}
      <section>
        <h2>Lista de Beneficiários</h2>
        {loading ? (
          <p>Carregando...</p>
        ) : beneficiarios.length === 0 ? (
          <p>Nenhum beneficiário cadastrado.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ background: '#e2e8f0' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Nome</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Data de Nascimento</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Endereço</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Programa</th>
              </tr>
            </thead>
            <tbody>
              {beneficiarios.map((b) => (
                <tr key={b.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem' }}>{b.nome}</td>
                  <td style={{ padding: '0.75rem' }}>{b.dtNascimento || '—'}</td>
                  <td style={{ padding: '0.75rem' }}>{b.endereco || '—'}</td>
                  <td style={{ padding: '0.75rem' }}>{b.idPrograma || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
