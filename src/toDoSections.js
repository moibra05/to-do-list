import { DOMModule } from "./domModule";
import { mainPage } from "./homepage";


export const toDoSections = (function () {
  let currentTaskGroup = "All tasks";

  function taskGroupConstructor(name) {
    const tasks = [];
    return {
      name,
      tasks
    }
  }

  const allSections = {
    "All tasks": taskGroupConstructor("All tasks"), 
    "Today": taskGroupConstructor("Today"), 
    "Scheduled": taskGroupConstructor("Scheduled"),
    "Completed": taskGroupConstructor("Completed"), 
    projects: {}
  };

  function createProjectDOM(name) {
    const newProjectButton = DOMModule.createNode("button");
    const allProjectsDOM = DOMModule.querySelector("#all-projects");
    DOMModule.updateTextContent(newProjectButton, name);
    DOMModule.toggleClass(newProjectButton, "to-do-group-button");
    DOMModule.appendChild(allProjectsDOM, newProjectButton);
  }

  function createProject(name){
    allSections.projects[name] = taskGroupConstructor(name);
    createProjectDOM(name);
  }
  function getTaskGroup() {
    return currentTaskGroup
  }

  function changeTaskGroup(event) {
    if(event.target.classList.contains("to-do-group-button")){
      if(allSections["projects"][event.target.textContent]){
        currentTaskGroup = event.target.textContent;
      }
      else {
        currentTaskGroup = "All tasks"
      }
      mainPage.displayToDos(event.target.textContent);
    }
  }

  // Using event bubbling on the sidebar to determine which button was pressed
  const sidebarContent = DOMModule.querySelector("#sidebar-content");
  DOMModule.addEventListener(sidebarContent, "click", changeTaskGroup);

  return {
    allSections,
    createProject,
    getTaskGroup
  }

})();

