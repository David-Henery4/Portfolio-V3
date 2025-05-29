

export interface SocialsList {
  createdAt: string;
  updatedAt: string;
  name: string;
  link: string;
  icon: string;
}

export interface GetSocialsReturn {
  socialsList: SocialsList[]
  isError: boolean;
}