## Conectando Talentos

O **Conectando Talentos** é uma plataforma web inclusiva desenvolvida com o objetivo de facilitar a criação de currículos e ampliar a conexão entre **pessoas com deficiência (PcD)** e **empresas que buscam profissionais e valorizam a inclusão**.

O projeto foi desenvolvido como um **Projeto de Extensão Acadêmica**, aplicando conhecimentos de desenvolvimento web na construção de uma solução com impacto social, acessibilidade e inclusão digital.

---

## Objetivo do projeto

Pessoas com deficiência ainda enfrentam diferentes barreiras no acesso ao mercado de trabalho, inclusive na utilização de plataformas digitais e ferramentas para criação e divulgação de currículos.

O **Conectando Talentos** busca contribuir para reduzir essas barreiras oferecendo uma plataforma simples e acessível onde usuários podem criar seu currículo profissional e disponibilizá-lo para empresas.

A aplicação também permite que empresas encontrem profissionais por meio de filtros e salvem candidatos de interesse.

---

## Funcionalidades

### Para candidatos

- Cadastro e autenticação de usuários;
- Criação e atualização de currículo;
- Cadastro de informações pessoais e profissionais;
- Registro de:
  - experiências profissionais;
  - formação acadêmica;
  - habilidades;
  - idiomas;
  - objetivo profissional;
- Informações relacionadas às necessidades de acessibilidade;
- Controle da visibilidade do currículo para empresas;
- Geração e download do currículo em **PDF**.

### Para empresas

- Cadastro e autenticação;
- Criação de perfil empresarial;
- Visualização de currículos disponíveis;
- Busca de candidatos;
- Filtros por informações como:
  - cidade;
  - tipo de deficiência;
  - habilidades;
- Visualização detalhada dos currículos;
- Adição e remoção de candidatos dos favoritos.

---

## Acessibilidade

A acessibilidade é um dos principais objetivos do projeto.

A plataforma possui recursos desenvolvidos para tornar a navegação mais inclusiva, como:

- Aumento e redução do tamanho da fonte;
- Modo de alto contraste;
- Integração com **VLibras**;
- Uso de atributos semânticos e recursos ARIA;
- Estrutura de navegação pensada para facilitar o acesso ao conteúdo.

Esses recursos buscam proporcionar uma experiência mais acessível para diferentes perfis de usuários.

---

## Tecnologias utilizadas

### Frontend

- HTML5
- CSS3
- JavaScript
- jsPDF

### Backend

- Node.js
- Express.js
- API REST

### Banco de dados

- Supabase
- PostgreSQL

### Autenticação e segurança

- JSON Web Token (JWT)
- bcrypt.js

### Outros recursos

- VLibras
- CORS
- dotenv

---

## Arquitetura do projeto

O projeto possui uma arquitetura dividida entre frontend, backend e banco de dados.

```text
conectando-talentos/
│
├── api/
│   └── index.js
│
├── docs/
│   └── schema.sql
│
├── public/
│   ├── css/
│   ├── js/
│   ├── pages/
│   └── index.html
│
├── server/
│   ├── middleware/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── curriculos.js
│   │   ├── empresas.js
│   │   └── pdf.js
│   ├── index.js
│   └── supabase.js
│
├── .env.example
├── package.json
├── render.yaml
└── vercel.json
```

---

## Autenticação

A aplicação utiliza autenticação baseada em **JWT (JSON Web Token)**.

As senhas dos usuários são protegidas utilizando **bcrypt**, evitando o armazenamento de senhas em texto puro.

Existem dois tipos principais de usuários:

| Tipo de usuário | Funcionalidades |
| --- | --- |
| **PcD** | Cria e gerencia seu currículo |
| **Empresa** | Pesquisa e visualiza candidatos |

---

## Banco de dados

O banco de dados utiliza **Supabase/PostgreSQL**.

Entre as principais entidades estão:

- `usuarios`
- `curriculos`
- `empresas`
- `favoritos`

