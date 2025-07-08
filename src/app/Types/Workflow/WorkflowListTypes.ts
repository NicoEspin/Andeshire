

export interface WorkflowRecruiter {
  id: string;
  name: string;
}

export interface WorkflowAction {
  id: string;
  action_type: string;
  delay_minutes: number;
  is_active: boolean | null;
  email_template?: {
    id: string;
    subject: string;
  };
  whatsapp_template?: {
    id: string;
    name: string;
  };
}

export interface WorkflowStage {
  id: string;
  name: string;
  description: string | null;
  tags: string[];
  order: number;
  actions: WorkflowAction[];
  next_possible_stages: {
    id: string;
    name: string;
    order: number;
  }[];
}

export interface WorkflowItem {
  id: string;
  name: string;
  created_at: string;
  recruiter: WorkflowRecruiter;
  stages: WorkflowStage[];
}

export interface WorkflowListPagination {
  total_items: number;
  total_pages: number;
  current_page: number;
  items_per_page: number;
  has_next: boolean | null;
  has_previous: boolean | null;
}

export interface WorkflowListResponse {
  workflows: WorkflowItem[];
  pagination: WorkflowListPagination;
}
