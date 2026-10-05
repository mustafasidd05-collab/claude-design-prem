import { Skill, Domain, Subgroup, CuratedKit, Flowchart, Blueprint, Recipe } from '@/types/skill';

const SKILLS_URL = '/skills.json';

let skillsCache: Skill[] | null = null;
let domainsCache: Domain[] | null = null;
let subgroupsCache: Subgroup[] | null = null;
let flowchartsCache: Flowchart[] | null = null;
let blueprintsCache: Blueprint[] | null = null;
let recipesCache: Recipe[] | null = null;

export async function loadSkills(): Promise<Skill[]> {
  if (skillsCache) return skillsCache;
  const response = await fetch(SKILLS_URL);
  if (!response.ok) throw new Error('Failed to load skills');
  skillsCache = await response.json();
  return skillsCache;
}

export async function getSkills(): Promise<Skill[]> {
  return loadSkills();
}

export async function getSkillBySlug(slug: string): Promise<Skill | undefined> {
  const skills = await loadSkills();
  return skills.find(s => s.slug === slug);
}

export async function getDomains(): Promise<Domain[]> {
  if (domainsCache) return domainsCache;
  const skills = await loadSkills();
  
  const domainMap = new Map<string, Domain>();
  
  skills.forEach(skill => {
    if (!domainMap.has(skill.domain_key)) {
      domainMap.set(skill.domain_key, {
        key: skill.domain_key,
        title: skill.domain_title,
        icon: skill.domain_icon,
        skills: [],
        subgroups: [],
      });
    }
    const domain = domainMap.get(skill.domain_key)!;
    domain.skills.push(skill);
  });
  
  // Build subgroups for each domain
  domainMap.forEach(domain => {
    const subgroupMap = new Map<string, Subgroup>();
    domain.skills.forEach(skill => {
      if (!subgroupMap.has(skill.subgroup_key)) {
        subgroupMap.set(skill.subgroup_key, {
          key: skill.subgroup_key,
          title: skill.subgroup_title,
          desc: skill.subgroup_desc,
          skills: [],
        });
      }
      subgroupMap.get(skill.subgroup_key)!.skills.push(skill);
    });
    domain.subgroups = Array.from(subgroupMap.values());
  });
  
  domainsCache = Array.from(domainMap.values());
  return domainsCache;
}

export async function getDomainByKey(key: string): Promise<Domain | undefined> {
  const domains = await getDomains();
  return domains.find(d => d.key === key);
}

export async function getSubgroups(): Promise<Subgroup[]> {
  if (subgroupsCache) return subgroupsCache;
  const skills = await loadSkills();
  
  const subgroupMap = new Map<string, Subgroup>();
  
  skills.forEach(skill => {
    if (!subgroupMap.has(skill.subgroup_key)) {
      subgroupMap.set(skill.subgroup_key, {
        key: skill.subgroup_key,
        title: skill.subgroup_title,
        desc: skill.subgroup_desc,
        skills: [],
      });
    }
    subgroupMap.get(skill.subgroup_key)!.skills.push(skill);
  });
  
  subgroupsCache = Array.from(subgroupMap.values());
  return subgroupsCache;
}

export async function getSkillsByDomain(domainKey: string): Promise<Skill[]> {
  const skills = await loadSkills();
  return skills.filter(s => s.domain_key === domainKey);
}

export async function getSkillsBySubgroup(subgroupKey: string): Promise<Skill[]> {
  const skills = await loadSkills();
  return skills.filter(s => s.subgroup_key === subgroupKey);
}

