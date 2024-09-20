import "./styles.css"
import { toDo, toDoHandler, newToDoForm } from "./manageToDo.js"
import { mainPage } from "./homepage.js"


const egToDo = toDo("finish todo list project", "complete the odin project", "today", "high", 0);
const toDoNode = toDoHandler.createToDoNode(egToDo);

toDoHandler.appendToDoNode(toDoNode);

const egToDo2 = toDo("finish todo list project", "complete the odin project", "today", "high", 0);
const toDoNode2 = toDoHandler.createToDoNode(egToDo2);

toDoHandler.appendToDoNode(toDoNode2);

toDoHandler.prepareHandlers();