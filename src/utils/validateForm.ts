import { InputField } from '../types/InputField';
import showSuccessMessage from './showSuccessMessage';

export const validateForm = (
  fields: InputField[], 
  formData: Record<string, string | number>,
  formElement: HTMLFormElement
): string[] => {
  const errors: string[] = [];

  fields.forEach((field) => {
    const value = formData[field.name];
  
    const label = formElement.querySelector(`label[for="${field.name}"]`);
    const errorSpan = formElement.querySelector(`span[id="${field.name}-error"]`) as HTMLSpanElement;

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
          label.parentElement?.appendChild(newErrorSpan);
        } else {
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
            label.parentElement?.appendChild(newErrorSpan);
          } else {
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
            label.parentElement?.appendChild(newErrorSpan);
          } else {
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
        label.parentElement?.appendChild(error);
      }
    }
  });

  if (errors.length > 0) {
    console.error("Form validation errors:", errors);
  } else {
    showSuccessMessage(formElement); 
  }

  return errors;
};

export default validateForm;