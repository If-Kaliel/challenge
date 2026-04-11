// Sistema TDB - Integrando Java e database. Aqui ficará o setup inicial preparando o terreno para a sprint 4. Na sprint 4 integraremos o backend com o front.

import { useForm } from 'react-hook-form';

interface CadastroFormData {
  nome: string;
  cpf: string;
  dataNasc: string;
  endereco: string;
}

//Não pretendo estilizar a página agora ou mexer muito nela, quero saber se o console vai funcionar.

//É válido lembrar que a entrega para a TDB em si vai ser diferente deste projeto... Espero uma reformulação para a Sprint 4 para virar a dashboard completa.

export function Cadastro() {

  const { register, handleSubmit, formState: { errors } } = useForm<CadastroFormData>();



  const onSubmit = (data: CadastroFormData) => {

    console.log("Dados prontos para o Java:", data);

    alert("Cadastro simulado com sucesso!");

  };



  return (

    <div className="max-w-[600px] mx-auto my-12 px-6">

      <section className="bg-surface rounded-xl p-8 shadow-lg border border-border">

        <h2 className="text-2xl font-bold text-brand-text mb-6 border-l-4 border-primary pl-4">

          Cadastro de Beneficiário

        </h2>

        

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div>

            <label className="block text-sm font-medium text-muted mb-1">Nome Completo</label>

            <input 

              {...register("nome", { required: "Nome é obrigatório" })}

              className="w-full p-2.5 rounded-lg bg-background border border-border text-brand-text focus:ring-2 focus:ring-primary outline-none transition-all"

              placeholder="Ex: Kaliel Draugen"

            />

            {errors.nome && <span className="text-red-500 text-xs">{errors.nome.message}</span>}

          </div>



          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>

              <label className="block text-sm font-medium text-muted mb-1">CPF</label>

              <input 

                {...register("cpf", { required: "CPF é obrigatório" })}

                className="w-full p-2.5 rounded-lg bg-background border border-border text-brand-text focus:ring-2 focus:ring-primary outline-none"

                placeholder="000.000.000-00"

              />

            </div>

            <div>

              <label className="block text-sm font-medium text-muted mb-1">Data de Nascimento</label>

              <input 

                type="date"

                {...register("dataNasc", { required: true })}

                className="w-full p-2.5 rounded-lg bg-background border border-border text-brand-text focus:ring-2 focus:ring-primary outline-none"

              />

            </div>

          </div>



          <div>

            <label className="block text-sm font-medium text-muted mb-1">Endereço Residencial</label>

            <input 

              {...register("endereco")}

              className="w-full p-2.5 rounded-lg bg-background border border-border text-brand-text focus:ring-2 focus:ring-primary outline-none"

              placeholder="Rua, Número, Bairro..."

            />

          </div>



          <button 

            type="submit"

            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg shadow-md transition-transform active:scale-[0.98]"

          >

            Finalizar Cadastro

          </button>

        </form>

      </section>

    </div>

  );

}