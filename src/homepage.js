import { DOMModule } from "./domModule";


export const mainPage = (function (){

  const hamburger = (function (){
    const hamburgerDOM = DOMModule.querySelector(".hamburger");
    DOMModule.addEventListener(hamburgerDOM, "click", () => {
      DOMModule.toggleClass(sideBar.sideBarDOM, "show");
    })
  })();
  
  const sideBar = (function (){
    const sideBarDOM = DOMModule.querySelector("aside");
    return {
      sideBarDOM
    }
  })();

})();

