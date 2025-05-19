const resetBtn = document.getElementById("reset-btn") as HTMLButtonElement;
const paginationContainer = document.getElementById(
  "pagination-container"
) as HTMLDivElement;

const filtersAndPillContainer = document?.querySelectorAll(".filters");
import { navigate } from "astro:transitions/client";

filtersAndPillContainer.forEach((ele) =>
  ele?.addEventListener("click", (e) => {
    const EVtarget = e.target as HTMLElement;
    const btnElement = EVtarget.closest("button");

    if (btnElement && btnElement.dataset?.category) {
      const params = new URLSearchParams(window.location.search);

      if (params.has("page")) {
        params.delete("page");
      }

      const newUrl = createQueryString(
        "name",
        btnElement.dataset?.category,
        params
      );
      // window.history.pushState({}, "", `?${newUrl}`);
      navigate(`/projects${newUrl}`);
    }
  })
);

const createQueryString = (
  key: string,
  value: string,
  params: URLSearchParams
) => {
  const previousValues = params.get(key);
  const combinedValues = `${previousValues},${value}`;

  if (!previousValues) {
    params.set(key, value);
    return `?${params.toString()}`;
  }

  if (
    previousValues.includes(value) &&
    previousValues.split(",").includes(value)
  ) {
    const combinedValueArray = combinedValues
      .split(",")
      .filter((item) => item !== value);

    if (!combinedValueArray.length) {
      params.delete(key);
      return `${params.toString()}`;
    }

    params.set(key, combinedValueArray.join(","));
    return `?${params.toString()}`;
  }

  params.set(key, combinedValues);
  return `?${params.toString()}`;
};

resetBtn?.addEventListener("click", () => {
  if (window.location.search.length <= 0) return;
  new URLSearchParams(window.location.search).delete("name");
  navigate(`/projects`);
});

// Pagination
paginationContainer.addEventListener("click", (ev) => {
  const evTarget = ev.target as HTMLElement;
  const btnElement = evTarget.closest("button");
  if (btnElement && btnElement.dataset?.pagenum) {
    // console.log(btnElement);
    const newUrl = createQueryString(
      "page",
      btnElement.dataset?.pagenum,
      new URLSearchParams(window.location.search)
    );
    // console.log(newUrl)
    navigate(`/projects${newUrl}`);
  }
});
