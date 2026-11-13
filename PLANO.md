# 📋 Plano do projeto: Faxina-PC-13-11-A(1)

_Gerado em 13/11/2026, 18:38:07 — sem IA, lendo os arquivos._

## 📊 Visão geral
| Item | Valor |
|---|---|
| Arquivos | 59 |
| Linhas | 1.321 |
| Telas/páginas | 2 |
| Rotas do backend | 0 |
| Chamadas do app | 0 |
| Tabelas do banco | 0 |
| Variáveis de ambiente | 4 |

**Linguagens:** Imagem (30), JavaScript (14), Imagem SVG (4), JSON (3), Ícone (2), HTML (2), YAML (1), CSS (1), Outros (1), Markdown (1)

## 💡 O que fazer (em ordem)
1. 🧹 Tirar a Replit de 2 arquivo(s) (🏗️ Preparar → Fazer tudo)
2. 🔐 Criar um .env.example com: DADOS_EM, FAXINA_CODIGO, FAXINA_PORTA, TESTE_SAIR (os valores você coloca no servidor, nunca no código)
3. 📝 Criar um README.md explicando como rodar
4. 🚫 Criar .gitignore (não mandar node_modules ao GitHub)

## 🚀 Por onde começa
- `app/index.html`
- `index.html`

## ⌨️ Comandos (package.json)
| Pasta | Comando | O que roda |
|---|---|---|
| . | `npm run programa` | `electron .` |
| . | `npm run exe` | `electron-builder --win nsis portable --x64 --publish never` |

## 📱 Telas e páginas
| Endereço | Arquivo |
|---|---|
| `app/index.html` | app/index.html |
| `index.html` | index.html |

## 🖥️ Rotas do backend
_Nenhum encontrado._

## 📡 O que o app pede ao servidor
_Nenhum encontrado._

## 🔌 O que falta no backend
✅ Tudo que o app chama tem rota no projeto (ou o app não usa servidor).

## 🗄️ Banco de dados
_Nenhuma tabela encontrada._

## 🔐 Variáveis de ambiente (configurar no servidor)
- `DADOS_EM`
- `FAXINA_CODIGO`
- `FAXINA_PORTA`
- `TESTE_SAIR`

_Só os nomes. Os valores (chaves, senhas) nunca vão no código nem no GitHub._

## 📦 Peças principais (dependências)
`msedge-tts`

## 🧹 Arquivos com coisa da Replit
- app/service-worker.js
- service-worker.js

## 🔁 Roteiro para recriar fora da Replit
1. Importar o projeto no Mini SK e tocar em 🏗️ Preparar → ✅ Fazer tudo (tira a Replit, cria os arquivos que faltam).
2. Não tem backend: o site sozinho basta (Netlify ou GitHub Pages).
3. Variáveis: cadastrar 4 variável(is) no servidor (lista acima).
4. Testar a prévia; se der erro, 🤖 Mandar os erros para a IA.
5. App: 📲 Instalável (PWA), 📦 APK ou 🖥️ Desktop (.exe) pelo 🏗️ Preparar.

## 🌳 Árvore de arquivos
```
├─ 📁 .github/
│  └─ 📁 workflows/
│     └─ programa-exe.yml
├─ 📁 app/
│  ├─ 📁 css/
│  │  └─ app.css
│  ├─ 📁 icons/
│  │  ├─ apple-touch-icon.png
│  │  ├─ icon-128.png
│  │  ├─ icon-144.png
│  │  ├─ icon-152.png
│  │  ├─ icon-16.png
│  │  ├─ icon-180.png
│  │  ├─ icon-192.png
│  │  ├─ icon-32.png
│  │  ├─ icon-384.png
│  │  ├─ icon-48.png
│  │  ├─ icon-512.png
│  │  ├─ icon-72.png
│  │  ├─ icon-96.png
│  │  ├─ icon.svg
│  │  ├─ maskable-192.png
│  │  ├─ maskable-512.png
│  │  └─ maskable.svg
│  ├─ 📁 js/
│  │  ├─ 00-base.js
│  │  ├─ 10-ponte.js
│  │  ├─ 20-diagnostico.js
│  │  ├─ 30-limpar.js
│  │  ├─ 40-backup.js
│  │  ├─ 50-programas.js
│  │  ├─ 60-relatorio.js
│  │  └─ 99-app.js
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ manifest.json
│  └─ service-worker.js
├─ 📁 electron/
│  ├─ faxina.cjs
│  ├─ instalar.nsh
│  ├─ main.cjs
│  ├─ preload.cjs
│  └─ voz.cjs
├─ 📁 icons/
│  ├─ apple-touch-icon.png
│  ├─ icon-128.png
│  ├─ icon-144.png
│  ├─ icon-152.png
│  ├─ icon-16.png
│  ├─ icon-180.png
│  ├─ icon-192.png
│  ├─ icon-32.png
│  ├─ icon-384.png
│  ├─ icon-48.png
│  ├─ icon-512.png
│  ├─ icon-72.png
│  ├─ icon-96.png
│  ├─ icon.svg
│  ├─ maskable-192.png
│  ├─ maskable-512.png
│  └─ maskable.svg
├─ favicon.ico
├─ index.html
├─ LEIA-ME.md
├─ manifest.json
├─ package.json
└─ service-worker.js
```
