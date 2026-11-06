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
- GSAP: importe sempre de `src/lib/gsap.ts` (registra plugins, exporta `EASE_OUT`, `EASE_IN_OUT`, `prefersReducedMotion`, `scrollToHash`). Use `useGSAP` com `scope` para limpeza automática.
- Revelações no scroll: `components/motion/Reveal.tsx` (filhos com `data-reveal`, dispara uma vez). Títulos de seção: `components/SectionHeading.tsx`.
- Motion com parcimônia: o momento orquestrado da página é a entrada do hero; o mapa é o segundo. Não adicionar efeitos decorativos em toda seção.
- Three.js: a cena do hero (`components/three/HeroScene.tsx`) é carregada com `React.lazy`, pausa fora da viewport e cai para `hero-bg.jpg` sem WebGL ou com reduced-motion. Não usar assets remotos (HDR etc.).
- Mapa: `components/map/DotMap.tsx` + `geo.ts` geram o mapa pontilhado a partir de `public/geo/brasil-uf.topo.json` (malha de UFs do IBGE, qualidade mínima). Maranhão = `codarea` "21".
- Identidade visual: tema escuro, tokens `fire-red` / `fire-orange` / `fire-yellow` em `src/index.css`, Oswald (display, caixa alta) + Inter (texto). Curvas de animação em CSS: `var(--ease-out)`, `var(--ease-in-out)`; utilitários `.press` e `.lift`.
- Textos em português do Brasil.
