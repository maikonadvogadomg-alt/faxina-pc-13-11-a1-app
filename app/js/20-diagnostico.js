/* Faxina PC — 20-diagnostico.js: o botão grande que olha o computador todo e mostra um resumo simples. */
(function (F) {
  'use strict';
  const el = () => F.pan('diagnostico');

  async function rodar() {
    if (!F.temPonte) return F.aviso('Abra pelo programa Faxina PC', 'erro');
    const e = el(); const d = F.dados = { quando: new Date().toLocaleString('pt-BR') };
    const passos = [
      ['espaço no disco', async () => { const r = await F.chamar('/espaco', null, 15); d.discos = r.discos; d.antivirus = r.antivirus; }],
      ['lixo temporário', async () => { d.lixo = (await F.chamar('/lixo', {}, 40)).pastas; }],
      ['pastas node_modules (código)', async () => { d.nodeModules = (await F.chamar('/node-modules', {}, 25)).pastas; }],
      ['Downloads (arquivos grandes)', async () => { d.downloads = await F.chamar('/grandes', { pasta: (F.casa || '') + '/Downloads' }, 20); }],
      ['arquivos repetidos', async () => { d.duplicados = (await F.chamar('/duplicados', {}, 30)).familias; }],
    ];
    let i = 0;
    const pintarAndamento = (nome) => { e.innerHTML = '<div class="card"><div class="card-t">🔎 Olhando o seu computador…</div><p class="mu">' + (i + 1) + ' de ' + passos.length + ': <b class="carregando">' + nome + '</b></p><div class="barra"><i style="width:' + Math.round(i / passos.length * 100) + '%"></i></div><p class="mu pequeno">Pode demorar um pouco. Não precisa fazer nada, é só esperar.</p></div>'; };
    for (; i < passos.length; i++) { pintarAndamento(passos[i][0]); try { await passos[i][1](); } catch (er) { d['erro_' + i] = er.message; } }
    resumo();
    F.aviso('✅ Diagnóstico pronto', 'ok');
  }

  function somaLixo() { return (F.dados.lixo || []).filter((p) => p.limpavel).reduce((s, p) => s + p.tamanho, 0); }
  function somaNM() { return (F.dados.nodeModules || []).reduce((s, p) => s + p.tamanho, 0); }
  function somaDup() { return (F.dados.duplicados || []).reduce((s, f) => s + f.tamanho * (f.arquivos.length - 1), 0); }

  function resumo() {
    const d = F.dados; const e = el();
    const recuperavel = somaLixo() + somaNM() + somaDup();
    const disco = (d.discos || [])[0];
    const avisoDisco = disco && disco.usadoPct >= 90;
    let h = '<div class="card"><div class="card-t">✅ Terminei de olhar — ' + F.esc(d.quando) + '</div>';
    if (avisoDisco) h += '<div class="alerta">⚠ O disco <b>' + F.esc(disco.letra) + '</b> está quase cheio (' + disco.usadoPct + '% usado, só ' + F.gb(disco.livreGB) + ' livres). Vale a pena limpar.</div>';
    h += '<p>Em resumo, dá para liberar mais ou menos <b style="color:var(--ok);font-size:1.2em">' + F.mb(recuperavel) + '</b> sem perder nada seu:</p>' +
      '<div class="cards">' +
      '<div class="num"><b>' + F.mb(somaLixo()) + '</b><span>🧹 lixo temporário</span></div>' +
      '<div class="num"><b>' + F.mb(somaNM()) + '</b><span>📦 node_modules (código)</span></div>' +
      '<div class="num"><b>' + F.mb(somaDup()) + '</b><span>👯 arquivos repetidos</span></div>' +
      '</div>' +
      '<div class="linha"><button class="btn p" data-ir="limpar">🧹 Ir para a limpeza</button><button class="btn" data-ir="relatorio">📋 Ver o relatório</button><button class="btn s" id="dg-refazer">🔄 Olhar de novo</button></div></div>';

    // espaço no disco
    h += '<div class="card"><div class="card-t">💽 Espaço no disco</div>' + (d.discos || []).map((x) => '<div><b>' + F.esc(x.letra) + '</b> — ' + F.gb(x.livreGB) + ' livres de ' + F.gb(x.totalGB) + ' (' + x.usadoPct + '% usado)<div class="barra"><i class="' + (x.usadoPct >= 90 ? 'cheio' : x.usadoPct >= 75 ? 'quase' : '') + '" style="width:' + x.usadoPct + '%"></i></div></div>').join('') + (d.antivirus && d.antivirus.length ? '<p class="mu pequeno">🛡️ Antivírus ativo: ' + d.antivirus.map(F.esc).join(', ') + '</p>' : '') + '</div>';

    // lixo detalhado
    if (d.lixo) h += '<div class="card"><div class="card-t">🧹 Lixo temporário</div><p class="mu pequeno">São arquivos que o Windows e os programas deixam para trás. Mexer neles é seguro.</p>' + d.lixo.map((p) => '<div class="item"><span>' + F.esc(p.nome) + (p.limpavel ? '' : ' <small class="mu">(só aviso — não limpo automático)</small>') + '</span><span class="tam">' + F.mb(p.tamanho) + '</span></div>').join('') + '</div>';

    // duplicados
    if (d.duplicados && d.duplicados.length) h += '<div class="card"><div class="card-t">👯 Arquivos repetidos (' + d.duplicados.length + ' grupos)</div><p class="mu pequeno">Arquivos iguaizinhos em lugares diferentes. Na aba 🧹 Limpar você escolhe quais cópias guardar.</p></div>';

    e.innerHTML = h;
    F.$('#dg-refazer').onclick = rodar;
    e.querySelectorAll('[data-ir]').forEach((b) => b.onclick = () => F.irAba(b.dataset.ir));
  }

  function tela() {
    const e = el(); if (F.dados.discos) return resumo();
    e.innerHTML = '<div class="card"><div class="card-t">🔎 Diagnóstico do computador</div><p>Eu vou olhar o seu computador e dizer, em palavras simples, o que dá para limpar e quanto espaço isso libera. <b>Eu só olho — não apago nada agora.</b></p><button class="btn p grande" id="dg-ir">▶ Olhar o meu computador agora</button></div>';
    F.$('#dg-ir').onclick = rodar;
  }

  F.diagnostico = { tela, rodar };
  window.addEventListener('faxina-aba', (ev) => { if (ev.detail === 'diagnostico') tela(); });
})(window.F);
