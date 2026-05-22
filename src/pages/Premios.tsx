import netflixImg from '../assets/img/netflix.png';
import primeImg from '../assets/img/prime.png';
import crunchyrollImg from '../assets/img/crunchyroll.png';
import carrefourImg from '../assets/img/carrefour.jpg';
import milkImg from '../assets/img/voucher-milk.jpg';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const PAPEL_TITULO: Record<string, string> = {
  admin:       'Adm.',
  funcionario: '',
  dentista:    'Dr.',
};

interface RewardCardProps {
  img: string;
  title: string;
  brand: string;
  points: string;
  category: string;
  color: string;
}

function RewardCard({ img, title, brand, points, category, color }: RewardCardProps) {
  return (
    <div className="bg-white rounded-[2rem] shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden group hover:-translate-y-2 transition-all duration-300">
      <div className="h-48 bg-slate-50 p-8 flex items-center justify-center overflow-hidden">
        <img src={img} alt={brand} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform" />
      </div>
      <div className="p-8">
        <div className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 ${color}`}>
          {category}
        </div>
        <h3 className="text-slate-900 font-black text-lg mb-1">{brand}</h3>
        <p className="text-slate-500 text-sm mb-6">{title}</p>
        <div className="flex items-center justify-between border-t border-slate-50 pt-6">
          <span className="text-blue-600 font-black">{points}</span>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-600 transition-colors">
            RESGATAR
          </button>
        </div>
      </div>
    </div>
  );
}

export function Premios() {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  const titulo = PAPEL_TITULO[usuario.papel] ?? '';
  const saudacao = [titulo, usuario.nome].filter(Boolean).join(' ');

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-[1200px] mx-auto">

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-blue-600 font-black text-sm uppercase tracking-tighter">Sua Jornada do Bem</span>

              <h1 className="text-4xl font-black text-slate-900 mt-2 mb-4">
                Olá, {saudacao}!
              </h1>

              <p className="text-slate-500 max-w-md">
                Você está no nível <strong>Embaixador de Sorrisos</strong>. Continue impactando vidas para subir de categoria.
              </p>

              <div className="mt-8 flex gap-6">
                <div>
                  <span className="block text-3xl font-black text-slate-900">2.450</span>
                  <span className="text-xs font-bold text-slate-400 uppercase">Pontos Totais</span>
                </div>
                <div className="w-px h-12 bg-slate-100" />
                <div>
                  <span className="block text-3xl font-black text-blue-600">12</span>
                  <span className="text-xs font-bold text-slate-400 uppercase">Triagens este mês</span>
                </div>
              </div>
            </div>
            <div className="absolute top-[-20px] right-[-20px] text-slate-50 text-[12rem] z-0 opacity-50">
              <i className="fas fa-medal" />
            </div>
          </div>

          <div className="bg-slate-900 p-10 rounded-[2.5rem] shadow-xl text-white flex flex-col justify-center">
            <span className="text-blue-400 font-bold text-xs uppercase mb-2">Próximo Nível</span>
            <h3 className="text-xl font-bold mb-4">Faltam 550 pontos para o Nível Diamante</h3>
            <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full w-[70%]" />
            </div>
            <p className="text-white/40 text-xs mt-4">Dica: Cada nova triagem concluída soma 100 pontos no seu perfil.</p>
          </div>
        </div>

        <h2 className="text-2xl font-black text-slate-900 mb-8 italic">Catálogo Disponível</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <RewardCard img={netflixImg} title="Assinatura Mensal" brand="Netflix" points="1.200 pts" category="Streaming" color="bg-red-50 text-red-600" />
          <RewardCard img={primeImg} title="3 Meses de Assinatura" brand="Amazon Prime" points="2.500 pts" category="Streaming" color="bg-blue-50 text-blue-600" />
          <RewardCard img={crunchyrollImg} title="Premium Anual" brand="Crunchyroll" points="3.000 pts" category="Entertainment" color="bg-orange-50 text-orange-600" />
          <RewardCard img={carrefourImg} title="Voucher R$ 250,00" brand="Carrefour" points="5.000 pts" category="Supermercado" color="bg-blue-50 text-blue-700" />
          <RewardCard img={milkImg} title="Vale-Compras R$ 120,00" brand="Love Milk" points="1.800 pts" category="Voucher" color="bg-rose-50 text-rose-600" />

          <div className="bg-slate-200/50 rounded-[2rem] border-2 border-dashed border-slate-300 flex items-center justify-center p-10 text-center">
            <div>
              <i className="fas fa-lock text-slate-400 text-3xl mb-4" />
              <p className="text-slate-500 font-bold text-sm">Novos prêmios<br />em breve...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Premios;