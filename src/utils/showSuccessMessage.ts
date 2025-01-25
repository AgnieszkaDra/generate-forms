const showSuccessMessage = (form: HTMLFormElement): void => {

    const existingMessage = form.querySelector(".success-message");
    if (existingMessage) {
      existingMessage.remove();
    }
  
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.textContent = "Form is sent successfully!";
 
    form.appendChild(successMessage);
  };

  export default showSuccessMessage;