A estrutura permite relacionar usuários aos seus currículos ou perfis empresariais e possibilita que empresas salvem candidatos como favoritos.

---

## API

A aplicação possui uma **API REST** desenvolvida com **Node.js e Express**.

As principais rotas da aplicação estão organizadas em:

```text
/api/auth
/api/curriculos
/api/empresas
```

### Autenticação

| Método | Endpoint |
| --- | --- |
| `POST` | `/api/auth/cadastro` |
| `POST` | `/api/auth/login` |

### Currículos

| Método | Endpoint |
| --- | --- |
| `GET` | `/api/curriculos/meu` |
| `POST` | `/api/curriculos` |
| `GET` | `/api/curriculos` |
| `GET` | `/api/curriculos/:id` |

### Empresas

| Método | Endpoint |
| --- | --- |
| `GET` | `/api/empresas/meu` |
| `POST` | `/api/empresas` |
| `GET` | `/api/empresas/favoritos` |
| `POST` | `/api/empresas/favoritos/:curriculoId` |
| `DELETE` | `/api/empresas/favoritos/:curriculoId` |

---

## Como executar o projeto

### Pré-requisitos

Antes de começar, você precisa ter instalado:

- Node.js
- npm
- Uma conta e um projeto configurado no Supabase

### 1. Clone o repositório

```bash
git clone https://github.com/MikaelaSouza/conectando-talentos.git
```

### 2. Entre na pasta do projeto

```bash
cd conectando-talentos
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` com base no arquivo `.env.example`.

Configure as credenciais necessárias para conexão com o Supabase e autenticação JWT.

> Nunca envie suas credenciais ou o arquivo `.env` para o GitHub.

### 5. Configure o banco de dados

O script de criação das tabelas está disponível em:

```text
docs/schema.sql
```

Execute o script no banco de dados para criar a estrutura necessária para a aplicação.

### 6. Execute o projeto

Para iniciar o projeto em ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível, por padrão, em:

```text
http://localhost:3000
```

---

## Aprendizados

Durante o desenvolvimento deste projeto foram aplicados e aprofundados conhecimentos em:

- Desenvolvimento frontend com HTML, CSS e JavaScript;
- Criação de APIs REST com Node.js e Express;
- Integração entre frontend e backend;
- Persistência de dados com Supabase/PostgreSQL;
- Autenticação utilizando JWT;
- Proteção de senhas com bcrypt;
- Modelagem de banco de dados;
- Desenvolvimento de funcionalidades para diferentes perfis de usuários;
- Geração de documentos PDF no navegador;
- Boas práticas de acessibilidade web;
- Desenvolvimento de uma solução tecnológica com foco em inclusão social.# Conectando Talentos

O **Conectando Talentos** é uma plataforma web inclusiva desenvolvida com o objetivo de facilitar a criação de currículos e ampliar a conexão entre **pessoas com deficiência (PcD)** e **empresas que buscam profissionais e valorizam a inclusão**.

O projeto foi desenvolvido como um **Projeto de Extensão Acadêmica**, aplicando conhecimentos de desenvolvimento web na construção de uma solução com impacto social, acessibilidade e inclusão digital.

---

## Objetivo do projeto

Pessoas com deficiência ainda enfrentam diferentes barreiras no acesso ao mercado de trabalho, inclusive na utilização de plataformas digitais e ferramentas para criação e divulgação de currículos.

O **Conectando Talentos** busca contribuir para reduzir essas barreiras oferecendo uma plataforma simples e acessível onde usuários podem criar seu currículo profissional e disponibilizá-lo para empresas.

A aplicação também permite que empresas encontrem profissionais por meio de filtros e salvem candidatos de interesse.

---

## Funcionalidades

### Para candidatos

- Cadastro e autenticação de usuários;
- Criação e atualização de currículo;
- Cadastro de informações pessoais e profissionais;
- Registro de:
  - experiências profissionais;
  - formação acadêmica;
  - habilidades;
  - idiomas;
  - objetivo profissional;
