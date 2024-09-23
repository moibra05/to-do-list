import { DOMModule } from "./domModule"
import { toDoSections } from "./toDoSections"



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
    const allToDos = toDoSections.allSections["all"].tasks;
    const scheduledToDos = toDoSections.allSections["scheduled"].tasks;
    if(!allToDos.includes(toDoObj)){
      allToDos.push(toDoObj);
    }
    if(toDoObj.dueDate){
      scheduledToDos.push(toDoObj);
    }
  }

  function refershToDos(){
    DOMModule.deleteAllChildren(DOMModule.querySelector(".all-to-dos"));
  }



  return {
    toDo,
    appendToDoNode,
  }
})();

export { toDoHandler }