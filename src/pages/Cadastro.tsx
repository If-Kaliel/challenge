// Sistema TDB - Integrando Java e database. Aqui ficará o setup inicial preparando o terreno para a sprint 4. Na sprint 4 integraremos o backend com o front.

import { useForm } from 'react-hook-form';

interface CadastroFormData {
  nome: string;
  cpf: string;
  dataNasc: string;
  endereco: string;
}
