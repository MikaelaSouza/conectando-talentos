# ♿ Conectando Talentos

Plataforma digital gratuita e acessível para criação de currículos por pessoas com deficiência, com banco de talentos para empresas inclusivas.

> **Projeto de Extensão Universitária** — Atividade Extensionista II  
> Curso: CST em Análise e Desenvolvimento de Sistemas  
> Município: Rondonópolis, MT

---

## 🚀 Como rodar o projeto do zero (passo a passo)

### 1. Pré-requisitos
- [Node.js 18+](https://nodejs.org) instalado
- Conta no [GitHub](https://github.com)
- Conta no [Supabase](https://supabase.com) (gratuita)
- Conta no [Render](https://render.com) (gratuita)

---

### 2. Configurar o Banco de Dados (Supabase)

1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Clique em **"New Project"** e escolha um nome (ex: `conectando-talentos`)
3. Aguarde o projeto ser criado (~2 minutos)
4. Vá em **SQL Editor** (menu lateral)
5. Copie todo o conteúdo de `docs/schema.sql` e cole no editor
6. Clique em **"Run"** — as tabelas serão criadas
7. Vá em **Settings → API** e copie:
   - `Project URL` → será seu `SUPABASE_URL`
   - `anon public` → será seu `SUPABASE_ANON_KEY`
   - `service_role secret` → será seu `SUPABASE_SERVICE_KEY`

---

### 3. Configurar variáveis de ambiente (local)

Copie o arquivo de exemplo e preencha com seus dados:

```bash
cp .env.example .env
```

Abra o `.env` e preencha:
```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_KEY=eyJhbGciOi...
JWT_SECRET=qualquer_string_secreta_aqui_mude_isso
PORT=3000
```

---

### 4. Instalar dependências e rodar localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) 🎉

---

### 5. Subir para o GitHub

```bash
git init
git add .
git commit -m "primeiro commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/conectando-talentos.git
git push -u origin main
```

---

### 6. Hospedar no Render (deploy gratuito)

1. Acesse [render.com](https://render.com) e crie uma conta
2. Clique em **"New → Web Service"**
3. Conecte com seu GitHub e selecione o repositório
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Runtime:** Node
5. Vá em **Environment** e adicione as variáveis:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY`
   - `JWT_SECRET`
6. Clique em **"Create Web Service"**
7. Aguarde o deploy (~3 minutos) e copie a URL pública!

> ⚠️ O plano free do Render hiberna após 15 min sem uso. Para o trabalho de extensão, basta acessar a URL alguns minutos antes da avaliação para "acordar" o servidor.

---

## 📁 Estrutura do Projeto

```
conectando-talentos/
├── public/                  # Frontend (HTML, CSS, JS)
│   ├── index.html           # Página inicial
│   ├── css/
│   │   └── style.css        # Estilos + acessibilidade
│   ├── js/
│   │   ├── api.js           # Funções para chamar o backend
│   │   └── main.js          # Acessibilidade (fonte, contraste, Libras)
│   └── pages/
│       ├── cadastro.html    # Tela de cadastro (PcD ou Empresa)
│       ├── login.html       # Tela de login
│       ├── curriculo.html   # Formulário do currículo (PcD)
│       └── banco.html       # Banco de currículos (Empresa)
├── server/                  # Backend Node.js
│   ├── index.js             # Servidor Express principal
│   ├── supabase.js          # Cliente do Supabase
│   ├── middleware/
│   │   └── auth.js          # Verificação JWT
│   └── routes/
│       ├── auth.js          # Cadastro e login
│       ├── curriculos.js    # CRUD de currículos
│       ├── empresas.js      # Perfil e favoritos
│       └── pdf.js           # Geração de PDF
├── docs/
│   └── schema.sql           # Script do banco de dados
├── .env.example             # Modelo das variáveis de ambiente
├── render.yaml              # Configuração de deploy
└── package.json
```

---

## 🔗 Rotas da API

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/api/auth/cadastro` | Cria conta (PcD ou Empresa) | ❌ |
| POST | `/api/auth/login` | Faz login | ❌ |
| GET | `/api/curriculos/meu` | Busca meu currículo | ✅ |
| POST | `/api/curriculos` | Salva/atualiza currículo | ✅ PcD |
| GET | `/api/curriculos` | Lista currículos (com filtros) | ✅ Empresa |
| GET | `/api/curriculos/:id` | Detalhe de um currículo | ✅ |
| GET | `/api/pdf/meu` | Gera PDF do currículo | ✅ PcD |
| POST | `/api/empresas` | Salva perfil da empresa | ✅ Empresa |
| POST | `/api/empresas/favoritos/:id` | Favorita um currículo | ✅ Empresa |
| GET | `/api/empresas/favoritos` | Lista favoritos | ✅ Empresa |

---

## ♿ Recursos de Acessibilidade

- **Barra de acessibilidade** em todas as páginas
- **Aumento/redução de fonte** (persiste entre sessões)
- **Alto contraste** (persiste entre sessões)
- **Suporte a VLibras** (Libras — padrão do governo brasileiro)
- **Navegação por teclado** completa com foco visível
- **ARIA labels** em todos os elementos interativos
- **aria-live** para anúncios dinâmicos a leitores de tela
- **Semântica HTML5** correta (header, main, nav, section, article...)
- **Mensagens de erro** associadas aos campos via aria-describedby

---

## 🛠️ Tecnologias

- **Frontend:** HTML5, CSS3, JavaScript puro
- **Backend:** Node.js + Express
- **Banco de dados:** PostgreSQL via Supabase
- **Autenticação:** JWT + bcrypt
- **PDF:** Puppeteer
- **Deploy:** Render
- **Libras:** VLibras (gov.br)

---

## ODS Atendidos

- **ODS 8** — Trabalho decente e crescimento econômico
- **ODS 10** — Redução das desigualdades
