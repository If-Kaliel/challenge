# Simple Manager

> Sistema de gestão de equipes desenvolvido para otimizar departamentos de Recursos Humanos, integrando informações, produtividade e comunicação em um único ambiente.

🔗 **Repositório GitHub:** [https://github.com/If-Kaliel/challenge](https://github.com/If-Kaliel/challenge)

---

## 📋 Descrição do Projeto

O **Simple Manager** é uma aplicação web desenvolvida como projeto acadêmico na FIAP, com o objetivo de centralizar e simplificar os processos de gestão de pessoas em empresas de todos os tamanhos.

A plataforma permite:
- Cadastro e visualização de colaboradores
- Controle de produtividade e desempenho
- Gestão de férias e licenças
- Geração de relatórios e insights estratégicos
- Comunicação integrada entre gestores e equipes

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| **React** | 19.x | Interface e componentização |
| **Vite** | 8.x | Build e performance |
| **TypeScript** | 5.9.x | Tipagem obrigatória no código |
| **TailwindCSS** | 3.x | Estilização de toda a interface |
| **React Router DOM** | 7.x | Navegação entre páginas (SPA) |
| **React Hook Form** | 7.x | Validação de formulários |
| **GitHub** | — | Versionamento obrigatório |

---

## 📁 Estrutura de Pastas

```
challenge/
├── public/                        # Arquivos estáticos públicos
├── src/
│   ├── assets/
│   │   └── img/                   # Imagens do projeto
│   │       ├── Guilherme.jpg
│   │       ├── Kaliel.jpg
│   │       ├── MatheuxMaciel.jpg
│   │       ├── Produtividade.jpg
│   │       └── tdb1.jpg
│   ├── components/
│   │   ├── Button.tsx             # Botão reutilizável (variantes: primary, outline, ghost)
│   │   ├── Card.tsx               # Card reutilizável (variantes: feature, stat, function)
│   │   ├── Footer.tsx             # Rodapé global
│   │   ├── Header.tsx             # Cabeçalho com navegação responsiva
│   │   ├── Layout.tsx             # Layout compartilhado (Header + Outlet + Footer)
│   │   └── index.ts               # Barrel exports dos componentes
│   ├── pages/
│   │   ├── Contato.tsx            # Formulário de contato (React Hook Form)
│   │   ├── Equipe.tsx             # Integrantes do projeto
│   │   ├── FAQ.tsx                # Perguntas frequentes
│   │   ├── Home.tsx               # Página inicial
│   │   ├── MembroDetalhe.tsx      # Perfil detalhado do integrante (rota dinâmica)
│   │   ├── Sobre.tsx              # Sobre o sistema
│   │   ├── Solucao.tsx            # Solução do projeto
│   │   └── index.ts               # Barrel exports das páginas
│   ├── types/
│   │   └── index.ts               # Tipos TypeScript compartilhados
│   ├── App.tsx                    # Configuração de rotas (React Router)
│   ├── index.css                  # Design System global + Tailwind CSS
│   └── main.tsx                   # Entry point da aplicação
├── .gitignore                     # node_modules e dist ignorados
├── index.html                     # HTML base
├── package.json                   # Dependências e scripts
├── postcss.config.js              # Configuração do PostCSS
├── tailwind.config.js             # Configuração do TailwindCSS
├── tsconfig.json                  # Configuração do TypeScript
└── vite.config.ts                 # Configuração do Vite
```

---

## 🗺️ Rotas da Aplicação

| Rota | Página |
|---|---|
| `/` | Home |
| `/equipe` | Integrantes |
| `/sobre` | Sobre |
| `/faq` | FAQ |
| `/contato` | Contato |
| `/solucao` | Solução do Projeto |
| `/colaboradores` | Colaboradores (integração API Java) |
| `/dashboard` | Dashboard de RH (indicadores e métricas) |

---

## 🌐 Como Usar

> A aplicação está disponível em produção na Vercel e já consome a API Java remotamente.

🔗 **URL Pública (Vercel):** [Em breve — será atualizado após o deploy](https://vercel.com)

> ⚠️ Substitua o link acima pela URL real após realizar o deploy na Vercel.

### Variavel de Ambiente da API Java

Crie um arquivo `.env` na raiz com:

```env
VITE_API_URL=https://URL_DA_SUA_API_JAVA
```

Na Vercel, configure essa variável em **Settings → Environment Variables**.

---

## ▶️ Como Executar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior
- npm (já incluído com o Node.js)

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/If-Kaliel/challenge.git

# 2. Entre na pasta do projeto
cd challenge

# 3. Instale as dependências
npm install

# 4. Configure a URL da API no .env
echo VITE_API_URL=http://localhost:8080 > .env

# 5. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse em: **http://localhost:5173**

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com HMR |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build de produção |
| `npm run lint` | Verificação de linting |

---

## 👥 Integrantes do Grupo

| Nome | RM | Turma | GitHub |
|---|---|---|---|
| Kaliel Conceição de Aquino | 567587 | 1TDSPB | [@If-Kaliel](https://github.com/If-Kaliel) |
| Matheus Carneiro Maciel | 567753 | 1TDSPB | [@kakarneiro](https://github.com/kakarneiro) |
| Guilherme Anitelli | 566744 | 1TDSPB | [@GuilhermeAnitelli](https://github.com/GuilhermeAnitelli) |

---

## 🌐 Deploy

A aplicação está disponível em produção na Vercel:

🔗 **URL Pública:** [Em breve — aguardando deploy na Vercel](https://vercel.com)

> ⚠️ O link será atualizado após o deploy obrigatório da Sprint 04.

---

## 🔗 Links Importantes

- **Repositório:** [https://github.com/If-Kaliel/challenge](https://github.com/If-Kaliel/challenge)
- **Instituição:** FIAP — Faculdade de Informática e Administração Paulista
- **Curso:** Análise e Desenvolvimento de Sistemas
- **Ano:** 2026

---

## 📄 Licença

Projeto acadêmico — FIAP 2026. Todos os direitos reservados à equipe Simple Manager.
