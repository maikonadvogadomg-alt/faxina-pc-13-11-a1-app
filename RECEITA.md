# 🧬 Receita para recriar: Faxina PC

_Gerada sem IA, lendo 60 arquivo(s). Serve para remontar este app como HTML modular — com qualquer IA, um arquivo por vez._

## 1. O que é

- **Nome:** Faxina PC
- **Partes de código:** 15 (2 tela, 12 logica, 0 servidor, 0 dados, 1 estilo)
- **Tem servidor (rotas /api):** não — dá para ser só HTML
- **Peças de fora (bibliotecas):** child_process, crypto, electron, fs, http, msedge-tts, net, os, path

## 2. Estrutura modular proposta

```
index.html            ← a página; chama os módulos NA ORDEM
css/app.css           ← o visual
js/00-core.js         ← a "locomotiva": cria window.APP (registrar, guardar, avisar)
js/10-base.js         ← Faxina PC — 00-base.js: peças comuns (F) (era app/js/00-base.js)
js/15-ponte.js        ← Faxina PC — 10-ponte.js: conversa com o motor (faxina.cjs), que roda d (era app/js/10-ponte.js)
js/20-diagnostico.js  ← Faxina PC — 20-diagnostico.js: o botão grande que olha o computador to (era app/js/20-diagnostico.js)
js/25-limpar.js       ← Faxina PC — 30-limpar.js: a limpeza de verdade. Move para a QUARENTENA (era app/js/30-limpar.js)
js/30-backup.js       ← Faxina PC — 40-backup.js: junta as suas pastas importantes num .zip, p (era app/js/40-backup.js)
js/35-programas.js    ← Faxina PC — 50-programas.js: lista os programas instalados e o que lig (era app/js/50-programas.js)
js/40-relatorio.js    ← Faxina PC — 60-relatorio.js: monta um relatório em .md para você baixa (era app/js/60-relatorio.js)
js/45-faxina.js       ← 🧹 faxina.cjs — o motor do Faxina PC, já DENTRO do programa (sem Pytho (era electron/faxina.cjs)
js/50-voz.js          ← 🗣 voz.cjs — a voz Francisco GRÁTIS, já DENTRO do programa do PC (não  (era electron/voz.cjs)
js/55-preload.js      ← logica (era electron/preload.cjs)
js/60-app.js          ← Faxina PC — 🧹 Faxina PC (era app/index.html)
js/65-inicio.js       ← Faxina-PC-13-11-A(1) — Faxina-PC-13-11-A(1) (era index.html)
js/99-app.js          ← o último: monta a tela com o que embarcou
```

## 3. As partes, uma por uma

| # | Era | Vira | Tipo | O que faz | Usa |
|---|---|---|---|---|---|
| 1 | `app/js/00-base.js` | `js/10-base.js` | logica | Faxina PC — 00-base.js: peças comuns (F) | — |
| 2 | `app/js/10-ponte.js` | `js/15-ponte.js` | logica | Faxina PC — 10-ponte.js: conversa com o motor (faxina.cjs), que roda dentro do programa. O | — |
| 3 | `app/js/20-diagnostico.js` | `js/20-diagnostico.js` | logica | Faxina PC — 20-diagnostico.js: o botão grande que olha o computador todo e mostra um resum | — |
| 4 | `app/js/30-limpar.js` | `js/25-limpar.js` | logica | Faxina PC — 30-limpar.js: a limpeza de verdade. Move para a QUARENTENA (gaveta). NUNCA apa | — |
| 5 | `app/js/40-backup.js` | `js/30-backup.js` | logica | Faxina PC — 40-backup.js: junta as suas pastas importantes num .zip, para guardar em lugar | — |
| 6 | `app/js/50-programas.js` | `js/35-programas.js` | logica | Faxina PC — 50-programas.js: lista os programas instalados e o que liga sozinho ao ligar o | — |
| 7 | `app/js/60-relatorio.js` | `js/40-relatorio.js` | logica | Faxina PC — 60-relatorio.js: monta um relatório em .md para você baixar, salvar no PC e TR | — |
| 8 | `app/js/99-app.js` | css/app.css | logica | Faxina PC — 99-app.js: liga as abas e a tela de começar | — |
| 9 | `electron/faxina.cjs` | `js/45-faxina.js` | logica | 🧹 faxina.cjs — o motor do Faxina PC, já DENTRO do programa (sem Python, sem baixar nada). | — |
| 10 | `electron/voz.cjs` | `js/50-voz.js` | logica | 🗣 voz.cjs — a voz Francisco GRÁTIS, já DENTRO do programa do PC (não precisa de Python).  | — |
| 11 | `electron/main.cjs` | css/app.css | logica | 🧹 Faxina PC — abre o programa numa janela própria e liga, por dentro: - o motor da faxina | faxina.cjs, voz.cjs |
| 12 | `electron/preload.cjs` | `js/55-preload.js` | logica | — | — |
| 13 | `app/css/app.css` | css/app.css | estilo | — | — |
| 14 | `app/index.html` | `js/60-app.js` | tela | Faxina PC — 🧹 Faxina PC | app.css, manifest.json, favicon.ico, icon.svg |
| 15 | `index.html` | `js/65-inicio.js` | tela | Faxina-PC-13-11-A(1) — Faxina-PC-13-11-A(1) | manifest.json, favicon.ico, icon.svg, apple-touch-icon.png |

