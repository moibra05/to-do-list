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
    DOMModule.appendChild(container, toDoInstance);
  }

  return {
    createToDoNode,
    appendToDoNode
  }
})();

export { toDo, toDoHandler }