import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import {
  Home,
  Equipe,
  Sobre,
  FAQ,
  Contato,
  Solucao,
  MembroDetalhe,
  Colaboradores,
  ColaboradorDetalhe,
  Dashboard,
  NotFound,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

          {/* ===== ROTAS ESTÁTICAS ===== */}
          <Route index                element={<Home />}          />
          <Route path="equipe"        element={<Equipe />}        />
          <Route path="sobre"         element={<Sobre />}         />
          <Route path="faq"           element={<FAQ />}           />
          <Route path="contato"       element={<Contato />}       />
          <Route path="solucao"       element={<Solucao />}       />
          <Route path="colaboradores" element={<Colaboradores />} />
          <Route path="dashboard"     element={<Dashboard />}     />

          {/* ===== ROTAS DINÂMICAS (passagem de parâmetros via :id) ===== */}
          {/* Perfil de integrante: useParams captura :id → exibe dados do membro */}
          <Route path="equipe/:id"         element={<MembroDetalhe />}      />
          {/* Perfil de colaborador: useParams captura :id → busca na lista da API */}
          <Route path="colaboradores/:id"  element={<ColaboradorDetalhe />} />

          {/* ===== ROTA CATCH-ALL — Página 404 com redirect automático ===== */}
          <Route path="*" element={<NotFound />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
