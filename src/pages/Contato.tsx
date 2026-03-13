import { useState } from 'react';
import type { FormEvent } from 'react';

export function Contato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, text: string }>({ type: null, text: '' });

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    
    let valido = true;
    const novosErros: Record<string, string> = {};

    if (!nome.trim()) {
      valido = false;
      novosErros.nome = "Preencha este campo";
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      valido = false;
      novosErros.email = "Digite um e-mail válido";
    }

    if (!mensagem.trim()) {
      valido = false;
      novosErros.mensagem = "Preencha este campo";
    }

    setErrors(novosErros);

    if (valido) {
      const dados = {
        nome,
        email,
        mensagem,
        data: new Date().toLocaleString()
      };

      const registros = JSON.parse(localStorage.getItem("mensagens") || "[]");
      registros.push(dados);
      localStorage.setItem("mensagens", JSON.stringify(registros));

      setStatus({ type: 'success', text: '✓ Mensagem enviada com sucesso!' });
      setNome('');
      setEmail('');
      setMensagem('');
    } else {
      setStatus({ type: 'error', text: 'Corrija os campos destacados.' });
    }
  };

  return (
    <div className="container">
      <main>
        <section className="section">
          <h2>Fale Conosco</h2>
          <p>Entre em contato com o time do Simple Manager para suporte técnico, dúvidas comerciais ou solicitação de demonstração.</p>

          <form id="contact-form" aria-label="Formulário de contato" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                name="name" 
                type="text" 
                placeholder="Seu nome" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                style={{ borderColor: errors.nome ? '#b00020' : '' }}
              />
              {errors.nome && <div className="erro">{errors.nome}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input 
                id="email" 
                name="email" 
                type="text" 
                placeholder="seu@exemplo.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderColor: errors.email ? '#b00020' : '' }}
              />
              {errors.email && <div className="erro">{errors.email}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Mensagem</label>
              <textarea 
                id="message" 
                name="message" 
                rows={4} 
                placeholder="Descreva sua solicitação..."
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                style={{ borderColor: errors.mensagem ? '#b00020' : '' }}
              ></textarea>
              {errors.mensagem && <div className="erro">{errors.mensagem}</div>}
            </div>
            
            <button type="submit">Enviar mensagem</button>
            
            {status.type && (
              <div id="contact-status" aria-live="polite" className={status.type === 'success' ? 'success' : 'erro'}>
                {status.text}
              </div>
            )}
          </form>

          <div className="contact-list" style={{ marginTop: '30px' }}>
            <h3>Redes Sociais</h3>
            <ul aria-label="Redes sociais" style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '15px', marginTop: '10px' }}>
              <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
