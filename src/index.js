import "./styles.css"
import { toDoHandler } from "./manageToDo"
import { mainPage } from "./homepage"
import { newToDoForm } from "./newToDo";
// import { newProjectHandler } from "./newProject";
import { toDoSections } from "./toDoSections"


function displayToDos(section) {
  if(!toDoSections.allSections.includes(section)){
    // Checks toDo category within the projects
    const targetSecton = toDoSections.allSections[projects][section]
  }
  else {
    const targetSection = toDoSections.allSections[section];
  }
}





const egToDo = toDoHandler.toDo("finish todo list project", "complete the odin project", "today", "high");

toDoHandler.appendToDoNode(egToDo);

const egToDo2 = toDoHandler.toDo("finish todo list project", "complete the odin project", "today", "high");

toDoHandler.appendToDoNode(egToDo2);

