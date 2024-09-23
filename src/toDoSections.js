import { DOMModule } from "./domModule";


export const toDoSections = (function () {
  function taskGroupConstructor(name) {
    const tasks = [];
    return {
      name,
      tasks
    }
  }

  const allSections = {
    all: taskGroupConstructor("all"), 
    today: taskGroupConstructor("today"), 
    scheduled: taskGroupConstructor("scheduled"),
    completed: taskGroupConstructor("completed"), 
    projects: []
  };

  function createProjectDOM(name) {
    const newProjectButton = DOMModule.createNode("button");
    const allProjectsDOM = DOMModule.querySelector("#all-projects");
    console.log("hi");
    DOMModule.updateTextContent(newProjectButton, name);
    DOMModule.toggleClass(newProjectButton, "to-do-group-button");
    DOMModule.appendChild(allProjectsDOM, newProjectButton);
  }

  function createProject(name){
    const newProject = taskGroupConstructor(name);
    allSections.projects.push(newProject);
    createProjectDOM(name);
  }

  return {
    allSections,
    createProject
  }

})();

