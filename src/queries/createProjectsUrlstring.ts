import { stringify } from "qs-esm";

const createProjectsUrlstring = (params: URLSearchParams | null = null) => {
  
  const baseUrl = "http://localhost:8000/api/projects";
  
  if (params){
    
    const hasPageQuery = params.has("page")
    const hasFilterQuery = params.has("name");
    
    
    if (hasFilterQuery && hasPageQuery) {
      const pageQuery = params.get("page");
      const stringifiedQuery = stringify(
        {
          where: {
            "tags.category": {
              in: params.get("name")?.split(","),
            },
          },
        },
        {
          addQueryPrefix: true,
        }
      );
      return `${baseUrl}${stringifiedQuery}&page=${pageQuery}`;
    }
    
    
    if (hasPageQuery){
      const pageQuery = params.get("page");
      return `${baseUrl}?page=${pageQuery}`;
    }
    
    
    if (hasFilterQuery){
      const stringifiedQuery = stringify(
        {
          where: {
            "tags.category": {
              in: params.get("name")?.split(","),
            },
          },
        },
        {
          addQueryPrefix: true,
        }
      );
      return `${baseUrl}${stringifiedQuery}`;
    }
    
    
  }
  
  return baseUrl;
};

export default createProjectsUrlstring;