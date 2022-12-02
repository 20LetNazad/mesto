import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open(link, cardName) {
    const imagePopupImg = document.querySelector('.image-popup__img');
    const imagePopupImgDesc = document.querySelector('.image-popup__caption');
    imagePopupImg.src = link;
    imagePopupImg.alt = cardName;
    imagePopupImgDesc.textContent = cardName;
    super.open();
  }
}
