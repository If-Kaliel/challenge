import React, { useState, useEffect } from 'react';

export const Contato: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Efeito para limpar o alerta após 5 segundos
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const form = e.target as HTMLFormElement;
    const data = {
      nome: (form.elements.namedItem('nome') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      mensagem: (form.elements.namedItem('mensagem') as HTMLTextAreaElement).value,
    };

    try {
      const response = await fetch('http://localhost:8080/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Mensagem enviada com sucesso! Nossa equipe entrará em contato.' });
        form.reset();
      } else {
        setStatus({ type: 'error', message: 'Erro ao enviar mensagem. Tente novamente mais tarde.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Erro de conexão com o servidor.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-[1000px] w-full mx-auto">
        
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 font-bold text-xs uppercase tracking-widest mb-4">
            Suporte Técnico
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Como podemos te ajudar?
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto">
            Nossa equipe de especialistas está pronta para analisar sua clínica e resolver qualquer desafio tecnológico.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-900 mb-6">Canais Diretos</h3>
            {[
              { title: 'E-mail de Suporte', val: 'suporte@simplemanager.com' },
              { title: 'Central de Atendimento', val: '+55 (11) 4002-8922' },
              { title: 'Sede em São Paulo', val: 'Rua Maurício Francisco Klabin, 449 | CEP: 04120-020' },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 flex items-center gap-5 transition-transform hover:scale-[1.02]">
                <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" />
                <div>
                  <strong className="block text-slate-900 text-sm">{item.title}</strong>
                  <span className="text-slate-500 text-sm font-medium">{item.val}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
            <h3 className="text-xl font-black text-slate-900 mb-6">Envie uma mensagem</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Bloco de Feedback (Sucesso ou Erro) */}
              {status && (
                <div className={`p-4 rounded-2xl text-sm font-bold animate-in fade-in slide-in-from-top-2 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {status.message}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Seu Nome</label>
                <input name="nome" type="text" placeholder="Como podemos te chamar?" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-sm font-medium text-slate-900" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Seu E-mail</label>
                <input name="email" type="email" placeholder="exemplo@clinica.com" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-sm font-medium text-slate-900" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Sua Mensagem</label>
                <textarea name="mensagem" placeholder="Conte-nos o que você precisa..." rows={4} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-sm font-medium text-slate-900 resize-none" required></textarea>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-slate-950 text-white font-black rounded-2xl shadow-lg shadow-slate-900/20 hover:bg-blue-600 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};