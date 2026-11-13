/* Faxina PC — 10-ponte.js: conversa com o motor (faxina.cjs), que roda dentro do programa.
   O programa escreve config.js com a porta e o código secreto. Aberto fora do programa (só no navegador),
   config.js não existe e a tela avisa que precisa abrir pelo Faxina PC. */
(function (F) {
  'use strict';
  const C = window.FAXINA || {};
  const BASE = 'http://127.0.0.1:' + (C.porta || 7721);
  F.temPonte = !!window.FAXINA && !window.__semConfig;
  F.admin = false; F.so = '';

  F.chamar = async (rota, corpo, segundos) => {
    const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), (segundos || 30) * 1000);
    try {
      const r = await fetch(BASE + rota, { method: corpo ? 'POST' : 'GET', headers: { 'Content-Type': 'application/json', 'X-Codigo': C.codigo || '' }, body: corpo ? JSON.stringify(corpo) : undefined, signal: ctrl.signal });
      const j = await r.json(); if (j && j.erro) throw new Error(j.erro); return j;
    } finally { clearTimeout(t); }
  };

  F.verificar = async () => {
    const el = F.$('#estado');
    if (!F.temPonte) { el.textContent = '⚠ Abra este programa pelo ícone do Faxina PC (não pelo navegador) para ele funcionar.'; el.className = 'estado erro'; return false; }
    try {
      const p = await F.chamar('/ping', null, 8); F.admin = !!p.admin; F.so = p.so; F.casa = p.casa;
      if (p.so !== 'win32') { el.textContent = '✓ Motor ligado (este é um teste fora do Windows; no seu PC ele faz tudo).'; el.className = 'estado ok'; }
      else if (p.admin) { el.textContent = '✓ Ligado como administrador — posso fazer a faxina completa.'; el.className = 'estado ok'; }
      else { el.textContent = '✓ Ligado, mas SEM administrador — vejo tudo, mas para mover alguns arquivos preciso de administrador (tem um botão na aba 🧹 Limpar).'; el.className = 'estado admin'; }
      return true;
    } catch (e) { el.textContent = '⚠ Não achei o motor. Feche e abra o Faxina PC de novo.'; el.className = 'estado erro'; return false; }
  };
})(window.F);
