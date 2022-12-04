import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open(link, cardName) {
    this._imagePopupImg = document.querySelector('.image-popup__img');
    this._imagePopupImgDesc = document.querySelector('.image-popup__caption');
    this._imagePopupImg.src = link;
    this._imagePopupImg.alt = cardName;
    this._imagePopupImgDesc.textContent = cardName;
    super.open();
  }
}
