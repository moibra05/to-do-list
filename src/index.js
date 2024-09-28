if(localStorage.getItem("allToDos")){
  console.log("loading...");
  toDoHandler.loadToDos();
}


import "./styles.css"
import { toDoHandler } from "./manageToDo"
import { mainPage } from "./homepage"
import { toDoSections } from "./toDoSections"