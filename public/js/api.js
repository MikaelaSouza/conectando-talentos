// ==========================================
// api.js — funções para chamar o backend
// ==========================================

const API = '/api';

// Pega o token salvo no localStorage
function getToken() {
  return localStorage.getItem('ct_token');
}

// Headers padrão com autenticação
function headers(comAuth = true) {
  const h = { 'Content-Type': 'application/json' };
  if (comAuth) h['Authorization'] = `Bearer ${getToken()}`;
  return h;
}

// Salva dados do usuário após login/cadastro
function salvarSessao(token, usuario) {
  localStorage.setItem('ct_token', token);
  localStorage.setItem('ct_usuario', JSON.stringify(usuario));
}

// Remove sessão (logout)
function logout() {
  localStorage.removeItem('ct_token');
  localStorage.removeItem('ct_usuario');
  window.location.href = '/';
}

// Retorna o usuário logado ou null
function getUsuario() {
  const u = localStorage.getItem('ct_usuario');
  return u ? JSON.parse(u) : null;
}

// ---- AUTH ----

async function cadastrar(email, senha, tipo, cpf = '', cnpj = '') {
  const res = await fetch(`${API}/auth/cadastro`, {
    method: 'POST',
    headers: headers(false),
    body: JSON.stringify({ email, senha, tipo, cpf, cnpj })
  });
  return res.json();
}

async function login(email, senha) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: headers(false),
    body: JSON.stringify({ email, senha })
  });
  return res.json();
}

// ---- CURRÍCULOS ----

async function salvarCurriculo(dados) {
  const res = await fetch(`${API}/curriculos`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(dados)
  });
  return res.json();
}

async function getMeuCurriculo() {
  const res = await fetch(`${API}/curriculos/meu`, { headers: headers() });
  return res.json();
}

async function buscarCurriculos(filtros = {}) {
  const params = new URLSearchParams(filtros).toString();
  const res = await fetch(`${API}/curriculos?${params}`, { headers: headers() });
  return res.json();
}

async function getCurriculo(id) {
  const res = await fetch(`${API}/curriculos/${id}`, { headers: headers() });
  return res.json();
}

// ---- EMPRESA ----

async function salvarEmpresa(dados) {
  const res = await fetch(`${API}/empresas`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(dados)
  });
  return res.json();
}

async function getMinhEmpresa() {
  const res = await fetch(`${API}/empresas/meu`, { headers: headers() });
  return res.json();
}

async function favoritarCurriculo(id) {
  const res = await fetch(`${API}/empresas/favoritos/${id}`, {
    method: 'POST',
    headers: headers()
  });
  return res.json();
}

async function getFavoritos() {
  const res = await fetch(`${API}/empresas/favoritos`, { headers: headers() });
  return res.json();
}

// ---- PDF ----
function baixarPDF() {
  const link = document.createElement('a');
  link.href = `${API}/pdf/meu`;
  // Precisa passar o token como query param para downloads diretos
  link.href = `${API}/pdf/meu?token=${getToken()}`;
  link.download = 'curriculo.pdf';
  link.click();
}
