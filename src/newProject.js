import { DOMModule } from "./domModule";

export const newProjectHandler = (function (){
  // 
  const taskDialog = DOMModule.querySelector("#project-form");

  const formHandler = (function () {
    // Creates event handler to open task dialog when "Add Task" button is clicked
    const newTaskButton = DOMModule.querySelector("#show-new-project");
    DOMModule.addEventListener(newTaskButton, "click", () => {
      taskDialog.showModal();
    })

    // Creates event handler to close task dialog when "X" button is clicked
    const cancelButton = DOMModule.querySelector("#cancel-project");
    DOMModule.addEventListener(cancelButton, "click", () => {
      taskDialog.close();
    })

  })();
})();