- Informações relacionadas às necessidades de acessibilidade;
- Controle da visibilidade do currículo para empresas;
- Geração e download do currículo em **PDF**.

### Para empresas

- Cadastro e autenticação;
- Criação de perfil empresarial;
- Visualização de currículos disponíveis;
- Busca de candidatos;
- Filtros por informações como:
  - cidade;
  - tipo de deficiência;
  - habilidades;
- Visualização detalhada dos currículos;
- Adição e remoção de candidatos dos favoritos.

---

## Acessibilidade

A acessibilidade é um dos principais objetivos do projeto.

A plataforma possui recursos desenvolvidos para tornar a navegação mais inclusiva, como:

- Aumento e redução do tamanho da fonte;
- Modo de alto contraste;
- Integração com **VLibras**;
- Uso de atributos semânticos e recursos ARIA;
- Estrutura de navegação pensada para facilitar o acesso ao conteúdo.

Esses recursos buscam proporcionar uma experiência mais acessível para diferentes perfis de usuários.

---

## Tecnologias utilizadas

### Frontend

- HTML5
- CSS3
- JavaScript
- jsPDF

### Backend

- Node.js
- Express.js
- API REST

### Banco de dados

- Supabase
- PostgreSQL

### Autenticação e segurança

- JSON Web Token (JWT)
- bcrypt.js

### Outros recursos

- VLibras
- CORS
- dotenv

---

## Arquitetura do projeto

O projeto possui uma arquitetura dividida entre frontend, backend e banco de dados.

```text
conectando-talentos/
│
├── api/
│   └── index.js
│
├── docs/
│   └── schema.sql
│
├── public/
│   ├── css/
│   ├── js/
│   ├── pages/
│   └── index.html
│
├── server/
│   ├── middleware/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── curriculos.js
│   │   ├── empresas.js
│   │   └── pdf.js
│   ├── index.js
│   └── supabase.js
│
├── .env.example
├── package.json
├── render.yaml
└── vercel.json
```

---

## Autenticação

A aplicação utiliza autenticação baseada em **JWT (JSON Web Token)**.

As senhas dos usuários são protegidas utilizando **bcrypt**, evitando o armazenamento de senhas em texto puro.

Existem dois tipos principais de usuários:

| Tipo de usuário | Funcionalidades |
| --- | --- |
| **PcD** | Cria e gerencia seu currículo |
| **Empresa** | Pesquisa e visualiza candidatos |

---

## Banco de dados

O banco de dados utiliza **Supabase/PostgreSQL**.

Entre as principais entidades estão:

- `usuarios`
- `curriculos`
- `empresas`
- `favoritos`

A estrutura permite relacionar usuários aos seus currículos ou perfis empresariais e possibilita que empresas salvem candidatos como favoritos.

---

## API

A aplicação possui uma **API REST** desenvolvida com **Node.js e Express**.

As principais rotas da aplicação estão organizadas em:

```text
/api/auth
/api/curriculos
/api/empresas
```

### Autenticação

| Método | Endpoint |
| --- | --- |
| `POST` | `/api/auth/cadastro` |
| `POST` | `/api/auth/login` |

### Currículos

| Método | Endpoint |
| --- | --- |
| `GET` | `/api/curriculos/meu` |
| `POST` | `/api/curriculos` |
| `GET` | `/api/curriculos` |
| `GET` | `/api/curriculos/:id` |

### Empresas

| Método | Endpoint |
| --- | --- |
| `GET` | `/api/empresas/meu` |
| `POST` | `/api/empresas` |
| `GET` | `/api/empresas/favoritos` |
| `POST` | `/api/empresas/favoritos/:curriculoId` |
| `DELETE` | `/api/empresas/favoritos/:curriculoId` |

---

## Como executar o projeto

### Pré-requisitos

Antes de começar, você precisa ter instalado:

- Node.js
- npm
- Uma conta e um projeto configurado no Supabase

### 1. Clone o repositório

