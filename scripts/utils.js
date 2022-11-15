import { openPopup } from './script.js';

// Массив с карточками
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

// Попап картинки
const imagePopup = document.querySelector('.image-popup');
// Изображение в попапе картинки
const imagePopupImg = imagePopup.querySelector('.image-popup__img');
// Описание в попапе картинки
const imagePopupImgDesc = imagePopup.querySelector('.image-popup__caption');

function openImagePopup(link, name) {
  imagePopupImg.src = link;
  imagePopupImg.alt = name;
  imagePopupImgDesc.textContent = name;
  imagePopup.classList.add('popup_opened');
  openPopup(imagePopup);
}

export { openImagePopup, initialCards };
