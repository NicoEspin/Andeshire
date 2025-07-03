export interface RegularComment {
  id: string;
  text: string;
  recruiter: string;
  created_at: string;
  type: "Regular";
}

export interface TechnicalComment {
  id: string;
  comment: string;
  recruiter: string;
  created_at: string;
  type: "Technical";
}

export interface CandidateCommentsResponse {
  status: string;
  data: {
    regular_comments: RegularComment[];
    technical_comments: TechnicalComment[];
  };
}