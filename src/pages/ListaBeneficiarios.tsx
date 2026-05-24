import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { funcionarioService } from '../services/funcionarioService';
import { SectionHeader } from '../components';

export function Colaboradores() {
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState<{ texto: string; tipo: 'sucesso' | 'erro' } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensagem(null);

    try {
      await funcionarioService.criar({ nome, cargo });
      setMensagem({ texto: 'Colaborador cadastrado com sucesso no Oracle!', tipo: 'sucesso' });
      setNome('');
      setCargo('');
    } catch (error) {
      console.error(error);
      setMensagem({ texto: 'Erro ao cadastrar. Verifique o console.', tipo: 'erro' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-285 w-full mx-auto my-10 px-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gerenciar Equipe</h1>
          <p className="text-gray-500 mt-1">Adicione novos membros ao sistema Simple Manager</p>
        </div>
        <Link to="/" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition">
          ← Voltar ao Dashboard
        </Link>
      </div>

      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm max-w-2xl">
        <SectionHeader title="Novo Colaborador" accentClassName="border-indigo-500" />

        {mensagem && (
          <div
            className={`p-4 mb-6 rounded-lg font-medium ${
              mensagem.tipo === 'sucesso'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {mensagem.texto}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nome Completo</label>
            <input
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="Ex: Guilherme Anitelli"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Cargo / Função</label>
            <select
              required
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white"
            >
              <option value="" disabled>
                Selecione um cargo...
              </option>
              <option value="Dentista">Dentista</option>
              <option value="Recepcionista">Recepcionista</option>
              <option value="Administrador">Administrador</option>
              <option value="Gerente">Gerente</option>
              <option value="Assistente">Assistente</option>
            </select>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? 'Salvando no Banco...' : 'Cadastrar Colaborador'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
