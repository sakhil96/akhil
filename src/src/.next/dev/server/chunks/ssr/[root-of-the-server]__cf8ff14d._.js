module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/src/lib/site.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "site",
    ()=>site
]);
const site = {
    meta: {
        title: 'Akhil Adapala — AI Inference Control Room',
        description: 'Award-winning product designer and senior software engineer building AI-first platforms with product-grade execution.',
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://your-domain.com'
    },
    profile: {
        name: 'Akhil Adapala',
        role: 'Senior Software Engineer, AI Tech',
        location: 'Hyderabad, India',
        email: 'akhilsambasiva@gmail.com',
        imageUrl: '/public/profile.jpg',
        imageAlt: 'Akhil Adapala portrait',
        links: {
            linkedin: 'https://www.linkedin.com/in/akhil-adapala-57b6bba5/',
            github: 'https://github.com/sakhil96'
        }
    },
    hero: {
        headline: 'Control Room for AI Inference + Product Thinking',
        subheadline: 'Award-winning product designer and senior software engineer shipping AI-first platforms with product-grade execution.',
        badges: [
            {
                label: 'Cursor Hackathon Winner',
                tone: 'accent'
            },
            {
                label: 'AI Adapt Hackathon Winner',
                tone: 'success'
            },
            {
                label: 'PayPal × Google Cloud Summit',
                tone: 'muted'
            },
            {
                label: 'Top ___',
                tone: 'warning'
            }
        ]
    },
    sections: [
        {
            id: 'system',
            label: 'System Snapshot'
        },
        {
            id: 'terminal',
            label: 'Terminal'
        },
        {
            id: 'wins',
            label: 'Trophy Cabinet'
        },
        {
            id: 'case-studies',
            label: 'Case Studies'
        },
        {
            id: 'projects',
            label: 'Projects'
        },
        {
            id: 'experience',
            label: 'Experience'
        },
        {
            id: 'skills',
            label: 'Skills'
        },
        {
            id: 'contact',
            label: 'Contact'
        }
    ],
    systemSnapshot: [
        {
            label: 'Experience',
            value: '8+ years'
        },
        {
            label: 'Focus',
            value: 'AI inference platforms'
        },
        {
            label: 'Cloud',
            value: 'GCP + Kubernetes'
        },
        {
            label: 'Languages',
            value: 'Java, TypeScript, SQL'
        }
    ],
    terminal: {
        prompt: 'control-room',
        commands: [
            {
                command: 'help',
                description: 'List available commands',
                output: [
                    'wins — trophy highlights',
                    'smartwealth SmartWealth case study',
                    'aiadapt Same as smartwealth',
                    'cursor — Cursor Hackathon case',
                    'projects — platform builds',
                    'stack — core skills',
                    'contact — reach me'
                ]
            },
            {
                command: 'wins',
                description: 'Show hackathon wins',
                output: [
                    'Cursor Hackathon — 1st Place (Team Busters)',
                    'Cursor Hackathon — 2nd Place (Engineering Impact Platform)',
                    'AI Adapt Hackathon — SmartWealth'
                ]
            },
            {
                command: 'smartwealth',
                description: 'Show SmartWealth summary',
                output: [
                    'SmartWealth — AI-powered investing inside PayPal',
                    'Winner: AI Adapt Hackathon',
                    'Idea: money-movement signal → responsible personalization',
                    'Open: /case-studies/smartwealth'
                ]
            },
            {
                command: 'aiadapt',
                description: 'Alias for smartwealth',
                output: [
                    'SmartWealth — AI-powered investing inside PayPal',
                    'Winner: AI Adapt Hackathon',
                    'Idea: money-movement signal → responsible personalization',
                    'Open: /case-studies/smartwealth'
                ]
            },
            {
                command: 'cursor',
                description: 'Show Cursor Hackathon summary',
                output: [
                    'Built AI-first workflows that ship fast.',
                    'Two podium wins in one hackathon.',
                    'Case study: /case-studies/cursor-hackathon'
                ]
            },
            {
                command: 'projects',
                description: 'Show selected projects',
                output: [
                    'Inference Control Plane — low-latency scoring platform',
                    'MCP Tooling — developer workflows for AI ops',
                    'Risk Signal Observatory — model health + drift insights'
                ]
            },
            {
                command: 'stack',
                description: 'Show core stack',
                output: [
                    'Java, TypeScript, Spring Boot, Next.js',
                    'GKE, Kubernetes, Docker',
                    'MLOps pipelines, monitoring, guardrails'
                ]
            },
            {
                command: 'contact',
                description: 'Show contact info',
                output: [
                    'Email: akhilsambasiva@gmail.com',
                    'LinkedIn: linkedin.com/in/akhil-adapala-57b6bba5',
                    'GitHub: github.com/sakhil96'
                ]
            }
        ]
    },
    trophies: [
        {
            title: 'Cursor Hackathon — 1st Place (Team Busters)',
            tags: [
                'AI tooling',
                'Developer velocity'
            ],
            bullets: [
                'Problem: teams lose time stitching AI workflows.',
                'Built: a fast control room that unified prompt → build → deploy.',
                'Result: shipped a crisp demo that won 1st place.'
            ],
            href: '/case-studies/cursor-hackathon',
            cta: 'Read case study →'
        },
        {
            title: 'Cursor Hackathon — 2nd Place (Engineering Impact Platform)',
            tags: [
                'Platform analytics',
                'Decision support'
            ],
            bullets: [
                'Problem: impact visibility was fragmented across systems.',
                'Built: a unified engineering cockpit for impact signals.',
                'Result: clearer prioritization with platform-grade UX.'
            ],
            href: '/case-studies/cursor-hackathon',
            cta: 'Read case study →'
        },
        {
            title: 'AI Adapt Hackathon — Winner',
            when: '2025',
            subtitle: 'SmartWealth — AI-powered investing inside PayPal',
            tags: [
                'Hackathon Winner',
                'AI Product',
                'Fintech',
                'Personalization'
            ],
            bullets: [
                'Presented SmartWealth: AI-powered investing inside PayPal with one-tap onboarding, $1 minimum, and ETFs/crypto/high-yield savings.',
                'Core insight: PayPal’s money-movement signal enables responsible personalization with goals, risk context, and explainable guidance.',
                'Strategy: use PayPal distribution and trust to move from transactions to lifelong financial relationships (hackathon concept).'
            ],
            href: '/case-studies/smartwealth',
            cta: 'Read case study →'
        }
    ],
    caseStudies: [
        {
            slug: 'cursor-hackathon',
            title: 'Cursor Hackathon',
            subtitle: '1st & 2nd Place',
            summary: 'Two winning builds that turn AI workflows into platform-grade execution.',
            tags: [
                'AI tooling',
                'Platform UX',
                'Hackathon'
            ],
            href: '/case-studies/cursor-hackathon'
        },
        {
            slug: 'smartwealth',
            title: 'SmartWealth',
            subtitle: 'AI Adapt Hackathon Winner',
            summary: 'A one-tap investing experience leveraging the world’s richest money-movement signal.',
            tags: [
                'Fintech',
                'AI product',
                'Vision'
            ],
            href: '/case-studies/smartwealth'
        }
    ],
    projects: [
        {
            name: 'Inference Control Plane',
            description: 'Low-latency orchestration for real-time risk scoring and model execution.',
            tags: [
                'Platform',
                'Reliability',
                'Latency'
            ]
        },
        {
            name: 'MCP Tooling',
            description: 'Developer workflows that standardize onboarding, config validation, and deployments.',
            tags: [
                'Tooling',
                'Ops',
                'Automation'
            ]
        },
        {
            name: 'Signal Observatory',
            description: 'Monitoring and guardrails for model health, drift, and incident response.',
            tags: [
                'MLOps',
                'Observability',
                'Safety'
            ]
        }
    ],
    experience: [
        {
            role: 'Senior Software Engineer, AI Tech',
            company: 'PayPal',
            period: 'Dec 2022 — Present',
            highlights: [
                'Build AI inference platforms for real-time risk scoring at scale.',
                'Drive cloud-native migration with audit/shadow validation and safe rollouts.',
                'Deliver platform tooling that speeds up model onboarding.'
            ]
        },
        {
            role: 'Senior Software Engineer',
            company: 'Oracle',
            period: 'Nov 2021 — Nov 2022',
            highlights: [
                'Shipped full-stack features for enterprise marketing workflows.',
                'Built reliable Java services and responsive web modules.'
            ]
        },
        {
            role: 'Software Engineer',
            company: 'TCS',
            period: 'Dec 2017 — Oct 2021',
            highlights: [
                'Delivered public-sector workflows with secure, role-based UX.',
                'Owned end-to-end delivery across backend and UI modules.'
            ]
        }
    ],
    skills: [
        {
            group: 'Product + Design',
            items: [
                'Product strategy',
                'System thinking',
                'UX flows',
                'Prototyping'
            ]
        },
        {
            group: 'Frontend',
            items: [
                'Next.js',
                'TypeScript',
                'JavaScript',
                'HTML/CSS',
                'Oracle JET',
                'jQuery'
            ]
        },
        {
            group: 'Backend + MLOps',
            items: [
                'Java',
                'Spring Boot',
                'Hibernate/JPA',
                'REST APIs',
                'SQL',
                'MySQL',
                'ActiveMQ',
                'Nginx',
                'Gradle',
                'Git'
            ]
        },
        {
            group: 'Cloud + DevOps',
            items: [
                'GCP',
                'GKE',
                'Kubernetes',
                'Docker',
                'Observability'
            ]
        }
    ],
    cursorCaseStudy: {
        title: 'Cursor Hackathon — 1st & 2nd Place',
        subtitle: 'Two award-winning builds that made AI workflows feel effortless and scalable.',
        teams: [
            {
                name: 'Team Busters — 1st Place',
                problem: 'AI workflows were fragmented and slow to operationalize across teams.',
                approach: 'Designed a control-room experience that stitched prompts, assets, and deployment signals into one flow.',
                outcome: 'Delivered a cohesive demo that showcased speed, clarity, and platform readiness.',
                why: 'Great AI products need a command center—this proved the model.'
            },
            {
                name: 'Engineering Impact Platform — 2nd Place',
                problem: 'Engineering impact data was scattered, making prioritization unclear.',
                approach: 'Built a unified cockpit for impact signals with clear ranking and storytelling.',
                outcome: 'Improved decision velocity with a single source of truth UX.',
                why: 'Teams move faster when impact is visible and trusted.'
            }
        ],
        builtWithCursor: [
            'Generate an architecture that maps signals → inference → outcome.',
            'Draft a clean UX flow for command-center navigation.',
            'Refine copy to be executive-level and launch-ready.'
        ]
    },
    smartwealthCaseStudy: {
        title: 'SmartWealth',
        subtitle: 'AI-powered investing inside PayPal (AI Adapt Hackathon Winner)',
        hero: 'SmartWealth turns PayPal’s money-movement signal into a trusted, one-tap investing experience that feels as simple as paying someone. It reframes PayPal from a payments utility into a lifelong wealth partner.',
        uniqueAdvantage: 'PayPal sees how money moves across everyday life, creating a signal rich enough to personalize goals, risk, and timing. That context enables safer guidance than generic portfolios, at public scale. It is an advantage new fintechs cannot easily replicate.',
        vision: 'AI-powered investing inside PayPal—frictionless, intuitive, and accessible. One tap. $1 minimum. ETFs, crypto, and high-yield savings inside the platform people already trust.',
        experienceJourney: [
            'Set goal: choose a target and timeline with a $1 minimum.',
            'Confirm risk: calibrate comfort with clear tradeoffs.',
            'Get portfolio: receive a diversified mix with guardrails.',
            'Ongoing guidance: explainable nudges and steady rebalancing.'
        ],
        aiApproach: [
            'Goal-based profiles that adapt to life context.',
            'Risk calibration with diversification guardrails.',
            'Suitability checks and disclosure-aware nudges.',
            'Explainability with plain-language rationale.',
            'Monitoring for drift and unsafe guidance.'
        ],
        whyPayPalWins: [
            '435M+ users (approx.) → built-in distribution with near-zero CAC.',
            '$1.6T+ annual payment volume (approx.) → unmatched behavioral signal.',
            '25 years of global trust → a foundation no new fintech can recreate.'
        ],
        role: [
            'Owned the pitch narrative and product framing.',
            'Designed the system and UX concept end-to-end.',
            'Crafted the demo story for executive clarity.'
        ],
        nextBuild: [
            'MVP: goal-based onboarding, risk slider, starter ETF bundles.',
            'Safety/compliance: suitability checks, disclosures, guardrails.',
            'Experimentation: activation, funded rate, retention, trust signals.'
        ],
        disclaimer: 'Note: This was a hackathon concept/pitch, not an official PayPal product announcement.'
    },
    contact: {
        headline: 'Let’s build the next control room.',
        subheadline: 'Open to collaborations on AI-first systems, product strategy, and platform UX.'
    }
};
}),
"[project]/src/src/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs);
}
}),
"[project]/src/src/components/CommandPalette.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommandPalette",
    ()=>CommandPalette
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$src$2f$lib$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/src/lib/site.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function CommandPalette() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const actions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const sectionActions = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$src$2f$lib$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["site"].sections.map((section)=>({
                id: `section-${section.id}`,
                label: section.label,
                href: `/#${section.id}`,
                keywords: [
                    'section',
                    'jump'
                ]
            }));
        const caseStudyActions = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$src$2f$lib$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["site"].caseStudies.map((study)=>({
                id: `case-${study.slug}`,
                label: study.title,
                href: study.href,
                keywords: study.tags
            }));
        return [
            ...sectionActions,
            ...caseStudyActions,
            {
                id: 'contact',
                label: 'Contact',
                href: '/#contact',
                keywords: [
                    'email'
                ]
            }
        ];
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handler = (event)=>{
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                setOpen(true);
            }
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };
        const openHandler = ()=>setOpen(true);
        window.addEventListener('keydown', handler);
        window.addEventListener('command-palette-open', openHandler);
        return ()=>{
            window.removeEventListener('keydown', handler);
            window.removeEventListener('command-palette-open', openHandler);
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) setQuery('');
    }, [
        open
    ]);
    const filtered = actions.filter((action)=>{
        const haystack = `${action.label} ${action.keywords?.join(' ') ?? ''}`.toLowerCase();
        return haystack.includes(query.toLowerCase());
    });
    const handleSelect = (href)=>{
        setOpen(false);
        router.push(href);
    };
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "command-overlay",
        onClick: ()=>setOpen(false),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "command-dialog",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "Command palette",
            onClick: (event)=>event.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    autoFocus: true,
                    value: query,
                    onChange: (event)=>setQuery(event.target.value),
                    className: "command-input",
                    placeholder: "Jump to a section or case study..."
                }, void 0, false, {
                    fileName: "[project]/src/src/components/CommandPalette.tsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "command-list",
                    children: filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "command-empty",
                        children: 'No matches. Try "wins" or "case studies."'
                    }, void 0, false, {
                        fileName: "[project]/src/src/components/CommandPalette.tsx",
                        lineNumber: 96,
                        columnNumber: 13
                    }, this) : filtered.map((action)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>handleSelect(action.href),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('command-item'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: action.label
                                }, void 0, false, {
                                    fileName: "[project]/src/src/components/CommandPalette.tsx",
                                    lineNumber: 107,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-muted",
                                    style: {
                                        fontSize: '0.75rem'
                                    },
                                    children: action.href
                                }, void 0, false, {
                                    fileName: "[project]/src/src/components/CommandPalette.tsx",
                                    lineNumber: 108,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, action.id, true, {
                            fileName: "[project]/src/src/components/CommandPalette.tsx",
                            lineNumber: 101,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/src/components/CommandPalette.tsx",
                    lineNumber: 94,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>setOpen(false),
                    className: "command-close",
                    children: "Press Esc to close"
                }, void 0, false, {
                    fileName: "[project]/src/src/components/CommandPalette.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/src/components/CommandPalette.tsx",
            lineNumber: 80,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/src/components/CommandPalette.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/src/components/Navbar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navbar",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$src$2f$lib$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/src/lib/site.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function Navbar() {
    const handleCommandPalette = ()=>{
        window.dispatchEvent(new CustomEvent('command-palette-open'));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "navbar",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "navbar-inner",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "font-display",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$src$2f$lib$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["site"].profile.name
                }, void 0, false, {
                    fileName: "[project]/src/src/components/Navbar.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "nav-links",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$src$2f$lib$2f$site$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["site"].sections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: `/#${section.id}`,
                            className: "nav-link",
                            children: section.label
                        }, section.id, false, {
                            fileName: "[project]/src/src/components/Navbar.tsx",
                            lineNumber: 19,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/src/components/Navbar.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: handleCommandPalette,
                    className: "nav-command",
                    "aria-label": "Open command palette",
                    children: "⌘K"
                }, void 0, false, {
                    fileName: "[project]/src/src/components/Navbar.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/src/components/Navbar.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/src/components/Navbar.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/src/components/SignalBackground.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SignalBackground",
    ()=>SignalBackground
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function SignalBackground() {
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;
        let animationFrame = 0;
        const points = [];
        const pointCount = 48;
        const maxDistance = 140;
        const pointer = {
            x: 0,
            y: 0,
            active: false
        };
        const resize = ()=>{
            const ratio = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * ratio;
            canvas.height = window.innerHeight * ratio;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
        };
        const initPoints = ()=>{
            points.length = 0;
            for(let i = 0; i < pointCount; i += 1){
                points.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4
                });
            }
        };
        const draw = ()=>{
            context.clearRect(0, 0, window.innerWidth, window.innerHeight);
            context.fillStyle = 'rgba(109, 92, 255, 0.08)';
            context.strokeStyle = 'rgba(69, 211, 255, 0.12)';
            for (const point of points){
                point.x += point.vx;
                point.y += point.vy;
                if (point.x < 0 || point.x > window.innerWidth) point.vx *= -1;
                if (point.y < 0 || point.y > window.innerHeight) point.vy *= -1;
                const dx = pointer.x - point.x;
                const dy = pointer.y - point.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (pointer.active && dist < 140) {
                    point.x -= dx * 0.002;
                    point.y -= dy * 0.002;
                }
                context.beginPath();
                context.arc(point.x, point.y, 2, 0, Math.PI * 2);
                context.fill();
            }
            for(let i = 0; i < points.length; i += 1){
                for(let j = i + 1; j < points.length; j += 1){
                    const a = points[i];
                    const b = points[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < maxDistance) {
                        context.globalAlpha = 1 - dist / maxDistance;
                        context.beginPath();
                        context.moveTo(a.x, a.y);
                        context.lineTo(b.x, b.y);
                        context.stroke();
                    }
                }
            }
            context.globalAlpha = 1;
            animationFrame = window.requestAnimationFrame(draw);
        };
        const onPointerMove = (event)=>{
            pointer.x = event.clientX;
            pointer.y = event.clientY;
            pointer.active = true;
        };
        const onPointerLeave = ()=>{
            pointer.active = false;
        };
        const onScroll = ()=>{
            pointer.active = false;
        };
        resize();
        initPoints();
        draw();
        window.addEventListener('resize', resize);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerleave', onPointerLeave);
        window.addEventListener('scroll', onScroll, {
            passive: true
        });
        return ()=>{
            window.removeEventListener('resize', resize);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerleave', onPointerLeave);
            window.removeEventListener('scroll', onScroll);
            window.cancelAnimationFrame(animationFrame);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "signal-canvas",
        "aria-hidden": true
    }, void 0, false, {
        fileName: "[project]/src/src/components/SignalBackground.tsx",
        lineNumber: 131,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__cf8ff14d._.js.map