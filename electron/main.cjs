/* 🧹 Faxina PC — abre o programa numa janela própria e liga, por dentro:
   - o motor da faxina (faxina.cjs) em 127.0.0.1:7721 — só olha e, no máximo, move para a Quarentena;
   - a voz Francisco grátis (voz.cjs) para ler o relatório em voz alta.
   Não mexe no antivírus, não desliga defesa nenhuma. Faxineiro honesto. */
const { app, BrowserWindow, shell, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const http = require('http');
const net = require('net');
const crypto = require('crypto');
const { spawnSync } = require('child_process');
const WIN = process.platform === 'win32';

const SO_TESTAR = process.env.TESTE_SAIR === '1';
if (!SO_TESTAR && !app.requestSingleInstanceLock()) { app.quit(); return; }

const CASA = process.env.DADOS_EM || path.join(app.getPath('home'), 'Faxina-PC');
try { fs.mkdirSync(CASA, { recursive: true }); } catch {}
const REGISTRO = path.join(CASA, 'registro.txt');
const log = (...a) => { try { fs.appendFileSync(REGISTRO, new Date().toLocaleString('pt-BR') + ' ' + a.map((x) => (x instanceof Error ? x.stack : String(x))).join(' ') + '\n'); } catch {} console.log(...a); };
process.on('uncaughtException', (e) => log('ERRO:', e));

const APP = fs.existsSync(path.join(__dirname, '..', 'app', 'index.html')) ? path.join(__dirname, '..', 'app') : path.join(__dirname, '..');
const CODIGO = crypto.randomBytes(16).toString('hex');
const PORTA_APP = 7720;
const PORTA_FAXINA = 7721;
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json', '.ico': 'image/x-icon' };

function portaOcupada(p) { return new Promise((ok) => { const s = net.createServer(); s.once('error', () => ok(true)); s.listen(p, '127.0.0.1', () => s.close(() => ok(false))); }); }

function servirApp(porta) {
  return new Promise((ok) => {
    const srv = http.createServer((req, res) => {
      let u = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      if (u === '/' || u === '') u = '/index.html';
      // o programa entrega a configuração (porta e código secreto do motor) só para a própria janela
      if (u === '/config.js') { res.writeHead(200, { 'Content-Type': MIME['.js'], 'Cache-Control': 'no-store' }); return res.end('window.FAXINA={porta:' + PORTA_FAXINA + ',codigo:' + JSON.stringify(CODIGO) + '};'); }
      let f = path.join(APP, path.normalize(u).replace(/^([/\\])+/, ''));
      if ((f !== APP && !f.startsWith(APP + path.sep)) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('não existe'); }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
      fs.createReadStream(f).pipe(res);
    });
    srv.on('error', () => ok(false));
    srv.listen(porta, '127.0.0.1', () => ok(true));
  });
}

function souAdmin() { if (!WIN) return true; try { return spawnSync('net', ['session'], { windowsHide: true, timeout: 4000 }).status === 0; } catch { return false; } }

ipcMain.handle('elevar', () => {
  if (!WIN) return false;
  try { spawnSync('powershell', ['-NoProfile', '-Command', 'Start-Process', '-FilePath', '"' + process.execPath + '"', '-Verb', 'RunAs'], { windowsHide: true }); app.quit(); return true; } catch (e) { log('elevar:', e); return false; }
});

async function criarJanela() {
  const ok = await servirApp(PORTA_APP);
  if (!ok) log('⚠ Não consegui ligar a tela na porta ' + PORTA_APP);
  // 🧹 o motor da faxina (dentro do programa)
  process.env.FAXINA_PORTA = String(PORTA_FAXINA); process.env.FAXINA_CODIGO = CODIGO;
  try { require('./faxina.cjs').ligar({ log }); } catch (e) { log('faxina:', e.message); }
  // 🗣 a voz Francisco grátis (para ler o relatório)
  try { require('./voz.cjs').ligar({ log }); } catch (e) { log('voz:', e.message); }

  if (SO_TESTAR) { log('TESTE: app=' + ok + ' admin=' + souAdmin()); setTimeout(() => app.exit(0), 400); return; }

  const win = new BrowserWindow({
    width: 980, height: 860, minWidth: 360, backgroundColor: '#0f172a', autoHideMenuBar: true,
    title: 'Faxina PC' + (souAdmin() ? ' (administrador)' : ''),
    icon: path.join(APP, 'icons', 'icon-512.png'),
    webPreferences: { preload: path.join(__dirname, 'preload.cjs'), contextIsolation: true },
  });
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  win.loadURL('http://127.0.0.1:' + PORTA_APP + '/index.html');
}

app.whenReady().then(criarJanela);
app.on('second-instance', () => { const w = BrowserWindow.getAllWindows()[0]; if (w) { if (w.isMinimized()) w.restore(); w.focus(); } });
app.on('window-all-closed', () => app.quit());