```bash
git clone https://github.com/MikaelaSouza/conectando-talentos.git
```

### 2. Entre na pasta do projeto

```bash
cd conectando-talentos
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` com base no arquivo `.env.example`.

Configure as credenciais necessárias para conexão com o Supabase e autenticação JWT.

> Nunca envie suas credenciais ou o arquivo `.env` para o GitHub.

### 5. Configure o banco de dados

O script de criação das tabelas está disponível em:

```text
docs/schema.sql
```

Execute o script no banco de dados para criar a estrutura necessária para a aplicação.

### 6. Execute o projeto

Para iniciar o projeto em ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível, por padrão, em:

```text
http://localhost:3000
```

---

## Aprendizados

Durante o desenvolvimento deste projeto foram aplicados e aprofundados conhecimentos em:

- Desenvolvimento frontend com HTML, CSS e JavaScript;
- Criação de APIs REST com Node.js e Express;
- Integração entre frontend e backend;
- Persistência de dados com Supabase/PostgreSQL;
- Autenticação utilizando JWT;
- Proteção de senhas com bcrypt;
- Modelagem de banco de dados;
- Desenvolvimento de funcionalidades para diferentes perfis de usuários;
- Geração de documentos PDF no navegador;
- Boas práticas de acessibilidade web;
- Desenvolvimento de uma solução tecnológica com foco em inclusão social. Conectando Talentos

O **Conectando Talentos** é uma plataforma web inclusiva desenvolvida com o objetivo de facilitar a criação de currículos e ampliar a conexão entre **pessoas com deficiência (PcD)** e **empresas que buscam profissionais e valorizam a inclusão**.

O projeto foi desenvolvido como um **Projeto de Extensão Acadêmica**, aplicando conhecimentos de desenvolvimento web na construção de uma solução com impacto social, acessibilidade e inclusão digital.

---

## Objetivo do projeto

Pessoas com deficiência ainda enfrentam diferentes barreiras no acesso ao mercado de trabalho, inclusive na utilização de plataformas digitais e ferramentas para criação e divulgação de currículos.

O **Conectando Talentos** busca contribuir para reduzir essas barreiras oferecendo uma plataforma simples e acessível onde usuários podem criar seu currículo profissional e disponibilizá-lo para empresas.

A aplicação também permite que empresas encontrem profissionais por meio de filtros e salvem candidatos de interesse.

---

## Funcionalidades

### Para candidatos

- Cadastro e autenticação de usuários;
- Criação e atualização de currículo;
- Cadastro de informações pessoais e profissionais;
- Registro de:
  - experiências profissionais;
  - formação acadêmica;
  - habilidades;
  - idiomas;
  - objetivo profissional;
- Informações relacionadas às necessidades de acessibilidade;
- Controle da visibilidade do currículo para empresas;
- Geração e download do currículo em **PDF**.

### Para empresas

- Cadastro e autenticação;
- Criação de perfil empresarial;
- Visualização de currículos disponíveis;
- Busca de candidatos;
- Filtros por informações como:
  - cidade;
  - tipo de deficiência;
  - habilidades;
- Visualização detalhada dos currículos;
- Adição e remoção de candidatos dos favoritos.

---

## Acessibilidade

A acessibilidade é um dos principais objetivos do projeto.

A plataforma possui recursos desenvolvidos para tornar a navegação mais inclusiva, como:

- Aumento e redução do tamanho da fonte;
- Modo de alto contraste;
- Integração com **VLibras**;
- Uso de atributos semânticos e recursos ARIA;
- Estrutura de navegação pensada para facilitar o acesso ao conteúdo.

Esses recursos buscam proporcionar uma experiência mais acessível para diferentes perfis de usuários.

---

## Tecnologias utilizadas

### Frontend

- HTML5
- CSS3
- JavaScript
- jsPDF

### Backend

- Node.js
- Express.js
- API REST

### Banco de dados

- Supabase
- PostgreSQL

### Autenticação e segurança

- JSON Web Token (JWT)
- bcrypt.js

