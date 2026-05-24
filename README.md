<div align="center">

# 🏢 Simple Manager

### Sistema de Gestão de Equipes e Recursos Humanos

> Aplicação web desenvolvida na FIAP que centraliza e simplifica os processos de RH, integrando informações de colaboradores, produtividade e comunicação em um único ambiente moderno.

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

</div>

---

## 📋 Descrição do Projeto

O **Simple Manager** é uma aplicação web acadêmica desenvolvida na FIAP com o objetivo de centralizar e simplificar a gestão de pessoas em empresas de todos os tamanhos.

A plataforma oferece:

- 👤 **Cadastro e visualização de colaboradores** — gerenciado via API Java
- 📊 **Dashboard de RH** — indicadores de desempenho e métricas em tempo real
- 🗓️ **Controle de produtividade** — acompanhamento de equipes e departamentos
- 📈 **Relatórios e insights estratégicos** — tomada de decisão baseada em dados
- 💬 **Comunicação integrada** — gestores e equipes em sincronismo

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| **React** | 19.x | Interface e componentização (SPA) |
| **Vite** | 8.x | Bundler, build e servidor de desenvolvimento |
| **TypeScript** | 5.9.x | Tipagem estática obrigatória |
| **TailwindCSS** | 3.x | Estilização responsiva (Mobile, Tablet, Desktop) |
| **React Router DOM** | 7.x | Roteamento de páginas (SPA) |
| **React Hook Form** | 7.x | Validação de formulários |
| **Fetch API** | nativa | Consumo da API Java remota |
| **Vercel** | — | Plataforma de deploy em produção |
| **GitHub** | — | Versionamento de código |

---

## 📁 Estrutura de Pastas

```
challenge/
├── public/                        # Arquivos estáticos públicos
├── src/
│   ├── assets/
│   │   └── img/                   # Imagens do projeto
│   │       ├── Guilherme.jpg      # Foto do integrante Guilherme
│   │       ├── Kaliel.jpg         # Foto do integrante Kaliel
│   │       ├── MatheuxMaciel.jpg  # Foto do integrante Matheus
│   │       ├── Produtividade.jpg  # Imagem da seção Sobre
│   │       └── tdb1.jpg           # Imagem hero da Home
│   ├── components/
│   │   ├── Button.tsx             # Botão reutilizável (primary | outline | ghost)
│   │   ├── Card.tsx               # Card reutilizável (feature | stat | function)
│   │   ├── Footer.tsx             # Rodapé global da aplicação
│   │   ├── Header.tsx             # Cabeçalho com menu responsivo (hamburger mobile)
│   │   ├── Layout.tsx             # Layout compartilhado (Header + Outlet + Footer)
│   │   └── index.ts               # Barrel exports dos componentes
│   ├── hooks/
│   │   ├── useColaboradores.ts    # Hook: fetch + create com loading/error states
│   │   └── index.ts               # Barrel exports dos hooks
│   ├── pages/
│   │   ├── Colaboradores.tsx      # Lista e cadastro de colaboradores (API Java)
│   │   ├── Contato.tsx            # Formulário de contato (React Hook Form)
│   │   ├── Dashboard.tsx          # Dashboard de RH com KPIs e métricas
│   │   ├── Equipe.tsx             # Integrantes do projeto (foto, RM, GitHub, LinkedIn)
│   │   ├── FAQ.tsx                # Perguntas frequentes (accordion)
│   │   ├── Home.tsx               # Página inicial com hero e features
│   │   ├── MembroDetalhe.tsx      # Perfil detalhado do integrante (rota dinâmica :id)
│   │   ├── Sobre.tsx              # Sobre o sistema e a equipe
│   │   ├── Solucao.tsx            # Apresentação da solução proposta
│   │   └── index.ts               # Barrel exports das páginas
│   ├── services/
│   │   ├── api.ts                 # Cliente HTTP base (fetch + ApiError)
│   │   ├── colaboradores.ts       # GET e POST /colaboradores (com mock fallback)
│   │   └── index.ts               # Barrel exports dos serviços
│   ├── types/
│   │   └── index.ts               # Tipos TypeScript compartilhados e da API
│   ├── App.tsx                    # Configuração de rotas (React Router DOM)
│   ├── index.css                  # Design System global + Tailwind CSS
│   └── main.tsx                   # Entry point da aplicação
├── .env                           # Variável VITE_API_URL (desenvolvimento)
├── .gitignore                     # node_modules, dist e .env ignorados
├── index.html                     # HTML base da SPA
├── package.json                   # Dependências e scripts npm
├── postcss.config.js              # Configuração do PostCSS
├── tailwind.config.js             # Design System (cores, fontes, breakpoints)
├── tsconfig.json                  # Configuração do TypeScript
├── vercel.json                    # Rewrite para SPA no deploy da Vercel
└── vite.config.ts                 # Configuração do Vite
```

---

## 🗺️ Rotas da Aplicação

