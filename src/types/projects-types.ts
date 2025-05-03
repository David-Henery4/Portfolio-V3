export interface ProjectType {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  alt: string;
  projectImage: {
    id: string;
    createdAt: string;
    updatedAt: string;
    alt: string;
    filename: string;
    mimeType: string;
    filesize: number;
    width: number;
    height: number;
    focalX: number;
    focalY: number;
    url: string;
    thumbnailURL: string | null;
  };
  projectUrl: string;
  projectRepo: string;
  tags: {
    category: string;
    id: string;
  }[];
}
