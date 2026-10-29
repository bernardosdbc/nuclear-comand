# Repository Notes

Projeto **Núcleo de Comando**: app desktop (Electron) com o OpenCode embutido. O usuário fala
com o agente `gestor`, que orquestra os drones `servo-busca`, `servo-construcao` e `servo-revisao`.

## Estrutura

- `app/` — app Electron. Entrada `main.js` (processo principal: sobe o servidor do painel,
  conecta ao serviço local do OpenCode, expõe `/api/chat`, `/api/chat/status`, `/api/modelos`,
  `/api/modelo`, `/api/ps`). Launcher Windows: `Imperio.bat`.
- `jogo/` — painel e servidor local: `interface.html` (single-file, shell de IDE idle),
  `servidor.js` (API de estado/registro/ordens), `estado.json`, `registro.md`, `ordens.md`.
- `.opencode/agents/` — `gestor.md` + 3 `servo-*.md`; `.opencode/commands/novo-jogo.md`.

## Comandos

- Rodar o app: `cd app && npm install && npm start` (ou `app\Imperio.bat`).
- Painel: `http://localhost:5173` (porta alternativa se ocupada). Só existe após subir o app.
- Checagem rápida de sintaxe: `node --check jogo/servidor.js` e `node --check app/main.js`.
- Smoke tests do canal de chat/provedores: `app/teste-chat.mjs`, `app/probe-modelos.mjs`,
  `app/probe-switch.mjs`, `app/diag.mjs`.
- Não há framework de testes, lint ou build configurado; não invente scripts.

## Convenções e restrições

- Windows-only: terminal PowerShell e `Imperio.bat`.
- `opencode.json` define o modelo padrão; `opencode.jsonc` nega `rm`.
- A guarda do terminal (`PS_BLOQUEIOS` em `app/main.js`) é lista negra, **não** um sandbox.
- Estado em `jogo/estado.json` e `jogo/registro.md` é snapshot versionado: mudanças exigem commit.
- O painel lê `jogo/estado.json` e `jogo/registro.md`; ordens entram por `jogo/ordens.md`.

# Preferências

- Sempre responda em português (pt-BR).
- Nunca execute o comando `rm` (nem variações destrutivas como `rm -rf`). Se for necessário remover arquivos, peça confirmação e proponha uma alternativa segura.
