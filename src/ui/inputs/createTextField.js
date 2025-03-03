const createTextField = (field) => {
    var _a;
    const input = document.createElement('input');
    input.className = 'input';
    input.type = 'text';
    input.placeholder = (_a = field.placeholder) !== null && _a !== void 0 ? _a : '';
    input.name = field.name;
    return input;
};
export default createTextField;
//# sourceMappingURL=createTextField.js.map