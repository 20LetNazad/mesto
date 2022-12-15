import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { formSubmit }) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._popupForm = this._popupSelector.querySelector('.popup__form');
    this._inputList = document.querySelectorAll('.popup__input');
    this._submitButton = this._popupSelector.querySelector(
      '.popup__submit-button'
    );
    this._buttonTextContent = this._submitButton.textContent;
  }

  /** Получение значений инпутов */
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  /** Установка слушателей */
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
      this._submitButton.textContent = `${this._buttonTextContent}...`;
    });
  }

  /** Сброс формы при закрытии */
  close() {
    super.close();
    this._popupForm.reset();
  }
}
