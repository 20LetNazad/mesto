import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { formSubmit }) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._popupForm = this._popupSelector.querySelector('.popup__form');
    this._inputList = document.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
    });
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
