import { InputField } from '../types/InputField';
import { createInputForField } from '../utils/createFields';
import { submitForm } from '../utils/submitForm';

export const FormComponent = (inputs: InputField[]): HTMLElement => {
  const form = document.createElement('form');
  form.className = 'form';

  inputs.forEach(element => {
    const input = createInputForField(element);
    form.appendChild(input);
  })

  const submitButton = document.createElement('button');
  submitButton.className = 'button';
  submitButton.type = 'submit';
  submitButton.textContent = 'Send';
      
  form.appendChild(submitButton);

  submitForm(form, inputs);
  return form;

}

export default FormComponent;