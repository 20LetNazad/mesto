import { openPopup } from '../index.js';

// Попап картинки
const imagePopup = document.querySelector('.image-popup');
// Изображение в попапе картинки
const imagePopupImg = imagePopup.querySelector('.image-popup__img');
// Описание в попапе картинки
const imagePopupImgDesc = imagePopup.querySelector('.image-popup__caption');

export default function openImagePopup(link, name) {
  imagePopupImg.src = link;
  imagePopupImg.alt = name;
  imagePopupImgDesc.textContent = name;
  imagePopup.classList.add('popup_opened');
  openPopup(imagePopup);
}
