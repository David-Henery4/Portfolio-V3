const resetBtn = document.getElementById("reset-btn") as HTMLButtonElement;
const paginationContainer = document.getElementById(
  "pagination-container",
) as HTMLDivElement;

const filtersAndPillContainer = document?.querySelectorAll(".filters");

// const dropdownFilters = document?.querySelectorAll(".dropdown-filter")

/**
 * @param string
 * Takes a URL String and uses the Navigation API
 * If the Navigation API isn't available, use the location href as fallback.
 */
const navigateAPIFallback = (url: string) => {
  if (window.navigation) {
    window.navigation.navigate(url);
    return;
  }

  window.location.href = url;
};

// WAS HERE SOLING THE ISSUE OF THE SELECT NOT INITIALISING THE FILTER FUNCTIONALITY.
// PROBERLY GOING TO HAVE TO USE THE "CHANGE" EVENT ON THE SELECT.

const debug = (message: string) => {
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<div style="
      position:fixed;
      top:${document.querySelectorAll("[data-debug]").length * 30}px;
      left:0;
      z-index:99999;
      background:red;
      color:white;
      padding:5px;
    " data-debug>${message}</div>`,
  );
};

filtersAndPillContainer.forEach((ele) => {
  // if (ele instanceof HTMLSelectElement) {
  //   ele.addEventListener("change", (e) => {
  //     const params = new URLSearchParams(window.location.search);
  //     console.log("Params:", params);
  //     const EVtarget = e.target as HTMLSelectElement;

  //     // console.log(Array.from(EVtarget.selectedOptions));
  //     // `?${params.toString()}`
  //     // `/projects?${params.toString()}`
  //     // console.log(`/projects${params.toString()}`);

  //     // let selectedFilterValues = ""
  //     let selectedFilterValues: string[] = []

  //     // console.log(Array.from(EVtarget));

  //     Array.from(EVtarget).map((option) => {
  //       console.log("called")
  //       option.addEventListener("click", (item) => {
  //         console.log("called: 2")
  //         console.log(item)
  //       })
  //     })

  //     // Array.from(EVtarget.selectedOptions).map((selectedOption) => {
  //       // selectedFilterValues.push(selectedOption.value);
  //       // selectedFilterValues = selectedOption.value;
  //     // });

  //     console.log(selectedFilterValues);

  //     // const newUrl = createQueryString(
  //     //   "name",
  //     //   selectedFilterValues,
  //     //   params,
  //     // );

  //     // console.log(newUrl)

  //     // navigateAPIFallback(`/projects${newUrl}`);
  //   });
  //   return;
  // }

  ele?.addEventListener("click", (e) => {

    
    const EVtarget = e.target as HTMLElement;
    const btnElement = EVtarget.closest(".filter")! as HTMLElement;
    
    if (btnElement && btnElement.dataset?.category) {
      const params = new URLSearchParams(window.location.search);
      debug("Filter clicked")

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
      // navigation.navigate(`/projects${newUrl}`);
      navigateAPIFallback(`/projects${newUrl}`);
    }
  });
});

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
  // navigation.navigate(`/projects`);
  // navigate(`/projects`);
  navigateAPIFallback(`/projects`);
});

// Pagination
paginationContainer?.addEventListener("click", (ev) => {
  const evTarget = ev.target as HTMLElement;
  const btnElement = evTarget.closest("button");
  if (btnElement && btnElement.dataset?.pagenum) {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("page", btnElement.dataset?.pagenum);
    const newUrl = `?${currentParams.toString()}`;
    // navigation.navigate(`/projects${newUrl}`);
    // navigate(`/projects${newUrl}`);
    navigateAPIFallback(`/projects${newUrl}`);
  }
});
