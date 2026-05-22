import { Navigate } from 'react-router-dom';
import { useAuth, type Papel } from '../context/AuthContext';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  /** Se informado, apenas esses papéis têm acesso. Se omitido, qualquer logado passa. */
  allowedRoles?: Papel[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(usuario.papel)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
