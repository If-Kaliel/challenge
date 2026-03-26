# Simple Manager

> Sistema de gestão de equipes desenvolvido para otimizar departamentos de Recursos Humanos, integrando informações, produtividade e comunicação em um único ambiente.

---

## 👥 Equipe

| Nome | RM | Turma |
|---|---|---|
| Kaliel Conceição de Aquino | 567587 | 1TDSPB |
| Matheus Carneiro Maciel | 567753 | 1TDSPB |
| Guilherme Anitelli | 566744 | 1TDSPB |

---

## 🚀 Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 19 | Framework UI |
| TypeScript | 5.9 | Tipagem estática |
| Vite | 8 | Bundler e dev server |
| React Router DOM | 7 | Roteamento SPA |
| CSS Vanilla | — | Estilização com Design System |

---

## 📁 Estrutura do Projeto

```
src/
├── assets/
│   └── img/                  # Imagens do projeto
├── components/
│   ├── Button.tsx             # Componente de botão reutilizável
│   ├── Card.tsx               # Componente de card reutilizável
│   ├── Footer.tsx             # Rodapé global
│   ├── Header.tsx             # Cabeçalho com navegação
│   ├── Layout.tsx             # Layout compartilhado (Header + Outlet + Footer)
│   └── index.ts               # Barrel exports
├── pages/
│   ├── Home.tsx               # Página inicial
│   ├── Equipe.tsx             # Integrantes do projeto
│   ├── Sobre.tsx              # Sobre o sistema
│   ├── FAQ.tsx                # Perguntas frequentes
│   ├── Contato.tsx            # Formulário de contato
│   ├── Solucao.tsx            # Solução do projeto
│   └── index.ts               # Barrel exports
├── types/
│   └── index.ts               # Tipos compartilhados
├── App.tsx                    # Configuração de rotas
├── main.tsx                   # Entry point
└── index.css                  # Design System global
```

---

## 🗺️ Rotas

| Rota | Página |
|---|---|
| `/` | Home |
| `/equipe` | Equipe |
| `/sobre` | Sobre |
| `/faq` | FAQ |
| `/contato` | Contato |
| `/solucao` | Solução do Projeto |

---

## ▶️ Como rodar o projeto

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação e execução

```bash
# Clone o repositório
git clone https://github.com/If-Kaliel/challenge.git
cd challenge

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:5173`.

### Scripts disponíveis

```bash
npm run dev      # Servidor de desenvolvimento com HMR
npm run build    # Build de produção
npm run preview  # Preview do build de produção
npm run lint     # Verificação de linting
```

---

## 🏗️ Arquitetura

O projeto é uma **SPA (Single Page Application)** construída com React + Vite, seguindo os seguintes princípios:

- **Componentização**: componentes reutilizáveis com props tipadas em TypeScript
- **Design System**: variáveis CSS centralizadas em `:root` para consistência visual
- **Responsividade**: breakpoints para 1024px, 768px, 425px, 375px e 320px
- **Acessibilidade**: uso de `aria-label`, `role`, `htmlFor` e hierarquia semântica de headings
- **Roteamento**: navegação client-side sem recarregamento via React Router DOM

---

## 📄 Licença

Projeto acadêmico — FIAP 2026. Todos os direitos reservados.
