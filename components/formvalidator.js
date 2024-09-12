class formValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formEl;
  }
}

// const settings = {
//   this._inputSelector
//   this._submitButtonSelector
//   this._inactiveButtonClass
//   this._inputErrorClass
//   this._errorClass
// };

const editFormValidator = new formValidator(settings, editForm);
const addFormValidator = new formValidator(settings, addForm);
