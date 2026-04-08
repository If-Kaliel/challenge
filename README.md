# Simple Manager

Sistema de gestao de equipes desenvolvido para otimizar departamentos de Recursos Humanos, integrando informacoes, produtividade e comunicacao em um unico ambiente.

## Arquitetura Oficial

Este repositorio adota **SPA-only**.

- Aplicacao oficial: React + Vite em `src/`
- Entrada da app: `index.html` + `src/main.tsx`
- Rotas: `src/App.tsx`
- Paginas: `src/pages/`

As paginas HTML legadas foram descontinuadas para simplificar manutencao e evitar duplicidade de navegacao.

## Tecnologias

- React 19
- Vite 8
- TypeScript 5
- Tailwind CSS 3
- React Router DOM 7
- React Hook Form 7

## Como Executar

Pre-requisitos:

- Node.js 18+
- npm

Comandos:

```bash
npm install
npm run dev
```

Build de producao:

```bash
npm run build
npm run preview
```

## Rotas da SPA

- /
- /equipe
- /equipe/:id
- /sobre
- /faq
- /contato
- /solucao

## Scripts

- `npm run dev` inicia servidor local
- `npm run build` gera build de producao
- `npm run preview` abre preview do build
- `npm run lint` executa lint

## Integrantes

- Kaliel Conceicao de Aquino (RM 567587)
- Matheus Carneiro Maciel (RM 567753)
- Guilherme Anitelli (RM 566744)
