import { DOMModule } from "./domModule";

export const dialogHandler = (function (){

  function initEventHandlers(name, submitFunction = null) {
    console.log(name);
    const dialog = DOMModule.querySelector(`#${name}`);
    console.log(dialog);

    // Creates event handler to open dialog when the appropiate button is clicked
    const newTaskButton = DOMModule.querySelector(`#show-${name}`);
    DOMModule.addEventListener(newTaskButton, "click", () => {
      dialog.showModal();
    })

    // Creates event handler to close dialog form when "X" button is clicked
    const cancelButton = DOMModule.querySelector(`#cancel-${name}`);
    DOMModule.addEventListener(cancelButton, "click", () => {
      dialog.close();
    });

    if(submitFunction){
      // Creates optional event handler to send form data when confirm button is clicked
      const confirmButton = DOMModule.querySelector(`#confirm-${name}`);
      DOMModule.addEventListener(confirmButton, "click", () => {
        const form = DOMModule.querySelector(`#${name}-data`) ;
        const formData = new FormData(form);

        form.reset();
        dialog.close();

        submitFunction(formData);
      });
    }

  }

  return {
    initEventHandlers,
  }
})();