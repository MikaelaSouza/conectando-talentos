// ==========================================
// main.js — Acessibilidade + estado da nav
// ==========================================

// ---- ACESSIBILIDADE ----

let tamanhoFonte = 16;

function alterarFonte(delta) {
  tamanhoFonte = Math.min(24, Math.max(12, tamanhoFonte + delta * 2));
  // Aplica no html — como tudo usa rem, toda a página escala junto
  document.documentElement.style.fontSize = tamanhoFonte + 'px';
  localStorage.setItem('ct_fonte', tamanhoFonte);
  anunciar(`Fonte ${delta > 0 ? 'aumentada' : 'diminuída'} para ${tamanhoFonte}px`);
}

function alternarContraste() {
  const ativo = document.body.classList.toggle('alto-contraste');
  localStorage.setItem('ct_contraste', ativo ? '1' : '0');
  anunciar(ativo ? 'Alto contraste ativado' : 'Alto contraste desativado');
}

function alternarLibras() {
  const plugin = document.getElementById('vw-plugin');
  if (!plugin) return;
  const visivel = plugin.style.display !== 'none';
  plugin.style.display = visivel ? 'none' : 'block';
  anunciar(visivel ? 'Libras desativado' : 'Libras ativado');
}

// Anuncia mensagem para leitores de tela
function anunciar(msg) {
  let el = document.getElementById('aria-live');
  if (!el) {
    el = document.createElement('div');
    el.id = 'aria-live';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;';
    document.body.appendChild(el);
  }
  el.textContent = msg;
}

// ---- PREFERÊNCIAS SALVAS ----
function carregarPreferencias() {
  const fonte = localStorage.getItem('ct_fonte');
  if (fonte) { tamanhoFonte = parseInt(fonte); document.documentElement.style.fontSize = tamanhoFonte + 'px'; }
  if (localStorage.getItem('ct_contraste') === '1') document.body.classList.add('alto-contraste');
}

// ---- NAV DINÂMICA ----
function atualizarNav() {
  const usuario = getUsuario();
  const btnEntrar = document.getElementById('btn-entrar');
  const btnCadastrar = document.getElementById('btn-cadastrar');
  const navUsuario = document.getElementById('nav-usuario');

  if (usuario) {
    if (btnEntrar) btnEntrar.style.display = 'none';
    if (btnCadastrar) btnCadastrar.style.display = 'none';
    if (navUsuario) {
      const destino = usuario.tipo === 'pcd' ? '/pages/curriculo.html' : '/pages/banco.html';
      navUsuario.style.display = 'flex';
      navUsuario.style.alignItems = 'center';
      navUsuario.style.gap = '12px';
      navUsuario.innerHTML = `
        <a href="${destino}" class="btn btn-outline" aria-label="Ir para minha área">Minha área</a>
        <button onclick="logout()" class="btn btn-danger" style="font-size:13px;padding:8px 16px" aria-label="Sair da conta">Sair</button>
      `;
    }
  }
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  carregarPreferencias();
  atualizarNav();
});
