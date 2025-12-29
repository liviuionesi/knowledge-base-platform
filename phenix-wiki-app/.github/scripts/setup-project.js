const { execSync } = require('child_process');
const fs = require('fs');

const PROJECT_NUMBER = 7;
const OWNER = 'pehlivanu';

// --- DATA ---

const EPICS = [
  {
    title: '[EPIC] Foundation & Infrastructure',
    bodyTemplate: `## Epic Description
Establish the rock-solid technical foundation required to support a scalable, secure, and maintainable Next.js 16.1.1 application. This epic covers the initialization of the codebase, configuration of the CI/CD pipeline, implementation of the design system foundation, and the enforcement of authentication security policies.

## Business Value
Ensures the project starts with best practices, reducing technical debt. guarantees that Alliance credentials handled by the platform are secure from day one and provides a robust, localized platform for our French and English-speaking members.

## User Stories / Child Tasks
{{TASKS}}

## Technical Stack
- **Framework**: Next.js 16.1.1
- **Language**: TypeScript 5.x
- **Build**: pnpm
- **Localization**: next-intl

## Definition of Done
- [ ] CI pipeline builds the project successfully.
- [ ] Authentication middleware intercepts all protected routes.
- [ ] Dark/Light mode toggle works and persists preference.
- [ ] Documentation updated.
`,
    labels: ['epic', 'P0-critical', 'sprint-0', 'infrastructure'],
    tasks: [
      {
        title: '[TASK] Initialize Next.js 16.1.1 Repository',
        body: `## Task Description
Initialize the Next.js application using the latest version (16.1.1) to ensure we are on the bleeding edge of React Server Components.

## Context
First step in project setup. Establishes the codebase that all subsequent features will depend on.

## Implementation Details
1. Run \`pnpm create next-app\` with specific flags.
2. Configure \`tsconfig.json\` for strict type checking.
3. Set up ESLint with \`next/core-web-vitals\`.
4. Configure \`@/*\` import aliases.

## Files to Create/Modify
- \`package.json\`
- \`tsconfig.json\`
- \`next.config.ts\`
- \`tailwind.config.ts\`

## Acceptance Criteria
- [ ] \`pnpm dev\` starts the server on port 3000.
- [ ] \`pnpm build\` produces a valid production build.
- [ ] No linting errors present.

## Estimated Time
**Story Points:** 2
`,
        labels: ['task', 'P0-critical', 'sprint-0', 'infrastructure']
      },
      {
        title: '[TASK] Implement Internationalization (i18n) Architecture',
        body: `## Task Description
Configure \`next-intl\` to support English (\`en\`) and French (\`fr\`) as first-class citizens.

## Implementation Details
1. Install \`next-intl\`.
2. Create \`src/messages/en.json\` and \`src/messages/fr.json\`.
3. Implement \`src/i18n/request.ts\`.
4. Configure Middleware for \`/[locale]\` routing.

## Acceptance Criteria
- [ ] Accessing \`/\` redirects to \`/en\`.
- [ ] Accessing \`/fr\` renders French content.
- [ ] Locale switching persists via cookie.

## Estimated Time
**Story Points:** 3
`,
        labels: ['task', 'P1-high', 'sprint-0', 'backend']
      },
      {
        title: '[TASK] Implement Fixed-Credential Security Middleware',
        body: `## Task Description
Protect the wiki content from public access using a shared-password mechanism enforced by Next.js Middleware.

## Technical Specifications
- **Cookie Name**: \`phenix_session\` (Secure, HttpOnly).
- **Env Var**: \`WIKI_PASSWORD\`.

## Implementation Checklist
- [ ] Create Login Page (\`/login\`).
- [ ] Create API Route (\`/api/auth/login\`).
- [ ] Update Middleware logic.

## Acceptance Criteria
- [ ] Protected routes return 307 Redirect to \`/login\` for unauthenticated requests.
- [ ] Static assets are EXCLUDED from auth checks.

## Estimated Time
**Story Points:** 5
`,
        labels: ['task', 'P0-critical', 'sprint-0', 'security']
      },
      {
        title: '[TASK] Setup Design System & Phenix Theming',
        body: `## Task Description
Implement the visual identity of the Phenix Alliance using Tailwind CSS and \`next-themes\`.

## Implementation Details
1. Install \`next-themes\`.
2. Configure \`tailwind.config.ts\` with custom colors (\`phenix-orange\`).
3. Create \`ThemeToggle\` component.
4. Implement "Fire Bird" background.

## Acceptance Criteria
- [ ] Dark mode is the default state.
- [ ] Toggling works instantly.
- [ ] Text is legible against background.

## Estimated Time
**Story Points:** 3
`,
        labels: ['task', 'P1-high', 'sprint-0', 'frontend']
      }
    ]
  },
  {
    title: '[EPIC] Core User Interface & Layout',
    bodyTemplate: `## Epic Description
Develop the visual shell of the application (Sidebar, Header, Layout). Mobile-first focus.

## Business Value
Critical for usability during gameplay.

## User Stories / Child Tasks
{{TASKS}}

## Definition of Done
- [ ] Layout is fully responsive (Mobile/Desktop).
- [ ] Sidebar works smoothly.
`,
    labels: ['epic', 'P1-high', 'sprint-1', 'frontend'],
    tasks: [
      {
        title: '[TASK] Implement Responsive Sidebar Navigation',
        body: `## Task Description
Create a collapsible Sidebar component. Permanently visible on Desktop, Drawer on Mobile.

## Implementation Details
1. Create \`Sidebar.tsx\`.
2. Implement Mobile Drawer logic.
3. Add \`SidebarItem\` component with active state.

## Acceptance Criteria
- [ ] Hamburger menu visible only on mobile.
- [ ] Clicking a link on mobile closes the drawer.
- [ ] Active route is visually highlighted.

## Estimated Time
**Story Points:** 5
`,
        labels: ['task', 'P1-high', 'sprint-1', 'frontend']
      }
    ]
  }
];

