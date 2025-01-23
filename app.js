"use strict";
class FormFieldBase {
    constructor({ label, name, required }) {
        this.label = label;
        this.name = name;
        this.required = required;
    }
}
class TextField extends FormFieldBase {
    constructor({ label, name, required, placeholder }) {
        super({ label, name, required });
        this.placeholder = placeholder;
    }
    createInput() {
        const input = document.createElement('input');
        input.type = 'text';
        input.name = this.name;
        input.placeholder = this.placeholder || '';
        return input;
    }
}
class NumberField extends FormFieldBase {
    constructor({ label, name, required, min, max }) {
        super({ label, name, required });
        this.min = min;
        this.max = max;
    }
    createInput() {
        const input = document.createElement('input');
        input.type = 'number';
        input.name = this.name;
        if (this.min !== undefined)
            input.min = this.min.toString();
        if (this.max !== undefined)
            input.max = this.max.toString();
        return input;
    }
}
class SelectField extends FormFieldBase {
    constructor({ label, name, required, options }) {
        super({ label, name, required });
        this.options = options;
    }
    createInput() {
        const select = document.createElement('select');
        select.name = this.name;
        this.options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value.toString();
            optionElement.textContent = option.label;
            select.appendChild(optionElement);
        });
        return select;
    }
}
class Form {
    constructor(fields) {
        this.fields = fields;
        this.formElement = document.createElement('form');
    }
    render() {
        this.fields.forEach(field => {
            const input = field.createInput();
            const label = document.createElement('label');
            label.textContent = field.label;
            label.setAttribute('for', field.name);
            const wrapper = document.createElement('div');
            wrapper.appendChild(label);
            wrapper.appendChild(input);
            this.formElement.appendChild(wrapper);
        });
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Submit';
        this.formElement.appendChild(submitButton);
        this.formElement.addEventListener('submit', this.handleSubmit.bind(this));
        return this.formElement;
    }
    validateForm(formData) {
        const errors = [];
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
    handleSubmit(event) {
        event.preventDefault();
        const formData = {};
        this.fields.forEach(field => {
            const input = this.formElement.querySelector(`[name=${field.name}]`);
            if (input instanceof HTMLInputElement || input instanceof HTMLSelectElement) {
                formData[field.name] = input.value;
            }
        });
        const errors = this.validateForm(formData);
        if (errors.length > 0) {
            console.log('Form validation errors:', errors);
        }
        else {
            console.log('Form is valid:', formData);
        }
    }
}
// Initialize fields
const fields = [
    new TextField({ label: 'Name', name: 'name', placeholder: 'Enter your name', required: true }),
    new NumberField({ label: 'Age', name: 'age', min: 18, max: 99, required: true }),
    new SelectField({
        label: 'Country',
        name: 'country',
        required: true,
        options: [
            { label: 'United States', value: 'us' },
            { label: 'Canada', value: 'ca' },
            { label: 'United Kingdom', value: 'uk' }
        ]
    })
];
// Create and render form
const form = new Form(fields);
document.body.appendChild(form.render());
