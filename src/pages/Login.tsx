import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, type Papel } from '../context/AuthContext';

const PAPEL_CONFIG: { papel: Papel; label: string }[] = [
  { papel: 'admin',       label: 'Admin'       },
  { papel: 'funcionario', label: 'Funcionário'  },
  { papel: 'dentista',    label: 'Dentista'     },
];

const CREDENCIAL_HINT: Record<Papel, string> = {
  admin:       'admin@clinica.com / admin123',
  funcionario: 'func@clinica.com / func123',
  dentista:    'dentista@clinica.com / dent123',
};

export function Login() {
  const location = useLocation();
  const navigate  = useNavigate();
  const { login, usuario } = useAuth();

  const [papel, setPapel]     = useState<Papel>('funcionario');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Se já estiver logado, redireciona direto para o dashboard
  useEffect(() => {
    if (usuario) navigate('/dashboard');
  }, [usuario, navigate]);

  // Preenche e-mail se vier via state
  useEffect(() => {
    if (location.state?.email) setEmail(location.state.email);
  }, [location]);

  // Limpa erro ao mudar de papel
  useEffect(() => { setLoginError(''); }, [papel]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    const ok = await login(email.trim(), password, papel);

    if (!ok) {
      setLoginError('E-mail ou senha incorretos para este perfil.');
      setLoading(false);
      return;
    }

    navigate('/dashboard');
  };

  const inputBase =
    'block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors sm:text-sm';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-blue-500 selection:text-white">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/60 border border-slate-100 sm:rounded-[2rem] sm:px-10">

          {/* Seleção de Papel */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8 relative gap-1">
            {PAPEL_CONFIG.map(({ papel: p, label }) => (
              <button
                key={p}
                type="button"
                onClick={() => setPapel(p)}
                className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 z-10 ${
                  papel === p
                    ? 'bg-white text-blue-600 shadow-sm border border-slate-200/50'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Hint de credenciais */}
          <div className="mb-5 px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 text-[0.78rem] font-medium text-center">
            {CREDENCIAL_HINT[papel]}
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1.5">
                Endereço de E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <i className="fas fa-envelope text-sm" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputBase}
                  placeholder="exemplo@clinica.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-bold text-slate-700">
                  Senha de Acesso
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <i className="fas fa-lock text-sm" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputBase}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {loginError && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[0.85rem] font-medium">
                {loginError}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-slate-950 hover:bg-blue-600 focus:outline-none transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Entrando...' : 'Entrar no Sistema'}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <Link to="/" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-2">
              <i className="fas fa-arrow-left text-xs" /> Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}