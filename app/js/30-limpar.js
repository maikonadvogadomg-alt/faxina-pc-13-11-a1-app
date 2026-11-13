/* Faxina PC — 30-limpar.js: a limpeza de verdade. Move para a QUARENTENA (gaveta). NUNCA apaga.
   Você escolhe o que mover; depois confere a gaveta e esvazia quando tiver certeza. */
(function (F) {
  'use strict';
  const el = () => F.pan('limpar');

  function tela() {
    const d = F.dados; const e = el();
    if (!d.lixo && !d.duplicados && !d.nodeModules) { e.innerHTML = '<div class="card"><p>Faça o 🔎 Diagnóstico primeiro para eu saber o que tem para limpar.</p><button class="btn p" data-ir="diagnostico">🔎 Fazer o diagnóstico</button></div>'; e.querySelector('[data-ir]').onclick = () => F.irAba('diagnostico'); return; }
    let h = '<div class="card"><div class="ok-cx">🛟 <b>Fica tranquilo:</b> limpar aqui <b>não apaga</b>. Tudo que você mandar limpar vai para uma gaveta chamada <b>Quarentena</b> (na pasta Faxina-PC). Você confere com calma e só esvazia a gaveta quando tiver certeza.</div></div>';

    // node_modules
    if (d.nodeModules && d.nodeModules.length) h += '<div class="card"><div class="card-t">📦 Pastas node_modules (' + F.mb(d.nodeModules.reduce((s, x) => s + x.tamanho, 0)) + ')</div><p class="mu pequeno">São peças de projetos de programação. Dá para recriar com um comando (npm install) quando precisar. Seguras para guardar na gaveta.</p><div class="linha"><button class="btn s" data-marcar="nm" data-v="1">☑ Marcar todas</button><button class="btn s" data-marcar="nm" data-v="0">☐ Desmarcar</button></div><div id="lp-nm"></div></div>';
    // repetidos
    if (d.duplicados && d.duplicados.length) h += '<div class="card"><div class="card-t">👯 Arquivos repetidos</div><p class="mu pequeno">Em cada grupo, deixo a 1ª marcada para GUARDAR e as cópias vão para a gaveta. Confira antes.</p><div id="lp-dup"></div></div>';

    h += '<div class="card"><button class="btn p grande" id="lp-fazer">🧹 Mandar os marcados para a Quarentena</button><div class="linha"><button class="btn s" id="lp-ver">📂 Abrir a gaveta Quarentena</button>' + (!F.admin && F.so === 'win32' ? '<button class="btn s" id="lp-admin">🛡️ Preciso de administrador</button>' : '') + '</div></div>';
    e.innerHTML = h;

    const marcados = new Set();
    const pintNM = () => { const c = F.$('#lp-nm'); if (!c) return; c.innerHTML = d.nodeModules.map((x, i) => '<label class="op"><input type="checkbox" data-nm="' + i + '"' + (marcados.has('nm' + i) ? ' checked' : '') + '><span>' + F.esc(x.caminho) + ' <small class="mu">· ' + F.mb(x.tamanho) + '</small></span></label>').join(''); };
    const pintDup = () => { const c = F.$('#lp-dup'); if (!c) return; c.innerHTML = d.duplicados.map((f, gi) => '<div class="passo"><b>' + F.mb(f.tamanho) + ' cada · ' + f.arquivos.length + ' cópias</b>' + f.arquivos.map((p, ai) => '<label class="op"><input type="checkbox" data-dup="' + gi + ':' + ai + '"' + (marcados.has('dup' + gi + ':' + ai) ? ' checked' : '') + ' ' + (ai === 0 ? 'disabled title="esta fica guardada"' : '') + '><span>' + (ai === 0 ? '⭐ GUARDAR: ' : '🗑 cópia: ') + F.esc(p) + '</span></label>').join('') + '</div>').join(''); };
    pintNM(); pintDup();
    e.addEventListener('change', (ev) => { const t = ev.target; if (t.dataset.nm != null) { marcados[t.checked ? 'add' : 'delete']('nm' + t.dataset.nm); } if (t.dataset.dup != null) { marcados[t.checked ? 'add' : 'delete']('dup' + t.dataset.dup); } });
    e.addEventListener('click', async (ev) => {
      const m = ev.target.closest('[data-marcar]');
      if (m && m.dataset.marcar === 'nm') { d.nodeModules.forEach((_, i) => { if (m.dataset.v === '1') marcados.add('nm' + i); else marcados.delete('nm' + i); }); pintNM(); }
    });
    F.$('#lp-fazer').onclick = async () => {
      const itens = [];
      d.nodeModules && d.nodeModules.forEach((x, i) => { if (marcados.has('nm' + i)) itens.push(x.caminho); });
      d.duplicados && d.duplicados.forEach((f, gi) => f.arquivos.forEach((p, ai) => { if (ai > 0 && marcados.has('dup' + gi + ':' + ai)) itens.push(p); }));
      if (!itens.length) return F.aviso('Marque pelo menos um item', 'erro');
      if (!confirm('Mover ' + itens.length + ' item(ns) para a Quarentena? (não apaga — você confere depois)')) return;
      F.$('#lp-fazer').disabled = true; F.$('#lp-fazer').textContent = '🧹 Movendo…';
      try { const r = await F.chamar('/quarentena', { itens }, 120); F.dados.ultimaQuarentena = r; F.aviso('✅ ' + r.feito.length + ' movido(s) para a gaveta' + (r.erros.length ? ' · ' + r.erros.length + ' não deu' : ''), 'ok'); F.dados.nodeModules = (F.dados.nodeModules || []).filter((x) => !r.feito.some((f) => f.de === x.caminho)); tela(); } catch (er) { F.aviso(er.message, 'erro'); F.$('#lp-fazer').disabled = false; F.$('#lp-fazer').textContent = '🧹 Mandar os marcados para a Quarentena'; }
    };
    const ver = F.$('#lp-ver'); if (ver) ver.onclick = () => F.chamar('/abrir-pasta', { caminho: (F.dados.ultimaQuarentena && F.dados.ultimaQuarentena.gaveta) || (F.casa + '/Faxina-PC/Quarentena') }).catch(() => {});
    const adm = F.$('#lp-admin'); if (adm) adm.onclick = () => alert('Para a faxina completa:\n\n1. Feche o Faxina PC.\n2. Clique com o botão direito no ícone do Faxina PC.\n3. Escolha "Executar como administrador".\n4. Clique Sim na telinha azul do Windows.\n\nAí ele abre com força total.');
  }

  window.addEventListener('faxina-aba', (ev) => { if (ev.detail === 'limpar') tela(); });
  F.limpar = { tela };
})(window.F);