export function getCuratedKits(): CuratedKit[] {
  return [
    {
      key: 'ALL',
      icon: '📦',
      title: 'Full 448 Autonomous Skills Library',
      subtitle: 'The complete unified catalog across all 10 engineering and reasoning domains',
      sizeEstimate: '~4.4 MB ZIP archive',
      filterFn: () => true,
    },
    {
      key: 'CODING',
      icon: '💻',
      title: 'Software Engineering & Architecture Kit',
      subtitle: 'Spec-driven workflow, zero-hallucination coder, cloud & database engineering',
      sizeEstimate: '~650 KB ZIP archive',
      filterFn: (s: Skill) => s.domain_key === 'CODING',
    },
    {
      key: 'DESIGN',
      icon: '🎨',
      title: 'UI/UX, Design Systems & 3D Web Kit',
      subtitle: 'Three.js, 3D Website Architect, Epic 2.5D scroll, and motion libraries',
      sizeEstimate: '~680 KB ZIP archive',
      filterFn: (s: Skill) => s.domain_key === 'DESIGN',
    },
    {
      key: 'QA',
      icon: '🧪',
      title: 'QA & Playwright E2E Testing Suite',
      subtitle: 'Production Playwright test generation, flaky test fixers, and test runners',
      sizeEstimate: '~210 KB ZIP archive',
      filterFn: (s: Skill) => s.domain_key === 'QA',
    },
    {
      key: 'EXEC',
      icon: '👔',
      title: 'Executive C-Suite Advisory Kit',
      subtitle: 'Founder intake, boardroom deliberation, CFO/CTO/CPO reviews, and strategy',
      sizeEstimate: '~520 KB ZIP archive',
      filterFn: (s: Skill) => s.domain_key === 'EXEC',
    },
  ];
}

export function getDomainPills() {
  return [
    { key: 'ALL', label: 'All Domains', count: 448 },
    { key: 'CODING', label: 'Engineering', count: 61 },
    { key: 'DESIGN', label: 'UI/UX + 3D', count: 59 },
    { key: 'QA', label: 'QA + Playwright', count: 17 },
    { key: 'EXEC', label: 'Executive C-Suite', count: 55 },
    { key: 'SEC', label: 'Cybersecurity', count: 38 },
    { key: 'AI', label: 'AI/ML Swarms', count: 36 },
    { key: 'MARKETING', label: 'Growth & Marketing', count: 64 },
    { key: 'DATA', label: 'Data Engineering', count: 44 },
    { key: 'REGULATORY', label: 'Regulatory & QMS', count: 32 },
  ];
}

