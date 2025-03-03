const showSuccessMessage = (form) => {
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.textContent = "Form is sent successfully!";
    form.appendChild(successMessage);
};
export default showSuccessMessage;
//# sourceMappingURL=showSuccessMessage.js.map