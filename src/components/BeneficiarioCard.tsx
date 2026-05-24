import { Link } from 'react-router-dom';
import { Card } from './Card';

type BeneficiarioCardProps = {
  id?: string | number;
  nome: string;
  parentesco?: string;
  cpf?: string;
  endereco?: string;
  telefone?: string;
  celular?: string;
  email?: string;
  colaboradorNome?: string;
};

function parentescoBadge(p?: string): string {
  const key = (p || '').normalize('NFD').replace(/\p{Diacritic}/gu, '');
  const map: Record<string, string> = {
    Pai: 'bg-blue-50 text-blue-700 border-blue-300',
    Mae: 'bg-pink-50 text-pink-700 border-pink-300',
    Filho: 'bg-green-50 text-green-700 border-green-300',
    Filha: 'bg-green-50 text-green-700 border-green-300',
    Conjuge: 'bg-purple-50 text-purple-700 border-purple-300',
    Responsavel: 'bg-orange-50 text-orange-700 border-orange-300',
  };
  return map[key] || 'bg-gray-50 text-gray-700 border-gray-300';
}

function initials(nome?: string) {
  if (!nome) return 'BF';
  return nome
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export function BeneficiarioCard({
  id,
  nome,
  parentesco,
  cpf,
  endereco,
  telefone,
  celular,
  email,
  colaboradorNome,
}: BeneficiarioCardProps) {
  return (
    <Card className="group transition-all duration-200 hover:-translate-y-1 hover:shadow-md overflow-hidden">
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white text-base font-black shrink-0 shadow-sm bg-avatar-beneficiario"
          aria-hidden="true"
        >
          {initials(nome)}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-brand-text text-[0.95rem] leading-tight truncate">{nome}</p>
          <p className="text-muted text-[0.82rem] truncate">{parentesco || '—'}</p>
        </div>
      </div>

      <div className="mb-3">
        <span className={`inline-block text-[0.75rem] font-semibold px-2.5 py-0.5 rounded-full border ${parentescoBadge(parentesco)}`}>
          {parentesco || '—'}
        </span>
      </div>

      <p className="block text-[0.82rem] text-muted truncate mb-2" title={email}>
        ✉ {email || 'sem e-mail'}
      </p>

      <div className="text-xs text-muted mb-1">CPF: {cpf || '—'}</div>
      <div className="text-xs text-muted mb-1">Endereço: {endereco || '—'}</div>
      <div className="text-xs text-muted mb-1">Tel: {telefone || celular || '—'}</div>

      {colaboradorNome && <div className="text-xs text-muted mt-2">Vínculo: {colaboradorNome}</div>}

      {id && (
        <Link
          to={`/beneficiarios/${id}`}
          className="mt-3 inline-block w-full text-center text-[0.82rem] font-semibold text-primary border border-primary rounded-lg py-1.5 no-underline transition-all duration-200 hover:bg-primary hover:text-white"
        >
          Ver detalhes →
        </Link>
      )}
    </Card>
  );
}

export default BeneficiarioCard;
