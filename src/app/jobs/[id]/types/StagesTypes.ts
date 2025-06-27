// src/types/StageTypes.ts

export interface Stage {
  id: string;
  name: string;
  order: number;
  status_options: string[]; // Actualmente vacío, pero si cambia a objetos, se ajusta
  next_possible_stages: NextStage[];
  template_id: string;
  candidates_count: number;
  candidates: Candidate[];
}

export interface NextStage {
  id: string;
  name: string;
  order: number;
  status_options: string[]; // igual que arriba, por ahora es un array vacío
}

export interface Candidate {
  id: string;
  name: string;
}
