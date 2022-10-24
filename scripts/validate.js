const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input_error',
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_error');
  errorElement.textContent = '';
};

const showInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_error');
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

const toggleButtonState = (button, inputList, settings) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(settings.inactiveButtonClass);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(settings.inactiveButtonClass);
    button.removeAttribute('disabled');
  }
};

const setEventListeners = (settings, formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const button = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(button, inputList, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(button, inputList, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formArr = Array.from(document.querySelectorAll(settings.formSelector));
  formArr.forEach((formElement) => {
    setEventListeners(settings, formElement);
  });
};

enableValidation(settings);
