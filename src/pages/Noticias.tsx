import React from 'react';
import noticiaImg from '../assets/img/noticia.jpg'; 
import updateImg from '../assets/img/update.jpg';
import brasiliaImg from '../assets/img/brasilia.jpg'; // Nova imagem

export const Noticias: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-[1200px] w-full mx-auto">
        
        {/* SEÇÃO PRINCIPAL (HERO) - UPDATE DO SISTEMA */}
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-200/20 border border-slate-100 overflow-hidden mb-16">
          <div className="grid lg:grid-cols-2 items-center">
            <div className="p-10 md:p-16 space-y-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 font-black text-xs uppercase tracking-widest">
                System Update v1.2.0
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                O Simple Manager está evoluindo.
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Nossa plataforma acaba de receber uma atualização robusta focada em produtividade. 
                Agora contamos com um módulo completo de CRUD para contatos e integração direta com e-mail, 
                facilitando o dia a dia da nossa equipe.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <span className="block font-black text-blue-600">Integrado</span>
                  <span className="text-sm text-slate-500">API Java & Spring</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <span className="block font-black text-blue-600">Interface</span>
                  <span className="text-sm text-slate-500">React & Tailwind</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-12 flex justify-center items-center">
              <img 
                src={updateImg} 
                alt="Update do Sistema" 
                className="w-full max-w-md transform hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </div>
        </div>

        {/* SEÇÃO DE NOTÍCIAS (IMPACTO SOCIAL) */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-black text-slate-900 italic">Impacto Social TDB</h2>
          <div className="h-1 flex-grow mx-8 bg-slate-200 rounded-full hidden md:block"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Notícia 1: Brasília */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col border border-slate-100 group">
            <div className="overflow-hidden h-64">
              <img 
                src={brasiliaImg} 
                alt="Brasília Reunião" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
            </div>
            <div className="p-8 flex-grow">
              <span className="text-blue-600 font-bold text-sm mb-3 block">Saúde Pública</span>
              <h3 className="text-xl font-black text-slate-900 mb-4">
                TdB cumpre agenda em Brasília e leva odontologia para o debate nacional
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-4">
                A Turma do Bem cumpriu uma série de compromissos em Brasília, visando contribuir com temas importantes da odontologia para o debate de saúde pública brasileiro. Houve reuniões com o vice-presidente Geraldo Alckmin para discussões de políticas públicas para o País.
              </p>
              <a 
                href="https://turmadobem.org.br/blog-turma-do-bem/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 font-black text-sm flex items-center gap-2 hover:gap-4 transition-all"
              >
                LER NOTÍCIA COMPLETA <span className="text-xl">→</span>
              </a>
            </div>
          </div>

          {/* Notícia 2: Mega Triagem */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col border border-slate-100 group">
            <div className="overflow-hidden h-64">
              <img 
                src={noticiaImg} 
                alt="Mega Triagem" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
            </div>
            <div className="p-8 flex-grow">
              <span className="text-blue-600 font-bold text-sm mb-3 block">Ação Social</span>
              <h3 className="text-xl font-black text-slate-900 mb-4">
                Mega Triagem 2024 atende mais de 5.700 jovens em todo o Brasil
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-4">
                A maior rede de voluntariado especializado do mundo realizou uma ação simultânea em 119 cidades brasileiras, selecionando crianças e adolescentes de 11 a 17 anos para tratamento odontológico gratuito e de qualidade.
              </p>
              <a 
                href="https://turmadobem.org.br/blog-turma-do-bem/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 font-black text-sm flex items-center gap-2 hover:gap-4 transition-all"
              >
                LER NOTÍCIA COMPLETA <span className="text-xl">→</span>
              </a>
            </div>
          </div>

        </div>

        {/* FOOTER DE NOTÍCIAS */}
        <div className="mt-16 p-8 bg-slate-900 rounded-[2.5rem] text-center text-white">
          <h4 className="text-xl font-bold mb-2">Quer acompanhar tudo em tempo real?</h4>
          <p className="text-slate-400 mb-6">Siga a Turma do Bem nas redes sociais e veja o impacto de cada sorriso.</p>
          <div className="flex justify-center gap-4">
            <a href="https://www.instagram.com/ongturmadobem/" target="_blank" className="bg-white/10 px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">Instagram</a>
            <a href="https://www.facebook.com/turmadobem" target="_blank" className="bg-white/10 px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">Facebook</a>
          </div>
        </div>
      </div>
    </div>
  );
};