export async function getFlowcharts(): Promise<Flowchart[]> {
  if (flowchartsCache) return flowchartsCache;
  
  flowchartsCache = [
    {
      domainKey: 'ROUTER',
      title: 'Master Project Routing Decision Tree',
      desc: 'Instant triage and domain assignment matching user goals to specific capability clusters.',
      code: `graph TD
    Start["What are you building?"] --> Choice{"Primary Project Goal"}
    Choice -->|"Code, Architecture, Cloud"| D1["Domain 1: Engineering"]
    Choice -->|"UI, Animations, 3D Web"| D2["Domain 2: UI/UX & 3D"]
    Choice -->|"E2E Playwright, TDD"| D3["Domain 3: QA & Testing"]
    Choice -->|"Research & Triangulation"| D4["Domain 4: Deep Reasoning"]
    Choice -->|"Growth, Copy, CRO"| D5["Domain 5: Marketing & GTM"]
    Choice -->|"PRD, Backlog, Churn"| D6["Domain 6: Product Mgmt"]
    Choice -->|"Boardroom, C-Suite, M&A"| D7["Domain 7: Executive"]
    Choice -->|"SOC2, ISO, Threat"| D8["Domain 8: Cybersecurity"]
    Choice -->|"ML, Swarms, Autoresearch"| D9["Domain 9: AI/ML Swarms"]
    Choice -->|"Ops, Team Comms, Scraping"| D10["Domain 10: Operations"]`,
      steps: [
        { label: '1. Intake & Triage', cmd: '/router', desc: 'Evaluate problem constraints and determine target domain.' },
        { label: '2. Load Domain Skills', cmd: '/spec-driven-workflow', desc: 'Mount relevant domain taxonomy and contract guidelines.' },
        { label: '3. Formulate Execution Plan', cmd: '/zero-hallucination-coder', desc: 'Decompose problem into atomic sub-tasks.' },
      ],
      skills: ['spec-driven-workflow', 'zero-hallucination-coder', 'deep-research'],
    },
    {
      domainKey: 'CODING',
      title: 'Software Engineering: Spec-to-Ship Lifecycle',
      desc: 'Ironclad 5-phase engineering flow from contract approval to production gate.',
      code: `flowchart LR
    A["Intake"] --> B["/spec-driven-workflow: Spec Contract"]
    B --> C["/zero-hallucination-coder: Discuss & Map"]
    C --> D{"Ponytail YAGNI Check"}
    D -->|"Pass"| E["/tdd-guide: Red-Green Loop"]
    E --> F["/focused-fix: Targeted Fixes"]
    F --> G["/ship-gate: Quality Gate Approval"]`,
      steps: [
        { label: 'Phase 1: Spec Contract', cmd: '/spec-driven-workflow', desc: 'Draft and approve baseline specification before writing any code.' },
        { label: 'Phase 2: Dependency Map', cmd: '/zero-hallucination-coder', desc: 'Tag dependencies as [KNOWN], [INFERRED], or [UNKNOWN].' },
        { label: 'Phase 3: YAGNI Ladder', cmd: '/zero-hallucination-coder', desc: 'Eliminate speculative code and apply standard library first.' },
        { label: 'Phase 4: TDD Cycle', cmd: '/tdd-guide', desc: 'Write failing test first, implement minimum code, refactor cleanly.' },
        { label: 'Phase 5: Ship Gate', cmd: '/ship-gate', desc: 'Verify zero regressions and enforce production readiness checklist.' },
      ],
      skills: ['spec-driven-workflow', 'zero-hallucination-coder', 'tdd-guide'],
    },
    {
      domainKey: 'DESIGN',
      title: 'Design & 3D Web: Multi-Tier Visual Pipeline',
      desc: 'Cinematic 3D web, semantic design tokens, and WCAG accessibility compliance.',
      code: `flowchart TD
    A["Design Brief"] --> B["/ui-design-system: Tokens"]
    B --> C{"Visual Tier"}
    C -->|"3D Architecture"| D["/3d-website-architect: Three.js & R3F"]
    C -->|"2.5D Cinematic Scroll"| E["/epic-design: Depth Layers"]
    C -->|"Micro-Animations"| F["/motion-framer: Spring Physics"]
    D --> G["/a11y-audit: WCAG 2.2 AA Compliance"]
    E --> G
    F --> G
    G --> H["Ship Award-Winning Web Experience"]`,
      steps: [
        { label: '1. Design Tokens', cmd: '/ui-design-system', desc: 'Define typography scale, color tokens, and spatial math.' },
        { label: '2. 3D / Motion Architecture', cmd: '/3d-website-architect', desc: 'Implement Three.js/R3F canvas and Framer Motion spring physics.' },
        { label: '3. Accessibility Audit', cmd: '/a11y-audit', desc: 'Enforce WCAG 2.2 AA contrast and prefers-reduced-motion fallbacks.' },
      ],
      skills: ['3d-website-architect', 'a11y-audit'],
    },
    {
      domainKey: 'QA',
      title: 'QA & Test Engineering: End-to-End Verification',
      desc: 'Automated Playwright test harness generation, flakiness elimination, and cloud sync.',
      code: `flowchart LR
    A["Code Base"] --> B["/pw-init: Playwright Harness"]
    B --> C["/generate: Spec-Linked Tests"]
    C --> D["/pw: Run Suite"]
    D -->|"Flaky / Fail"| E["/fix: Automated RCA"]
    E --> D
    D -->|"Pass"| F["/report: Executive Quality Report"]`,
      steps: [
        { label: '1. Init Test Harness', cmd: '/pw-init', desc: 'Set up headless Playwright runners and fixture mocks.' },
        { label: '2. Generate Spec Tests', cmd: '/generate', desc: 'Generate assertions mapped directly to spec acceptance criteria.' },
        { label: '3. Automated RCA & Repair', cmd: '/fix', desc: 'Automatically fix flaky locators and race conditions.' },
      ],
      skills: ['tdd-guide', 'spec-driven-workflow'],
    },
    {
      domainKey: 'REASONING',
      title: 'Deep Reasoning: Triangulation & Steel-Manning',
      desc: 'Feynman recall loops, adversarial self-critique, and 3-source evidence verification.',
      code: `flowchart TD
    A["Inquiry"] --> B["/deep-research: Reframe & Hypotheses"]
    B --> C["Parallel Search Fan-Out via Sub-Agents"]
    C --> D["Source Triangulation (>=3 Sources)"]
    D --> E["/adversarial-reviewer: Steel-Manned Critique"]
    E --> F["Grounded Synthesis & Verbatim Evidence"]`,
      steps: [
        { label: '1. Reframe & Hypotheses', cmd: '/deep-research', desc: 'Commit to 2-4 falsifiable hypotheses before searching.' },
        { label: '2. Multi-Source Triangulation', cmd: '/deep-research', desc: 'Corroborate claims across at least 3 distinct source types.' },
        { label: '3. Adversarial Critique', cmd: '/adversarial-reviewer', desc: 'Subject draft thesis to 4 hostile counter-arguments.' },
      ],
      skills: ['deep-research'],
    },
    {
      domainKey: 'MARKETING',
      title: 'Marketing & GTM: Full-Funnel Growth Pipeline',
      desc: 'Positioning house, high-converting copywriting, programmatic SEO, and CRO experiments.',
      code: `flowchart LR
    A["Product"] --> B["/marketing-strategy-pmm: ICP & Positioning"]
    B --> C["/copywriting: Message House"]
    C --> D["/ab-test-setup: CRO Funnels"]
    D --> E1["/seo-audit: Organic Discovery"]
    D --> E2["/cold-email: Direct Sales"]`,
      steps: [
        { label: '1. Positioning House', cmd: '/marketing-strategy-pmm', desc: 'Define ICP pain points, differentiators, and value pillars.' },
        { label: '2. Conversion Copy', cmd: '/copywriting', desc: 'Craft landing page headlines and punchy microcopy.' },
        { label: '3. A/B Test Setup', cmd: '/ab-test-setup', desc: 'Configure statistical hypothesis test and conversion metrics.' },
      ],
      skills: ['ab-test-setup'],
    },
    {
      domainKey: 'PRODUCT',
      title: 'Product Management: Discovery to Retention',
      desc: 'Opportunity solution trees, PRD synthesis, and cohort retention optimization.',
      code: `flowchart LR
    A["Problem Space"] --> B["/product-discovery: Validation"]
    B --> C["/code-to-prd: RICE Prioritization"]
    C --> D["/agile-product-owner: User Stories"]
    D --> E["/product-analytics: Retention Cohorts"]`,
      steps: [
        { label: '1. Opportunity Validation', cmd: '/product-discovery', desc: 'Interview users and build opportunity solution trees.' },
        { label: '2. RICE PRD Specs', cmd: '/code-to-prd', desc: 'Draft crisp PRD with reach, impact, and effort scoring.' },
        { label: '3. Cohort Retention Loop', cmd: '/product-analytics', desc: 'Measure weekly retention and detect drop-off funnels.' },
      ],
      skills: ['spec-driven-workflow'],
    },
    {
      domainKey: 'EXEC',
      title: 'Executive Leadership: Strategic Boardroom Sprint',
      desc: 'Founder intake interrogation, C-Suite multi-role debate, and decision lock.',
      code: `flowchart TD
    A["Strategic Dilemma"] --> B["/founder-mode: Intake Interrogation"]
    B --> C["/brief: 1-Page Strategic Brief"]
    C --> D["/boardroom: 6-Phase Deliberation"]
    D --> E["C-Suite Reviews: /cfo-review, /cto-review, /ciso-review"]
    E --> F["/freeze: Cooldown Lock & Durable Memory"]`,
      steps: [
        { label: '1. Founder Intake', cmd: '/founder-mode', desc: '6 forcing questions on unit economics, runway, and moat.' },
        { label: '2. Multi-Role Boardroom', cmd: '/boardroom', desc: 'Simulate concurrent CFO, CTO, CPO, and CMO perspectives.' },
        { label: '3. Decision Lock', cmd: '/freeze', desc: 'Enforce 24-hour cooldown lock to prevent impulse reversals.' },
      ],
      skills: ['deep-research'],
    },
    {
      domainKey: 'SEC',
      title: 'Cybersecurity & Compliance: Defense-in-Depth',
      desc: 'Threat modeling, offensive simulation, ISO 27001 / SOC 2 readiness.',
      code: `flowchart TD
    A["Security Scope"] --> B["Posture Audit: /cloud-security"]
    B --> C["Offensive Simulation: /red-team"]
    C --> D{"Regulatory Framework"}
    D -->|"Enterprise SaaS"| E["/soc2-audit-prep & /iso27001"]
    D -->|"AI Governance"| F["/ai-act-readiness & ISO 42001"]`,
      steps: [
        { label: '1. Cloud IAM Audit', cmd: '/cloud-security', desc: 'Scan open ports, stale secrets, and overly permissive IAM roles.' },
        { label: '2. Offensive Pen-Test', cmd: '/red-team', desc: 'Simulate OWASP Top 10 exploits and API privilege escalation.' },
        { label: '3. Audit Package Prep', cmd: '/soc2-audit-prep', desc: 'Generate evidence binder for SOC 2 Type II auditors.' },
      ],
      skills: ['spec-driven-workflow'],
    },
    {
      domainKey: 'AI',
      title: 'AI/ML & Swarms: Autonomous Experimentation Loop',
      desc: 'Multi-agent worktree spawning, automated edit-eval loops, and rule promotion.',
      code: `flowchart LR
    A["Objective"] --> B{"Autonomous Mode"}
    B -->|"Worktree Swarm"| C["/agenthub: Spawn Swarm"]
    B -->|"Continuous Research"| D["/autoresearch: Edit-Eval Loop"]
    C --> E["/eval: Judge Statistical Win"]
    D --> E
    E --> F["/promote: Graduate to Rules"]`,
      steps: [
        { label: '1. Spawn Swarm Worktrees', cmd: '/agenthub', desc: 'Create isolated git worktrees for parallel agent exploration.' },
        { label: '2. Edit-Eval-Keep Loop', cmd: '/autoresearch', desc: 'Execute automated cycles of prompt/code mutations against benchmark.' },
        { label: '3. Rule Promotion', cmd: '/promote', desc: 'Graduate winning findings into permanent AGENTS.md rules.' },
      ],
      skills: ['zero-hallucination-coder'],
    },
    {
      domainKey: 'OPS',
      title: 'Operations & Workplace Tools: Alignment Hub',
      desc: 'Jira operations, universal web scraping pipelines, and executive markdown briefs.',
      code: `flowchart LR
    A["Operations Task"] --> B{"Surface"}
    B -->|"Enterprise Alignment"| C["/jira-expert & /meetings"]
    B -->|"Web Extraction"| D["/universal-scraping-architect"]
    B -->|"Documentation"| E["/markdown-html-orchestrator"]`,
      steps: [
        { label: '1. Align Requirements', cmd: '/jira-expert', desc: 'Structure backlog tickets with crisp acceptance criteria.' },
        { label: '2. Execute Extraction', cmd: '/universal-scraping-architect', desc: 'Run resilient Playwright/Cheerio web scrapers with proxies.' },
        { label: '3. Package Deliverable', cmd: '/markdown-html-orchestrator', desc: 'Generate publication-ready HTML/PDF reports.' },
      ],
      skills: ['3d-website-architect'],
    },
  ];
  
  return flowchartsCache;
}

