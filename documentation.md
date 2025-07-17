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

### Component Architecture

#### Component Classification

The application follows a three-tier component architecture:

1. **UI Components** (`src/components/ui/`) - Base reusable components
2. **Feature Components** (`src/app/components/`) - Business logic components
3. **Page Components** (`src/app/[page]/components/`) - Page-specific components

#### Core Application Components (`src/app/components/`)

**Navigation & Layout Components**

**Navbar** (`src/app/components/Navbar/`)
- **Purpose**: Top navigation bar with user actions and notifications
- **Key Files**:
  - `index.tsx` - Main navigation container
  - `NotificationDropdown.tsx` - Real-time notification system
- **Dependencies**: Redux state, internationalization
- **Usage**: Automatically rendered in layout, no manual imports needed

**Sidebar** (`src/app/components/Sidebar/`)
- **Purpose**: Main navigation sidebar with collapsible functionality
- **Props**:
  ```typescript
  interface SidebarLinkProps {
    href: string;           // Navigation URL
    icon: React.ElementType; // Lucide React icon component
    label: string;          // Display text (supports i18n)
    isCollapsed: boolean;   // Sidebar state
  }
  ```
- **Features**:
  - Responsive design (mobile hamburger menu)
  - Internationalization support
  - Redux state management for collapse state
  - Active link highlighting
- **Usage Example**:
  ```typescript
  // Sidebar automatically renders, but for custom links:
  <SidebarLink
    href="/custom-page"
    icon={CustomIcon}
    label={t("CustomPage")}
    isCollapsed={isSideBarCollapsed}
  />
  ```

**ModalManager** (`src/app/components/ModalManager.tsx`)
- **Purpose**: Global modal state management system
- **Features**: Centralized modal rendering, Redux integration
- **Usage**: Handles all application modals through Redux actions

**EmptyState** (`src/app/components/EmptyState/`)
- **Purpose**: Consistent empty state messaging across the application
- **Props**:
  ```typescript
  interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: React.ElementType;
    action?: React.ReactNode;
  }
  ```

**Candidate Management Components**

**CandidateDetail** (`src/app/components/CandidateDetail/`)
- **Main Container**: `CandidateDetail.tsx`
  - **Purpose**: Orchestrates candidate detail view with tabbed navigation
  - **Features**: Tab management, data fetching, state coordination
  
- **Header Components**:
  - `CandidateHeader.tsx` - Profile information display
  - `CandidateNav.tsx` - Tab navigation for candidate sections
  - `AddCandidateTags.tsx` - Tag management interface

- **Content Sections**:
  - `Resumen/` - Resume and experience management
    - `CandidateCv.tsx` - CV display and parsing
    - `CandidateExperience.tsx` - Work experience timeline
    - `CandidateFiles.tsx` - File attachment management
    - `AddCandidateExperience.tsx` - Experience creation form
    - `AddCandidateFiles.tsx` - File upload interface
  
  - `Comentarios/` - Comment system
    - `CandidateComments.tsx` - Comment thread display
    - `AddCandidateComment.tsx` - Comment creation form
  
  - `Reuniones/` - Meeting management
    - `CandidateMeetings.tsx` - Meeting list and calendar
    - `AddCandidateMeet.tsx` - Meeting scheduling form
  
  - `Formularios/` - Form management
    - `CandidateScoreboard.tsx` - Evaluation form display
    - `AddCandidateForm.tsx` - Form assignment interface
  
  - `Trabajos/` - Job applications
    - `CandidateJobsTable.tsx` - Job application history
    - `JobDetailModal.tsx` - Job detail popup
  
  - `Matching/` - AI-powered matching
    - `CandidatesMatching.tsx` - Candidate-job matching interface
  
  - `Personalizados/` - Custom fields
    - `CandidateCustom.tsx` - Custom field management
  
  - `CandidateActions/` - Action buttons and workflows
    - `CandidateActions.tsx` - Action button container
    - `ActionChat.tsx` - Chat interface
    - `ActionCompare.tsx` - Candidate comparison
    - `ActionGenerate.tsx` - AI content generation
    - `ActionUpdate.tsx` - Data update actions
    - `Vincular/` - Linking actions
      - `ActionLink.tsx` - Link candidate to job
      - `LinkCandidateStage.tsx` - Stage assignment
    - `Editar/` - Edit actions
      - `ActionEdit.tsx` - Edit candidate data
      - `CandidateCustomEdit.tsx` - Edit custom fields

**Job Management Components**

Located in `src/app/jobs/[id]/components/`, these components handle job-specific functionality:

