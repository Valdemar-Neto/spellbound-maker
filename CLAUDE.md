# Fênix Borracharia — site institucional

Landing page de uma borracharia em Santa Inês (MA), publicada em https://fenixborracharia.vercel.app/.
Stack: Vite + React 18 + TypeScript + Tailwind 3 + shadcn/ui, Three.js (@react-three/fiber v8), GSAP (ScrollTrigger/ScrollTo via @gsap/react), d3-geo + topojson-client.

Comandos: `npm run dev` (porta 8080), `npm test`, `npm run lint`, `npm run build`.

## Fluxo obrigatório para UI

1. **Design** — antes de criar ou redesenhar qualquer seção, carregue as skills `frontend-design` e `taste-skill` (em `.claude/skills/`). Em alterações de telas existentes, use também `redesign-skill`.
2. **Componentes** — consulte primeiro o MCP `shadcn-ui` (código e demos oficiais) e reaproveite o que já existe em `src/components/ui/`. Para variações mais elaboradas (hero, cards, efeitos), gere com o MCP `magic` (21st.dev) e adapte aos tokens do projeto.
3. **Animação** — qualquer motion segue as skills `animate` e `emil-design-eng` (Emil Kowalski): só `transform`/`opacity`/`clip-path`, ease-out forte, UI < 300 ms, sem `transition: all`, hover com movimento só em `(hover: hover) and (pointer: fine)`, e `prefers-reduced-motion` sempre respeitado.

Os MCPs estão em `.mcp.json`. Chaves via variáveis de ambiente (nunca commitar): `TWENTYFIRST_API_KEY` (magic) e, opcionalmente, `GITHUB_PERSONAL_ACCESS_TOKEN` (shadcn-ui).

## Convenções do projeto

- Dados do negócio (telefone, WhatsApp, endereço, coordenadas, horário, links do menu) ficam só em `src/lib/site.ts`. Links de WhatsApp usam `whatsappUrl()`.
- GSAP: importe sempre de `src/lib/gsap.ts` (registra plugins, exporta `EASE_OUT`, `EASE_IN_OUT`, `prefersReducedMotion`). Use `useGSAP` com `scope` para limpeza automática. O header não é fixo: a navegação usa âncoras nativas com `scroll-behavior: smooth`.
- Revelações no scroll: `components/motion/Reveal.tsx` (filhos com `data-reveal`, dispara uma vez). Marca e ícone do WhatsApp: `components/brand.tsx`.
- Motion com parcimônia: o momento orquestrado da página é a entrada do hero; o mapa é o segundo. Revelações no scroll existem só nas barras de sulco dos seminovos (crescem + contador até 5 mm), nos itens da placa de serviços e no CTA final. Não adicionar efeitos decorativos em outras seções.
- Three.js: a cena do hero (`components/three/HeroScene.tsx`, geometria/texturas em `tire.ts`) é um pneu com "FÊNIX PNEUS · <texto> · DEUS É FIEL" na lateral, onde <texto> é a medida escolhida em "Procurando pneu?" (`PneusSection`, estado em `pages/Index.tsx`, helpers em `lib/medida.ts`) ou "SANTA INÊS-MA"; arrastar gira. Carregada com `React.lazy`, pausa fora da viewport e cai para `assets/pneu-fenix.webp` sem WebGL. Com reduced-motion fica estática (sem giro automático nem giro ao trocar a medida). Canvases de textura devem nascer no tamanho final (o three aloca a textura uma vez só). Não usar assets remotos (HDR etc.).
- Mapa: `components/map/DotMap.tsx` + `geo.ts` geram o mapa pontilhado a partir de `public/geo/brasil-uf.topo.json` (malha de UFs do IBGE, qualidade mínima). Maranhão = `codarea` "21". Fica na seção branca "Como chegar", que usa `.theme-paper` (redefine os tokens para o fundo claro).
- Identidade visual (proposta "Combinada"): fundo asfalto `#17120F`, laranja Fênix `fire-orange` (#FF6A2B) como acento; serviços em estilo placa com `fire-red` (#D62718) + `fire-yellow` (#FFD60A) e fonte Anton (`font-placa`); "Como chegar" em branco. Tokens em `src/index.css`. Big Shoulders Display (`font-display`, títulos) + Instrument Sans (`font-body`, texto). Botões em pílula; curvas em CSS `var(--ease-out)`, `var(--ease-in-out)`; utilitários `.press`, `.push` (botão placa) e `.lift`.
- Selo "Aberto/Fechado agora" do hero: `lib/horario.ts` (UTC-3, horário em `site.openingHours`), com testes.
- Textos em português do Brasil.
