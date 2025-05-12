

const filtersAndPillContainer = document.querySelector(".filters") as HTMLDivElement;
import { navigate } from "astro:transitions/client";


filtersAndPillContainer?.addEventListener("click", (e) => {
  
  const EVtarget = e.target as HTMLElement
  const btnElement = EVtarget.closest("button");
  
  if (btnElement && btnElement.dataset?.category) {
    
    const newUrl = createQueryString("name", btnElement.dataset?.category);
    window.history.pushState({}, "", `?${newUrl}`)
    navigate(`/projects?${newUrl}`)
  }
  
});


const createQueryString = (key: string, value: string) => {
  
  const currentParams = window.location.search
  const params = new URLSearchParams(currentParams);
  const previousValues = params.get(key);
  const combinedValues = `${previousValues},${value}`;
  
  
  if (!previousValues) {
    params.set(key, value);
    console.log("called: ", params.toString())
    return params.toString();
  }
  
  
  if (previousValues.includes(value)) {

    const combinedValueArray = combinedValues
      .split(",")
      .filter((item) => item !== value);
    
    
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

