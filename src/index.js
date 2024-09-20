import "./styles.css"
import { toDo, toDoHandler } from "./manageToDo.js"

const egToDo = toDo("finish todo list project", "complete the odin project", "today", "high", 0);
const toDoNode = toDoHandler.createToDoNode(egToDo);

toDoHandler.appendToDoNode(toDoNode);
