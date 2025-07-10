# Workflow Components Documentation

## Overview
This document provides comprehensive documentation for the workflow management components in the Andeshire application. These components allow users to create, edit, and manage workflow stages with various action types including WhatsApp messaging with advanced configuration options.

## Components

### 1. EditWorkflow Component

**File**: `/src/app/workflow/[id]/components/EditWorkflow.tsx`

#### Purpose
The EditWorkflow component provides a modal interface for editing existing workflow stages. It allows users to modify stage properties, configure status options, and manage actions associated with the stage.

#### Props
```typescript
type EditWorkflowProps = {
  stage: {
    id: string;
    label: string;
    description?: string;
    actions?: {
      id: string;
      action_type: string;
      [key: string]: any;
    }[];
    statusOptions?: string[];
    color: string;
  };
  templateSet: TemplateSet;
  onUpdate: (
    id: string,
    label: string,
    description: string,
    statusOptions: string[],
    actions: any[]
  ) => void;
};
```

#### Key Features
- **Stage Information Editing**: Title and description modification
- **Status Options Management**: Multi-select dropdown for stage status options
- **Action Configuration**: Support for multiple action types with specialized forms
- **WhatsApp Enhanced Features**: 
  - Executor selection (Recruiter/Company)
  - Delay minutes configuration
- **Template Integration**: Integration with various template configurations

#### State Management
- `label`: Current stage title
- `description`: Stage description
- `selectedStatuses`: Array of selected status options
- `actions`: Array of configured actions for the stage
- `dropdownOpen`: Controls action dropdown visibility
- `modalOpen`: Controls success modal visibility

#### Action Types Supported
- Email
- Agente de voz (Voice Agent)
- WhatsApp (with enhanced configuration)
- Agente de WhatsApp (WhatsApp Agent)
- Formulario (Form)

#### WhatsApp Action Configuration
When "WhatsApp" is selected as an action type, the component displays additional fields:

1. **Executor Dropdown**
   - Options: "Recruiter" or "Company"
   - Default: "Recruiter"
   - Purpose: Specifies who will execute the WhatsApp action

2. **Delay Minutes Input**
   - Type: Number input
   - Minimum: 0
   - Default: 0
   - Purpose: Sets delay before WhatsApp message execution

#### Key Functions

##### `addAction(actionType: string)`
Creates a new action with the specified type and adds WhatsApp-specific fields if needed:
```typescript
const addAction = (actionType: string) => {
  const templateKey = getTemplateKey(actionType);
  const newAction = {
    id: `${Date.now()}`,
    action_type: actionType,
    [templateKey]: "",
  };

  // Add WhatsApp-specific fields
  if (actionType === "WhatsApp") {
    newAction.executor = "Recruiter";
    newAction.delay_minutes = 0;
  }

  setActions((prev) => [...prev, newAction]);
};
```

##### `removeAction(index: number)`
Removes an action from the actions array at the specified index.

##### `handleSave()`
Saves the current stage configuration and triggers the parent update callback.

#### UI Structure
- **Sheet Modal**: Left-side sliding modal for stage editing
- **Form Fields**: Title and description inputs
- **Status Selection**: Multi-select component for status options
- **Actions Management**: Accordion-based action list with configuration forms
- **WhatsApp Fields**: Conditional rendering of executor and delay fields

### 2. AddNewStage Component

**File**: `/src/app/workflow/[id]/components/AddNewStage.tsx`

#### Purpose
The AddNewStage component provides a modal interface for creating new workflow stages. It includes all the functionality of EditWorkflow but starts with empty values and creates new stages rather than editing existing ones.

#### Props
```typescript
type AddNewStageProps = {
  onAddStage: (newStage: any) => void;
  existingStages: any[];
  templateSet: TemplateSet;
};
```

#### Key Features
- **New Stage Creation**: Creates stages with unique IDs and proper ordering
- **Auto-coloring**: Automatically assigns colors based on existing stages
- **View Management**: Automatic zoom and focus on newly created stages
- **Same Action Support**: Identical action configuration as EditWorkflow
- **WhatsApp Enhanced Features**: Same executor and delay configuration

#### State Management
- `label`: New stage title
- `description`: New stage description
- `selectedStatuses`: Array of selected status options
- `actions`: Array of configured actions
- `dropdownOpen`: Controls action dropdown visibility
- `open`: Controls modal visibility

#### Key Functions

##### `addAction(actionType: string)`
Identical to EditWorkflow implementation, creates new actions with WhatsApp-specific fields when needed.

##### `removeAction(index: number)`
Removes an action from the actions array.

##### `handleSave()`
Creates a new stage object and triggers parent callback:
```typescript
const handleSave = () => {
  const nextColor = nodeColors[existingStages.length % nodeColors.length];
  const newStage = {
    id: `${Date.now()}`,
    name: label,
    description,
    order: existingStages.length,
    actions,
    status_options: selectedStatuses,
    next_possible_stages: [],
    color: nextColor,
  };

  onAddStage(newStage);
  // Reset form and close modal
  // Auto-zoom to new stage
};
```

