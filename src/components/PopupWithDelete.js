import Popup from './Popup.js';

export default class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = this._popupSelector.querySelector(
      '.popup__submit-button_confirm'
    );
  }

  /** Установка слушателей */
  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._deleteCard();
      this.close();
    });
  }

  /** Удаление карточки */
  submitCardDelete(deleteCardCallback) {
    this._deleteCard = deleteCardCallback;
  }
}
