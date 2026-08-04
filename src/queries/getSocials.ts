import type { SocialsList, GetSocialsReturn } from "../types/socials-types";


const getSocials = async (): Promise<GetSocialsReturn> => {
  try {

    const res = await fetch(`${import.meta.env.CMS_URL}/api/links`);
    const { docs } = await res.json();
    
    const socialsList: SocialsList[] = docs;
    
    
    return { isError: false, socialsList };
    
  } catch (error) {
    
    return { isError: true, socialsList: [] };
    
  }
};

export default getSocials