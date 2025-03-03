const createNumberField = (field) => {
    const input = document.createElement('input');
    input.className = 'input';
    input.type = 'number';
    if (field.min !== undefined)
        input.min = field.min.toString();
    if (field.max !== undefined)
        input.max = field.max.toString();
    input.name = field.name;
    return input;
};
export default createNumberField;
//# sourceMappingURL=createNumberField.js.map