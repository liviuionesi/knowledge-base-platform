import { execSync } from 'child_process';
import fs from 'fs';

const PROJECT_NUMBER = 7;
const OWNER = 'pehlivanu';
const REPO = 'PhenixWiki'; // Assuming the repo name

// --- DATA DEFINITIONS ---

const EPICS = [
  {
    title: '[EPIC] Foundation & Infrastructure',
    body: `## Description
Establish the rock-solid technical foundation required to support a scalable, secure, and maintainable Next.js 16.1.1 application. This epic covers the initialization of the codebase, configuration of the CI/CD pipeline, implementation of the design system foundation, and the enforcement of authentication security policies.

## Business Value
Ensures the project starts with best practices, minimizing future technical debt. It guarantees that Alliance credentials handled by the platform are secure from day one and provides a robust, localized platform for our French and English-speaking members.

## Technical Stack
- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.4
- **Auth**: Middleware + HttpOnly Cookies
- **i18n**: \`next-intl\`

## Definition of Done
- [ ] CI pipeline builds the project successfully on every PR.
- [ ] Authentication middleware intercepts all protected routes.
- [ ] Dark/Light mode toggle works and persists preference.
- [ ] English and French routing is functional.

## User Stories / Tasks
`, // Will be appended dynamically
    labels: ['priority:P0-critical', 'type:epic', 'scope:infrastructure'],
    tasks: [
      {
        title: '[TASK] Initialize Next.js 16.1.1 Repository',
        body: `## Description
Initialize the Next.js application using the latest version (16.1.1) to ensure we are on the bleeding edge of React Server Components and Server Actions.

## Implementation Checklist
- [ ] Run \`pnpm create next-app\` with strict flags.
- [ ] Configure \`tsconfig.json\` for strict type checking (\`noImplicitAny\`, \`strictNullChecks\`).
- [ ] Set up ESLint with \`next/core-web-vitals\` and \`prettier\`.
- [ ] Configure \`@/*\` import alias mapping to \`./src/*\`.
- [ ] Commit initial boilerplate to GitHub.

## Acceptance Criteria
- [ ] \`pnpm dev\` starts the server on port 3000.
- [ ] \`pnpm build\` produces a valid production build.
- [ ] No linting errors present in the initial commit.`,
        labels: ['priority:P0-critical', 'type:task', 'scope:infrastructure']
      },
      {
        title: '[TASK] Implement Internationalization (i18n) Architecture',
        body: `## Description
Configure \`next-intl\` to support English (\`en\`) and French (\`fr\`) as first-class citizens. This involves setting up the middleware matcher to handle locale routing and creating the dictionary structure.

## Technical Specifications
\`\`\`typescript
// middleware.ts
export default createMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en'
});

export const config = {
  matcher: ['/', '/(fr|en)/:path*']
};
\`\`\`

## Acceptance Criteria
- [ ] Accessing \`/\` redirects to \`/en\`.
- [ ] Accessing \`/fr\` renders the French version of the landing page.
- [ ] Dictionary files exist at \`/src/messages/{locale}.json\`.
- [ ] Locale switching persists user preference via cookie.`,
        labels: ['priority:P1-high', 'type:task', 'scope:backend']
      },
      {
        title: '[TASK] Implement Fixed-Credential Security Middleware',
        body: `## Description
Protect the wiki content from public access using a shared-password mechanism enforced by Next.js Middleware.

## Technical Specifications
- **Env Var**: \`WIKI_PASSWORD\`
- **Cookie Name**: \`phenix_session\` (Secure, HttpOnly, SameSite=Lax)
- **Logic**: 
  1. Middleware checks for cookie.
  2. If missing and route is protected -> Redirect to \`/login\`.
  3. Login API route validates password -> Sets cookie.

## Acceptance Criteria
- [ ] Protected routes return 307 Redirect to \`/login\` for unauthenticated requests.
- [ ] Static assets (images, fonts) are EXCLUDED from auth checks.`,
        labels: ['priority:P0-critical', 'type:task', 'scope:security']
      },
      {
        title: '[TASK] Setup Design System & Phenix Theming',
        body: `## Description
Implement the visual identity of the Phenix Alliance. This includes the centralized "Phenix Bird" background asset, the color palette (Orange/Dark Slate), and the Dark Mode toggler.

## Implementation Checklist
- [ ] Install \`next-themes\`.
- [ ] Configure \`tailwind.config.ts\` with custom colors:
  - \`phenix-orange\`: \`#FF4500\`
  - \`phenix-dark\`: \`#0F172A\`
- [ ] Create \`components/ui/ThemeToggle.tsx\`.
- [ ] Create \`components/layout/Background.tsx\` with the "Fire Bird" graphical asset.

## Acceptance Criteria
- [ ] Dark mode is the default state.
- [ ] Toggling the theme instantly switches CSS variables/classes.
- [ ] Text is legible WCAG AA against the graphic background.`,
        labels: ['priority:P1-high', 'type:task', 'scope:frontend']
      }
    ]
  },
  {
    title: '[EPIC] Core User Interface & Layout',
    body: `## Description
Develop the responsive shell of the application. The navigation must be accessible on mobile devices during gameplay (overlay usage or second screen).

## Business Value
Critical for usability. If members cannot navigate to the "Defense" page during an invasion, the wiki is useless.

## Definition of Done
- [ ] Layout is fully responsive (Mobile, Tablet, Desktop).
- [ ] Sidebar navigation supports 2-level hierarchy.
- [ ] Animations are smooth (60fps) and do not lag the browser.

## User Stories / Tasks
`,
    labels: ['priority:P1-high', 'type:epic', 'scope:frontend'],
    tasks: [
      {
        title: '[TASK] Implement Responsive Sidebar Navigation',
        body: `## Description
Create a collapsible Sidebar component. It should be permanently visible on Desktop and a slide-over drawer on Mobile.

## Technical Specifications
- **Libraries**: \`lucide-react\` for icons, \`clsx\` / \`tailwind-merge\` for class handling.
- **State**: \`useSidebarStore\` (Zustand or Context) to manage open/close state.

## Acceptance Criteria
- [ ] Hamburger menu visible only on mobile breakpoints.
- [ ] Clicking a link on mobile closes the drawer.
- [ ] Active route is visually highlighted.`,
        labels: ['priority:P1-high', 'type:task', 'scope:frontend']
      }
    ]
  },
  {
    title: '[EPIC] Hero Database Module',
    body: `## Description
A searchable, filterable database of game heroes. Members need to know which heroes to prioritize for the "Fury Lord" events.

## Business Value
Increases alliance combat power by ensuring members invest in the right meta heroes.

## User Stories / Tasks
`,
    labels: ['priority:P2-medium', 'type:epic', 'scope:feature'],
    tasks: [
      {
        title: '[TASK] Define Hero Data Schema (JSON)',
        body: `## Description
Define the strictly typed JSON schema for hero data storage and populate it with initial data.

## Technical Specifications
\`\`\`typescript
interface Hero {
  id: string;
  name: string;
  rarity: 'orange' | 'purple' | 'blue';
  stats: { attack: number; defense: number; };
}
\`\`\`

## Acceptance Criteria
- [ ] \`heroes.json\` file created in \`src/data\`.
- [ ] TypeScript interfaces exported from \`src/types\`.
- [ ] At least 10 heroes added for initial testing.`,
        labels: ['priority:P2-medium', 'type:task', 'scope:backend']
      },
      {
        title: '[TASK] Implement Hero Grid & Filters',
        body: `## Description
A UI page that parses \`heroes.json\` and displays them in a responsive grid. Includes client-side filtering logic.

## Acceptance Criteria
- [ ] Filters for **Rarity** and **Faction** are functional.
- [ ] URL State synchronization (e.g., \`?faction=dawn\`) so links can be shared at specific filter states.`,
        labels: ['priority:P2-medium', 'type:task', 'scope:frontend']
      }
    ]
  }
];

