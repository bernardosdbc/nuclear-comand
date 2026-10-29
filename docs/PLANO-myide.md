# MyIDE — Análise e Plano de Customização do VS Code

> Documento de referência da operação **OP-007**. Levantamento feito em 29/10/2026 direto no
> repositório remoto (`raw.githubusercontent.com` + API do GitHub) e no workspace local.

---

## 1. O que é `github.com/bernardosdbc/MyIDE`

| Campo | Valor |
|---|---|
| Descrição | *"My custom version of VSCode"* |
| Tipo | **Fork público** de `microsoft/vscode` |
| Visibilidade | público |
| Branch | `main` (única) |
| Commits | **169.055** (histórico integral do VS Code) |
| Criado / último push | 25/10/2026 — fork estático, sem commits próprios |
| Tamanho (API GitHub) | **1.622.319 KB ≈ 1,62 GB** (working tree do branch padrão) |
| Licença | MIT (Code - OSS) |
| Linguagem | TypeScript |

**Conteúdo:** árvore real do VS Code — `src/`, `extensions/`, `build/`, `cli/`, `remote/`,
`scripts/`, `test/`, `product.json`, `gulpfile.mjs`. Não há customização alguma: é o upstream
recém-forkado.

### Metadados técnicos lidos do fork

| Item | Valor |
|---|---|
| `package.json` → `name` / `version` | `code-oss-dev` / **1.144.0** |
| `.nvmrc` | **Node 24.22.1** |
| `product.json` | padrão: `nameShort`/`nameLong` = `Code - OSS`, `applicationName` = `code-oss`, `dataFolderName` = `.vscode-oss` |
| Scripts relevantes | `npm run compile`, `npm run watch`, `npm run gulp -- vscode-win32-x64` |

---

## 2. Estado local: pasta `MyIDE/` (clone abortado)

Diagnóstico em 29/10/2026 09:01:

- `.git/HEAD` aponta para `refs/heads/.invalid` — placeholder do git quando o clone não conclui;
- **0 bytes** de objetos, nenhum commit (`No commits yet`);
- `remote.origin.url` já aponta para `https://github.com/bernardosdbc/MyIDE.git`.

Conclusão: clone interrompido, sem utilidade no estado atual. Pode ser retomado
(`git fetch --depth 1 origin main && git checkout -B main origin/main`) ou descartado.

> A pasta foi adicionada ao `.gitignore` para não poluir o repositório do Núcleo de Comando.

---

## 3. Custo de clonar

| Modalidade | Disco | Tempo (100 Mbps) | Tempo (20 Mbps) |
|---|---|---|---|
| Clone completo (histórico integral) | ~2,5–4 GB | 3–5 min | 12–20 min |
| Clone raso (`--depth 1`) | ~1,6 GB | 2–3 min | ~7 min |
| Build após o clone | +5–8 GB | — | — |

---

## 4. Plano de customização

### Fase 0 — Decidir o alvo

| Nível | O que entrega | Esforço | Vale a pena se… |
|---|---|---|---|
| **A. Sem fork** (settings, keybindings, snippets, profiles, tema, extensões) | IDE 100% seu, zero build | 1–2 h | é sobre fluxo de trabalho |
| **B. Distribuição** (fork + `product.json`, ícones, welcome, extensões padrão) | IDE com sua marca | 2–5 dias | quer produto com nome/ícone próprios |
| **C. Mods de UI no workbench** (TypeScript) | IDE diferente de fato | 2–6 semanas + manutenção | quer editor de nicho real |
| **D. Embutir `monaco-editor` no Núcleo de Comando** | editor dentro do app Electron existente | 1–3 dias | é o que o projeto pede |

**Recomendação:** para o Núcleo de Comando, o nível **D** entrega em dias o que B/C leva
semanas. Fork de VS Code só se justifica para distribuir um IDE com marca própria.

### Fase 1 — Ambiente (Windows)

| Requisito | Versão | Observação |
|---|---|---|
| Node | **24.22.1** exato | `nvm install 24.22.1 && nvm use 24.22.1` |
| Python | 3.11+ | no PATH (node-gyp) |
| VS Build Tools 2022 | workload *Desenvolvimento para desktop com C++* | ~7 GB |
| Git | recente | ok |
| Disco livre | ≥ 15 GB | fonte + node_modules + `out/` + `.build/` |

### Fase 2 — Clonar, instalar, compilar, rodar

```powershell
cd MyIDE
git fetch --depth 1 origin main
git checkout -B main origin/main

npm install          # 10–25 min (compila nativos e extensões)
npm run compile      # 5–15 min
.\scripts\code.bat   # abre o VS Code compilado
```

Ciclo de dev: `npm run watch` + `.\scripts\code.bat` (ou F5).

### Fase 3 — Branding (nível B)

1. `product.json`: `nameShort`, `nameLong`, `applicationName`, `dataFolderName`,
   `win32AppId` / `win32x64UserAppId` (GUIDs novos), `win32RegValueName`,
   `win32AppUserModelId`, `urlProtocol`, `darwinBundleIdentifier`, `linuxIconName`,
   `reportIssueUrl`.
2. Ícones: `resources/win32/*.ico`, `resources/darwin/*.icns`, `resources/linux/*.png`.
3. Tela de boas-vindas: `src/vs/workbench/contrib/welcomeGettingStarted/`.
4. Extensões embutidas: ajustar `builtInExtensions`.
5. Settings padrão: `configurationDefaults` no `product.json`.

⚠️ Fork **não pode** usar o Marketplace oficial (ToS). Usar **Open VSX**
(`product.json` → `extensionsGallery`). A MIT permite redistribuir o código, não a marca.

### Fase 4 — Mods profundos (nível C)

Pontos de entrada: `src/vs/workbench/browser/parts/` (layout, activity bar, status bar),
`src/vs/workbench/contrib/<área>/` (features), `src/vs/platform/` (serviços),
`src/vs/workbench/browser/media/` (CSS). Contribuição nova = `IWorkbenchContribution`
registrado.

### Fase 5 — Empacotar

```powershell
npm run gulp -- vscode-win32-x64     # saída em .build\win32-x64
```

Instalador: Inno Setup (ou `vscode-win32-x64-inno-updater`). Assinatura de código é opcional
(evita alerta do SmartScreen).

---

## 5. Riscos

| Risco | Impacto |
|---|---|
| Rebase mensal com upstream | cada release gera conflitos no que foi tocado; nível C conflita quase sempre |
| Tamanho do repositório | git lento, indexação pesada — usar `--depth` e `sparse-checkout` |
| Build frágil | falha fácil por Node/Python/C++ fora de versão — travar as versões da Fase 1 |
| Marketplace | exige Open VSX ou gateway próprio |

---

## 6. Próximo passo

Aguardando decisão do operador entre os níveis **A / B / C / D**.
