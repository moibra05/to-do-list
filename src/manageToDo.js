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

  function toDo(title, description, dueDate, priority, isCompleted = false, categories = []) {
    return {
      title, 
      description, 
      dueDate, 
      priority,
      isCompleted,
      categories,
      id: Date.now(),
    }
  }

  function createToDoNode(toDoInstance) {
    const toDoCheckbox = DOMModule.createNode("input");
    const toDoNode = DOMModule.createNode("li");
    const toDoTitle = DOMModule.createNode("h2");
    const toDoTextContainer = DOMModule.createNode("div");
    const toDoButtonContainer = DOMModule.createNode("div");
    const trashButton = DOMModule.createNode("button");
    const infoButton = DOMModule.createNode("button");
    const toDoDescription = DOMModule.createNode("p");
    const toDoDueDate = DOMModule.createNode("p");
    const priority = toDoInstance.priority;

    if(toDoInstance.isCompleted)
      toDoCheckbox.checked = true;

    DOMModule.toggleClass(toDoNode, "to-do");
    DOMModule.toggleClass(infoButton, "show-task-info");
    DOMModule.toggleClass(trashButton, "delete-to-do");
    DOMModule.toggleClass(toDoButtonContainer, "to-do-buttons");
    DOMModule.setAttribute(toDoCheckbox, "type", "checkbox");
    DOMModule.setAttribute(toDoCheckbox, "id", `${toDoInstance.id}-checkbox`);
    DOMModule.setAttribute(trashButton, "id", `${toDoInstance.id}-trash`);
    DOMModule.setAttribute(infoButton, "id", `show-task-${toDoInstance.id}-info`);

    DOMModule.updateTextContent(toDoTitle, toDoInstance.title);
    DOMModule.updateTextContent(toDoDescription, toDoInstance.description);
    DOMModule.updateTextContent(toDoDueDate, toDoInstance.dueDate);
    DOMModule.updateTextContent(infoButton, "i");

    DOMModule.appendChild(toDoTextContainer, toDoTitle);
    DOMModule.appendChild(toDoTextContainer, toDoDescription);
    DOMModule.appendChild(toDoTextContainer, toDoDueDate);
    DOMModule.appendChild(toDoButtonContainer, trashButton);
    DOMModule.appendChild(toDoButtonContainer, infoButton);

    DOMModule.appendChild(toDoNode, toDoCheckbox);
    DOMModule.appendChild(toDoNode, toDoTextContainer);
    DOMModule.appendChild(toDoNode, toDoButtonContainer);

    if(priority != "")
      DOMModule.toggleClass(toDoNode, toDoInstance.priority);

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


  function markTaskCompleted(checkbox, id) {
    const targetObj = toDoSections.allSections["All tasks"].filter((obj) => { return obj.id == id })[0];
    if(checkbox.checked){
      targetObj.isCompleted = true;
      console.log("checked");
      addToCategories(targetObj);
    }
    else{
      targetObj.isCompleted = false;
      console.log("unchecked");
      removeFromCategories(targetObj, ["Completed"]);
    }
  }

  function deleteToDoNode(target, id) {
    const targetObj = toDoSections.allSections["All tasks"].filter((obj) => { return obj.id == id })[0];
    removeFromCategories(targetObj, targetObj.categories);
    DOMModule.remove(target);
  }

  function addToCategories(toDoObj) {
    const allToDos = toDoSections.allSections["All tasks"];
    const scheduledToDos = toDoSections.allSections["Scheduled"];
    const todayToDos = toDoSections.allSections["Today"];
    const completedToDos = toDoSections.allSections["Completed"];
    const currentTaskGroup = toDoSections.getTaskGroup();

    if(!allToDos.includes(toDoObj)){
      toDoObj.categories.push("All tasks");
      allToDos.push(toDoObj);
    }
    if(!scheduledToDos.includes(toDoObj) && toDoObj.dueDate){
      toDoObj.categories.push("Scheduled");
      scheduledToDos.push(toDoObj);
    }
    if(!todayToDos.includes(toDoObj) && isToday(new Date(toDoObj.dueDate.replace(/-/g, '\/').replace(/T.+/, '')))){
      toDoObj.categories.push("Today");
      todayToDos.push(toDoObj);
    }
    if(!completedToDos.includes(toDoObj) && toDoObj.isCompleted){
      toDoObj.categories.push("Completed");
      completedToDos.push(toDoObj);
    }
    if(currentTaskGroup != "All tasks"){
      const projectToDos = toDoSections.allSections["projects"][currentTaskGroup].tasks;
      if(!projectToDos.includes(toDoObj)){
        toDoObj.categories.push(currentTaskGroup);
        projectToDos.push(toDoObj); 
      }
    }
  }

  function removeFromCategories(toDoObj, categories) {
    const clonedCategories = [...categories];
    for(const category of clonedCategories) {
      const taskGroup = toDoSections.allSections[category];
      const localIndex = toDoObj.categories.indexOf(category);
      toDoObj.categories.splice(localIndex, 1);

      // Removes the task from either a project or the main sections
      if(taskGroup == undefined){
        const projectGroup = toDoSections.allSections["projects"][category].tasks;
        const projectIndex = projectGroup.indexOf(toDoObj);
        projectGroup.splice(projectIndex, 1);
      }
      else{
        const sectionIndex = taskGroup.indexOf(toDoObj);
        taskGroup.splice(sectionIndex, 1);
      }

    }
  }

  // Creates click handler for all to-dos
  const allToDos = DOMModule.querySelector(".all-to-dos");
  DOMModule.addEventListener(allToDos, "click", (e) => handleTaskClicks(e));
  
  function handleTaskClicks(event) {
    const id = parseInt(event.target.id);
    if(event.target.type === "checkbox"){
      markTaskCompleted(event.target, id);
    }
    else if(event.target.classList.contains("delete-to-do")){
      deleteToDoNode(event.target.parentElement.parentElement, id);
    }
  }

  return {
    toDo,
    appendToDoNode,
  }
})();

export { toDoHandler }