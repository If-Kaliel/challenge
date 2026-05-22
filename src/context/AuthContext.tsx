import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Papel = 'admin' | 'funcionario' | 'dentista';

export interface Usuario {
  nome: string;
  email: string;
  papel: Papel;
}

interface AuthContextType {
  usuario: Usuario | null;
  login: (email: string, senha: string, papel: Papel) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  isFuncionario: boolean;
  isDentista: boolean;
  podeGerenciarColaboradores: boolean;
  podeGerenciarDentistas: boolean;
  podeGerenciarBeneficiarios: boolean;
  podeGerenciarDoacoes: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

/** Credenciais mock — substitua por chamada real de auth quando disponível */
const CREDENCIAIS: Record<Papel, { email: string; senha: string; nome: string }> = {
  admin: { email: 'admin@clinica.com', senha: 'admin123', nome: 'Administrador' },
  funcionario: { email: 'func@clinica.com', senha: 'func123', nome: 'Funcionário' },
  dentista: { email: 'dentista@clinica.com', senha: 'dent123', nome: 'Dr. Dentista' },
};

function salvarUsuario(u: Usuario) {
  localStorage.setItem('usuario', JSON.stringify(u));
}

function carregarUsuario(): Usuario | null {
  try {
    const raw = localStorage.getItem('usuario');
    if (!raw) return null;
    // Suporte ao formato legado (string simples)
    if (!raw.startsWith('{')) return null;
    return JSON.parse(raw) as Usuario;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => carregarUsuario());

  useEffect(() => {
    const sync = () => setUsuario(carregarUsuario());
    window.addEventListener('authChange', sync);
    return () => window.removeEventListener('authChange', sync);
  }, []);

  const login = async (email: string, senha: string, papel: Papel): Promise<boolean> => {
    const cred = CREDENCIAIS[papel];

    // Valida: e-mail E senha devem bater com o papel escolhido
    const emailOk = email.trim().toLowerCase() === cred.email.toLowerCase();
    const senhaOk = senha === cred.senha;

    if (!emailOk || !senhaOk) return false;

    const u: Usuario = { nome: cred.nome, email: cred.email, papel };
    salvarUsuario(u);
    setUsuario(u);
    window.dispatchEvent(new Event('authChange'));
    return true;
  };

  const logout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    window.dispatchEvent(new Event('authChange'));
  };

  const papel = usuario?.papel ?? null;

  const value: AuthContextType = {
    usuario,
    login,
    logout,
    isAdmin: papel === 'admin',
    isFuncionario: papel === 'funcionario',
    isDentista: papel === 'dentista',
    // Admin: tudo; Funcionário: dentistas, beneficiários, doações; Dentista: só beneficiários
    podeGerenciarColaboradores: papel === 'admin',
    podeGerenciarDentistas: papel === 'admin' || papel === 'funcionario',
    podeGerenciarBeneficiarios: papel === 'admin' || papel === 'funcionario' || papel === 'dentista',
    podeGerenciarDoacoes: papel === 'admin' || papel === 'funcionario',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return ctx;
}
