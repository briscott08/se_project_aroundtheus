function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEl = [...formEl.querySelectorAll(inputSelector)];
  inputEl.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      console.dir(inputEl.validity);
    });
  });
}

function enableValidation(options) {
  const formEl = [...document.querySelectorAll(options.formSelector)];
  formEl.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);
