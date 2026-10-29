// Cidade Cyberpunk Low-Poly — Núcleo de Comando
// Distritos = Projetos | Cidadãos = Agentes IA | Drones = Sub-agentes
// Estética: low-poly intencional, tons frios/neutros, cyberpunk "rústico"
// Carregue com: index.html?cidade=cidade-cyberpunk
SystemCity.definir({
  titulo: 'NÚCLEO — Cidade Cyberpunk',

  bairros: [
    {
      id: 'nucleo-central',
      nome: 'NÚCLEO-CENTRAL',
      sub: 'Orquestração, Estado, Decisões',
      grade: [-6, -2, 3, 3],
      cor: 0x00d4aa,
      porLinha: 2,
      cada: 2.8,
      foco: true,
      desc: 'Cérebro da cidade. Onde o Gestor toma decisões, estado global vive, ordens são expedidas.',
      operario: 'Ordem',
      estacoes: [
        { id: 'nc-gestor', nome: 'GESTOR', desc: 'Orquestra toda a cidade. Recebe intenções, decompoe em ordens, delega aos servos.' },
        { id: 'nc-estado', nome: 'ESTADO-GLOBAL', desc: 'Snapshot vivo da cidade: distritos ativos, agentes vivos, saúde geral.' },
        { id: 'nc-memoria', nome: 'MEMÓRIA-LONGA', desc: 'Contexto persistente. Decisões passadas, padrões aprendidos, história da cidade.' },
        { id: 'nc-comando', nome: 'CENTRO-COMANDO', desc: 'Interface com o operador humano. Painel, alertas, aprovações críticas.' },
      ],
      desvios: [
        { id: 'nc-d-sobrecarga', nome: 'Sobrecarga Cognitiva', de: 'nc-gestor', volta: 'nc-estado', p: 0.05, desc: 'Gestor saturado. Estado assume triagem temporária.' },
      ],
      catalogo: {
        docs: [
          { id: 'adr-001', titulo: 'ADR-001: Arquitetura Multi-Agente', status: 'aceita', tipo: 'adr' },
          { id: 'adr-002', titulo: 'ADR-002: Protocolo de Comunicação IPC', status: 'aceita', tipo: 'adr' },
          { id: 'spec-001', titulo: 'SPEC: Protocolo Gestor↔Servos', status: 'aprovada', tipo: 'spec' },
        ]
      }
    },

    {
      id: 'servo-busca',
      nome: 'SERVO-BUSCA',
      sub: 'Reconhecimento, Leitura, Varredura',
      grade: [-2, -2, 3, 3],
      cor: 0x6a8cff,
      porLinha: 2,
      cada: 2.2,
      desc: 'Olhos da cidade. Varredura de código, busca semântica, leitura de specs, mapeamento de dependências.',
      operario: 'Query',
      estacoes: [
        { id: 'sb-varredura', nome: 'VARREDURA', desc: 'Mapeia o território: arquivos, símbolos, imports, git history.' },
        { id: 'sb-leitura', nome: 'LEITURA-PROFUNDA', desc: 'Lê arquivos alvo, extrai contexto, resume intenção.' },
        { id: 'sb-busca', nome: 'BUSCA-SEMANTICA', desc: 'Encontra padrões, similaridades, código relacionado por significado.' },
        { id: 'sb-relatorio', nome: 'RELATÓRIO', desc: 'Entrega dossiê estruturado ao Gestor: achados, riscos, sugestões.' },
      ],
      desvios: [
        { id: 'sb-d-ruido', nome: 'Ruído Excessivo', de: 'sb-busca', volta: 'sb-varredura', p: 0.1, desc: 'Muitos falsos positivos. Refina query, recomeça.' },
      ],
      catalogo: {
        docs: [
          { id: 'spec-sb-001', titulo: 'SPEC: API de Busca Vetorial', status: 'rascunho', tipo: 'spec' },
        ]
      }
    },

    {
      id: 'servo-construcao',
      nome: 'SERVO-CONSTRUÇÃO',
      sub: 'Implementação, Edição, Build',
      grade: [2, -2, 3, 3],
      cor: 0xffaa44,
      porLinha: 2,
      cada: 2.0,
      desc: 'Mãos da cidade. Escreve código, aplica refatorações, roda builds, executa testes.',
      operario: 'Patch',
      estacoes: [
        { id: 'sc-plano', nome: 'PLANO-EXECUÇÃO', desc: 'Recebe ordem, quebra em passos atômicos, valida dependências.' },
        { id: 'sc-edita', nome: 'EDIÇÃO-CIRÚRGICA', desc: 'Aplica diffs precisos: cria, edita, move, renomeia arquivos.' },
        { id: 'sc-build', nome: 'BUILD & TESTE', desc: 'Compila, roda suite, valida lint, type-check. Falha = desvio.' },
        { id: 'sc-commit', nome: 'COMMIT & SYNC', desc: 'Commita mudanças, push, abre PR se necessário, notifica Gestor.' },
      ],
      desvios: [
        { id: 'sc-d-falha-teste', nome: 'Teste Falhou', de: 'sc-build', volta: 'sc-edita', p: 0.15, desc: 'Regressão detectada. Volta à edição com erro em mãos.' },
        { id: 'sc-d-conflito', nome: 'Conflito de Merge', de: 'sc-commit', volta: 'sc-plano', p: 0.08, desc: 'Base diveruiu. Replaneja com novo contexto.' },
      ],
      catalogo: {
        docs: [
          { id: 'spec-sc-001', titulo: 'SPEC: Pipeline de Build Zero-Config', status: 'aprovada', tipo: 'spec' },
        ]
      }
    },

    {
      id: 'servo-revisao',
      nome: 'SERVO-REVISÃO',
      sub: 'Inspeção, Qualidade, Validação',
      grade: [-6, 2, 3, 3],
      cor: 0xff6b9d,
      porLinha: 2,
      cada: 2.5,
      desc: 'Crítico da cidade. Code review automático, security scan, performance, conformidade.',
      operario: 'Veredito',
      estacoes: [
        { id: 'sr-static', nome: 'ANÁLISE-ESTÁTICA', desc: 'Lint, type-check, complexidade, duplicação, dead code.' },
        { id: 'sr-security', nome: 'VARREDURA-SEGURANÇA', desc: 'Secrets, vulnerabilidades conhecidas, supply chain, permissões.' },
        { id: 'sr-perf', nome: 'PERFIL DE PERFORMANCE', desc: 'Bundle size, runtime hotspots, memory leaks, regression benchmarks.' },
        { id: 'sr-veredito', nome: 'VEREDITO FINAL', desc: 'Aprova / Rejeita / Pede mudanças. Gera relatório para Gestor.' },
      ],
      desvios: [
        { id: 'sr-d-critico', nome: 'Falha Crítica', de: 'sr-security', volta: 'sr-static', p: 0.03, desc: 'Vulnerabilidade bloqueante. Para a linha, exige correção imediata.' },
      ],
      catalogo: {
        docs: [
          { id: 'spec-sr-001', titulo: 'SPEC: Gates de Qualidade', status: 'aprovada', tipo: 'spec' },
        ]
      }
    },

    {
      id: 'terminal-pty',
      nome: 'TERMINAL-PTY',
      sub: 'Shell Vivo, Execução, PTY Real',
      grade: [-2, 2, 3, 3],
      cor: 0x3a4a5a,
      porLinha: 2,
      cada: 1.8,
      desc: 'Espinha dorsal de execução. PowerShell persistente, PTY real (ConPTY), estado preservado entre comandos.',
      operario: 'Linha',
      semItens: true,
      estacoes: [
        { id: 'tp-shell', nome: 'SHELL-PERSISTENTE', desc: 'PowerShell vivo. cd, $env, functions, history sobrevivem entre comandos.' },
        { id: 'tp-pty', nome: 'CONPTY-REAL', desc: 'PTY nativo via node-pty. vim, htop, git rebase -i, prompts de senha funcionam.' },
        { id: 'tp-politica', nome: 'GUARDA-POLÍTICA', desc: 'Lista negra destrutiva (rm, del, format). Bloqueia antes de executar.' },
        { id: 'tp-history', nome: 'HISTÓRICO-256KB', desc: 'Buffer circular. Reconecta = recebe contexto completo.' },
      ],
      catalogo: {
        docs: [
          { id: 'spec-tp-001', titulo: 'SPEC: Terminal PTY Real vs Pipe Fallback', status: 'aceita', tipo: 'spec' },
        ]
      }
    },

    {
      id: 'extension-host',
      nome: 'EXTENSION-HOST',
      sub: 'Plugins, VSIX, Marketplace Próprio',
      grade: [2, 2, 3, 3],
      cor: 0x4a5a6a,
      porLinha: 2,
      cada: 2.3,
      desc: 'Ecossistema de extensões. Carrega VSIX, sandbox VM, API vscode.*, Open VSX registry.',
      operario: 'Plugin',
      estacoes: [
        { id: 'eh-loader', nome: 'CARREGADOR-VSIX', desc: 'Baixa do Open VSX, extrai, valida manifest, isola em sandbox VM.' },
        { id: 'eh-sandbox', nome: 'SANDBOX-VM', desc: 'Contexto isolado por extensão. require() custom, APIs vscode.* limitadas.' },
        { id: 'eh-api', nome: 'API-VSCODE', desc: 'workspace, window, commands, languages, extensions, env — subset funcional.' },
        { id: 'eh-marketplace', nome: 'MARKETPLACE-UI', desc: 'Busca, instala, habilita/desabilita, desinstala. Open VSX + VSIX local.' },
      ],
      desvios: [
        { id: 'eh-d-crash', nome: 'Extensão Travou', de: 'eh-sandbox', volta: 'eh-loader', p: 0.07, desc: 'Extensão lança exceção não tratada. Isola, desativa, notifica.' },
      ],
      catalogo: {
        docs: [
          { id: 'spec-eh-001', titulo: 'SPEC: Extension Host MVP', status: 'em-progresso', tipo: 'spec' },
        ]
      }
    },

    {
      id: 'opencode-core',
      nome: 'OPENCODE-CORE',
      sub: 'Agente IA Embutido, Sessões, Modelos',
      grade: [6, -2, 3, 3],
      cor: 0x5a6a7a,
      porLinha: 2,
      cada: 3.0,
      desc: 'Cérebro de IA. Sessão OpenCode local, agente Gestor, troca de modelos, streaming SSE.',
      operario: 'Prompt',
      estacoes: [
        { id: 'oc-sessao', nome: 'SESSÃO-OPENCODE', desc: 'Conecta ao serviço local. Cria sessão com agente Gestor.' },
        { id: 'oc-modelos', nome: 'TROCA-MODELOS', desc: 'Lista provedores/modelos. Hot-swap sem reiniciar sessão.' },
        { id: 'oc-chat', nome: 'CHAT-STREAMING', desc: 'SSE bidirecional. Delta de texto, progresso de tools, reasoning ao vivo.' },
        { id: 'oc-tools', nome: 'EXECUÇÃO-FERRAMENTAS', desc: 'Tools do agente: read, write, edit, bash, grep, task. Streaming de progresso.' },
      ],
      catalogo: {
        docs: [
          { id: 'spec-oc-001', titulo: 'SPEC: Integração OpenCode Local', status: 'aceita', tipo: 'spec' },
        ]
      }
    },

    {
      id: 'monaco-ide',
      nome: 'MONACO-IDE',
      sub: 'Editor, Abas, Explorer, Git, Paleta',
      grade: [6, 2, 3, 3],
      cor: 0x1a2a3a,
      porLinha: 2,
      cada: 2.0,
      desc: 'Interface humana. Monaco Editor, abas, explorer lazy, git diff, paleta, terminal integrado.',
      operario: 'Cursor',
      estacoes: [
        { id: 'mi-editor', nome: 'EDITOR-MONACO', desc: 'Monaco 0.57, tema nucleo-escuro, minimap, bracket-pair, formatação.' },
        { id: 'mi-abas', nome: 'GESTÃO-ABAS', desc: 'Múltiplas abas, dirty indicator, Ctrl+W, salvamento automático.' },
        { id: 'mi-explorer', nome: 'EXPLORER-LAZY', desc: 'Árvore preguiçosa, CRUD arquivos/pastas, git status badges.' },
        { id: 'mi-git', nome: 'GIT-INTEGRADO', desc: 'Branch, status porcelain, diff unificado, stage/unstage (futuro).' },
        { id: 'mi-paleta', nome: 'PALETA-COMANDOS', desc: 'Ctrl+Shift+P, Ctrl+P, atalhos completos, extensível.' },
      ],
      catalogo: {
        docs: [
          { id: 'spec-mi-001', titulo: 'SPEC: IDE Monaco no Electron', status: 'aceita', tipo: 'spec' },
        ]
      }
    },
  ],

  externos: [
    { id: 'github', nome: 'GitHub', q: [-10, -5], f: [10, 8], h: 18, entra: 'Push/PR/Webhook', sai: 'Status/Checks/Deploy', desc: 'Origem de código, CI/CD, issues, reviews.' },
    { id: 'npm', nome: 'NPM Registry', q: [-10, 5], f: [8, 6], h: 12, entra: 'Install/Publish', sai: 'Packages/Versions', desc: 'Dependências, publicação de pacotes próprios.' },
    { id: 'openvsx', nome: 'Open VSX Registry', q: [10, -5], f: [8, 6], h: 10, entra: 'Search/Install', sai: 'VSIX/Metadata', desc: 'Marketplace de extensões open source.' },
    { id: 'opencode-svc', nome: 'OpenCode Service', q: [10, 5], f: [8, 8], h: 14, entra: 'Prompt/Session', sai: 'Stream/Tools/Model', desc: 'Serviço local OpenCode (porta 28894).' },
    { id: 'docker', nome: 'Docker/Containers', q: [-10, 10], f: [8, 10], h: 16, entra: 'Build/Run', sai: 'Images/Logs/Health', desc: 'Containers para testes, DBs, serviços auxiliares.' },
  ],

  rotas: {
    'nc-sb': { de: 'nc-gestor', para: 'sb-varredura', cor: 0x00d4aa },
    'nc-sc': { de: 'nc-gestor', para: 'sc-plano', cor: 0xffaa44 },
    'nc-sr': { de: 'nc-gestor', para: 'sr-static', cor: 0xff6b9d },
    'nc-tp': { de: 'nc-comando', para: 'tp-shell', cor: 0x3a4a5a },
    'nc-eh': { de: 'nc-gestor', para: 'eh-loader', cor: 0x4a5a6a },
    'nc-oc': { de: 'nc-gestor', para: 'oc-sessao', cor: 0x5a6a7a },
    'nc-mi': { de: 'nc-comando', para: 'mi-editor', cor: 0x1a2a3a },
    'sc-tp': { de: 'sc-build', para: 'tp-shell', cor: 0xffaa44 },
    'sc-mi': { de: 'sc-edita', para: 'mi-editor', cor: 0xffaa44 },
    'sr-mi': { de: 'sr-veredito', para: 'mi-editor', cor: 0xff6b9d },
    'eh-mi': { de: 'eh-api', para: 'mi-paleta', cor: 0x4a5a6a },
    'mi-github': { de: 'mi-git', para: 'github', cor: 0x6a8cff },
    'eh-openvsx': { de: 'eh-marketplace', para: 'openvsx', cor: 0x4a5a6a },
    'oc-svc': { de: 'oc-sessao', para: 'opencode-svc', cor: 0x5a6a7a },
    'tp-docker': { de: 'tp-shell', para: 'docker', cor: 0x3a4a5a },
  },

  recortes: {
    'nucleo-central': ['github', 'opencode-svc'],
    'servo-busca': ['github'],
    'servo-construcao': ['github', 'npm', 'docker'],
    'servo-revisao': ['github', 'npm'],
    'terminal-pty': ['docker'],
    'extension-host': ['openvsx', 'npm'],
    'opencode-core': ['opencode-svc', 'github'],
    'monaco-ide': ['github', 'opencode-svc'],
  },

  ambiente: [
    { rota: 'nc-sb', cada: 8, volta: 0x00d4aa },
    { rota: 'nc-sc', cada: 10, volta: 0xffaa44 },
    { rota: 'nc-sr', cada: 12, volta: 0xff6b9d },
    { rota: 'mi-github', cada: 15, volta: 0x6a8cff },
    { rota: 'oc-svc', cada: 20, volta: 0x5a6a7a },
  ],

  diagnosticos: {
    'nc-d-sobrecarga': [
      { cod: 'NC01', causa: 'Muitas ordens simultâneas na fila do Gestor.', resolver: 'Estado-Global assume triagem; Servos aguardam.', lado: 'Núcleo' },
      { cod: 'NC02', causa: 'Loop de decisão sem convergência.', resolver: 'Gestor solicita clarificação ao operador humano.', lado: 'Gestor' },
    ],
    'sb-d-ruido': [
      { cod: 'SB01', causa: 'Query muito ampla — muitos falsos positivos.', resolver: 'Refina termos, adiciona filtros de path/tipo.', lado: 'Busca' },
      { cod: 'SB02', causa: 'Índice desatualizado.', resolver: 'Reindexa workspace; aguarda conclusão.', lado: 'Índice' },
    ],
    'sc-d-falha-teste': [
      { cod: 'SC01', causa: 'Regressão funcional introduzida.', resolver: 'Reverte diff mínimo; roda teste isolado; corrige.', lado: 'Build' },
      { cod: 'SC02', causa: 'Teste flaky (instável).', resolver: 'Marca como flaky; investiga causa raiz separadamente.', lado: 'Teste' },
    ],
    'sc-d-conflito': [
      { cod: 'SC03', causa: 'Base remota avançou (outro agente/branch).', resolver: 'Rebase/merge; revalida plano; reexecuta.', lado: 'Sync' },
    ],
    'sr-d-critico': [
      { cod: 'SR01', causa: 'Secret vazado (API key, token, senha).', resolver: 'Revoga secret; roda rotate; remove do histórico (BFG).', lado: 'Segurança' },
      { cod: 'SR02', causa: 'CVE crítica em dependência direta.', resolver: 'Atualiza dependência; roda testes; se breaking, planeja migração.', lado: 'Supply Chain' },
    ],
    'eh-d-crash': [
      { cod: 'EH01', causa: 'Extensão lança exceção não tratada no activate().', resolver: 'Desativa extensão; isola sandbox; loga stack trace.', lado: 'Sandbox' },
      { cod: 'EH02', causa: 'Extensão excede quota de memória/CPU.', resolver: 'Mata processo; marca como instável; notifica autor.', lado: 'Recursos' },
    ],
    'sc-d-falha-teste': [
      { cod: 'SC01', causa: 'Regressão funcional introduzida.', resolver: 'Reverte diff mínimo; roda teste isolado; corrige.', lado: 'Build' },
    ],
    apontamentos: [
      { cor: 'yellow', causa: 'Complexidade ciclomática > 15 na função alterada.', resolver: 'Refatorar em funções menores; adicionar testes.' },
      { cor: 'yellow', causa: 'Nova dependência sem lockfile auditado.', resolver: 'Roda npm audit; justifica ou remove.' },
      { cor: 'red', causa: 'Secret detectado em código (git-secrets).', resolver: 'Revoga imediatamente; não commita; usa .env/secrets manager.' },
      { cor: 'red', causa: 'Test coverage caiu > 5% no PR.', resolver: 'Adiciona testes para código novo; ou justifica exceção.' },
    ],
  },

  conectores: [
    { tipo: 'sse', url: 'http://localhost:4300/eventos', ligado: false },
    { tipo: 'http', url: 'https://api.github.com/repos/SEU-USUARIO/SEU-REPO/commits?per_page=10', cada: 30000, mapa: (j) => j.map(c => ({ bairro: 'servo-construcao', tipo: 'sc-edita', meta: { sha: c.sha.slice(0,7), msg: c.commit.message.split('\n')[0] } })) },
    { tipo: 'sse', url: 'http://localhost:28894/events', ligado: false },
  ],

  catalogo: {
    repos: [{ repo: 'nuclear-comand', branch: 'main', commit: 'latest' }],
    bairros: {
      'nucleo-central': [
        { id: 'adr-001', bairro: 'nucleo-central', natureza: 'adr', slug: 'adr-001', titulo: 'ADR-001: Arquitetura Multi-Agente', status: 'aceita', classe: 'ok', rn: 0, repos: ['nuclear-comand'], docs: [{ chave: 'docs/ADR-001.md', repo: 'nuclear-comand', caminho: 'docs/ADR-001.md', tipo: 'ADR', titulo: 'Arquitetura Multi-Agente', status: 'aceita', rn: 0, ca: 0 }] },
        { id: 'adr-002', bairro: 'nucleo-central', natureza: 'adr', slug: 'adr-002', titulo: 'ADR-002: Protocolo de Comunicação IPC', status: 'aceita', classe: 'ok', rn: 0, repos: ['nuclear-comand'], docs: [{ chave: 'docs/ADR-002.md', repo: 'nuclear-comand', caminho: 'docs/ADR-002.md', tipo: 'ADR', titulo: 'Protocolo de Comunicação IPC', status: 'aceita', rn: 0, ca: 0 }] },
        { id: 'spec-gestor', bairro: 'nucleo-central', natureza: 'spec', slug: 'gestor', titulo: 'SPEC: Agente Gestor', status: 'aprovada', classe: 'ok', rn: 0, repos: ['nuclear-comand'], docs: [{ chave: '.opencode/agents/gestor.md', repo: 'nuclear-comand', caminho: '.opencode/agents/gestor.md', tipo: 'Spec', titulo: 'Agente Gestor', status: 'aprovada', rn: 0, ca: 0 }] },
      ],
      'servo-busca': [
        { id: 'spec-sb', bairro: 'servo-busca', natureza: 'spec', slug: 'servo-busca', titulo: 'SPEC: Servo-Busca', status: 'rascunho', classe: 'wip', rn: 0, repos: ['nuclear-comand'], docs: [{ chave: '.opencode/agents/servo-busca.md', repo: 'nuclear-comand', caminho: '.opencode/agents/servo-busca.md', tipo: 'Spec', titulo: 'Servo-Busca', status: 'rascunho', rn: 0, ca: 0 }] },
      ],
      'servo-construcao': [
        { id: 'spec-sc', bairro: 'servo-construcao', natureza: 'spec', slug: 'servo-construcao', titulo: 'SPEC: Servo-Construção', status: 'rascunho', classe: 'wip', rn: 0, repos: ['nuclear-comand'], docs: [{ chave: '.opencode/agents/servo-construcao.md', repo: 'nuclear-comand', caminho: '.opencode/agents/servo-construcao.md', tipo: 'Spec', titulo: 'Servo-Construção', status: 'rascunho', rn: 0, ca: 0 }] },
      ],
      'servo-revisao': [
        { id: 'spec-sr', bairro: 'servo-revisao', natureza: 'spec', slug: 'servo-revisao', titulo: 'SPEC: Servo-Revisão', status: 'rascunho', classe: 'wip', rn: 0, repos: ['nuclear-comand'], docs: [{ chave: '.opencode/agents/servo-revisao.md', repo: 'nuclear-comand', caminho: '.opencode/agents/servo-revisao.md', tipo: 'Spec', titulo: 'Servo-Revisão', status: 'rascunho', rn: 0, ca: 0 }] },
      ],
      'terminal-pty': [
        { id: 'spec-tp', bairro: 'terminal-pty', natureza: 'spec', slug: 'terminal-pty', titulo: 'SPEC: Terminal PTY Real', status: 'aceita', classe: 'ok', rn: 0, repos: ['nuclear-comand'], docs: [{ chave: 'docs/IDE.md', repo: 'nuclear-comand', caminho: 'docs/IDE.md', tipo: 'Doc', titulo: 'Terminal PTY', status: 'aceita', rn: 0, ca: 0 }] },
      ],
      'extension-host': [
        { id: 'spec-eh', bairro: 'extension-host', natureza: 'spec', slug: 'extension-host', titulo: 'SPEC: Extension Host MVP', status: 'em-progresso', classe: 'wip', rn: 0, repos: ['nuclear-comand'], docs: [] },
      ],
      'opencode-core': [
        { id: 'spec-oc', bairro: 'opencode-core', natureza: 'spec', slug: 'opencode-core', titulo: 'SPEC: OpenCode Local', status: 'aceita', classe: 'ok', rn: 0, repos: ['nuclear-comand'], docs: [] },
      ],
      'monaco-ide': [
        { id: 'spec-mi', bairro: 'monaco-ide', natureza: 'spec', slug: 'monaco-ide', titulo: 'SPEC: Monaco IDE', status: 'aceita', classe: 'ok', rn: 0, repos: ['nuclear-comand'], docs: [{ chave: 'docs/IDE.md', repo: 'nuclear-comand', caminho: 'docs/IDE.md', tipo: 'Doc', titulo: 'IDE Monaco', status: 'aceita', rn: 0, ca: 0 }] },
      ],
    },
  },
});