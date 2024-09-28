import { DOMModule } from "./domModule";
import { mainPage } from "./homepage";
import { dialogHandler } from "./dialogHandler";


export const toDoSections = (function () {
  let currentTaskGroup = "All tasks";
  let displayTaskGroup = currentTaskGroup;
  dialogHandler.initEventHandlers("new-project-form", newProjectConfirm);

  function newProjectConfirm(formData) {
    const newProjectObj = Object.fromEntries(formData.entries());
    createProject(newProjectObj["projName"]);
  }

  function taskGroupConstructor(name) {
    const tasks = [];
    return {
      name,
      tasks
    }
  }

  const allSections = {
    "All tasks": [], 
    "Today": [], 
    "Scheduled": [],
    "Completed": [], 
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
      const toDoSection = event.target.textContent;
      displayTaskGroup = toDoSection;
      displaySectionHeaderText();
      if(allSections["projects"][toDoSection]){
        currentTaskGroup = toDoSection;
      }
      else {
        currentTaskGroup = "All tasks"
      }
      mainPage.displayToDos(toDoSection);
    }
  }

  function displaySectionHeaderText() {
    const sectionTitleDOM = DOMModule.querySelector("#todo-section-title");
    sectionTitleDOM.textContent = displayTaskGroup;
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

