/* Faxina PC — 99-app.js: liga as abas e a tela de começar. */
(function (F) {
  'use strict';
  function irAba(t) {
    F.$$('#abas .aba').forEach((b) => b.classList.toggle('on', b.dataset.t === t));
    F.$$('main > section').forEach((s) => (s.hidden = s.dataset.p !== t));
    window.scrollTo(0, 0);
    window.dispatchEvent(new CustomEvent('faxina-aba', { detail: t }));
  }
  F.irAba = irAba;
  F.$('#abas').addEventListener('click', (ev) => { const b = ev.target.closest('[data-t]'); if (b) irAba(b.dataset.t); });

  function inicio() {
    const e = F.pan('inicio');
    e.innerHTML = '<div class="card"><div class="card-t">👋 Olá, Maikon</div><p>Este programa limpa, organiza e faz backup do seu computador, em passos simples. Ele <b>não apaga nada</b>: o que você mandar limpar vai para uma gaveta que você confere depois.</p>' +
      '<button class="btn p grande" id="in-ir">🔎 Começar: olhar o meu computador</button></div>' +
      '<div class="card"><div class="card-t">O que dá para fazer aqui</div>' +
      '<div class="passo">🔎 <b>Diagnóstico</b> — olho tudo e digo, em palavras simples, o que dá para limpar e quanto espaço libera.</div>' +
      '<div class="passo">🧹 <b>Limpar</b> — mando o lixo e os repetidos para a gaveta Quarentena (nunca apago).</div>' +
      '<div class="passo">💾 <b>Backup</b> — junto as suas pastas importantes num .zip para você guardar.</div>' +
      '<div class="passo">📦 <b>Programas</b> — mostro o que está instalado e acho os nomes estranhos que vêm de carona.</div>' +
      '<div class="passo">📋 <b>Relatório</b> — faço um resumo para você <b>trazer na conversa com a IA</b> e a gente melhorar junto.</div></div>' +
      '<div class="card"><div class="ok-cx">🛡️ Este programa é um faxineiro honesto: ele <b>não mexe no seu antivírus</b> e não desliga defesa nenhuma. Se precisar de força total para mover alguns arquivos, ele pede para você abri-lo como administrador (o Windows pergunta e você clica em Sim).</div></div>';
    F.$('#in-ir').onclick = () => irAba('diagnostico');
  }

  F.verificar().then(() => { inicio(); });
})(window.F);
