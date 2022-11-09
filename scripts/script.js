import Card from './Card.js';

const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
const submitCardButton = cardPopup.querySelector('.popup__submit-button');
const profile = document.querySelector('.profile');
const profileForm = document.forms['edit-profile'];
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.add-button');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const name = profile.querySelector('.profile__nickmane');
const description = profile.querySelector('.profile__description');
const container = document.querySelector('.elements');
const inputCardNamePopup = cardPopup.querySelector(
  '.popup__input_type_image-name'
);
const inputCardImgPopup = cardPopup.querySelector('.popup__input_type_link');
const formCard = document.forms['add-place'];

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

const closeWithEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains('popup__close-button')
    ) {
      closePopup(popup);
    }
  });
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeWithEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeWithEsc);
}

editButton.addEventListener('click', function () {
  const userNameValue = name.textContent;
  const descriptionValue = description.textContent;
  nameInput.value = userNameValue;
  jobInput.value = descriptionValue;
  openPopup(profilePopup);
});

profileForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  name.textContent = nameValue;
  description.textContent = jobValue;
  closePopup(profilePopup);
});

initialCards.forEach((item) => {
  const card = new Card(item, '.template');
  const cardElement = card.generateCard();

  document.querySelector('.elements').append(cardElement);
});

const handleAddCard = (evt) => {
  evt.preventDefault();
  initialCards.name = inputCardNamePopup.value;
  initialCards.link = inputCardImgPopup.value;
  const card = new Card(initialCards, '.template');
  container.prepend(card.generateCard());
  closePopup(cardPopup);
  formCard.reset();
  submitCardButton.setAttribute('disabled', true);
  submitCardButton.classList.add('popup__submit-button_disabled');
};

formCard.addEventListener('submit', handleAddCard);
addButton.addEventListener('click', () => openPopup(cardPopup));
