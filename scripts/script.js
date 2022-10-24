const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
const imagePopup = document.querySelector('.image-popup');
const closeButtons = document.querySelectorAll('.popup__close-button');
const profile = document.querySelector('.profile');
const profileForm = document.forms['edit-profile'];
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.add-button');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const name = profile.querySelector('.profile__nickmane');
const description = profile.querySelector('.profile__description');
const container = document.querySelector('.elements');
const template = document.querySelector('.template');
const imgCaption = imagePopup.querySelector('.image-popup__caption');
const imgLink = imagePopup.querySelector('.image-popup__img');
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

const render = () => {
  initialCards.forEach((item) => {
    const currentItem = createCardNode(item.name, item.link);
    container.append(currentItem);
    formCard.addEventListener('submit', handleAddCard);
  });
};

const createCardNode = (name, link) => {
  const currentItem = template.content.cloneNode(true);
  const currentText = currentItem.querySelector('.element__title');
  const currentImg = currentItem.querySelector('.element__image');
  currentText.textContent = name;
  currentImg.alt = name;
  currentImg.src = link;

  currentImg.addEventListener('click', function () {
    imgCaption.textContent = name;
    imgLink.alt = name;
    imgLink.src = link;
    openPopup(imagePopup);
  });

  setListeners(currentItem);

  return currentItem;
};

const setListeners = (currentItem) => {
  const setLike = currentItem.querySelector('.element__like');
  setLike.addEventListener('click', likeCard);

  const removeCard = currentItem.querySelector('.element__delete');
  removeCard.addEventListener('click', delCard);
};

const likeCard = (evt) => {
  evt.target.classList.toggle('element__like_active');
};

const delCard = (evt) => {
  const currentItem = evt.target.closest('.element');
  currentItem.remove();
};

const handleAddCard = (evt) => {
  evt.preventDefault();
  const name = createCardNode(
    inputCardNamePopup.value,
    inputCardImgPopup.value
  );
  container.prepend(name);
  formCard.reset();
  closePopup(cardPopup);
};

render();

addButton.addEventListener('click', () => openPopup(cardPopup));
