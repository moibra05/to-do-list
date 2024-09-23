import { DOMModule } from "./domModule"
import { toDoSections } from "./toDoSections"
import { isToday } from "date-fns";



const toDoHandler = (function () {

  function toDo(title, description, dueDate, priority, isCompleted = false) {
    return {
      title, 
      description, 
      dueDate, 
      priority,
      isCompleted
    }
  }

  function createToDoNode(toDoInstance) {
    const toDoCheckbox = DOMModule.createNode("input");
    const toDoNode = DOMModule.createNode("li");
    const toDoTextContainer = DOMModule.createNode("div");
    const toDoTitle = DOMModule.createNode("h2");
    const toDoDescription = DOMModule.createNode("p");
    
    DOMModule.setAttribute(toDoCheckbox, "type", "checkbox");
    DOMModule.toggleClass(toDoNode, "to-do");

    DOMModule.updateTextContent(toDoTitle, toDoInstance.title);
    DOMModule.updateTextContent(toDoDescription, toDoInstance.description);

    DOMModule.appendChild(toDoTextContainer, toDoTitle);
    DOMModule.appendChild(toDoTextContainer, toDoDescription);

    DOMModule.appendChild(toDoNode, toDoCheckbox);
    DOMModule.appendChild(toDoNode, toDoTextContainer);

    return toDoNode;
  }

  function appendToDoNode(toDoInstance) {
    const container = DOMModule.querySelector(".all-to-dos");
    DOMModule.appendChild(container, createToDoNode(toDoInstance));
    addToCategories(toDoInstance);
  }

  function addToCategories(toDoObj) {
    const allToDos = toDoSections.allSections["All tasks"].tasks;
    const scheduledToDos = toDoSections.allSections["Scheduled"].tasks;
    const todayToDos = toDoSections.allSections["Today"].tasks;
    const completedToDos = toDoSections.allSections["Completed"].tasks;
    let currentTaskGroup = toDoSections.getTaskGroup();


    if(!allToDos.includes(toDoObj)){
      allToDos.push(toDoObj);
    }
    if(!scheduledToDos.includes(toDoObj) && toDoObj.dueDate){
      scheduledToDos.push(toDoObj);
    }
    if(!todayToDos.includes(toDoObj) && isToday(new Date(toDoObj.dueDate.replace(/-/g, '\/').replace(/T.+/, '')))){
      todayToDos.push(toDoObj);
    }
    if(!completedToDos.includes(toDoObj) && toDoObj.isCompleted){
      
    }
    if(currentTaskGroup != "All tasks"){
      const projectToDos = toDoSections.allSections["projects"][currentTaskGroup].tasks;
      if(!projectToDos.includes(toDoObj)){
        projectToDos.push(toDoObj); 
      }
    }
    
  }



  return {
    toDo,
    appendToDoNode,
  }
})();

export { toDoHandler }