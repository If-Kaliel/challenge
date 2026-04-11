import { useForm } from 'react-hook-form';

export function Cadastro() {

  // 1. Hook para Beneficiário
  const { register: regBen, handleSubmit: handBen } = useForm();
  // 2. Hook para Dentista
  const { register: regDen, handleSubmit: handDen } = useForm();
  // 3. Hook para Doação
  const { register: regDoa, handleSubmit: handDoa } = useForm();

  return (
    <div className="max-w-[1140px] mx-auto my-10 px-4">
      <h1 className="text-3xl font-bold text-brand-text mb-8 text-center">Painel de Gestão - Turma do Bem</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* SABEDORIA DO DIA: O usuário quer UI bonitinha e botão arredondado, então entrego isso. Se o console logou, a paz reinou. */}

        
        {/* SEÇÃO: BENEFICIÁRIO */}

        <section className="bg-surface p-6 rounded-xl shadow-md border border-border">
          <h2 className="text-xl font-bold text-primary mb-4 border-b pb-2">Novo Beneficiário</h2>
          <form onSubmit={handBen((data) => console.log("JAVA -> Beneficiário:", data))} className="space-y-4">
            <input {...regBen("nome")} placeholder="Nome Completo" className="w-full p-2 rounded bg-background border border-border text-brand-text" />
            <div className="grid grid-cols-2 gap-2">
              <input {...regBen("cpf")} placeholder="CPF" className="w-full p-2 rounded bg-background border border-border text-brand-text" />
              <input {...regBen("dataNasc")} type="date" className="w-full p-2 rounded bg-background border border-border text-brand-text" />
            </div>
            <button className="w-full bg-primary py-2 rounded text-white font-bold hover:opacity-90">Salvar no Oracle</button>
          </form>
        </section>

        {/* SEÇÃO: DENTISTA */}
        <section className="bg-surface p-6 rounded-xl shadow-md border border-border">
          <h2 className="text-xl font-bold text-accent mb-4 border-b pb-2">Novo Dentista (Voluntário)</h2>
          <form onSubmit={handDen((data) => console.log("JAVA -> Dentista:", data))} className="space-y-4">
            <input {...regDen("nome")} placeholder="Nome do Profissional" className="w-full p-2 rounded bg-background border border-border text-brand-text" />
            <div className="grid grid-cols-2 gap-2">
              <input {...regDen("cro")} placeholder="CRO (Ex: SP-12345)" className="w-full p-2 rounded bg-background border border-border text-brand-text" />
              <input {...regDen("especialidade")} placeholder="Especialidade" className="w-full p-2 rounded bg-background border border-border text-brand-text" />
            </div>
            <button className="w-full bg-accent py-2 rounded text-white font-bold hover:opacity-90">Cadastrar Dentista</button>
          </form>
        </section>

        {/* SEÇÃO: DOAÇÃO  */}
        <section className="bg-surface p-6 rounded-xl shadow-md border border-border lg:col-span-2">
          <h2 className="text-xl font-bold text-green-500 mb-4 border-b pb-2">Registrar Nova Doação</h2>
          <form onSubmit={handDoa((data) => console.log("JAVA -> Doação:", data))} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="text-xs text-muted ml-1">Doador/Empresa</label>
              <input {...regDoa("doador")} className="w-full p-2 rounded bg-background border border-border text-brand-text" />
            </div>
            <div>
              <label className="text-xs text-muted ml-1">Valor (R$)</label>
              <input {...regDoa("valor")} type="number" step="0.01" className="w-full p-2 rounded bg-background border border-border text-brand-text" />
            </div>
            <button className="bg-green-600 py-2 rounded text-white font-bold hover:bg-green-700 transition-colors">Confirmar Recebimento</button>
          </form>
        </section>

      </div>
    </div>
  );
}