## 4. Montar passo a passo (cada bloco é um pedido pronto: 📋 Copiar → colar na IA)

### Passo 0 — combinar as regras com a IA

```text
Vamos recriar o app "Faxina PC" como HTML MODULAR, que abre pelo index.html, sem servidor e sem nada da Replit.
Regras: (1) index.html chama os arquivos js/ na ordem, antes do </body>; (2) js/00-core.js cria window.APP com APP.registrar(modulo), APP.guardar(chave, valor) em IndexedDB/localStorage e APP.avisar(texto); (3) cada arquivo js/NN-nome.js cuida de UM assunto, começa com (function (APP) { e termina com })(window.APP); (4) js/99-app.js vem por último e monta a tela com os módulos registrados; (5) textos em português do Brasil.
Vou pedir UM arquivo por vez. Responda só com o arquivo completo, sem cortar nada. Primeiro: crie index.html, css/app.css e js/00-core.js.
```

### Passo 1 — `js/10-base.js` (era `app/js/00-base.js`, 17 linhas)

```text
Crie js/10-base.js. Ele faz: Faxina PC — 00-base.js: peças comuns (F).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 2 — `js/15-ponte.js` (era `app/js/10-ponte.js`, 31 linhas)

```text
Crie js/15-ponte.js. Ele faz: Faxina PC — 10-ponte.js: conversa com o motor (faxina.cjs), que roda dentro do programa. O programa escreve config.js com a porta e o código secreto. Aberto fora do programa (só no navegador), config.js não existe e a tela avisa que precisa abrir pelo Faxina PC.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 3 — `js/20-diagnostico.js` (era `app/js/20-diagnostico.js`, 65 linhas)

```text
Crie js/20-diagnostico.js. Ele faz: Faxina PC — 20-diagnostico.js: o botão grande que olha o computador todo e mostra um resumo simples.
No app original ele tinha estas funções/partes: rodar, pintarAndamento, somaLixo, somaNM, somaDup, resumo, tela.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 4 — `js/25-limpar.js` (era `app/js/30-limpar.js`, 45 linhas)

```text
Crie js/25-limpar.js. Ele faz: Faxina PC — 30-limpar.js: a limpeza de verdade. Move para a QUARENTENA (gaveta). NUNCA apaga. Você escolhe o que mover; depois confere a gaveta e esvazia quando tiver certeza.
No app original ele tinha estas funções/partes: tela, pintNM, pintDup.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 5 — `js/30-backup.js` (era `app/js/40-backup.js`, 31 linhas)

```text
Crie js/30-backup.js. Ele faz: Faxina PC — 40-backup.js: junta as suas pastas importantes num .zip, para guardar em lugar seguro.
No app original ele tinha estas funções/partes: tela, pint, add.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 6 — `js/35-programas.js` (era `app/js/50-programas.js`, 35 linhas)

```text
Crie js/35-programas.js. Ele faz: Faxina PC — 50-programas.js: lista os programas instalados e o que liga sozinho ao ligar o PC. Ajuda a achar aqueles nomes estranhos que vêm junto quando a gente instala alguma coisa. Aqui eu NÃO desinstalo nada — eu mostro, e você decide (pelo Windows) o que tirar.
No app original ele tinha estas funções/partes: tela, carregar, pintar, pint.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 7 — `js/40-relatorio.js` (era `app/js/60-relatorio.js`, 50 linhas)

