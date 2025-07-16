# ATS Frontend Documentation

## Project Overview

This is a comprehensive Applicant Tracking System (ATS) frontend built with Next.js 15, TypeScript, and modern React patterns. The application provides a complete recruiting workflow management system with features for candidate management, job posting, workflow automation, and template management.

## Tech Stack

### Core Technologies
- **Next.js 15.3.4** - React framework with App Router
- **React 19.0.0** - User interface library
- **TypeScript 5** - Type safety and developer experience
- **Tailwind CSS 4** - Utility-first CSS framework

### State Management
- **Redux Toolkit 2.8.2** - Predictable state container
- **Redux Persist 6.0.0** - Persistence layer for Redux store
- **React Redux 9.2.0** - React bindings for Redux

### UI Components & Styling
- **Radix UI** - Headless UI components (accordion, avatar, dialog, etc.)
- **Lucide React** - Icon library
- **Framer Motion** - Animation library
- **Class Variance Authority** - Component variant styling
- **Tailwind Merge** - Utility for merging Tailwind classes

### Workflow & Visualization
- **@xyflow/react** - Flow-based workflow editor
- **@hello-pangea/dnd** - Drag and drop functionality
- **Recharts** - Chart library for data visualization

### Rich Text & Forms
- **Slate.js** - Rich text editor framework
- **React Day Picker** - Date picker component
- **Zod** - TypeScript-first schema validation

### Development Tools
- **ESLint 9** - Code linting
- **PostCSS** - CSS processing
- **TypeScript ESLint** - TypeScript-specific linting rules

## Project Structure

```
├── README.md
├── components.json                  # shadcn/ui component configuration
├── eslint.config.mjs               # ESLint configuration
├── next.config.ts                  # Next.js configuration
├── package.json                    # Dependencies and scripts
├── postcss.config.mjs              # PostCSS configuration
├── tsconfig.json                   # TypeScript configuration
├── messages/                       # Internationalization files
│   ├── en.json                    # English translations
│   └── es.json                    # Spanish translations
├── public/                         # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
└── src/                           # Source code
    ├── app/                       # Next.js App Router pages
    ├── components/                # Reusable UI components
    ├── i18n/                      # Internationalization setup
    ├── lib/                       # Utility libraries
    ├── state/                     # Redux state management
    └── store/                     # Redux slices and store configuration
```

## Application Architecture

### Next.js App Router Structure

The application uses Next.js 15's App Router with the following key pages:

#### Main Application Routes
- `/` - Dashboard home page
- `/candidates` - Candidate management
- `/companies` - Company management
- `/jobs` - Job posting and management
- `/jobs/[id]` - Individual job details
- `/templates` - Template management (Email, WhatsApp, Call agents)
- `/workflow` - Workflow automation
- `/workflow/[id]` - Individual workflow details
- `/forms` - Form management
- `/forms/[id]` - Individual form details
- `/settings` - Application settings

### Component Organization

#### Core Application Components (`src/app/components/`)

**Navigation & Layout**
- `Navbar/` - Top navigation bar with notifications
- `Sidebar/` - Main navigation sidebar
- `ModalManager.tsx` - Global modal state management
- `EmptyState/` - Empty state component for lists

**Candidate Management (`CandidateDetail/`)**
- `CandidateDetail.tsx` - Main candidate detail container
- `CandidateHeader.tsx` - Candidate profile header
- `CandidateNav.tsx` - Candidate detail navigation
- `CandidateActions/` - Action buttons and forms
- `Comentarios/` - Comment system
- `Formularios/` - Form management
- `Matching/` - Candidate matching system
- `Resumen/` - Resume and experience management
- `Reuniones/` - Meeting scheduling
- `Trabajos/` - Job applications

**Job Management (`jobs/[id]/components/`)**
- `JobHeader.tsx` - Job posting header
- `JobNav.tsx` - Job detail navigation
- `JobContentRenderer.tsx` - Content rendering logic
- `Aplicantes/` - Applicant management
- `Candidatos/` - Candidate views (Table, Kanban)
- `Descripcion/` - Job description management
- `Detalles/` - Job details and files
- `Heimdall/` - AI-powered candidate analysis
- `Personalizados/` - Custom fields

**Template Management (`templates/components/`)**
- `Templates/` - Various template types:
  - `Call/` - Call agent templates
  - `Emails/` - Email templates
  - `Whatsapp/` - WhatsApp templates
  - `EmailAgents/` - Email automation agents
  - `WhatsappAgent/` - WhatsApp automation agents
  - `LinkedinAgents/` - LinkedIn automation agents
  - `HttpAgents/` - HTTP integration agents
- `CreateTemplate/` - Template creation forms
- `TextAgents/` - Text-based AI agents
- `VariableDropdown.tsx` - Dynamic variable insertion
- `VariableRichTextEditor.tsx` - Rich text editor with variables

