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

{/* Kaliel: Rodei validações no terminal para garantir que o TypeScript não acorde de mau humor na maquina do Ale.
  --------------------------------------------------------------------------------------------
  kaliel@Pc MINGW64 ~/VSCodeProjects/challenge (Kaliel)
$ npx tsc --noEmit

kaliel@Pc MINGW64 ~/VSCodeProjects/challenge (Kaliel)
$ npm run lint

> sm-app@0.0.0 lint
> eslint .


kaliel@Pc MINGW64 ~/VSCodeProjects/challenge (Kaliel)
$ npm run build

> sm-app@0.0.0 build
> tsc -b && vite build

vite v8.0.7 building client environment for production...
✓ 47 modules transformed.
computing gzip size...
dist/index.html                            0.94 kB │ gzip:  0.51 kB
dist/assets/Produtividade-2FlofHRw.jpg    22.98 kB
dist/assets/Kaliel-BuHz6tJR.jpg           78.58 kB
dist/assets/Matheus Maciel-CzIIAFRg.jpg   86.07 kB
dist/assets/Guilherme-SrIraq26.jpg       171.31 kB
dist/assets/logo_nome-DHKdp_wY.png       277.26 kB
dist/assets/tdb1-BsVOlqNW.jpg            321.59 kB
dist/assets/index-DSoYUb8Z.css            25.07 kB │ gzip:  5.48 kB
dist/assets/index-DmM90snk.js            291.22 kB │ gzip: 92.47 kB

✓ built in 636ms

kaliel@Pc MINGW64 ~/VSCodeProjects/challenge (Kaliel)
$ */}

/* LOG DE ESTABILIDADE:
  [X] npx tsc --noEmit (Tipagem blindada)
  [X] npm run lint (Código limpo)
  [X] npm run build (Buoild sem erros)
*/