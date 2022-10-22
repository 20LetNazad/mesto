const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
};

const showInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = inputElement.validationMessage;
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.checkValidity()) {
    hideInputError(formElement, inputElement);
  } else {
    showInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.checkValidity();
  });
};

const toggleButtonState = (button, inputList, form) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(form.inactiveButtonClass);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(form.inactiveButtonClass);
    button.removeAttribute('disabled');
  }
};

const setEventListeners = (form, formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(form.inputSelector)
  );
  const button = formElement.querySelector(form.submitButtonSelector);
  toggleButtonState(button, inputList, form);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(button, inputList, form);
    });
  });
};

const enableValidation = (form) => {
  const formArr = Array.from(document.querySelectorAll(form.formSelector));
  formArr.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, formElement);
  });
};

enableValidation(settings);
