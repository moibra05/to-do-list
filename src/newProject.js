import { DOMModule } from "./domModule";
import { toDoSections } from "./toDoSections";

export const newProjectHandler = (function (){
  // 
  const taskDialog = DOMModule.querySelector("#project-form");

  const formHandler = (function () {
    // Creates event handler to open form dialog when "New Project" button is clicked
    const newTaskButton = DOMModule.querySelector("#show-new-project");
    DOMModule.addEventListener(newTaskButton, "click", () => {
      taskDialog.showModal();
    })

    // Creates event handler to close form dialog when "X" button is clicked
    const cancelButton = DOMModule.querySelector("#cancel-project");
    DOMModule.addEventListener(cancelButton, "click", () => {
      taskDialog.close();
    })

    const confirmButton = DOMModule.querySelector("#confirm-new-project-form");
    DOMModule.addEventListener(confirmButton, "click", () => {
      const form = DOMModule.querySelector("#project-form-data") ;
      const formData = new FormData(form);
      const newProjectObj = Object.fromEntries(formData.entries());
  
      form.reset();
      taskDialog.close();
  
      toDoSections.createProject(newProjectObj["projName"]);
    })
  
  })();
})();