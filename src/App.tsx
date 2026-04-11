import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import { Home, Equipe, Sobre, FAQ, Contato, Solucao, MembroDetalhe } from './pages';
import { Cadastro } from './pages/Cadastro';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Rotas estáticas */}
          <Route index element={<Home />} />
          <Route path="equipe" element={<Equipe />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contato" element={<Contato />} />
          <Route path="solucao" element={<Solucao />} />
          <Route path="cadastro" element={<Cadastro />} />
          <Route path="equipe/:id" element={<MembroDetalhe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
