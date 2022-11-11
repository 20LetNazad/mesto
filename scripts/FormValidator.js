// Валидация форм
export default class FormValidator {
  constructor(settings, element) {
    this._settings = settings;
    this._element = element;
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
    const errorElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add('popup__input_error');
    errorElement.textContent = inputElement.validationMessage;
  }

  // Убрать ошибку при валмдности
  _hideInputError(inputElement) {
    const errorElement = this._element.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove('popup__input_error');
    errorElement.textContent = '';
  }

  // Проверка на валидность для кнопки
  _hasInvalidInput() {
    return !this._element.checkValidity();
  }

  // Изменение состояния кнопки
  _toggleButtonState(button) {
    if (this._hasInvalidInput()) {
      button.classList.add(this._settings.inactiveButtonClass);
      button.setAttribute('disabled', true);
    } else {
      button.classList.remove(this._settings.inactiveButtonClass);
      button.removeAttribute('disabled');
    }
  }

  // Обработчики событий
  _setEventListeners(element) {
    const inputList = this._element.querySelectorAll(
      this._settings.inputSelector
    );
    const button = this._element.querySelector(
      this._settings.submitButtonSelector
    );
    this._toggleButtonState(button, element);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(button, element);
      });
    });
  }

  // Включение валидации
  enableValidation() {
    this._setEventListeners(this._element);
  }
}
