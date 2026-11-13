/* Faxina PC — 60-relatorio.js: monta um relatório em .md para você baixar, salvar no PC e TRAZER para a IA.
   É isso que você cola na conversa comigo para a gente entender junto o que dá para melhorar. */
(function (F) {
  'use strict';
  const el = () => F.pan('relatorio');

  function montar() {
    const d = F.dados; if (!d.discos && !d.lixo) return null;
    const L = [];
    L.push('# 🧹 Relatório do Faxina PC', '', 'Feito em: ' + (d.quando || new Date().toLocaleString('pt-BR')), '');
    if (d.discos) { L.push('## 💽 Espaço no disco'); d.discos.forEach((x) => L.push('- **' + x.letra + '** — ' + x.livreGB + ' GB livres de ' + x.totalGB + ' GB (' + x.usadoPct + '% usado)' + (x.usadoPct >= 90 ? ' ⚠ QUASE CHEIO' : ''))); if (d.antivirus && d.antivirus.length) L.push('- 🛡️ Antivírus ativo: ' + d.antivirus.join(', ')); L.push(''); }
    const somaLixo = (d.lixo || []).filter((p) => p.limpavel).reduce((s, p) => s + p.tamanho, 0);
    const somaNM = (d.nodeModules || []).reduce((s, x) => s + x.tamanho, 0);
    const somaDup = (d.duplicados || []).reduce((s, f) => s + f.tamanho * (f.arquivos.length - 1), 0);
    L.push('## ✅ Resumo', '', '- Dá para liberar ~**' + F.mb(somaLixo + somaNM + somaDup) + '** sem perder nada:', '  - 🧹 lixo temporário: ' + F.mb(somaLixo), '  - 📦 node_modules (código): ' + F.mb(somaNM), '  - 👯 arquivos repetidos: ' + F.mb(somaDup), '');
    if (d.lixo) { L.push('## 🧹 Lixo temporário'); d.lixo.forEach((p) => L.push('- ' + p.nome + ': ' + F.mb(p.tamanho) + (p.limpavel ? '' : ' (só aviso)'))); L.push(''); }
    if (d.nodeModules && d.nodeModules.length) { L.push('## 📦 Pastas node_modules (' + d.nodeModules.length + ')'); d.nodeModules.slice(0, 25).forEach((x) => L.push('- ' + F.mb(x.tamanho) + ' — ' + x.caminho)); L.push(''); }
    if (d.downloads && d.downloads.maiores) { L.push('## ⬇️ Maiores arquivos em Downloads'); d.downloads.maiores.slice(0, 15).forEach((m) => L.push('- ' + F.mb(m.size) + ' — ' + m.p)); L.push(''); }
    if (d.duplicados && d.duplicados.length) { L.push('## 👯 Arquivos repetidos (' + d.duplicados.length + ' grupos)'); d.duplicados.slice(0, 20).forEach((f) => { L.push('- ' + F.mb(f.tamanho) + ' cada:'); f.arquivos.forEach((p) => L.push('  - ' + p)); }); L.push(''); }
    if (d.programas) { const SUS = /(toolbar|search ?(bar|protect)|coupon|driver ?(booster|updater)|pc ?(cleaner|optimiz|speedup|boost)|registry|mcafee|avast|avg|norton|iobit|wondershare)/i; const s = d.programas.filter((p) => SUS.test(p.nome)); L.push('## 📦 Programas instalados: ' + d.programas.length); if (s.length) { L.push('', 'Possíveis "de carona" (confira se você reconhece):'); s.forEach((p) => L.push('- ⚠ ' + p.nome + (p.fabricante ? ' — ' + p.fabricante : ''))); } L.push(''); }
    if (d.inicializacao) { L.push('## 🚀 Liga junto com o Windows (' + d.inicializacao.length + ')'); d.inicializacao.slice(0, 30).forEach((x) => L.push('- ' + x.nome)); L.push(''); }
    L.push('---', '_Gerado pelo Faxina PC. Nada foi apagado: a limpeza move para a pasta Quarentena, que você confere e esvazia quando quiser._');
    return L.join('\n');
  }

  function tela() {
    const e = el(); const md = montar();
    if (!md) { e.innerHTML = '<div class="card"><p>Faça o 🔎 Diagnóstico primeiro para eu montar o relatório.</p><button class="btn p" data-ir="diagnostico">🔎 Fazer o diagnóstico</button></div>'; e.querySelector('[data-ir]').onclick = () => F.irAba('diagnostico'); return; }
    e.innerHTML = '<div class="card"><div class="card-t">📋 Relatório</div><p>Este é o resumo do seu computador. <b>Baixe ou copie e traga aqui na conversa com a IA</b> para a gente entender junto o que dá para melhorar.</p>' +
      '<div class="linha"><button class="btn p" id="rl-baixar">⤓ Baixar (.md)</button><button class="btn" id="rl-copiar">📋 Copiar</button><button class="btn" id="rl-salvar">💾 Salvar no PC</button><button class="btn s" id="rl-ler">🗣 Ler em voz alta</button></div>' +
      '<pre id="rl-pre">' + F.esc(md) + '</pre></div>';
    F.$('#rl-baixar').onclick = () => F.baixar('relatorio-faxina-' + new Date().toISOString().slice(0, 10) + '.md', md, 'text/markdown;charset=utf-8');
    F.$('#rl-copiar').onclick = async () => { try { await navigator.clipboard.writeText(md); F.aviso('📋 Copiado — agora cole na conversa com a IA', 'ok'); } catch { F.aviso('Use o ⤓ Baixar', 'erro'); } };
    F.$('#rl-salvar').onclick = async () => { try { const r = await F.chamar('/salvar', { nome: 'relatorio-faxina.md', conteudo: md }, 15); F.aviso('💾 Salvo em ' + r.salvo, 'ok'); } catch (er) { F.aviso(er.message, 'erro'); } };
    F.$('#rl-ler').onclick = () => ler(resumoFalado());
  }
  function resumoFalado() {
    const d = F.dados; const disco = (d.discos || [])[0];
    const somaLixo = (d.lixo || []).filter((p) => p.limpavel).reduce((s, p) => s + p.tamanho, 0);
    const somaNM = (d.nodeModules || []).reduce((s, x) => s + x.tamanho, 0);
    const somaDup = (d.duplicados || []).reduce((s, f) => s + f.tamanho * (f.arquivos.length - 1), 0);
    return 'Terminei de olhar o seu computador. ' + (disco ? 'O disco ' + disco.letra + ' está com ' + disco.usadoPct + ' por cento usado. ' : '') + 'Dá para liberar cerca de ' + F.mb(somaLixo + somaNM + somaDup) + ' sem perder nada seu. Isso inclui lixo temporário, pastas de programação e arquivos repetidos. Nada é apagado: a limpeza move para a gaveta Quarentena.';
  }
  async function ler(texto) {
    try { const r = await fetch('http://127.0.0.1:7790/falar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ texto }) }); if (!r.ok) throw 0; const b = await r.blob(); new Audio(URL.createObjectURL(b)).play(); } catch { F.aviso('A voz Francisco não respondeu (precisa de internet). O texto está na tela.', 'erro'); }
  }
  window.addEventListener('faxina-aba', (ev) => { if (ev.detail === 'relatorio') tela(); });
  F.relatorio = { tela, montar };
})(window.F);
