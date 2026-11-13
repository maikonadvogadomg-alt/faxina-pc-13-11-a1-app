/* Faxina PC — 00-base.js: peças comuns (F). */
(function () {
  'use strict';
  const F = window.F = {};
  F.$ = (s, r) => (r || document).querySelector(s);
  F.$$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  F.esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  F.mb = (n) => { n = Number(n) || 0; return n < 1024 ? n + ' B' : n < 1048576 ? (n / 1024).toFixed(0) + ' KB' : n < 1073741824 ? (n / 1048576).toFixed(1).replace('.', ',') + ' MB' : (n / 1073741824).toFixed(2).replace('.', ',') + ' GB'; };
  F.gb = (n) => (Number(n) || 0).toFixed(1).replace('.', ',') + ' GB';
  let t = 0;
  F.aviso = (txt, tipo) => { const el = F.$('#aviso'); el.textContent = txt; el.className = 'aviso ' + (tipo || ''); el.hidden = false; clearTimeout(t); t = setTimeout(() => { el.hidden = true; }, tipo === 'erro' ? 6000 : 3200); };
  F.baixar = (nome, dados, tipo) => { const b = dados instanceof Blob ? dados : new Blob([dados], { type: tipo || 'text/plain;charset=utf-8' }); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = nome; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 30000); F.aviso('⤓ ' + nome, 'ok'); };
  F.pan = (nome) => F.$('#pan-' + nome);
  // guarda o resultado do diagnóstico para o relatório e as outras abas
  F.dados = {};
})();
