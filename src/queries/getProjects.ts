// import type { ProjectType } from "src/types/projects-types";
import createProjectsUrlstring from "./createProjectsUrlstring";

const getProjects = async (params: URLSearchParams | null = null) => {

  const urlString = createProjectsUrlstring(params)

  const res = await fetch(urlString);
  const projectData = await res.json();
  // const projectData: ProjectType[] = docs;
  return projectData;
};

export default getProjects