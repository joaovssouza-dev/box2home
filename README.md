<div align="center">

# 🚛 Box2Home

**Sistema de rastreamento e gestão de entregas para transportadoras regionais**

Projeto desenvolvido para o curso de Análise e Desenvolvimento de Sistemas

</div>

---

## 📌 O Problema

Transportadoras que dependem de planilhas e WhatsApp sofrem com:

- ❌ Falta de visibilidade em tempo real das entregas
- ❌ Dificuldade para informar clientes sobre status
- ❌ Histórico de entregas confuso e difícil de auditar

## 💡 Nossa Solução

O **Box2Home** é um dashboard centralizado com rastreamento GPS, papéis de gestor e motorista, atualizações em tempo real e registro fotográfico de entregas.

## ✨ Funcionalidades

- 👥 Autenticação com dois perfis: **Gestor** e **Motorista**
- 🗺️ Mapa com posição do motorista em tempo real (simulação)
- 📦 Gestão de entregas por rota
- ✅ Confirmação de entrega com um toque (visão motorista)
- 📊 Dashboard com progresso e métricas (visão gestor)
- 🌙 Tema claro/escuro (pré-configurado)
- 🛡️ Row Level Security no banco de dados (Supabase)

## 🛠️ Tecnologias

| Camada | Tecnologia |
|---|---|
| **Frontend** | React 19 + Vite |
| **Estilização** | CSS customizado (design system próprio) |
| **Ícones** | Lucide React |
| **Mapas** | Leaflet / react-leaflet |
| **Backend** | Supabase (PostgreSQL + Auth + Realtime) |
| **Deploy** | Vercel (frontend) + Supabase (gratuito) |

---

## 🚀 Como Rodar Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/box2home.git
cd box2home
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

- Crie um arquivo `.env` na raiz com as chaves do Supabase
- Para testes rápidos, você pode usar o sistema em modo simulação (login hardcoded opcional)

### 4. Execute o projeto

```bash
npm run dev
```

### 5. Acesse no navegador

```
http://localhost:5173
```

---

## 🔐 Acesso para Demonstração

Após configurar o Supabase e criar os usuários via SQL ou pelo formulário de cadastro:

| Perfil | E-mail | Senha |
|---|---|---|
| 👔 Gestor | `gestor@box2home.com` | `123456` |
| 🚚 Motorista | `motorista@box2home.com` | `123456` |

---

## 📊 Como Usar o Sistema

### 👔 Visão do Gestor

1. Faça login com o perfil de gestor
2. Na dashboard, clique em **Iniciar Rastreamento**
3. Acompanhe no mapa o motorista se movendo e as entregas sendo concluídas automaticamente
4. Veja o progresso da rota em tempo real

### 🚚 Visão do Motorista

1. Faça login com o perfil de motorista
2. Visualize a lista de entregas do dia
3. A entrega atual fica em destaque; clique em **Confirmar Entrega** ao finalizar
4. O status é atualizado e o gestor é notificado (simulação)

---

## 🗄️ Estrutura do Banco de Dados

O Supabase gerencia as tabelas `profiles`, `routes`, `deliveries` e `driver_locations`.

As políticas de segurança (RLS) garantem que:

- Gestores veem todas as rotas e entregas
- Motoristas veem apenas suas próprias rotas e podem atualizar status
- Localizações são acessíveis apenas durante a rota ativa

> O script SQL completo está em `supabase/schema.sql`.

---

## 📁 Estrutura do Projeto

```text
src/
├── components/
│   ├── layout/Header.jsx
│   ├── Map/LiveMap.jsx
│   └── ui/
│       ├── Card.jsx
│       └── Icons.jsx
├── config/supabase.js
├── data/mockData.js
├── hooks/
│   ├── useAuth.jsx
│   └── useSimulation.js
├── pages/
│   ├── Auth/ (Login, Register)
│   ├── Gestor/Dashboard.jsx
│   ├── Motorista/RouteView.jsx
│   └── NotFound.jsx
├── styles/theme.css
├── App.jsx
└── main.jsx
```

---

## 🧑‍🏫 Para o Professor

Este projeto foi pensado como um **MVP funcional**, com foco em demonstrar:

- Arquitetura de papéis (gestor x motorista)
- Uso de geolocalização e atualizações em tempo real
- Integração com backend serverless (Supabase)
- Boas práticas de segurança (RLS, autenticação JWT)

Dúvidas? Entre em contato com a equipe.

---

<div align="center">

**Desenvolvido por João Vitor & Murilo**

</div>