**Workflow Management (`workflow/[id]/components/`)**
- `WorkflowCanvas.tsx` - Visual workflow editor
- `WorkflowNode.tsx` - Individual workflow nodes
- `WorkflowSidebar.tsx` - Workflow configuration panel
- `AddNewStage.tsx` - Stage creation
- `EditWorkflow.tsx` - Workflow editing
- `templates/` - Workflow template configurations

#### Reusable UI Components (`src/components/ui/`)

Based on shadcn/ui pattern, includes:
- `accordion.tsx` - Collapsible content sections
- `avatar.tsx` - User profile images
- `badge.tsx` - Status indicators
- `button.tsx` - Interactive buttons
- `calendar.tsx` - Date selection
- `card.tsx` - Content containers
- `checkbox.tsx` - Selection inputs
- `dialog.tsx` - Modal dialogs
- `dropdown-menu.tsx` - Contextual menus
- `input.tsx` - Form inputs
- `select.tsx` - Selection dropdowns
- `table.tsx` - Data tables
- `tabs.tsx` - Tabbed interfaces
- `textarea.tsx` - Multi-line text inputs
- `tooltip.tsx` - Contextual help

## State Management

### Redux Store Structure

The application uses Redux Toolkit with the following state slices:

#### Global State (`src/state/index.ts`)
- `isSidebarCollapsed` - Sidebar toggle state
- `locale` - Current language (en/es)

#### Feature-Specific Slices (`src/store/slices/`)

**Candidate Management**
- `CandidateDetailSlice.ts` - Individual candidate details
- `CandidateListSlice.ts` - Candidate list state
- `CandidateAnalysisSlice.ts` - AI analysis results
- `CandidateCommentsSlice.ts` - Comment threads
- `CandidateMeetingsSlice.ts` - Meeting scheduling
- `CandidateScoreboardsSlice.ts` - Scoring and evaluation

**Job Management**
- `JobSlice.ts` - Job posting state
- `JobListSlice.ts` - Job list management
- `JobApplicantsSlice.ts` - Job applicants
- `JobHeimdallSlice.ts` - AI-powered analysis
- `JobScoreboardsSlice.ts` - Job evaluation forms
- `JobStagesSlice.ts` - Application stages

**Workflow Management**
- `WorkflowListSlice.ts` - Workflow list state
- `WorkflowDetailSlice.ts` - Individual workflow details
- `WorkflowCallSlice.ts` - Call automation
- `WorkflowEmailSlice.ts` - Email automation
- `WorkflowWhatsappSlice.ts` - WhatsApp automation
- `WorkflowScoreboardsSlice.ts` - Workflow evaluation
- `WhatsappAgentSlice.ts` - WhatsApp agent configuration

**UI State**
- `ModalSlice.ts` - Global modal state management

### Redux Persistence

The store uses Redux Persist with:
- **Storage**: localStorage (with SSR fallback)
- **Persisted slices**: `global`, `modal`, `candidateDetail`
- **Ignored actions**: Redux Persist lifecycle actions

## API Integration

### HTTP Client Configuration

**Base Configuration** (`src/lib/axios.ts`)
- Base URL: `https://7s188gjl82.execute-api.sa-east-1.amazonaws.com/test`
- Timeout: Unlimited (0ms)
- Error interceptor with console logging

### API Structure (`src/state/api/`)

**Candidate APIs**
- `fetchCandidateById.ts` - Individual candidate data
- `Candidates/FetchCandidateList.ts` - Candidate listings
- `Candidates/id/` - Candidate-specific endpoints:
  - `FetchCandidateAnalysis.ts` - AI analysis
  - `FetchCandidateComments.ts` - Comment threads
  - `FetchCandidateMeetings.ts` - Meeting data
  - `FetchCandidateScoreboards.ts` - Evaluation forms

**Job APIs**
- `fetchJob.ts` - Job posting data
- `Jobs/fetchJobList.ts` - Job listings
- `Jobs/Id/` - Job-specific endpoints:
  - `FetchJobApplicants.ts` - Application data
  - `FetchJobHeimdall.ts` - AI analysis
  - `FetchJobScoreboards.ts` - Evaluation forms
  - `FetchJobStagesSlice.ts` - Application stages

**Workflow APIs**
- `Workflows/fetchWorkflowList.ts` - Workflow listings
- `Workflows/Id/` - Workflow-specific endpoints:
  - `fetchWorfkflowDetail.ts` - Workflow configuration
  - `fetchWorkflowCall.ts` - Call automation
  - `fetchWorkflowEmail.ts` - Email automation
  - `fetchWorkflowWhatsapp.ts` - WhatsApp automation
  - `fetchWhatsappAgent.ts` - Agent configuration
  - `fetchWorkflowScoreboards.ts` - Evaluation forms

## Styling System

### Tailwind CSS Configuration

