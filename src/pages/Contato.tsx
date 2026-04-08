import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { FormStatus } from '../types';
import { Button } from '../components';

interface ContatoFormData {
  nome: string;
  email: string;
  mensagem: string;
}

type MensagemSalva = ContatoFormData & { data: string };

export function Contato() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<FormStatus>({ type: null, text: '' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContatoFormData>();

  const getMensagensSalvas = (): MensagemSalva[] => {
    try {
      const raw = localStorage.getItem('mensagens');
      if (!raw) {
        return [];
      }

      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const onSubmit: SubmitHandler<ContatoFormData> = (data) => {
    try {
      const registros = getMensagensSalvas();
      const payload: MensagemSalva = {
        nome: data.nome.trim(),
        email: data.email.trim().toLowerCase(),
        mensagem: data.mensagem.trim(),
        data: new Date().toLocaleString(),
      };

      registros.push(payload);
      localStorage.setItem('mensagens', JSON.stringify(registros));

      setStatus({ type: 'success', text: '✓ Mensagem enviada! Redirecionando...' });
      reset();
      setTimeout(() => navigate('/'), 2000);
    } catch {
      setStatus({ type: 'error', text: 'Não foi possível enviar agora. Tente novamente.' });
    }
  };

  const inputBase =
    'w-full px-4 py-3 border-2 border-border rounded-md text-[0.95rem] font-sans text-brand-text bg-[#fafbff] transition-all duration-200 focus:outline-none focus:border-primary focus:shadow-[0_0_0_4px_rgba(79,70,229,0.12)] hover:border-[#c7d2fe]';

  return (
    <div className="max-w-[1140px] w-full mx-auto my-8 md:my-12 px-4 md:px-7">
      <section className="bg-surface rounded-lg p-9 mb-6 shadow-sm border border-border">
        <h2 className="text-[1.5rem] font-bold text-brand-text mb-2 border-l-4 border-primary pl-3.5">
          Fale Conosco
        </h2>
        <p className="text-muted mb-6">
          Entre em contato com o time do Simple Manager para suporte técnico, dúvidas comerciais ou solicitação de demonstração.
        </p>

        <form
          id="contact-form"
          aria-label="Formulário de contato"
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[580px] mx-auto"
        >
          {/* Nome */}
          <div className="mb-5">
            <label htmlFor="name" className="block font-semibold text-[0.9rem] text-brand-text mb-1.5">
              Nome
            </label>
            <input
              id="name"
              type="text"
              placeholder="Seu nome"
              className={`${inputBase} ${errors.nome ? 'border-red-600' : ''}`}
              {...register('nome', {
                required: 'Preencha este campo',
                minLength: {
                  value: 2,
                  message: 'Digite ao menos 2 caracteres',
                },
                validate: (value) =>
                  value.trim().length >= 2 || 'Digite ao menos 2 caracteres',
              })}
            />
            {errors.nome && (
              <p className="text-red-600 text-[0.82rem] mt-1 font-medium">{errors.nome.message}</p>
            )}
          </div>

          {/* E-mail */}
          <div className="mb-5">
            <label htmlFor="email" className="block font-semibold text-[0.9rem] text-brand-text mb-1.5">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu@exemplo.com"
              className={`${inputBase} ${errors.email ? 'border-red-600' : ''}`}
              {...register('email', {
                required: 'Preencha este campo',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Digite um e-mail válido',
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600 text-[0.82rem] mt-1 font-medium">{errors.email.message}</p>
            )}
          </div>

          {/* Mensagem */}
          <div className="mb-5">
            <label htmlFor="message" className="block font-semibold text-[0.9rem] text-brand-text mb-1.5">
              Mensagem
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Descreva sua solicitação..."
              className={`${inputBase} resize-y min-h-[130px] ${errors.mensagem ? 'border-red-600' : ''}`}
              {...register('mensagem', {
                required: 'Preencha este campo',
                minLength: {
                  value: 10,
                  message: 'Digite ao menos 10 caracteres',
                },
                validate: (value) =>
                  value.trim().length >= 10 || 'Digite ao menos 10 caracteres',
              })}
            />
            {errors.mensagem && (
              <p className="text-red-600 text-[0.82rem] mt-1 font-medium">{errors.mensagem.message}</p>
            )}
          </div>

          <Button type="submit" fullWidth>Enviar mensagem</Button>

          {status.type && (
            <div
              id="contact-status"
              aria-live="polite"
              className={`mt-4 px-4 py-3.5 rounded-md text-center font-bold text-[0.95rem] border ${
                status.type === 'success'
                  ? 'bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-800 border-emerald-300'
                  : 'bg-gradient-to-br from-rose-100 to-rose-200 text-rose-800 border-rose-300'
              }`}
            >
              {status.text}
            </div>
          )}
        </form>

        {/* Redes sociais */}
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="text-[0.9rem] font-bold uppercase tracking-[0.08em] text-muted mb-3.5">
            Redes Sociais
          </h3>
          <ul aria-label="Redes sociais" className="list-none p-0 flex gap-2.5 flex-wrap">
            {[
              { href: 'https://www.facebook.com',  label: 'Facebook'  },
              { href: 'https://www.instagram.com', label: 'Instagram' },
              { href: 'https://www.linkedin.com',  label: 'LinkedIn'  },
            ].map(({ href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2 border-2 border-border rounded-full text-primary font-semibold text-[0.88rem] bg-surface no-underline transition-all duration-200 hover:bg-btn-gradient hover:text-white hover:border-transparent hover:shadow-md hover:-translate-y-0.5"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
