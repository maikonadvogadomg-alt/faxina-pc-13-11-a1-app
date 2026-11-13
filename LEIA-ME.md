# 🧹 Faxina PC — 13/11-A

Limpa, organiza e faz backup do seu computador, em passos simples. **Não apaga nada:**
o que você manda limpar vai para uma gaveta (Quarentena) que você confere e esvazia quando quiser.

## O que ele faz
- **🔎 Diagnóstico** — olha o disco, o lixo temporário, as pastas `node_modules`, os arquivos repetidos e os Downloads grandes. Diz, em palavras simples, quanto dá para liberar.
- **🧹 Limpar** — move o lixo e as cópias repetidas para a pasta **Quarentena** (em `Faxina-PC\Quarentena`). Nunca apaga.
- **💾 Backup** — junta as pastas que você escolher num `.zip` para guardar em pen drive ou nuvem.
- **📦 Programas** — lista tudo que está instalado e acha os nomes "de carona" (barras de busca, limpadores duvidosos). Não desinstala; mostra para você decidir pelo Windows.
- **📋 Relatório** — um resumo em `.md` para você **baixar e trazer na conversa com a IA**.

## O que ele NÃO faz (de propósito)
Não mexe no antivírus, não desliga defesa nenhuma e não se esconde de nada. É um faxineiro honesto.

## Administrador
Para a faxina completa ele pede administrador: clique com o botão direito no ícone **Faxina PC** →
**Executar como administrador** → **Sim** na telinha do Windows. Sem isso, ele ainda olha tudo e faz o relatório.

## Como gerar o .exe (igual aos seus outros programas)
1. No Mini SK, abra este zip como projeto → 🐙 GitHub → criar repositório **privado** → enviar.
2. No GitHub: **Actions** → "Programa .exe para Windows" → **Run workflow**.
3. Quando ficar verde: **Releases** → **Faxina-PC-Instalar.exe**.

A voz Francisco grátis já vem dentro (lê o relatório em voz alta; precisa de internet).