// --- HELPER FUNCTIONS ---

function runCommand(command) {
  try {
    return execSync(command, { encoding: 'utf-8', stdio: 'pipe' }).trim();
  } catch (error) {
    if (error.stderr) console.error(`Command failed: ${command}\nError: ${error.stderr.trim()}`);
    else console.error(`Command failed: ${command}\nError: ${error.message}`);
    process.exit(1);
  }
}

// Ensure the local repo is linked to the remote (or we pass --repo flag)
function createIssue(title, body, labels) {
  console.log(`Creating Issue: ${title}`);
  const labelFlags = labels.map(l => `--label "${l}"`).join(' ');
  // Create a temporary file for the body to avoid shell escaping issues
  const bodyFile = `/tmp/issue_body_${Date.now()}.md`;
  fs.writeFileSync(bodyFile, body);
  
  const cmd = `gh issue create --title "${title.replace(/"/g, '\\"')}" --body-file "${bodyFile}" ${labelFlags}`;
  const output = runCommand(cmd); // Returns URL, e.g., https://github.com/pehlivanu/PhenixWiki/issues/1
  fs.unlinkSync(bodyFile);
  
  // Extract number from URL
  const match = output.match(/issues\/(\d+)$/);
  return match ? parseInt(match[1]) : null;
}

function addToProject(issueUrl) {
  console.log(`Adding ${issueUrl} to Project ${PROJECT_NUMBER}...`);
  // This command adds an item to the project.
  runCommand(`gh project item-add ${PROJECT_NUMBER} --owner ${OWNER} --url "${issueUrl}"`);
}

function getProjectItems() {
  console.log('Fetching project items...');
  const output = runCommand(`gh project item-list ${PROJECT_NUMBER} --owner ${OWNER} --format json`);
  return JSON.parse(output).items;
}

function deleteItem(itemId) {
  console.log(`Deleting item ${itemId}...`);
  runCommand(`gh project item-delete ${PROJECT_NUMBER} --owner ${OWNER} --id ${itemId}`);
}

async function main() {
  // 0. Cleanup Old Item on Board (Optional, but user asked for "delete all")
  // Note: This only deletes the cards from the board, NOT the issues from the repo. 
  // Given we are creating fresh issues, this effectively resets the board.
  const items = getProjectItems();
  for (const item of items) {
    deleteItem(item.id);
  }

  // 1. Process Epics
  for (const epic of EPICS) {
    // 2. Create Child Tasks First (so we can link them)
    const childIssueNumbers = [];
    
    for (const task of epic.tasks) {
      const taskNum = createIssue(task.title, task.body, task.labels);
      if (taskNum) {
        childIssueNumbers.push(taskNum);
        // Add Task to Project
        addToProject(`https://github.com/${OWNER}/${REPO}/issues/${taskNum}`);
      }
    }

    // 3. Update Epic Body with Child Links
    let childLinks = "";
    for (const num of childIssueNumbers) {
      // Find the task title for the link
      const t = epic.tasks[childIssueNumbers.indexOf(num)];
      childLinks += `- [ ] #${num} ${t.title}\n`;
    }
    const fullBody = epic.body + childLinks;

    // 4. Create Epic Issue
    const epicNum = createIssue(epic.title, fullBody, epic.labels);
    
    // 5. Add Epic to Project
    if (epicNum) {
      addToProject(`https://github.com/${OWNER}/${REPO}/issues/${epicNum}`);
    }
  }

  console.log('Project repopulation complete with professional issues!');
}

main();
