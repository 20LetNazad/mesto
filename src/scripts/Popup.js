export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('mousedown', this._handleOverlayClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('mousedown', this._handleOverlayClose);
  }

  setEventListeners() {
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (
        evt.target === evt.currentTarget ||
        evt.target.classList.contains('popup__close-button')
      ) {
        this.close();
      }
    });
  }
}
