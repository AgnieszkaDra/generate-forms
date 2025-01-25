import { InputField } from '../types/InputField';
import { ButtonField  } from '../types/ButtonField';
import { createInputForField } from '../utils/createFields';
import { validateForm } from '../utils/validateForm';
import { isSubmitField, isInputField } from '../utils/typeGuards';

export const FormComponent = (inputs: InputField[], buttons: ButtonField[] ): HTMLFormElement => {
  const form = document.createElement('form');
  form.className = 'form';


  inputs.forEach(element => {
 
      const input = createInputForField(element);

      const label = document.createElement('label');
      label.className = 'label';
      label.textContent = element.label;
      label.setAttribute('for', element.name);

      const wrapper = document.createElement('div');
      wrapper.appendChild(label);
      wrapper.appendChild(input);

      form.appendChild(wrapper);
    } )

    buttons.forEach(button => {
       if (isSubmitField(button)) {
      

      const submitButton = document.createElement('button');
      submitButton.className = 'button';
      submitButton.type = button.type;
      submitButton.textContent = button.name;
      
      

      form.appendChild(submitButton);
    }
    })
    
   form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData: Record<string, string | number> = {};
    inputs.forEach(element => {
      if (isInputField(element)) {
        const input = form.querySelector(`[name=${element.name}]`);
        if (input instanceof HTMLInputElement || input instanceof HTMLSelectElement) {
          formData[element.name] = input.value;
        }
      }
    });

    const errors = validateForm(inputs, formData);

    if (errors.length > 0) {
      console.error('Form validation errors:', errors);
    } else {
      console.log('Form is valid:', formData);
    }
  });

  return form;
  };

  


export default FormComponent;