import { stringify } from "qs-esm";
import type { FiltersList } from "../types/projects-types";

interface GetFiltersReturn {
  isError: boolean;
  uniqueTags: string[];
}

const getFilters = async (): Promise<GetFiltersReturn> => {
  try {
    const stringifiedQuery = stringify(
      {
        select: {
          tags: true,
        },
      },
      {
        addQueryPrefix: true,
      }
    );

    const res = await fetch(
      `${import.meta.env.CMS_URL}/api/projects${stringifiedQuery}`
    );
    const { docs } = await res.json();
    const projectData: FiltersList[] = docs;

    let allTags: string[] = [];

    projectData.forEach((project) => {
      project.tags.forEach((tag) => {
        allTags = [...allTags, tag.category];
      });
    });

    const uniqueTags = [...new Set(allTags)];

    return {
      isError: false,
      uniqueTags,
    };
  } catch (error) {
    return {
      isError: true,
      uniqueTags: [],
    };
  }
};

export default getFilters;
