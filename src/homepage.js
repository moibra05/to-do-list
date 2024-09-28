import { DOMModule } from "./domModule";
import { format } from "date-fns";
import { mediaQuery } from "./mediaQueries";
import { toDoSections } from "./toDoSections";
import { toDoHandler } from "./manageToDo";


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
      DOMModule.toggleClass(sideBarDOM, "show");
    }

    DOMModule.addEventListener(hamburgerDOM, "click", toggleSideBar);
    DOMModule.addEventListener(closeSideBarDOM, "click", toggleSideBar);
  })();

  // Handles header change for desktop displays
  const desktopQuery = mediaQuery.createMediaQuery("min-width: 1600px");
  function handleDesktopChange(e){
    const welcomeText = DOMModule.querySelector(".welcome-text");
    if(e.matches) {
      const header = DOMModule.querySelector("header");
      DOMModule.appendChild(header, welcomeText);
    }
    else {
      const main = DOMModule.querySelector("main");
      main.insertBefore(welcomeText, main.firstChild);
    }
  }
  mediaQuery.createMediaQueryHandler(desktopQuery, handleDesktopChange);


  function refershToDos(){
    DOMModule.deleteAllChildren(".all-to-dos");
  }

  function displayToDos(section) {
    refershToDos();
    if(toDoSections.allSections[section] === undefined){
      // Checks toDo category within the projects
      let allToDos = JSON.parse(localStorage.getItem("allToDos"));
      toDoSections.allSections = allToDos;
      const targetSection = toDoSections.allSections["projects"][section];
      for(const task of targetSection.tasks){
        toDoHandler.appendToDoNode(task);
      }
    }
    else {
      const targetSection = toDoSections.allSections[section];
      for(const task of targetSection){
        toDoHandler.appendToDoNode(task);
      }
    }

  }

  return {
    displayToDos,
  }
})();

