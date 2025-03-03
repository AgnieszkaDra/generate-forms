import validateForm from "./validateForm";
export const submitForm = (form, inputs) => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = {};
        inputs.forEach((element) => {
            const input = form.querySelector(`[name=${element.name}]`);
            if (input instanceof HTMLInputElement || input instanceof HTMLSelectElement) {
                formData[element.name] = input.value;
            }
        });
        validateForm(inputs, formData, form);
    });
};
//# sourceMappingURL=submitForm.js.map