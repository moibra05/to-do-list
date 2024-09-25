import { DOMModule } from "./domModule"
import { toDoSections } from "./toDoSections"
import { isToday } from "date-fns";
import { dialogHandler } from "./dialogHandler";



const toDoHandler = (function () {
  dialogHandler.initEventHandlers("new-task-form", newTaskConfirm);

  function newTaskConfirm(formData) {
    const newToDoObj = Object.fromEntries(formData.entries());
    const newToDo = toDo(newToDoObj["title"], newToDoObj["description"], newToDoObj["due-date"], newToDoObj["priority"]);
    appendToDoNode(newToDo);
  }

  function toDo(title, description, dueDate, priority, isCompleted = false) {
    return {
      title, 
      description, 
      dueDate, 
      priority,
      isCompleted,
      id: Date.now(),
    }
  }

  function createToDoNode(toDoInstance) {
    const toDoCheckbox = DOMModule.createNode("input");
    const toDoNode = DOMModule.createNode("li");
    const toDoTitle = DOMModule.createNode("h2");
    const toDoTextContainer = DOMModule.createNode("div");
    const infoButton = DOMModule.createNode("button");
    const toDoDescription = DOMModule.createNode("p");
    const toDoDueDate = DOMModule.createNode("p");
    const priority = toDoInstance.priority;

    DOMModule.setAttribute(toDoCheckbox, "type", "checkbox");
    DOMModule.toggleClass(toDoNode, "to-do");
    DOMModule.toggleClass(infoButton, "show-task-info");
    DOMModule.setAttribute(infoButton, "id", `show-task-${toDoInstance.id}-info`)

    DOMModule.updateTextContent(toDoTitle, toDoInstance.title);
    DOMModule.updateTextContent(toDoDescription, toDoInstance.description);
    DOMModule.updateTextContent(toDoDueDate, toDoInstance.dueDate);

    DOMModule.updateTextContent(infoButton, "i");

    DOMModule.appendChild(toDoTextContainer, toDoTitle);
    DOMModule.appendChild(toDoTextContainer, toDoDescription);
    DOMModule.appendChild(toDoTextContainer, toDoDueDate);
    DOMModule.appendChild(toDoNode, toDoCheckbox);
    DOMModule.appendChild(toDoNode, toDoTextContainer);
    DOMModule.appendChild(toDoNode, infoButton);

    if(priority === "High"){
      DOMModule.toggleClass(toDoNode, "high-priority");
    }
    else if(priority === "Medium"){
      DOMModule.toggleClass(toDoNode, "mid-priority");
    }
    else if(priority === "Low"){
      DOMModule.toggleClass(toDoNode, "low-priority");
    }

    return toDoNode;
  }

  function createToDoInfoDialog(container, toDoInstance) {
    const taskInfoDialogHeader = DOMModule.createNode("div");
    const toDoTitle = container.children[1].cloneNode(true);
    const taskInfoDialog = DOMModule.createNode("dialog");
    const closeDialogButton = DOMModule.createNode("button");

    DOMModule.updateTextContent(closeDialogButton, "✕");

    DOMModule.setAttribute(taskInfoDialogHeader, "class", "task-form-header");
    DOMModule.setAttribute(taskInfoDialog, "id", `task-${toDoInstance.id}-info`);
    DOMModule.setAttribute(closeDialogButton, "id", `cancel-task-${toDoInstance.id}-info`);

    DOMModule.toggleClass(closeDialogButton, "x-button");

    DOMModule.appendChild(taskInfoDialogHeader, toDoTitle);
    DOMModule.appendChild(taskInfoDialogHeader, closeDialogButton);
    DOMModule.appendChild(taskInfoDialog, taskInfoDialogHeader);
    DOMModule.appendChild(container, taskInfoDialog);

    dialogHandler.initEventHandlers(`task-${toDoInstance.id}-info`);
  }

  function appendToDoNode(toDoInstance) {
    const toDoNode = createToDoNode(toDoInstance);
    const container = DOMModule.querySelector(".all-to-dos");
    DOMModule.appendChild(container, toDoNode);
    createToDoInfoDialog(toDoNode, toDoInstance);
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