- **JobHeader.tsx** - Job posting header with actions
- **JobNav.tsx** - Job detail navigation tabs
- **JobContentRenderer.tsx** - Dynamic content rendering based on active tab
- **Aplicantes/** - Applicant management and tracking
- **Candidatos/** - Candidate views (Table and Kanban layouts)
- **Descripcion/** - Job description editing and management
- **Detalles/** - Job details, requirements, and file attachments
- **Heimdall/** - AI-powered candidate analysis and recommendations
- **Personalizados/** - Custom field management for jobs

**Template Management Components**

**Template Types** (`src/app/templates/components/Templates/`)
- **Call/** - Call agent script templates
- **Emails/** - Email template management
- **Whatsapp/** - WhatsApp message templates
- **EmailAgents/** - Email automation configuration
- **WhatsappAgent/** - WhatsApp automation setup
- **LinkedinAgents/** - LinkedIn outreach automation
- **HttpAgents/** - HTTP integration templates

**Template Creation** (`src/app/templates/components/CreateTemplate/`)
- Dynamic template creation forms based on template type
- Validation and preview functionality

**Specialized Components**:
- **VariableDropdown.tsx** - Dynamic variable insertion for templates
  - **Purpose**: Provides contextual variable suggestions
  - **Features**: Autocomplete, categorized variables, insertion helpers
- **VariableRichTextEditor.tsx** - Rich text editor with variable support
  - **Purpose**: Advanced text editing with dynamic content
  - **Features**: Slate.js integration, variable highlighting, preview mode

**Workflow Management Components**

Located in `src/app/workflow/[id]/components/`:

- **WorkflowCanvas.tsx** - Visual workflow editor
  - **Purpose**: Drag-and-drop workflow design interface
  - **Features**: Node connections, validation, real-time updates
- **WorkflowNode.tsx** - Individual workflow step components
- **WorkflowSidebar.tsx** - Configuration panel for workflow properties
- **AddNewStage.tsx** - Stage creation interface
- **EditWorkflow.tsx** - Workflow editing and versioning
- **templates/** - Pre-built workflow templates

#### Reusable UI Components (`src/components/ui/`)

Built on shadcn/ui patterns with custom enhancements:

**Form Components**
- **button.tsx** - Interactive buttons with variants
  - **Props**:
    ```typescript
    interface ButtonProps {
      variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
      size?: 'default' | 'sm' | 'lg' | 'icon';
      asChild?: boolean;
    }
    ```
  - **Usage Example**:
    ```typescript
    <Button variant="outline" size="sm" onClick={handleClick}>
      Save Changes
    </Button>
    ```

- **input.tsx** - Form input fields with validation support
- **textarea.tsx** - Multi-line text inputs
- **checkbox.tsx** - Selection inputs with indeterminate state
- **select.tsx** - Dropdown selection components
- **multiselect.tsx** - Multi-option selection component

**Layout Components**
- **card.tsx** - Content containers with header/footer support
- **accordion.tsx** - Collapsible content sections
- **tabs.tsx** - Tabbed interfaces with keyboard navigation
- **sheet.tsx** - Slide-out panels
- **dialog.tsx** - Modal dialogs with backdrop
- **drawer.tsx** - Mobile-friendly bottom sheets

**Display Components**
- **avatar.tsx** - User profile images with fallbacks
- **badge.tsx** - Status indicators and labels
- **progress.tsx** - Progress bars and loading indicators
- **skeleton.tsx** - Loading placeholders
- **skeleton-variants.tsx** - Specialized skeleton components
- **loading-announcer.tsx** - Accessibility-focused loading states

**Navigation Components**
- **dropdown-menu.tsx** - Contextual menus with keyboard support
- **tooltip.tsx** - Contextual help and information
- **popover.tsx** - Floating content containers

**Data Components**
- **table.tsx** - Data tables with sorting and filtering
- **calendar.tsx** - Date selection with range support
- **scroll-area.tsx** - Custom scrollbars and scroll containers

**Utility Components**
- **separator.tsx** - Visual dividers
- **switch.tsx** - Toggle switches
- **label.tsx** - Form labels with proper association

#### Component Dependencies and Relationships

**Dependency Graph**

```
Layout Components
├── Navbar
│   ├── NotificationDropdown
│   └── UI Components (button, dropdown-menu, avatar)
├── Sidebar
│   ├── SidebarLink (internal)
│   └── UI Components (button, tooltip)
└── ModalManager
    ├── Redux Store (modalSlice)
    └── UI Components (dialog, sheet)

Feature Components
├── CandidateDetail
│   ├── CandidateHeader
│   │   ├── AddCandidateTags
│   │   └── UI Components (avatar, badge, button)
│   ├── CandidateNav
│   │   └── UI Components (tabs, button)
│   ├── Content Sections
│   │   ├── Resumen/*
│   │   ├── Comentarios/*
│   │   ├── Reuniones/*
│   │   ├── Formularios/*
│   │   ├── Trabajos/*
│   │   ├── Matching/*
│   │   └── Personalizados/*
│   └── CandidateActions
│       ├── All Action Components
│       └── UI Components (button, dialog, form)
├── Job Management
│   ├── JobHeader
│   ├── JobNav
│   └── Content Components (follows similar pattern)
├── Template Management
│   ├── Template Types
│   ├── CreateTemplate
│   ├── VariableDropdown
│   └── VariableRichTextEditor
└── Workflow Management
    ├── WorkflowCanvas
    ├── WorkflowNode
    └── WorkflowSidebar
```

**Cross-Component Communication**

1. **Redux State Management**
   - Global state shared across components
   - Modal state management
   - Sidebar collapse state
   - Feature-specific state slices

2. **Component Composition Patterns**
   - **Container-Presenter Pattern**: Feature components wrap UI components
   - **Render Props Pattern**: Content renderers for dynamic layouts
   - **Compound Components**: Tab systems, accordions, form groups

3. **Internationalization Integration**
   - All user-facing text components integrate with `next-intl`
   - Translation keys organized by feature/component
   - RTL support considerations

4. **Form Component Relationships**
   ```typescript
   // Common pattern for form components
   <Form>
     <FormField>
       <FormLabel />
       <FormControl>
         <Input /> // or Select, Textarea, etc.
       </FormControl>
       <FormMessage />
     </FormField>
   </Form>
   ```

**Data Flow Patterns**

1. **Top-Down Data Flow**
   - Page components fetch data and pass to feature components
   - Feature components manage local state and pass to UI components
   - UI components are primarily presentational

2. **Event Bubbling**
   - User interactions bubble up through component hierarchy
   - Redux actions dispatched at appropriate levels
   - API calls typically initiated by feature components

3. **State Synchronization**
   - Redux for global state (user preferences, modal state)
   - Local state for component-specific data
   - URL state for navigation and filters

#### Component Best Practices

**Development Guidelines**

1. **File Organization**
   ```
   ComponentName/
   ├── index.tsx          # Main component export
   ├── types.ts           # TypeScript interfaces
   ├── hooks.ts           # Custom hooks (if any)
   ├── utils.ts           # Component-specific utilities
   └── subcomponents/     # Related child components
   ```

2. **Component Structure**
   ```typescript
   // Standard component template
   interface ComponentProps {
     // Props interface
   }
   
   const Component: React.FC<ComponentProps> = ({ 
     prop1, 
     prop2,
     ...props 
   }) => {
     // Hooks
     // Event handlers
     // Render logic
     
     return (
       <div className="component-class" {...props}>
         {/* JSX */}
       </div>
     );
   };
   
   export default Component;
   ```

3. **Styling Conventions**
   - Use Tailwind CSS classes for styling
   - Implement dark mode support with CSS variables
   - Use `cn()` utility for conditional classes
   - Follow mobile-first responsive design

4. **Accessibility Standards**
   - Semantic HTML structure
   - ARIA attributes for complex interactions
   - Keyboard navigation support
   - Screen reader compatibility
   - Focus management

5. **Performance Optimization**
   - Use React.memo for expensive renders
   - Implement proper dependency arrays in useEffect
   - Lazy load heavy components
   - Optimize Redux selectors

**Testing Patterns**

1. **Unit Testing**
   - Test component props and state
   - Mock external dependencies
   - Test user interactions

2. **Integration Testing**
   - Test component interactions
   - Test Redux state updates
   - Test API integration

3. **Accessibility Testing**
   - Automated accessibility testing
   - Screen reader testing
   - Keyboard navigation testing

**Common Patterns**

1. **Loading States**
   ```typescript
   const Component = () => {
     const { data, isLoading, error } = useQuery();
     
     if (isLoading) return <Skeleton />;
     if (error) return <ErrorState />;
     if (!data) return <EmptyState />;
     
     return <DataDisplay data={data} />;
   };
   ```

2. **Form Handling**
   ```typescript
   const FormComponent = () => {
     const { handleSubmit, formState, control } = useForm();
     
     return (
       <form onSubmit={handleSubmit(onSubmit)}>
         <Controller
           name="fieldName"
           control={control}
           render={({ field }) => <Input {...field} />}
         />
       </form>
     );
   };
   ```

3. **Modal Management**
   ```typescript
   const ComponentWithModal = () => {
     const dispatch = useAppDispatch();
     
     const openModal = () => {
       dispatch(setModalContent({
         type: 'CUSTOM_MODAL',
         props: { /* modal props */ }
       }));
     };
     
     return <Button onClick={openModal}>Open Modal</Button>;
   };
   ```

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