// --- HELPERS ---

function run(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf-8', stdio: 'pipe' }).trim();
  } catch (e) {
    console.error(`Error running command: ${cmd}`, e.message);
    return '';
  }
}

function closeAllOpenIssues() {
  console.log('Closing all open issues...');
  const issues = run('gh issue list --state open --json number -q ".[].number"');
  if (issues) {
    const ids = issues.split('\n');
    for (const id of ids) {
      if(id) run(`gh issue close ${id}`);
    }
  }
}

function clearProjectBoard() {
  console.log('Clearing project board...');
  const itemsJson = run(`gh project item-list ${PROJECT_NUMBER} --owner ${OWNER} --format json`);
  if (!itemsJson) return;
  
  try {
    const items = JSON.parse(itemsJson).items;
    for (const item of items) {
      run(`gh project item-delete ${PROJECT_NUMBER} --owner ${OWNER} --id ${item.id}`);
    }
  } catch (e) {
    console.error("Error parsing project items", e);
  }
}

function createIssue(title, body, labels) {
  const labelFlags = labels.map(l => `--label "${l}"`).join(' ');
  const bodyFile = `/tmp/body_${Date.now()}_${Math.random()}.md`;
  fs.writeFileSync(bodyFile, body);
  const out = run(`gh issue create --title "${title.replace(/"/g, '\\"')}" --body-file "${bodyFile}" ${labelFlags}`);
  fs.unlinkSync(bodyFile);
  const match = out.match(/\/issues\/(\d+)$/);
  return match ? { url: out, number: match[1] } : null;
}

function updateIssue(number, body) {
  const bodyFile = `/tmp/body_update_${Date.now()}_${Math.random()}.md`;
  fs.writeFileSync(bodyFile, body);
  run(`gh issue edit ${number} --body-file "${bodyFile}"`);
  fs.unlinkSync(bodyFile);
}

function addToProject(url) {
  run(`gh project item-add ${PROJECT_NUMBER} --owner ${OWNER} --url "${url}"`);
}

// --- MAIN ---

async function main() {
  console.log('Starting population script (CommonJS)...');
  closeAllOpenIssues();
  clearProjectBoard();

  for (const epic of EPICS) {
    console.log(`Processing Epic: ${epic.title}`);
    const epicObj = createIssue(epic.title, epic.bodyTemplate.replace('{{TASKS}}', '_Pending creation..._'), epic.labels);
    if (!epicObj) {
      console.error(`Failed to create Epic: ${epic.title}`);
      continue;
    }
    
    addToProject(epicObj.url);
    
    let taskListMarkdown = "";
    for (const task of epic.tasks) {
      console.log(`  Creating Task: ${task.title}`);
      const taskBody = `${task.body}\n\nRelated to Epic #${epicObj.number}`;
      const taskObj = createIssue(task.title, taskBody, task.labels);
      
      if (taskObj) {
        addToProject(taskObj.url);
        taskListMarkdown += `- [ ] #${taskObj.number} ${task.title}\n`;
      } else {
        console.error(`  Failed to create Task: ${task.title}`);
      }
    }
    
    console.log(`  Updating Epic #${epicObj.number} with links...`);
    const finalBody = epic.bodyTemplate.replace('{{TASKS}}', taskListMarkdown);
    updateIssue(epicObj.number, finalBody);
  }
  
  console.log("Done! Filmpire Standard applied.");
}

main();
