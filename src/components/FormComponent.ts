import { FormField } from '../types/FormField';
import { createInputForField } from '../utils/createFields';
import { validateForm } from '../utils/validateForm';

export const FormComponent = (fields: FormField[]): HTMLFormElement => {
  const form = document.createElement('form');
  form.className = 'form';

  fields.forEach(field => {
    const input = createInputForField(field);

    const label = document.createElement('label');
    label.className = 'label';
    label.textContent = field.label;
    label.setAttribute('for', field.name);

    const wrapper = document.createElement('div');
    wrapper.appendChild(label);
    wrapper.appendChild(input);

    form.appendChild(wrapper);
  });

  const submitButton = document.createElement('button');
  submitButton.className = 'button';
  submitButton.className = 'button';
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';
  form.appendChild(submitButton);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData: Record<string, string | number> = {};
    fields.forEach(field => {
      const input = form.querySelector(`[name=${field.name}]`);
      if (input instanceof HTMLInputElement || input instanceof HTMLSelectElement) {
        formData[field.name] = input.value;
      }
    });

    const errors = validateForm(fields, formData);

    if (errors.length > 0) {
      console.error('Form validation errors:', errors);
    } else {
      console.log('Form is valid:', formData);
    }
  });

  return form;
};

export default FormComponent