**Theme System** (`src/app/globals.css`)
- **Font**: Poppins from Google Fonts
- **Color System**: CSS custom properties with OKLCH color space
- **Dark Mode**: CSS class-based theming (`.dark`)
- **Responsive Design**: Mobile-first approach

**Design Tokens**
- Radius variables: `--radius-sm` to `--radius-xl`
- Color variables: Primary, secondary, accent, muted, destructive
- Sidebar-specific colors for navigation
- Chart colors for data visualization

### Component Styling

**Utility Classes**
- `tw-animate-css` - Animation utilities
- `class-variance-authority` - Component variant management
- `clsx` - Conditional class composition
- `tailwind-merge` - Class conflict resolution

## Internationalization

### Language Support

**Supported Languages**
- English (en) - Default
- Spanish (es)

**Implementation** (`src/i18n/request.ts`)
- Uses `next-intl` for internationalization
- Cookie-based locale detection
- Dynamic message loading from JSON files

**Message Files** (`messages/`)
- Organized by feature (Sidebar, Settings, EmptyState)
- Nested structure for complex UI elements
- Placeholder support for dynamic content

## Key Features

### 1. Candidate Management
- Complete candidate profiles with CV parsing
- Comment and note system
- Meeting scheduling and tracking
- Custom field management
- AI-powered candidate analysis
- Experience and education tracking
- File attachment system

### 2. Job Management
- Job posting creation and editing
- Multi-stage application process
- Candidate scoring and evaluation
- Kanban and table view options
- Application stage tracking
- Custom evaluation forms
- AI-powered candidate matching

### 3. Workflow Automation
- Visual workflow editor with drag-and-drop
- Multi-channel communication (Email, WhatsApp, Calls)
- Template-based automation
- Agent configuration for AI interactions
- Stage-based progression
- Custom scoring systems

### 4. Template Management
- Email templates with variable substitution
- WhatsApp message templates
- Call script templates
- AI agent prompts and configurations
- Rich text editing with Slate.js
- Dynamic variable insertion

### 5. Company Management
- Company profile management
- Contact information tracking
- Job posting associations
- Custom company fields

### 6. Form Management
- Dynamic form builder
- Custom field types
- Form validation and submission
- Integration with candidate profiles

## Configuration Files

### Next.js Configuration (`next.config.ts`)
- **Base Path**: `/ats` - Application runs under `/ats` subdirectory
- **Asset Prefix**: `/ats` - Static assets served from `/ats`
- **Internationalization**: Integrated with `next-intl`

### TypeScript Configuration (`tsconfig.json`)
- **Target**: ES2017 for broad compatibility
- **Module Resolution**: Bundler-based
- **Path Aliases**: `@/*` maps to `src/*`
- **Strict Mode**: Enabled for type safety

### ESLint Configuration (`eslint.config.mjs`)
- **Next.js Rules**: Integrated Next.js linting
- **TypeScript Support**: Full TypeScript rule set
- **Custom Rules**: Project-specific linting rules

## Development Workflow

### Available Scripts
- `npm run dev` - Development server with Turbopack
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - Code linting

### Development Features
- **Hot Reloading**: Instant updates during development
- **Type Checking**: Real-time TypeScript validation
- **Linting**: Automated code quality checks
- **Turbopack**: Fast bundling for development

## Deployment Configuration

### Base Path Setup
- Application deployed under `/ats` subdirectory
- All assets and API calls prefixed with `/ats`
- Internationalization routes maintained

### Environment Variables
- API base URL configurable through environment
- Language preferences stored in cookies
- Redux persistence enabled for user preferences

## Security Considerations

### API Security
- CORS error handling implemented
- Network error detection and user feedback
- Error response sanitization
- Request timeout configuration

### Data Protection
- Redux state persistence excludes sensitive data
- Local storage used for non-sensitive UI state
- Cookie-based language preferences

## Performance Optimizations

### Code Splitting
- Next.js automatic code splitting
- Component-level lazy loading
- Route-based bundle splitting

### State Management
- Selective Redux persistence
- Efficient re-rendering with proper selectors
- Middleware for development debugging

### Asset Optimization
- SVG icons for scalability
- Optimized font loading
- Efficient CSS bundling with Tailwind

## Testing and Quality Assurance

### Development Tools
- TypeScript for compile-time error detection
- ESLint for code quality enforcement
- Strict mode enabled for runtime checks

### Error Handling
- Global error boundaries
- API error interceptors
- User-friendly error messages
- Network connectivity detection

## Future Considerations

### Scalability
- Modular component architecture
- Centralized state management
- Efficient API caching strategies
- Progressive Web App capabilities

### Extensibility
- Plugin-based template system
- Custom field frameworks
- Workflow node extensibility
- Multi-tenant architecture readiness

---

*This documentation provides a comprehensive overview of the ATS frontend application. For specific implementation details, refer to the individual component files and their inline documentation.*