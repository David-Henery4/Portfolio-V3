import type { GetSkillsReturn, SkillsList } from "src/types/skills-types";


const getSkills = async (): Promise<GetSkillsReturn> => {
  try {
    
    const res = await fetch(
      `${import.meta.env.CMS_URL}/api/skills-list?pagination=false&sort=order`
    );
    
    const { docs } = await res.json();
    const skillsList: SkillsList[] = docs;
    
    return {
      isError: false,
      skillsList
    }
    
  } catch (error) {
    
    return {
      isError: true,
      skillsList: [],
    };
    
  }
  
}

export default getSkills