#### Auto-Focus Feature
After creating a new stage, the component automatically:
1. Zooms to 1.5x magnification
2. Focuses on the newly created stage
3. Applies smooth animation (800ms duration)

## Shared Constants and Utilities

### Status Options
```typescript
const STATUS_OPTIONS = [
  "Activo",
  "Inactivo", 
  "Paso Inicial",
  "🤖 Piloto Automatico Heimdall",
  "🚗 Piloto Automatico Agente",
  "En Proceso",
  "Rechazado",
];
```

### Action Options
```typescript
const ACTION_OPTIONS = [
  "Email",
  "Agente de voz",
  "WhatsApp",
  "Agente de WhatsApp", 
  "Formulario",
];
```

### Action Configuration Mapping
```typescript
const ACTION_CONFIGS: Record<string, {
  label: string;
  Form?: React.FC<{
    action: any;
    onChange: (updatedAction: any) => void;
    templateSet?: TemplateSet;
  }>;
}> = {
  "Agente de WhatsApp": {
    label: "Agente de WhatsApp",
    Form: WhatsappAgentConfig,
  },
  WhatsApp: {
    label: "WhatsApp",
    Form: WhatsappTemplateConfig,
  },
  // ... other configurations
};
```

### Template Key Mapping
```typescript
function getTemplateKey(actionType: string): string {
  switch (actionType) {
    case "Agente de voz":
      return "call_template_id";
    case "Email":
      return "email_template_id";
    case "WhatsApp":
      return "whatsapp_template_id";
    case "Agente de WhatsApp":
      return "whatsapp_agent_template_id";
    case "Formulario":
      return "scoreboard_template_id";
    default:
      return "template_id";
  }
}
```

## WhatsApp Action Data Structure

When a WhatsApp action is created, it includes the following structure:
```typescript
{
  id: string;                    // Unique identifier
  action_type: "WhatsApp";      // Action type
  whatsapp_template_id: string; // Template reference
  executor: "Recruiter" | "Company"; // Who executes the action
  delay_minutes: number;        // Delay before execution
  // ... other template-specific fields
}
```

## Dependencies

### UI Components
- `@/components/ui/sheet` - Modal sheets
- `@/components/ui/accordion` - Collapsible action lists
- `@/components/ui/button` - Interactive buttons
- `@/components/ui/input` - Form inputs
- `@/components/ui/textarea` - Multi-line text inputs
- `@/components/ui/dropdown-menu` - Action selection dropdowns
- `@/components/ui/select` - Executor selection
- `@/components/ui/multiselect` - Status selection
- `@/components/ui/separator` - Visual separators

### External Libraries
- `lucide-react` - Icons (PlusIcon, ChevronDown, Trash2)
- `@xyflow/react` - Flow diagram management
- `next-intl` - Internationalization

### Template Components
- `WhatsappAgentConfig` - WhatsApp agent configuration form
- `WhatsappTemplateConfig` - WhatsApp template configuration form
- `ScoreboardTemplateConfig` - Form configuration
- `EmailTemplateConfig` - Email configuration form
- `CallTemplateConfig` - Call configuration form

## Internationalization

Both components support internationalization through the `next-intl` library. Translation keys are namespaced under:
- `WorkflowDetails.EditStage` for EditWorkflow
- `WorkflowDetails.AddNewStage` for AddNewStage

### Key Translation Keys
- `editStage` / `buttonAddStage` - Button text
- `titleLabel` / `titlePlaceholder` - Stage title
- `descriptionLabel` / `descriptionPlaceholder` - Stage description
- `statusesLabel` / `statusesPlaceholder` - Status options
- `actionsLabel` / `addAction` - Action management
- `cancel` / `saveChanges` / `createStage` - Action buttons

## Usage Examples

### Adding a WhatsApp Action
1. Click "Add Action" button
2. Select "WhatsApp" from dropdown
3. Action accordion item appears with:
   - Executor dropdown (defaults to "Recruiter")
   - Delay minutes input (defaults to 0)
   - Template configuration form
4. Configure as needed and save

### Editing Existing WhatsApp Action
1. Open stage edit modal
2. Expand WhatsApp action accordion
3. Modify executor or delay settings
4. Update template configuration
5. Save changes

## Error Handling

- Input validation for delay minutes (minimum 0)
- Proper type checking for action configurations
- Safe parsing of numeric inputs with fallback to 0
- Graceful handling of missing template configurations

## Performance Considerations

- Actions are managed in component state for immediate UI updates
- Template configurations are passed down to avoid prop drilling
- Accordion pattern reduces DOM complexity for large action lists
- Conditional rendering minimizes unnecessary re-renders

## Future Enhancements

Potential areas for improvement:
1. **Validation**: Add form validation for required fields
2. **Templates**: Dynamic template loading based on action type
3. **Bulk Actions**: Support for bulk action operations
4. **Drag & Drop**: Reordering of actions within stages
5. **Custom Fields**: Dynamic field addition for action types
6. **Presets**: Save and load action configuration presets