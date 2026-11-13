/* Faxina PC — 50-programas.js: lista os programas instalados e o que liga sozinho ao ligar o PC.
   Ajuda a achar aqueles nomes estranhos que vêm junto quando a gente instala alguma coisa.
   Aqui eu NÃO desinstalo nada — eu mostro, e você decide (pelo Windows) o que tirar. */
(function (F) {
  'use strict';
  const el = () => F.pan('programas');
  // nomes que costumam vir "de carona" (barras de busca, "limpadores" duvidosos, antivírus que aparecem sem você instalar)
  const SUSPEITO = /(toolbar|search ?(bar|protect|app)|coupon|shopping|deal|offer|web ?companion|driver ?(booster|updater|pack)|pc ?(accelerat|speedup|optimiz|cleaner|boost|tuneup|fixer)|registry|wondershare|mcafee|avast|avg|norton|advanced ?systemcare|iobit|yandex|baidu|opencandy|babylon|conduit|mindspark|relevant)/i;

  async function tela() {
    const e = el();
    if (!F.dados.programas) { e.innerHTML = '<div class="card"><div class="card-t">📦 Programas instalados</div><p>Vou listar tudo que está instalado e o que liga junto com o Windows. Serve para achar aqueles nomes estranhos que vêm de carona.</p><button class="btn p grande" id="pg-ir">▶ Ver os programas</button></div>'; F.$('#pg-ir').onclick = carregar; return; }
    pintar();
  }
  async function carregar() {
    const e = el(); e.innerHTML = '<div class="card"><p class="carregando">Lendo os programas instalados…</p></div>';
    try { F.dados.programas = (await F.chamar('/programas', null, 40)).programas; F.dados.inicializacao = (await F.chamar('/inicializacao', null, 25)).itens; } catch (er) { e.innerHTML = '<div class="card"><div class="alerta">⚠ ' + F.esc(er.message) + '</div></div>'; return; }
    pintar();
  }
  function pintar() {
    const e = el(); const progs = F.dados.programas || []; const ini = F.dados.inicializacao || [];
    const susp = progs.filter((p) => SUSPEITO.test(p.nome) || (p.fabricante && SUSPEITO.test(p.fabricante)));
    let h = '<div class="card"><div class="card-t">📦 ' + progs.length + ' programas instalados</div>';
    if (susp.length) h += '<div class="alerta">🔎 <b>' + susp.length + ' programa(s) que você talvez não reconheça</b> (podem ter vindo de carona com outra coisa). Dê uma olhada; se não lembra de ter instalado e não usa, dá para tirar pelo Windows (Configurações → Aplicativos). Na dúvida, me pergunte antes:</div><ul class="lista">' + susp.map((p) => '<li class="item"><span>⚠ ' + F.esc(p.nome) + (p.fabricante ? ' <small class="mu">— ' + F.esc(p.fabricante) + '</small>' : '') + '</span></li>').join('') + '</ul>';
    else h += '<div class="ok-cx">✅ Não vi nenhum nome claramente estranho na lista.</div>';
    h += '<input type="search" id="pg-q" placeholder="🔎 Procurar um programa pelo nome" style="margin-top:10px"><div id="pg-lista" style="max-height:40vh;overflow:auto"></div></div>';
    if (ini.length) h += '<div class="card"><div class="card-t">🚀 Liga junto com o Windows (' + ini.length + ')</div><p class="mu pequeno">Quanto mais coisa liga sozinha, mais devagar o PC fica para abrir. Tirar daqui é seguro (não desinstala, só para de abrir sozinho) — mas faça pelo Windows.</p><ul class="lista">' + ini.map((x) => '<li class="item"><span>' + F.esc(x.nome) + '</span></li>').join('') + '</ul></div>';
    e.innerHTML = h;
    const pint = (q) => { q = (q || '').toLowerCase(); F.$('#pg-lista').innerHTML = progs.filter((p) => !q || p.nome.toLowerCase().includes(q)).map((p) => '<div class="item"><span>' + (SUSPEITO.test(p.nome) ? '⚠ ' : '') + F.esc(p.nome) + '</span><span class="tam">' + F.esc(p.data || '') + '</span></div>').join(''); };
    pint(''); F.$('#pg-q').oninput = (ev) => pint(ev.target.value);
  }
  window.addEventListener('faxina-aba', (ev) => { if (ev.detail === 'programas') tela(); });
  F.programas = { tela, carregar };
})(window.F);
