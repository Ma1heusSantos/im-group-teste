# 📝 To Do List - Gerenciador de Tarefas

Aplicação web moderna para gerenciamento de tarefas desenvolvida com **Next.js 15**, **React 18**, **TypeScript** e **Tailwind CSS**.

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

1. Clone o repositório ou navegue até a pasta do projeto:

```bash
cd im-group-teste
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no navegador

### Scripts disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa o linter

## Funcionalidades

### CRUD de Tarefas

- **Criar tarefa** com título, descrição, prioridade e data opcional
- **Listar tarefas** com visual organizado e responsivo
- **Editar tarefas** através de modal intuitivo
- **Excluir tarefas** com confirmação de segurança
- **Marcar/desmarcar como concluída** com um clique

###  Filtros e Busca

- Filtrar por **status** (todas/pendentes/concluídas)
- Filtrar por **prioridade** (todas/baixa/média/alta)
- **Buscar** por título ou descrição
- **Combinar** filtros e busca simultaneamente
- **Ordenação** por data de criação, prioridade, título ou prazo
- Ordenação **crescente/decrescente**

### Persistência

- Salva tarefas no **localStorage**
- Carrega automaticamente ao iniciar
- Mantém dados após refresh da página

###  UX/Design

- Interface **limpa e responsiva** (mobile-first)
- Visual diferenciado para tarefas **concluídas**
- **Cores diferentes** por prioridade (vermelho/amarelo/verde)
- **Feedback visual** com notificações toast
- **Modo claro/escuro** com toggle
- **Contador de tarefas** no cabeçalho
- **Estatísticas** (total, concluídas, pendentes)

###  Página de Detalhes

- Visualização completa da tarefa
- Informações de criação e conclusão
- Edição direta da página de detalhes
- Navegação intuitiva

## Estrutura do Projeto

```
app/
├── components/
│   ├── AddTask.tsx          # Componente de busca, filtros e criação
│   ├── Tasks.tsx             # Lista de tarefas
│   ├── EditTaskModal.tsx     # Modal de edição
│   ├── DeleteConfirmModal.tsx # Modal de confirmação
│   ├── Toast.tsx             # Notificações
│   └── ThemeToggle.tsx       # Toggle de tema
├── tasks/
│   └── [id]/
│       └── page.tsx          # Página de detalhes da tarefa
├── page.tsx                  # Página principal
├── layout.tsx                # Layout global
└── globals.css               # Estilos globais e temas

storage/
└── taskStorage.ts            # Funções de persistência

types/
└── taskType.ts               # Tipos TypeScript
```

## Tecnologias

- **Next.js 15.1.6** - Framework React
- **React 18.3.1** - Biblioteca UI
- **TypeScript 5.7.3** - Tipagem estática
- **Tailwind CSS 4.0.9** - Estilização
- **localStorage** - Persistência de dados

## Funcionalidades Bônus Implementadas

- **Modo claro/escuro** com persistência
- **Contador de tarefas** no header
- **Ordenação** por múltiplos critérios
- **Estatísticas** simples (total, concluídas, pendentes)
- **Feedback visual** com toasts
- **Confirmação de exclusão** com modal

## Notas

- Todos os dados são salvos no `localStorage` do navegador
- O tema escolhido é persistido entre sessões
- A aplicação não requer backend ou banco de dados
- Compatível com todos os navegadores modernos

## Desenvolvido com

- ❤️ React
- ⚡ Next.js
- 🎨 Tailwind CSS
- 📘 TypeScript
