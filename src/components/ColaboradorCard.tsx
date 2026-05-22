import { Link } from 'react-router-dom';
import { Card } from './Card';

type ColaboradorCardProps = {
  id?: string | number;
  nome: string;
  cargo?: string;
  departamento?: string;
  email?: string;
};

function deptBadge(dept?: string): string {
  const deptStyles: Record<string, string> = {
    RH: 'bg-blue-50 text-blue-700 border-blue-300',
    TI: 'bg-purple-50 text-purple-700 border-purple-300',
    Financeiro: 'bg-green-50 text-green-700 border-green-300',
    Operações: 'bg-orange-50 text-orange-700 border-orange-300',
    Vendas: 'bg-red-50 text-red-700 border-red-300',
    Geral: 'bg-gray-50 text-gray-700 border-gray-300',
  };
  return deptStyles[dept || 'Geral'] || 'bg-gray-50 text-gray-700 border-gray-300';
}

function initials(nome?: string) {
  if (!nome) return 'SM';
  return nome
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export function ColaboradorCard({ id, nome, cargo, departamento, email }: ColaboradorCardProps) {
  return (
    <Card className="group transition-all duration-200 hover:-translate-y-1 hover:shadow-md overflow-hidden">
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white text-base font-black shrink-0 shadow-sm bg-avatar-colaborador"
          aria-hidden="true"
        >
          {initials(nome)}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-brand-text text-[0.95rem] leading-tight truncate">{nome}</p>
          <p className="text-muted text-[0.82rem] truncate">{cargo}</p>
        </div>
      </div>

      <div className="mb-3">
        <span className={`inline-block text-[0.75rem] font-semibold px-2.5 py-0.5 rounded-full border ${deptBadge(departamento)}`}>
          {departamento || 'Geral'}
        </span>
      </div>

      <p className="block text-[0.82rem] text-muted truncate mb-4" title={email}>
        ✉ {email || 'Sem e-mail cadastrado'}
      </p>

      {id && (
        <Link
          to={`/colaboradores/${id}`}
          className="mt-auto inline-block w-full text-center text-[0.82rem] font-semibold text-primary border border-primary rounded-lg py-1.5 no-underline transition-all duration-200 hover:bg-primary hover:text-white"
        >
          Ver perfil completo →
        </Link>
      )}
    </Card>
  );
}

export default ColaboradorCard;
