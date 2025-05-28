import createProjectsUrlstring from "./createProjectsUrlstring";

const getProjects = async (params: URLSearchParams | null = null) => {

  const urlString = createProjectsUrlstring(params)

  try {
    const res = await fetch(urlString);
    const projectData = await res.json();
    return projectData;
  } catch (error) {
    return null
  }

};

export default getProjects