import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  const { pathname } = useLocation();

  // useEffect: scroll ao topo sempre que a rota mudar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg text-brand-text font-sans selection:bg-primary selection:text-white">
      {/* Header com z-index alto para ficar sempre visível sobre os gradientes das páginas */}
      <header className="sticky top-0 z-50">
        <Header />
      </header>

      {/* flex-1 garante que o conteúdo empurre o footer para baixo.
        O relative permite que overlays de páginas (como o do Login) 
        se posicionem corretamente dentro do fluxo.
      */}
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}