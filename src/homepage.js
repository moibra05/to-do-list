import { DOMModule } from "./domModule";
import { format } from "date-fns";


export const mainPage = (function (){

  // Renders Date
  const date = DOMModule.querySelector(".date");
  DOMModule.updateTextContent(date, `${format(new Date, "EEEE, d MMM y")}`);
  
  // Enables sidebar functionality
  const sideBar = (function (){
    const sideBarDOM = DOMModule.querySelector("aside");
    const hamburgerDOM = DOMModule.querySelector(".hamburger");
    const closeSideBarDOM = DOMModule.querySelector("#close-sidebar-button");

    function toggleSideBar() {
      DOMModule.toggleClass(sideBar.sideBarDOM, "show");
    }

    DOMModule.addEventListener(hamburgerDOM, "click", toggleSideBar)
    DOMModule.addEventListener(closeSideBarDOM, "click", toggleSideBar)


    return {
      sideBarDOM
    }
  })();



})();