```text
Crie js/40-relatorio.js. Ele faz: Faxina PC — 60-relatorio.js: monta um relatório em .md para você baixar, salvar no PC e TRAZER para a IA. É isso que você cola na conversa comigo para a gente entender junto o que dá para melhorar.
No app original ele tinha estas funções/partes: montar, tela, resumoFalado, ler.
Ele chamava estes endereços: http://127.0.0.1:7790/falar. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 8 — `js/45-faxina.js` (era `electron/faxina.cjs`, 208 linhas)

```text
Crie js/45-faxina.js. Ele faz: 🧹 faxina.cjs — o motor do Faxina PC, já DENTRO do programa (sem Python, sem baixar nada). Fica em http://127.0.0.1:7721 e só aceita pedidos deste computador (127.0.0.1) e com o código secreto. REGRAS DE SEGURANÇA (de propósito): • Diagnóstico = só OLHA (ler tamanho, listar). Nunca muda nada.
No app original ele tinha estas funções/partes: tamanhoPasta, guardarMaior, ordenar, acharPastas, duplicados, hashCurto, souAdmin, discos, programas, inicializacao, antivirus, pastasLixo, quarentena, copiarRecursivo, apagarRecursivo, backup, json, corpo.
O original usava as bibliotecas http, fs, path, os, crypto, child_process, electron: em HTML puro, use a versão de CDN (ou faça sem ela, se for simples).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 9 — `js/50-voz.js` (era `electron/voz.cjs`, 85 linhas)

```text
Crie js/50-voz.js. Ele faz: 🗣 voz.cjs — a voz Francisco GRÁTIS, já DENTRO do programa do PC (não precisa de Python). Liga sozinha junto com o programa, em http://127.0.0.1:7790 — o mesmo endereço do voz-francisco.py, então os apps (Meu Chat, Assistente Jurídico…) usam igualzinho: ⚙️ → Voz → 🗣 Francisco. Usa a voz do Microsoft Edge (pacote msedge-tts). Precisa de internet. Só aceita pedidos deste PC.
No app original ele tinha estas funções/partes: umAudio, falar, vozes, cabecalhos, json, ligar.
O original usava as bibliotecas http, msedge-tts: em HTML puro, use a versão de CDN (ou faça sem ela, se for simples).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 10 — `js/55-preload.js` (era `electron/preload.cjs`, 3 linhas)

```text
Crie js/55-preload.js. Ele é uma parte de logica do app.
O original usava as bibliotecas electron: em HTML puro, use a versão de CDN (ou faça sem ela, se for simples).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 11 — `js/60-app.js` (era `app/index.html`, 58 linhas)

```text
Crie js/60-app.js. Ele faz: Faxina PC — 🧹 Faxina PC.
Ele usa o que já foi criado em: js/10-base.js, js/15-ponte.js, js/20-diagnostico.js, js/25-limpar.js, js/30-backup.js, js/35-programas.js, js/40-relatorio.js (pelo APP).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 12 — `js/65-inicio.js` (era `index.html`, 81 linhas)

```text
Crie js/65-inicio.js. Ele faz: Faxina-PC-13-11-A(1) — Faxina-PC-13-11-A(1).
No app original ele tinha estas funções/partes: rec, esc, card, show.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 13 — `js/99-app.js` e conferir

```text
Crie js/99-app.js: ele olha APP.modulos e monta o menu/abas com um botão para cada módulo. Depois, me mande o index.html atualizado com todos os <script src="js/…"> na ordem certa: js/00-core.js, js/10-base.js, js/15-ponte.js, js/20-diagnostico.js, js/25-limpar.js, js/30-backup.js, js/35-programas.js, js/40-relatorio.js, js/45-faxina.js, js/50-voz.js, js/55-preload.js, js/60-app.js, js/65-inicio.js, js/99-app.js.
```

## 5. Conferir no final

- [ ] Abrir o index.html na prévia: aparece a tela sem erro (▤ console vazio)?
- [ ] Cada botão abre a sua parte?
- [ ] Fechar e abrir de novo: os dados continuam?
- [ ] Nada com "replit", "REPL_", "@workspace" no código (🏗️ Preparar confere).
- [ ] 📱 PWA → deixar instalável; 📦 APK ou 🖥️ .exe.
