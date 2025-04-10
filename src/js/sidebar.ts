const burgerElement = document.querySelector("#burger");
const crossElement = document.querySelector("#cross");
const logoElement = document.querySelector("#logo");
//
const linkContainerElement = document.querySelector("#links-container");
//
const sidebarElement = document.querySelector("#sidebar");
//
let isSidebarOpen = false;

function toggleSidebar() {
  isSidebarOpen = !isSidebarOpen;
  //
  const expanded = burgerElement?.getAttribute("aria-expanded") === "true";
  burgerElement?.setAttribute("aria-expanded", `${!expanded}`);
  //
  if (isSidebarOpen) {
    sidebarElement?.classList.replace("invisible", "visible");
    sidebarElement?.classList.replace("-translate-x-full", "-translate-x-0");
  } else {
    sidebarElement?.classList.replace("-translate-x-0", "-translate-x-full");
    sidebarElement?.classList.replace("visible", "invisible");
  }
}

linkContainerElement?.addEventListener("click", (e) => {
  const target = e.target;
  if (target instanceof HTMLElement === false) return;
  if (!target.closest(".link-item")) return;
  toggleSidebar();
});

burgerElement?.addEventListener("click", (e) => {
  toggleSidebar();
});

crossElement?.addEventListener("click", (e) => {
  toggleSidebar();
});

logoElement?.addEventListener("click", (e) => {
  toggleSidebar();
});
