import { stringify } from "qs-esm";
// import type { ProjectType } from "src/types/projects-types";

const getProjects = async (queries?: string[], isFiltered: boolean = false) => {

  if (isFiltered){
    const stringifiedQuery = stringify(
      {
        where: {
          "tags.category": {
            in: queries,
          }
        },
      },
      {
        addQueryPrefix: true
      }
    )
    const res = await fetch(`http://localhost:8000/api/projects${stringifiedQuery}`);
    const projectData = await res.json();
    // const projectData: ProjectType[] = docs;
    return projectData
  }
  
  const res = await fetch("http://localhost:8000/api/projects");
  const projectData = await res.json();
  // const projectData: ProjectType[] = docs;
  return projectData;
}

export default getProjects