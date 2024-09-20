import { DOMModule } from "./domModule.js"


function toDo(title, description, dueDate, priority) {
  return {
    title, 
    description, 
    dueDate, 
    priority,
  }
}

const newToDoForm = (function () {
  function addToDo() {
    const taskDialog = DOMModule.querySelector("#task-form");
    const newTaskButton = DOMModule.querySelector("#show-new-task");
    DOMModule.addEventListener(newTaskButton, "click", () => {
      console.log("hi");
      taskDialog.showModal();
    })
  }

  function cancelToDo() {
    const taskDialog = DOMModule.querySelector("#task-form");
    const cancelButton = DOMModule.querySelector("#cancel-to-do");
    DOMModule.addEventListener(cancelButton, "click", () => {
      taskDialog.close();
    })
  }

  return {
    addToDo,
    cancelToDo
  }
})();

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

  // Temporary solution
  function prepareHandlers() {
    newToDoForm.addToDo();
    newToDoForm.cancelToDo();
  }

  return {
    createToDoNode,
    appendToDoNode,
    prepareHandlers,
  }
})();

export { toDo, toDoHandler, newToDoForm }