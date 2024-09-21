import "./styles.css"
import { toDo, toDoHandler } from "./manageToDo.js"
import { mainPage } from "./homepage.js"
import { newToDoForm } from "./newToDo.js";


const egToDo = toDo("finish todo list project", "complete the odin project", "today", "high", 0);

toDoHandler.appendToDoNode(egToDo);

const egToDo2 = toDo("finish todo list project", "complete the odin project", "today", "high", 0);

toDoHandler.appendToDoNode(egToDo2);

