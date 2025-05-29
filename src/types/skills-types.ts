export interface SkillsList {
  createdAt: string;
  updatedAt: string;
  title: string;
  skillIcon: string;
  id: string;
}

export interface GetSkillsReturn {
  isError: boolean;
  skillsList: SkillsList[];
}