### Outros recursos

- VLibras
- CORS
- dotenv

---

## Arquitetura do projeto

O projeto possui uma arquitetura dividida entre frontend, backend e banco de dados.

```text
conectando-talentos/
│
├── api/
│   └── index.js
│
├── docs/
│   └── schema.sql
│
├── public/
│   ├── css/
│   ├── js/
│   ├── pages/
│   └── index.html
│
├── server/
│   ├── middleware/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── curriculos.js
│   │   ├── empresas.js
│   │   └── pdf.js
│   ├── index.js
│   └── supabase.js
│
├── .env.example
├── package.json
├── render.yaml
└── vercel.json
```

---

## Autenticação

A aplicação utiliza autenticação baseada em **JWT (JSON Web Token)**.

As senhas dos usuários são protegidas utilizando **bcrypt**, evitando o armazenamento de senhas em texto puro.

Existem dois tipos principais de usuários:

| Tipo de usuário | Funcionalidades |
| --- | --- |
| **PcD** | Cria e gerencia seu currículo |
| **Empresa** | Pesquisa e visualiza candidatos |

---

## Banco de dados

O banco de dados utiliza **Supabase/PostgreSQL**.

Entre as principais entidades estão:

- `usuarios`
- `curriculos`
- `empresas`
- `favoritos`

A estrutura permite relacionar usuários aos seus currículos ou perfis empresariais e possibilita que empresas salvem candidatos como favoritos.

---

## API

A aplicação possui uma **API REST** desenvolvida com **Node.js e Express**.

As principais rotas da aplicação estão organizadas em:

```text
/api/auth
/api/curriculos
/api/empresas
```

### Autenticação

| Método | Endpoint |
| --- | --- |
| `POST` | `/api/auth/cadastro` |
| `POST` | `/api/auth/login` |

### Currículos

| Método | Endpoint |
| --- | --- |
| `GET` | `/api/curriculos/meu` |
| `POST` | `/api/curriculos` |
| `GET` | `/api/curriculos` |
| `GET` | `/api/curriculos/:id` |

### Empresas

| Método | Endpoint |
| --- | --- |
| `GET` | `/api/empresas/meu` |
| `POST` | `/api/empresas` |
| `GET` | `/api/empresas/favoritos` |
| `POST` | `/api/empresas/favoritos/:curriculoId` |
| `DELETE` | `/api/empresas/favoritos/:curriculoId` |

---

## Como executar o projeto

### Pré-requisitos

Antes de começar, você precisa ter instalado:

- Node.js
- npm
- Uma conta e um projeto configurado no Supabase

### 1. Clone o repositório

```bash
git clone https://github.com/MikaelaSouza/conectando-talentos.git
```

### 2. Entre na pasta do projeto

```bash
cd conectando-talentos
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` com base no arquivo `.env.example`.

Configure as credenciais necessárias para conexão com o Supabase e autenticação JWT.

> Nunca envie suas credenciais ou o arquivo `.env` para o GitHub.

### 5. Configure o banco de dados

O script de criação das tabelas está disponível em:

```text
docs/schema.sql
```

Execute o script no banco de dados para criar a estrutura necessária para a aplicação.

### 6. Execute o projeto

Para iniciar o projeto em ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível, por padrão, em:

```text
http://localhost:3000
```

---

## Aprendizados

Durante o desenvolvimento deste projeto foram aplicados e aprofundados conhecimentos em:

- Desenvolvimento frontend com HTML, CSS e JavaScript;
- Criação de APIs REST com Node.js e Express;
- Integração entre frontend e backend;
- Persistência de dados com Supabase/PostgreSQL;
- Autenticação utilizando JWT;
- Proteção de senhas com bcrypt;
- Modelagem de banco de dados;
- Desenvolvimento de funcionalidades para diferentes perfis de usuários;
- Geração de documentos PDF no navegador;
- Boas práticas de acessibilidade web;
- Desenvolvimento de uma solução tecnológica com foco em inclusão social.
