abstract class FormFieldBase {
  label: string;
  name: string;
  required?: boolean;

  constructor({ label, name, required }: { label: string; name: string; required?: boolean }) {
    this.label = label;
    this.name = name;
    this.required = required;
  }

  protected initializeInput(type: string): HTMLInputElement {
      const input = document.createElement('input');
      input.type = type;
      input.name = this.name;
      input.className = 'input'
      return input;
    }
  
    abstract createInput(): HTMLElement;
}

class TextField extends FormFieldBase {
  placeholder?: string;

  constructor({ label, name, required, placeholder }: { label: string; name: string; required?: boolean; placeholder?: string }) {
    super({ label, name, required });
    this.placeholder = placeholder;
  }

  createInput(): HTMLInputElement {
    const input = this.initializeInput('text');
    input.placeholder = this.placeholder || '';
    return input;
  }
}

class NumberField extends FormFieldBase {
  min?: number;
  max?: number;

  constructor({ label, name, required, min, max }: { label: string; name: string; required?: boolean; min?: number; max?: number }) {
    super({ label, name, required });
    this.min = min;
    this.max = max;
  }

  createInput(): HTMLInputElement {
    const input = this.initializeInput('number'); 
    if (this.min !== undefined) input.min = this.min.toString();
    if (this.max !== undefined) input.max = this.max.toString();
    return input;
  }
}

class SelectField extends FormFieldBase {
  options: { label: string; value: string | number }[] = [];

  constructor({ label, name, required, options }: { label: string; name: string; required?: boolean; options?: { label: string; value: string | number }[] }) {
    super({ label, name, required });
    if (options) {
      this.options = options;
    }
  }

  async fetchOptionsFromAPI(apiUrl: string): Promise<void> {
    try {
      const response = await fetch(apiUrl);
      const countries = await response.json();
      this.options = countries.map((country: any) => ({
        label: country.name.common,
        value: country.cca2.toLowerCase(), 
      }));
    } catch (error) {
      console.error('Error fetching country options:', error);
    }
  }

  createInput(): HTMLSelectElement {
    const select = document.createElement('select');
    select.className = 'select';
    select.name = this.name;

    if (this.options.length > 0) {
      this.options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value.toString();
        optionElement.textContent = option.label;
        select.appendChild(optionElement);
      });
    } else {
      const loadingOption = document.createElement('option');
      loadingOption.textContent = 'Loading...';
      loadingOption.disabled = true;
      loadingOption.selected = true;
      select.appendChild(loadingOption);
    }

    return select;
  }

  async populateOptions(): Promise<void> {
    await this.fetchOptionsFromAPI('https://restcountries.com/v3.1/all');
  }
}

class Form {
  fields: FormFieldBase[];
  formElement: HTMLFormElement;

  constructor(fields: FormFieldBase[]) {
    this.fields = fields;
    this.formElement = document.createElement('form');
    this.formElement.className = 'form';
  }

  render(): HTMLFormElement {
    this.fields.forEach(field => {
      const input = field.createInput();

      const label = document.createElement('label');
      label.className = 'label';
      label.textContent = field.label;
      label.setAttribute('for', field.name);

      const wrapper = document.createElement('div');
      wrapper.appendChild(label);
      wrapper.appendChild(input);

      this.formElement.appendChild(wrapper);
    });

    const submitButton = document.createElement('button');
    submitButton.className = 'button';
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    this.formElement.appendChild(submitButton);

    this.formElement.addEventListener('submit', this.handleSubmit.bind(this));
    return this.formElement;
  }

  validateForm(formData: Record<string, string | number>): string[] {
    const errors: string[] = [];
    this.fields.forEach(field => {
      const value = formData[field.name];

      if (field.required && (value === undefined || value === '')) {
        errors.push(`${field.label} is required.`);
      }

      if (field instanceof NumberField) {
        const numValue = Number(value);
        if (field.min !== undefined && numValue < field.min) {
          errors.push(`${field.label} must be at least ${field.min}.`);
        }
        if (field.max !== undefined && numValue > field.max) {
          errors.push(`${field.label} must be less than ${field.max}.`);
        }
      }

      if (field instanceof SelectField && !value) {
        errors.push(`Please select a valid ${field.label}.`);
      }
    });
    return errors;
  }

  handleSubmit(event: SubmitEvent): void {
    event.preventDefault();

    const formData: Record<string, string | number> = {};
    this.fields.forEach(field => {
      const input = this.formElement.querySelector(`[name=${field.name}]`);
      if (input instanceof HTMLInputElement || input instanceof HTMLSelectElement) {
        formData[field.name] = input.value;
      }
    });

    const errors = this.validateForm(formData);

    if (errors.length > 0) {
      console.log('Form validation errors:', errors);
    } else {
      console.log('Form is valid:', formData);
    }
  }
}

(async () => {
  const countryField = new SelectField({ label: 'Country', name: 'country', required: true });
  await countryField.populateOptions(); 

  const fields: FormFieldBase[] = [
    new TextField({ label: 'Name', name: 'name', placeholder: 'Enter your name', required: true }),
    new NumberField({ label: 'Age', name: 'age', min: 18, max: 99, required: true }),
    countryField,
  ];

  const form = new Form(fields);
  const root = document.querySelector('#root');
  root?.appendChild(form.render());
})();