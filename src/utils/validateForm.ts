import { InputField } from '../types/InputField';

export const validateForm = (
  fields: InputField[], 
  formData: Record<string, string | number>,
  formElement: HTMLFormElement
): string[] => {
  const errors: string[] = [];

  fields.forEach(field => {
    const value = formData[field.name];
   
    const label = formElement.querySelector(`label[for="${field.name}"]`);
    
    const previousErrors = formElement.querySelectorAll(`#${field.name}-error`);
    if (previousErrors) {
      previousErrors.forEach(error => error.remove());
    }

    if (field.required && (value === undefined || value === '')) {
      errors.push(`${field.label} is required.`);
      if (label) {
        const error = document.createElement('span');
        error.id = `${field.name}-error`;
        error.className = 'error-message';
        error.textContent = `${field.label} is required.`;
        label.parentElement?.appendChild(error);
      }
    }

    if (field.type === 'number') {
      const numValue = Number(value);
      if (field.min && numValue < field.min) {
        errors.push(`${field.label} must be at least ${field.min}.`);
        if (label) {
          const error = document.createElement('span');
          error.id = `${field.name}-error`;
          error.className = 'error-message';
          error.textContent = `${field.label} must be at least ${field.min}.`;
          label.parentElement?.appendChild(error);
        }
      }
      if (field.max && numValue > field.max) {
        errors.push(`${field.label} must be less than ${field.max}.`);
        if (label) {
          const error = document.createElement('span');
          error.id = `${field.name}-error`;
          error.className = 'error-message';
          error.textContent = `${field.label} must be less than ${field.max}.`;
          label.parentElement?.appendChild(error);
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

  return errors;
}

export default validateForm;