| Rota | Página | Tipo |
|---|---|---|
| `/` | Home — Página inicial | Obrigatória |
| `/equipe` | Integrantes do grupo | Obrigatória |
| `/sobre` | Sobre o sistema | Obrigatória |
| `/faq` | Perguntas Frequentes | Obrigatória |
| `/contato` | Formulário de contato | Obrigatória |
| `/dashboard` | Dashboard de RH — KPIs e métricas | Solução |
| `/colaboradores` | Gestão de colaboradores (API Java) | Solução |
| `/solucao` | Apresentação da solução proposta | Solução |
| `/equipe/:id` | Perfil detalhado do integrante | Dinâmica |

---

## 🖼️ Imagens e Ícones do Projeto

| Arquivo | Uso | Localização |
|---|---|---|
| `tdb1.jpg` | Hero da página inicial | `src/assets/img/` |
| `Produtividade.jpg` | Ilustração da página Sobre | `src/assets/img/` |
| `Kaliel.jpg` | Foto do integrante Kaliel | `src/assets/img/` |
| `MatheuxMaciel.jpg` | Foto do integrante Matheus | `src/assets/img/` |
| `Guilherme.jpg` | Foto do integrante Guilherme | `src/assets/img/` |

> Ícones utilizados na interface são **emojis nativos** (Unicode) e **gradientes CSS** — sem dependências externas de ícones.

---

## 🌐 Como Usar

> A aplicação está hospedada na Vercel e consome a API Java remotamente.

### 🔗 Links do Projeto

| Recurso | Link |
|---|---|
| 🌍 **Aplicação (Vercel)** | [""https://simple-manager-kappa.vercel.app/] |
| 📁 **Repositório GitHub** | [https://github.com/If-Kaliel/challenge](https://github.com/If-Kaliel/challenge) |
| 🎬 **Vídeo de Demonstração (YouTube)** | ⚠️ *Inserir link do vídeo após a gravação* |
|    **Link do render** | https://back-end-simple-manager.onrender.com Service Id: srv-d864t97dl75s739ete30 |

> **Atenção:** Substitua os campos com ⚠️ pelos links reais antes da entrega final.

---

### ▶️ Executar Localmente

**Pré-requisitos:** [Node.js](https://nodejs.org/) v18+ e npm

```bash
# 1. Clone o repositório
git clone https://github.com/If-Kaliel/challenge.git

# 2. Entre na pasta
cd challenge

# 3. Instale as dependências
npm install

# 4. Configure a URL da API Java no arquivo .env
# (crie o arquivo na raiz do projeto)
VITE_API_URL=http://localhost:8080

# 5. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse em: **http://localhost:5173**

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com HMR |
| `npm run build` | Build de produção |
| `npm run preview` | Preview local do build de produção |
| `npm run lint` | Verificação de linting (ESLint) |

---

### 🚀 Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com GitHub
2. Clique em **Add New Project** e selecione o repositório `If-Kaliel/challenge`
3. Configure as variáveis de ambiente em **Settings → Environment Variables**:
   ```
   VITE_API_URL = https://URL_DA_SUA_API_JAVA
   ```
4. Clique em **Deploy** — o `vercel.json` já está configurado para o React Router

---

## 👥 Autores e Créditos

| Foto | Nome | RM | Turma | GitHub | LinkedIn |
|---|---|---|---|---|---|
| <img src="src/assets/img/Kaliel.jpg" width="60" style="border-radius:50%"> | **Kaliel Conceição de Aquino** | 567587 | 1TDSPB | [@If-Kaliel](https://github.com/If-Kaliel) | [LinkedIn](https://www.linkedin.com/in/kaliel-aquino-a034332b6) |
| <img src="src/assets/img/MatheuxMaciel.jpg" width="60" style="border-radius:50%"> | **Matheus Carneiro Maciel** | 567753 | 1TDSPB | [@kakarneiro](https://github.com/kakarneiro) | [LinkedIn](https://www.linkedin.com/in/matheus-carneiro-maciel) |
| <img src="src/assets/img/Guilherme.jpg" width="60" style="border-radius:50%"> | **Guilherme Anitelli Cardoso** | 566744 | 1TDSPB | [@GuilhermeAnitelli](https://github.com/GuilhermeAnitelli) | [LinkedIn](https://www.linkedin.com/in/guilherme-anitelli) |

---

## 📞 Contato

Para dúvidas, sugestões ou suporte técnico sobre o projeto:

| Canal | Link |
|---|---|
| 📧 E-mail | [contato@simplemanager.com](mailto:contato@simplemanager.com) |
| 💼 GitHub da Equipe | [github.com/If-Kaliel](https://github.com/If-Kaliel) |
| 🏫 Instituição | FIAP — Faculdade de Informática e Administração Paulista |
| 📚 Curso | Análise e Desenvolvimento de Sistemas |
| 📅 Ano | 2026 |

---

<div align="center">

**Simple Manager** · Projeto Acadêmico FIAP 2026

Desenvolvido por **Kaliel**, **Matheus** e **Guilherme** · Turma 1TDSPB

</div>