export async function getBlueprints(): Promise<Blueprint[]> {
  if (blueprintsCache) return blueprintsCache;
  
  blueprintsCache = [
    {
      slug: '3d-website-architect',
      title: '3D Website Architect',
      tagline: 'Three.js, React Three Fiber, GSAP & Awwwards-Grade Web Architecture',
      phases: [
        ['Core Mission', 'Transform user ideas into award-winning, high-end websites using Three.js, React Three Fiber, WebGL, GSAP, and Framer Motion.'],
        ['3D with Purpose', 'Every 3D element reinforces product storytelling (AI neural sphere, cybersecurity threat globe, product showcase).'],
        ['Performance First', 'Lazy-load 3D, compress assets, and provide instant mobile fallbacks under 1.5 seconds.'],
        ['Sensory Hierarchy', 'Coordinated motion: bold hero scenes, subtle scroll reveals, and gentle ambient drifting.'],
      ],
    },
    {
      slug: 'zero-hallucination-coder',
      title: 'Zero-Hallucination Coder',
      tagline: 'The 5-Phase Grounded Execution Loop & Ponytail YAGNI Ladder',
      phases: [
        ['Phase 1: DISCUSS', 'Capture what is actually being built before planning. 5 mandatory questions (end-state, tech stack, existing code, hard constraints, definition of done).'],
        ['Phase 2: MAP', 'Explicit dependency mapping with strict tagging: [KNOWN], [INFERRED], and [UNKNOWN]. Never write code that touches an [UNKNOWN].'],
        ['Phase 3: DECOMPOSE', 'Break features into atomic stories right-sized for a single turn (<300 lines, <3 files, <=2 acceptance criteria).'],
        ['Phase 3.5: PONYTAIL CHECK', '6-rung YAGNI ladder: 1. Kill speculative code -> 2. Use stdlib -> 3. Use native platform -> 4. Use installed deps -> 5. Trivial one-liner -> 6. Minimum working code.'],
        ['Phase 4: EXECUTE', 'Story-by-story complete code with pre-check, self-review, and handoff notes. No placeholders, no "// TODO".'],
        ['Phase 5: VERIFY', 'GSD Core audit: restate original end state, verify planned vs actual, record zero gaps.'],
      ],
    },
    {
      slug: 'spec-driven-workflow',
      title: 'Spec-Driven Workflow',
      tagline: 'The Iron Law of Specification Contracts Before Implementation',
      phases: [
        ['Core Axiom', 'No code shall be committed or drafted without an approved specification document acting as the durable contract.'],
        ['1. Requirements Baseline', 'User goals, constraints, non-functional requirements (latencies, volumes, auth boundaries).'],
        ['2. API & Data Schema Contract', 'Explicit request/response payloads, database schema changes, and error status code contracts.'],
        ['3. Acceptance Criteria Matrix', 'Exact testable assertions that determine task success before implementation commences.'],
        ['4. Verification Protocol', 'Pre-committed unit, integration, and e2e test commands that must exit with code 0 before PR merge.'],
      ],
    },
    {
      slug: 'epic-design',
      title: 'Epic Design & 2.5D Cinematic Scroll',
      tagline: 'Parallax Depth Layers, Visual Hierarchy & Editorial Typography',
      phases: [
        ['6 Depth Layers', 'L0 Deep Canvas -> L1 Ambient Atmosphere -> L2 Background Scenery -> L3 Midground Stage -> L4 Foreground Content -> L5 HUD/Overlays.'],
        ['45 Scroll Effects', 'Curated transitions across scrollTrigger scrub, pin sections, card stacking, scale zooms, horizontal sliding, and SVG path drawing.'],
        ['Editorial Typography', 'Strict pairing of high-contrast display serif/sans headers with readable modern body text.'],
        ['WCAG 2.2 AA Compliance', 'Enforces \'prefers-reduced-motion: reduce\', high-contrast text ratios, and accessible aria-labels on animated elements.'],
      ],
    },
    {
      slug: 'deep-research',
      title: 'Deep Research Engine',
      tagline: 'Disciplined 9-Phase Meta-Research & Source Triangulation',
      phases: [
        ['Phase 1: Reframe & Hypotheses', 'Rewrite the question into a decision-grade inquiry; commit to 2-4 falsifiable hypotheses.'],
        ['Phase 4: Parallel Search Fan-Out', 'Dispatch specialized search sub-agents concurrently across diverse channels.'],
        ['Phase 5: Source Triangulation', 'Every significant thesis must be corroborated by >=3 independent sources of different types.'],
        ['Phase 6: Adversarial Review', 'Self-critique through 4 tough questions + active search for steel-manned counterarguments.'],
        ['Phase 7: Refresh Targets', 'Outputs refresh_targets.md for continuous delta-updates over time without replaying entire investigations.'],
      ],
    },
  ];
  
  return blueprintsCache;
}

