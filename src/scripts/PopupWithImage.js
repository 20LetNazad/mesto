import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open(link, name) {
    const imagePopupImg = document.querySelector('.image-popup__img');
    const imagePopupImgDesc = document.querySelector('.image-popup__caption');
    imagePopupImg.src = link;
    imagePopupImg.alt = name;
    imagePopupImgDesc.textContent = name;
    super.open();
  }
}
