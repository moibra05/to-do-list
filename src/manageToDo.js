import { DOMModule } from "./domModule.js"


function toDo(title, description, dueDate, priority) {
  return {
    title, 
    description, 
    dueDate, 
    priority,
  }
}

const toDoHandler = (function () {
  function createToDoNode(toDoInstance) {
    const toDoNode = DOMModule.createNode("div");
    const toDoTitle = DOMModule.createNode("h2");
    const toDoDescription = DOMModule.createNode("p");
    
    DOMModule.addClass(toDoNode, "to-do");

    DOMModule.updateTextContent(toDoTitle, toDoInstance.title);
    DOMModule.updateTextContent(toDoDescription, toDoInstance.description);
    DOMModule.appendChild(toDoNode, toDoTitle);
    DOMModule.appendChild(toDoNode, toDoDescription);

    return toDoNode;
  }

  function appendToDoNode(toDoInstance) {
    const container = DOMModule.querySelector(".all-to-dos");
    DOMModule.appendChild(container, toDoInstance);
  }

  return {
    createToDoNode,
    appendToDoNode
  }
})();

export { toDo, toDoHandler }