export async function getRecipes(): Promise<Recipe[]> {
  if (recipesCache) return recipesCache;
  
  recipesCache = [
    {
      title: 'Awwwards-Grade 3D Web Experience Pipeline',
      domain: 'UI/UX & 3D Web',
      steps: [
        ['/3d-website-architect', 'Architect 3D scene concept, interactive canvas, and performance budget.'],
        ['/threejs-webgl', 'Implement Three.js / React Three Fiber canvas, custom shaders, and lighting.'],
        ['/gsap-scrolltrigger', 'Bind 3D camera timeline to scroll scrub with pin sections.'],
        ['/apple-design', 'Refine typography contrast, subtle halos, and spatial layout.'],
        ['/a11y-audit', 'Verify WCAG 2.2 AA compliance and provide reduced-motion 2D fallback.'],
      ],
    },
    {
      title: 'Fullstack Production Feature Pipeline',
      domain: 'Software Engineering',
      steps: [
        ['/spec-driven-workflow', 'Draft unambiguous specification, acceptance criteria, and API schemas.'],
        ['/zero-hallucination-coder', 'Execute 5-phase loop (Discuss -> Map -> Decompose -> Ponytail Check -> Execute).'],
        ['/tdd-guide', 'Write failing tests first, make them green, refactor cleanly.'],
        ['/pw', 'Run full Playwright browser e2e test suite against live feature.'],
        ['/ship-gate', 'Final production readiness check and automated delivery sign-off.'],
      ],
    },
    {
      title: 'High-Stakes Strategic Decision / Pivot',
      domain: 'Executive & Reasoning',
      steps: [
        ['/founder-mode', 'Interview founder with 6 forcing questions on problem, distribution, and runway.'],
        ['/brief', 'Synthesize a 1-page strategic brief capturing core tradeoffs and constraints.'],
        ['/deep-research', 'Triangulate market data, competitive moves, and unit economics across >=3 sources.'],
        ['/boardroom', 'Run 6-phase multi-role deliberation across CFO, CTO, CPO, and CMO agents.'],
        ['/freeze', 'Lock the decision for a cooldown period to prevent impulse reversal before execution.'],
      ],
    },
    {
      title: 'Enterprise SOC 2 / ISO 27001 Audit Prep',
      domain: 'Cybersecurity & Regulatory',
      steps: [
        ['/soc2-compliance', 'Map Trust Service Criteria (TSC) and construct control matrices.'],
        ['/cloud-security', 'Audit AWS/Azure/GCP IAM roles, S3 buckets, and open security groups.'],
        ['/security-pen-testing', 'Run automated OWASP Top 10 vulnerability scans and penetration checks.'],
        ['/incident-response', 'Validate incident classification, escalation matrices, and runbooks.'],
        ['/soc2-audit-prep', 'Run 6-question forcing interrogation ahead of external auditor observation.'],
      ],
    },
    {
      title: 'Continuous Autoresearch Optimization Loop',
      domain: 'AI & Autonomous Agents',
      steps: [
        ['/setup', 'Define target file, evaluation metric, direction (minimize/maximize), and runner.'],
        ['/loop', 'Execute autonomous cycles of code editing, running evals, and evaluating results.'],
        ['/eval', 'Judge candidate variations against historical baseline using statistical rigor.'],
        ['/merge', 'Land winning experiment branch into main repository and clean up worktrees.'],
        ['/remember', 'Persist learned prompt engineering rules and architectural patterns into memory.'],
      ],
    },
  ];
  
  return recipesCache;
}