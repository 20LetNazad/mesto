// Валидация форм
export default class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
    this._submitButton = this._form.querySelector(
      this._settings.submitButtonSelector
    );
  }

  // Проверка на валидность
  _checkInputValidity(inputElement) {
    if (inputElement.checkValidity()) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  // Показ ошибки при невалидности
  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._settings.errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  // Убрать ошибку при валидности
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  }

  // Проверка на валидность для кнопки
  _hasInvalidInput() {
    return !this._form.checkValidity();
  }

  // Изменение состояния кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }

  // Обработчики событий
  _setEventListeners() {
    const inputList = this._form.querySelectorAll(this._settings.inputSelector);
    this._toggleButtonState(this._submitButton);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._submitButton);
      });
    });
  }

  disableButton() {
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
    this._submitButton.setAttribute('disabled', true);
  }

  // Включение валидации
  enableValidation() {
    this._setEventListeners(this._form);
  }
}
