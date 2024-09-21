import { DOMModule } from "./domModule";
import { toDo, toDoHandler } from "./manageToDo";



export const newToDoForm = (function () {
  const taskDialog = DOMModule.querySelector("#task-form");

  const formHandler = (function () {
    // Creates event handler to open task dialog when "Add Task" button is clicked
    const newTaskButton = DOMModule.querySelector("#show-new-task");
    DOMModule.addEventListener(newTaskButton, "click", () => {
      taskDialog.showModal();
    })

    // Creates event handler to close task dialog when "X" button is clicked
    const cancelButton = DOMModule.querySelector("#cancel-to-do");
    DOMModule.addEventListener(cancelButton, "click", () => {
      taskDialog.close();
    })

  })();

  // Creates event handler to send dialog form data when "Confirm" button is clicked
  const confirmButton = DOMModule.querySelector("#confirm-new-task-form");
  DOMModule.addEventListener(confirmButton, "click", () => {
    const form = DOMModule.querySelector("form[method=\"dialog\"]") ;
    const formData = new FormData(form);
    const newToDoObj = Object.fromEntries(formData.entries());

    form.reset();
    taskDialog.close();

    const newToDo = toDo(newToDoObj["title"], newToDoObj["description"], newToDoObj["due-date"], newToDoObj["priority"]);
    toDoHandler.appendToDoNode(newToDo);
  })

})();