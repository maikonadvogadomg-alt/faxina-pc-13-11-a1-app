/* Faxina PC — 40-backup.js: junta as suas pastas importantes num .zip, para guardar em lugar seguro. */
(function (F) {
  'use strict';
  const el = () => F.pan('backup');
  let pastas = [];

  function tela() {
    const casa = F.casa || 'C:\\Users\\voce';
    const sugestao = ['Documents', 'Desktop', 'Pictures'].map((n) => casa + '\\' + n);
    const e = el();
    e.innerHTML = '<div class="card"><div class="card-t">💾 Backup (cópia de segurança)</div><p>Eu junto as pastas que você escolher num arquivo <b>.zip</b> só. Aí é só guardar esse zip num pen drive, na nuvem, ou mandar aqui para você não perder nada.</p>' +
      '<p class="mu pequeno">Dica: guarde o .zip num lugar DIFERENTE do computador (pen drive ou nuvem). Se guardar no mesmo PC e ele der problema, perde os dois.</p></div>' +
      '<div class="card"><div class="card-t">📂 Pastas para guardar</div><div class="linha"><input type="text" id="bk-nova" placeholder="cole o caminho de uma pasta (ex.: C:\\Users\\voce\\Documents)"><button class="btn" id="bk-add">➕</button></div>' +
      '<p class="mu pequeno">Sugestões (toque para juntar):</p><div class="linha">' + sugestao.map((p) => '<button class="btn s" data-sug="' + F.esc(p) + '">+ ' + F.esc(p.split('\\').pop()) + '</button>').join('') + '</div><div id="bk-lista"></div></div>' +
      '<div class="card"><button class="btn p grande" id="bk-fazer">💾 Fazer o backup .zip</button><div id="bk-res"></div></div>';
    const pint = () => { F.$('#bk-lista').innerHTML = pastas.length ? pastas.map((p, i) => '<div class="item"><span>📁 ' + F.esc(p) + '</span><button class="btn s" data-fora="' + i + '">✕</button></div>').join('') : '<p class="mu pequeno">Nenhuma pasta escolhida ainda.</p>'; };
    pint();
    const add = (p) => { p = (p || '').trim(); if (p && !pastas.includes(p)) { pastas.push(p); pint(); } };
    F.$('#bk-add').onclick = () => { add(F.$('#bk-nova').value); F.$('#bk-nova').value = ''; };
    e.addEventListener('click', (ev) => { const s = ev.target.closest('[data-sug]'); const f = ev.target.closest('[data-fora]'); if (s) add(s.dataset.sug); if (f) { pastas.splice(+f.dataset.fora, 1); pint(); } });
    F.$('#bk-fazer').onclick = async () => {
      if (!pastas.length) return F.aviso('Escolha pelo menos uma pasta', 'erro');
      const b = F.$('#bk-fazer'); b.disabled = true; b.textContent = '💾 Compactando… (pode demorar)';
      try { const r = await F.chamar('/backup', { pastas }, 600); F.$('#bk-res').innerHTML = '<div class="ok-cx">✅ Pronto! Backup de ' + F.mb(r.tamanho) + ' em:<br><b>' + F.esc(r.zip) + '</b></div><button class="btn s" id="bk-abrir">📂 Abrir a pasta do backup</button>'; F.$('#bk-abrir').onclick = () => F.chamar('/abrir-pasta', { caminho: r.zip.replace(/[\\/][^\\/]+$/, '') }).catch(() => {}); F.aviso('✅ Backup pronto', 'ok'); } catch (er) { F.$('#bk-res').innerHTML = '<div class="alerta">⚠ ' + F.esc(er.message) + '</div>'; }
      b.disabled = false; b.textContent = '💾 Fazer o backup .zip';
    };
  }
  window.addEventListener('faxina-aba', (ev) => { if (ev.detail === 'backup') tela(); });
  F.backup = { tela };
})(window.F);
