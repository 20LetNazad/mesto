import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopupImg =
      this._popupSelector.querySelector('.image-popup__img');
    this._imagePopupImgDesc = this._popupSelector.querySelector(
      '.image-popup__caption'
    );
  }

  open(link, cardName) {
    this._imagePopupImg.src = link;
    this._imagePopupImg.alt = cardName;
    this._imagePopupImgDesc.textContent = cardName;
    super.open();
  }
}
