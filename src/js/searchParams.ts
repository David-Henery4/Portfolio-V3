const filtersAndPillContainer = document.querySelector(".filters") as HTMLDivElement;


filtersAndPillContainer?.addEventListener("click", (e) => {
  const EVtarget = e.target as HTMLElement
  const btnElement = EVtarget.closest("button");
  if (btnElement && btnElement.dataset?.category) {
    btnElement.dataset?.category;
    console.log("Category", btnElement.dataset.category);
    const newUrl = createQueryString("name", btnElement.dataset?.category);
    console.log("newUrl: ", newUrl);
    history.pushState({}, "", `?${newUrl}`)
  }
});

const createQueryString = (key: string, value: string) => {
  const currentParams = window.location.search
  console.log("CurrentParams: ", currentParams)
  const params = new URLSearchParams(currentParams);
  console.log("Params: ", params);
  const previousValues = params.get(key);
  const combinedValues = `${previousValues},${value}`;
  console.log("CombinedValues", combinedValues)
  if (!previousValues) {
    params.set(key, value);
    console.log("called: ", params.toString())
    return params.toString();
  }
  if (previousValues.includes(value)) {
    const combinedValueArray = combinedValues
      .split(",")
      .filter((item) => item !== value);
    console.log("combinedArray:", combinedValueArray);
    if (combinedValueArray.length) {
      params.delete(key);
      return params.toString();
    }
    params.set(key, combinedValues);
    return params.toString();
  }
  params.set(key, combinedValues);
  return params.toString();
};