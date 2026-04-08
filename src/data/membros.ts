import kalielImg from '../assets/img/Kaliel.jpg';
import matheusImg from '../assets/img/Matheus Maciel.jpg';
import guilhermeImg from '../assets/img/Guilherme.jpg';

export interface Membro {
  id: string;
  img: string;
  nome: string;
  rm: string;
  turma: string;
  github: string;
  linkedin: string;
  githubLabel: string;
  linkedinLabel: string;
  bio: string;
  habilidades: string[];
}

export const membros: Membro[] = [
  {
    id: 'kaliel',
    img: kalielImg,
    nome: 'Kaliel Conceição de Aquino',
    rm: '567587',
    turma: '1TDSPB',
    github: 'https://github.com/If-Kaliel',
    linkedin: 'https://www.linkedin.com/in/kaliel-aquino-a034332b6',
    githubLabel: 'GitHub Kaliel',
    linkedinLabel: 'LinkedIn Kaliel',
    bio: 'Estudante de Análise e Desenvolvimento de Sistemas na FIAP. Desenvolvedor front-end com interesse em React, TypeScript e experiência do usuário. Responsável pela arquitetura principal do projeto Simple Manager.',
    habilidades: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'Git'],
  },
  {
    id: 'matheus',
    img: matheusImg,
    nome: 'Matheus Carneiro Maciel',
    rm: '567753',
    turma: '1TDSPB',
    github: 'https://github.com/kakarneiro',
    linkedin: 'https://www.linkedin.com/in/matheus-carneiro-maciel',
    githubLabel: 'GitHub Matheus',
    linkedinLabel: 'LinkedIn Matheus',
    bio: 'Estudante de ADS na FIAP com foco em desenvolvimento web e mobile. Contribuiu com a estruturação das páginas e componentização do projeto Simple Manager.',
    habilidades: ['React', 'JavaScript', 'CSS', 'HTML', 'Git'],
  },
  {
    id: 'guilherme',
    img: guilhermeImg,
    nome: 'Guilherme Anitelli',
    rm: '566744',
    turma: '1TDSPB',
    github: 'https://github.com/GuilhermeAnitelli',
    linkedin: 'https://www.linkedin.com/in/guilherme-anitelli',
    githubLabel: 'GitHub Guilherme',
    linkedinLabel: 'LinkedIn Guilherme',
    bio: 'Estudante de ADS na FIAP. Contribuiu com o design e estilização das páginas do projeto, além de auxiliar na validação do formulário de contato.',
    habilidades: ['UI Design', 'CSS', 'React', 'TailwindCSS', 'Git'],
  },
];