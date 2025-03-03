import showSuccessMessage from './showSuccessMessage';
export const validateForm = (fields, formData, formElement) => {
    const errors = [];
    fields.forEach((field) => {
        var _a, _b, _c, _d;
        const value = formData[field.name];
        const label = formElement.querySelector(`label[for="${field.name}"]`);
        const errorSpan = formElement.querySelector(`span[id="${field.name}-error"]`);
        const previousErrors = formElement.querySelectorAll(`.error-message[id="${field.name}-error"]`);
        previousErrors.forEach((error) => error.remove());
        const existingMessage = formElement.querySelector(".success-message");
        if (existingMessage) {
            existingMessage.remove();
        }
        if (field.required && (value === undefined || value === '')) {
            errors.push(`${field.label} is required.`);
            if (label) {
                if (!errorSpan) {
                    const newErrorSpan = document.createElement('span');
                    newErrorSpan.id = `${field.name}-error`;
                    newErrorSpan.className = 'error-message';
                    newErrorSpan.textContent = `${field.label} is required.`;
                    (_a = label.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(newErrorSpan);
                }
                else {
                    errorSpan.textContent = `${field.label} is required.`;
                }
            }
        }
        if (field.type === 'number') {
            const numValue = Number(value);
            if (field.min && numValue < field.min) {
                errors.push(`${field.label} must be at least ${field.min}.`);
                if (label) {
                    if (!errorSpan) {
                        const newErrorSpan = document.createElement('span');
                        newErrorSpan.id = `${field.name}-error`;
                        newErrorSpan.className = 'error-message';
                        newErrorSpan.textContent = `${field.label} must be at least ${field.min}.`;
                        (_b = label.parentElement) === null || _b === void 0 ? void 0 : _b.appendChild(newErrorSpan);
                    }
                    else {
                        errorSpan.textContent = `${field.label} must be at least ${field.min}.`;
                    }
                }
            }
            if (field.max && numValue > field.max) {
                errors.push(`${field.label} must be less than ${field.max}.`);
                if (label) {
                    if (!errorSpan) {
                        const newErrorSpan = document.createElement('span');
                        newErrorSpan.id = `${field.name}-error`;
                        newErrorSpan.className = 'error-message';
                        newErrorSpan.textContent = `${field.label} must be less than ${field.max}.`;
                        (_c = label.parentElement) === null || _c === void 0 ? void 0 : _c.appendChild(newErrorSpan);
                    }
                    else {
                        errorSpan.textContent = `${field.label} must be less than ${field.max}.`;
                    }
                }
            }
        }
        if (field.type === 'select' && !value) {
            errors.push(`Please select a valid ${field.label}.`);
            if (label) {
                const error = document.createElement('span');
                error.id = `${field.name}-error`;
                error.className = 'error-message';
                error.textContent = `Please select a valid ${field.label}.`;
                (_d = label.parentElement) === null || _d === void 0 ? void 0 : _d.appendChild(error);
            }
        }
    });
    if (errors.length > 0) {
        console.error("Form validation errors:", errors);
    }
    else {
        showSuccessMessage(formElement);
    }
    return errors;
};
export default validateForm;
//# sourceMappingURL=validateForm.js.map