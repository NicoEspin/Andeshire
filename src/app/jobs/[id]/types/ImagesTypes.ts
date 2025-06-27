export interface Image {
  id: string;
  image_url: string;
  prompt: string;
  model: string;
  size: string;
  quality: string;
  created_at: string;
}

export interface JobImages {
  job_id: string;
  images: Image[];
}
