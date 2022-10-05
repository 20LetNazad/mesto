const popup = document.querySelector('.popup');
const popupCard = document.querySelector('.popup-add-card');
const profile = document.querySelector('.profile');
const formElement = document.querySelector('.popup__profile-form');
const closeButton = popup.querySelector('.popup__close-button');
const closeButtonCard = popupCard.querySelector('.popup__close-button');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.add-button');
const nameInput = formElement.querySelector('.popup__text_type_name');
const jobInput = formElement.querySelector('.popup__text_type_description');
const name = profile.querySelector('.profile__nickmane');
const description = profile.querySelector('.profile__description');
const container = document.querySelector('.elements');
const template = document.querySelector('.template');

const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
}, {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
}, {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
}, {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
}, {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
}, {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}];

closeButton.addEventListener('click', function () {
    popup.classList.remove('popup_opened');
});

closeButtonCard.addEventListener('click', function () {
    popupCard.classList.remove('popup-add-card_open');
});

editButton.addEventListener('click', function () {
    let userNameValue = name.textContent;
    let descriptionValue = description.textContent;
    nameInput.value = userNameValue;
    jobInput.value = descriptionValue;
    popup.classList.add('popup_opened');
});

addButton.addEventListener('click', function () {
    popupCard.classList.add('popup-add-card_open');
});

function formSubmitHandler(evt) {
    evt.preventDefault();
    let nameValue = nameInput.value;
    let jobValue = jobInput.value;
    name.textContent = nameValue;
    description.textContent = jobValue;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);

const render = () => {
    initialCards.forEach(card => {
        const createCard = addCard(card.name, card.link);
        container.append(createCard);
    });
}

const addCard = (name, link) => {
    const createCard = template.content.cloneNode(true);
    createCard.querySelector('.element__title').textContent = name;
    createCard.querySelector('.element__image').src = link;
    return createCard;
}

render()