
class formValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formEl;
  }
};


_showInputError() {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);

};

_hideInputError() {
  const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(this._inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(this._errorClass);
}; //change if doesnt work


_checkInputValidity(inputEl) {
  if (!inputEl.validity.valid) {
    return this._showInputError(formEl, inputEl, options);
  } else {
    this._hideInputError(formEl, inputEl, options);
  }
};

_hasInvalidInput() {
   return inputArray.some((inputEl) => !inputEl.validity.valid);
};

_toggleButtonState() {
  if (this._hasInvalidInput()) {
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
    this._submitButton.disabled = true;
  } else {
    this._submitButton.classList.remove(this._settings.inactiveButtonClass);
    this._submitButton.disabled = false;
  }


}

_enableButton() {
  this._submitButton.remove(this._inactiveButtonClass);
  this._submitButton.disabled = false;
}

_disableButton() {
  this._submitButton.classList.add(this._inactiveButtonClass);
  this._submitButton.disabled = true;
}

_setEventListeners()  {
    const inputEls = [this._form.querySelectorAll(this._inputSelector)];
    const submitButton = this._form.querySelector(this._submitButtonSelector);
    toggleButtonState(inputEls, submitButton);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(this._form, inputEl);
        toggleButtonState(inputEls, submitButton);
      });
    });
  };

enableValidation() {
  this._form.addEventListener("submit", (e) => {
          e.preventDefault();
});
setEventListeners(formEl, options);
};



const editFormValidator = new formValidator(settings, editForm);
const addFormValidator = new formValidator(settings, addForm);

editFormValidator.enableValidation();


