import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
// Import other pages once implemented
import { Equipe } from './pages/Equipe';
import { Sobre } from './pages/Sobre';
import { FAQ } from './pages/FAQ';
import { Contato } from './pages/Contato';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="equipe" element={<Equipe />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contato" element={<Contato />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
