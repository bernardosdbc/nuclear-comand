# 🌆 Cidade POC — Meu Mundo Pessoal

> **POC** — Proof of Concept. Não é produto. É **meu brinquedo**.
> Base hackável pra transformar programação em algo interativo e pessoal.

---

## 🚀 Rodando

```bash
# 1. Instala dependências
npm install

# 2. Roda a POC (Three.js standalone + HMR)
npm run dev
# → Abre http://localhost:5173

# 3. Em outro terminal, sobe o SystemCity (cidade estática)
cd ../systemcity
python -m http.server 4190
# → http://localhost:4190/?cidade=cidade-cyberpunk
```

---

## 🎮 Controles

| Ação | Tecla/Mouse |
|------|-------------|
| **Orbitar câmera** | Drag esquerdo |
| **Zoom** | Scroll |
| **Andar (WASD)** | Botão "Andar" no HUD → WASD |
| **Clique prédio** | Abre painel lateral |
| **Botão "Abrir no VS Code"** | `console.log('abrir:', id)` — você implementa |
| **Spawn Agent** | HUD → "🧍 Spawn Gestor" |
| **Spawn Drone** | HUD → "🚁 Drone Build→Review" |
| **Chaos Mode** | HUD → "🌪️ Chaos Mode" |
| **Command Palette** | `Ctrl+K` |

---

## 🎨 O Que Você Vê

```
┌─────────────────────────────────────────────────────────────┐
│  🌆 SUA CIDADE CYBERPUNK LOW-POLY                           │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Three.js Canvas (60fps)                                │ │
│  │  • 8 Distritos = seus 8 componentes                     │ │
│  │  • Prédios = arquivos (cor = linguagem, altura = LOC)   │ │
│  │  • Cidadãos = agentes IA andando                        │ │
│  │  • Drones = sub-agentes voando entre distritos          │ │
│  │  • Névoa, grid sutil, luzes cyberpunk                   │ │
│  └─────────────────────────────────────────────────────────┘ │
│  📋 Painel lateral (clica prédio) → info + ações            │
│  🎮 HUD: spawn agents, drones, chaos mode, camera modes     │
│  ⌨️ Ctrl+K = Command Palette no mundo 3D                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Sua Paleta (Cyberpunk Low-Poly)

| Distrito | Cor | Hex | Vibe |
|----------|-----|-----|------|
| Núcleo Central | Teal | `#00d4aa` | Coração, vida |
| Servo Busca | Azul Gelo | `#6a8cff` | Frio, analítico |
| Servo Construção | Âmbar | `#ffaa44` | Calor, fazer |
| Servo Revisão | Rosa Neon | `#ff6b9d` | Alerta, crítico |
| Terminal PTY | Cinza Azulado | `#3a4a5a` | Infra, base |
| Extension Host | Cinza Médio | `#4a5a6a` | Plataforma |
| OpenCode Core | Cinza Claro | `#5a6a7a` | IA |
| Monaco IDE | Escuro | `#1a2a3a` | Editor |

---

## 🛠️ Hackeando (Onde Mexer)

| Quer Mudar... | Arquivo |
|---------------|---------|
| Adicionar distrito | `src/store/useCityStore.ts` → `DISTRICT_CONFIG` |
| Mudar cor do prédio | `src/world/Building.tsx` → `langColors` |
| Novo tipo de agente | `src/agents/Agent.ts` + novo `.tsx` |
| Novo comando `Ctrl+K` | `src/ui/CommandPalette.tsx` → `COMMANDS` |
| Shader toon/cel | `src/aesthetic/shaders/toon.frag` |
| Cores globais | `src/aesthetic/palette.ts` |
| Lógica de movimento | `src/agents/Agent.ts` → `update()` |
| Conectar code-server real | `src/vscode/api.ts` → `fetchWorkspace()` |

---

## 🔌 Próximos Passos (Quando Quiser)

1. **Conectar code-server real** → edita `src/vscode/api.ts` aponta pro Docker
2. **WebSocket vivo** → `connectWorkspaceEvents()` no `useCityStore`
3. **Clique = abre no VS Code real** → IPC pro Electron main
4. **Agentes reais** → ponte pro OpenCode Service (porta 28894)
4. **Seus modelos .glb** → `public/models/` + `useGLTF` do Drei

---

## 🎯 Filosofia

> **Não é produto. É seu mundo.**
> - Código feio? **Perfeito.**
> - Quebrou? **Conserta na hora.**
> - Quer feature esquisita? **Faz na hora.**
> - É seu brinquedo. **Só seu.**

---

```
npm install && npm run dev
```

**Bem-vindo ao seu mundo.** 🌆✨