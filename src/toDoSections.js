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

  function createProject(name){
    const newProject = taskGroupConstructor(name);
    allSections.projects.push(newProject);
  }

  return {
    allSections,
    createProject
  }

})();

