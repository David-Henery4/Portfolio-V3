// document.body.insertAdjacentHTML(
//   "afterbegin",
//   `<div style="
//     position:fixed;
//     top:0;
//     left:0;
//     z-index:99999;
//     background:red;
//     color:white;
//     padding:20px;
//   ">SCRIPT LOADED</div>`,
// );

const resetBtn = document.getElementById("reset-btn") as HTMLButtonElement;
const paginationContainer = document.getElementById(
  "pagination-container",
) as HTMLDivElement;
// import { navigate } from "astro:transitions/client";

const filtersAndPillContainer = document?.querySelectorAll(".filters");

// const dropdownFilters = document?.querySelectorAll(".dropdown-filter")

filtersAndPillContainer.forEach((ele) =>
  ele?.addEventListener("click", (e) => {
    const EVtarget = e.target as HTMLElement;
    const btnElement = EVtarget.closest(".filter")! as HTMLElement;

    if (btnElement && btnElement.dataset?.category) {
      const params = new URLSearchParams(window.location.search);

      if (params.has("page")) {
        params.delete("page");
      }

      const newUrl = createQueryString(
        "name",
        btnElement.dataset?.category,
        params,
      );
      // window.history.pushState({}, "", `?${newUrl}`);
      // navigate(`/projects${newUrl}`);
      navigation.navigate(`/projects${newUrl}`);
    }
  }),
);

const createQueryString = (
  key: string,
  value: string,
  params: URLSearchParams,
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
  navigation.navigate(`/projects`);
  // navigate(`/projects`);
});

// Pagination
paginationContainer?.addEventListener("click", (ev) => {
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<div style="
      position:fixed;
      top:0;
      left:0;
      z-index:99999;
      background:green;
      color:white;
      padding:20px;
    ">CLICK HANDLER WORKS</div>`,
  );
  const evTarget = ev.target as HTMLElement;
  const btnElement = evTarget.closest("button");
  if (btnElement && btnElement.dataset?.pagenum) {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("page", btnElement.dataset?.pagenum);
    const newUrl = `?${currentParams.toString()}`;
    navigation.navigate(`/projects${newUrl}`);
    // navigate(`/projects${newUrl}`);
  }
});
