import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import {
  Home,
  Login,
  FAQ,
  Contato,
  Dashboard,
  Colaboradores,
  ColaboradorDetalhe,
  Beneficiarios,
  BeneficiarioDetalhe,
  Noticias,
  Premios,
  NotFound,
  Sobre,
  Equipe,
} from './pages';
import { Dentistas } from './pages/Dentistas';
import { DentistaDetalhe } from './pages/DentistaDetalhe';
import { Doacoes } from './pages/Doacoes';
import { DoacaoDetalhe } from './pages/DoacaoDetalhe';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* ── Rotas Públicas ── */}
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="sobre" element={<Sobre />} />
            <Route path="equipe" element={<Equipe />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="contato" element={<Contato />} />
            <Route path="noticias" element={<Noticias />} />
            <Route path="premios" element={<Premios />} />

            {/* ── Rotas Protegidas — qualquer papel logado ── */}
            <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

            {/* Beneficiários — admin, funcionário e dentista */}
            <Route path="beneficiarios" element={<ProtectedRoute allowedRoles={['admin', 'funcionario', 'dentista']}><Beneficiarios /></ProtectedRoute>} />
            <Route path="beneficiarios/:id" element={<ProtectedRoute allowedRoles={['admin', 'funcionario', 'dentista']}><BeneficiarioDetalhe /></ProtectedRoute>} />

            {/* Colaboradores — apenas admin */}
            <Route path="colaboradores" element={<ProtectedRoute allowedRoles={['admin']}><Colaboradores /></ProtectedRoute>} />
            <Route path="colaboradores/:id" element={<ProtectedRoute allowedRoles={['admin']}><ColaboradorDetalhe /></ProtectedRoute>} />

            {/* Dentistas — admin e funcionário */}
            <Route path="dentistas" element={<ProtectedRoute allowedRoles={['admin', 'funcionario']}><Dentistas /></ProtectedRoute>} />
            <Route path="dentistas/:id" element={<ProtectedRoute allowedRoles={['admin', 'funcionario']}><DentistaDetalhe /></ProtectedRoute>} />

            {/* Doações — admin e funcionário */}
            <Route path="doacoes" element={<ProtectedRoute allowedRoles={['admin', 'funcionario']}><Doacoes /></ProtectedRoute>} />
            <Route path="doacoes/:id" element={<ProtectedRoute allowedRoles={['admin', 'funcionario']}><DoacaoDetalhe /></ProtectedRoute>} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;