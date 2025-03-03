import '../../src/style.css';
const createWrapperForInput = (field) => {
    const wrapper = document.createElement('div');
    const label = document.createElement('label');
    label.className = 'label';
    label.textContent = field.label;
    label.setAttribute('for', field.name);
    wrapper.appendChild(label);
    return wrapper;
};
export const createTextField = (field) => {
    var _a;
    const wrapper = createWrapperForInput(field);
    const input = document.createElement('input');
    input.className = 'input';
    input.type = 'text';
    input.placeholder = (_a = field.placeholder) !== null && _a !== void 0 ? _a : '';
    input.name = field.name;
    wrapper.insertBefore(input, wrapper.querySelector('.error-message'));
    return wrapper;
};
export const createNumberField = (field) => {
    const wrapper = createWrapperForInput(field);
    const input = document.createElement('input');
    input.className = 'input';
    input.type = 'number';
    if (field.min !== undefined)
        input.min = field.min.toString();
    if (field.max !== undefined)
        input.max = field.max.toString();
    input.name = field.name;
    wrapper.insertBefore(input, wrapper.querySelector('.error-message'));
    return wrapper;
};
export const createSelectField = (field) => {
    const wrapper = createWrapperForInput(field);
    const select = document.createElement('select');
    select.className = 'select';
    select.name = field.name;
    field.options.forEach((option) => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value.toString();
        optionElement.textContent = option.label;
        select.appendChild(optionElement);
    });
    wrapper.insertBefore(select, wrapper.querySelector('.error-message'));
    return wrapper;
};
export const createInputForField = (field) => {
    switch (field.type) {
        case 'text':
            return createTextField(field);
        case 'number':
            return createNumberField(field);
        case 'select':
            return createSelectField(field);
        default:
            throw new Error(`Unsupported field type: ${field.type}`);
    }
};
export default {
    createTextField,
    createNumberField,
    createSelectField,
    createInputForField,
};
//# sourceMappingURL=createFields.js.map