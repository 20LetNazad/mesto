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

closeButton.addEventListener('click', function (){
    popup.classList.remove('popup_opened');
});

closeButtonCard.addEventListener('click', function (){
    popupCard.classList.remove('popup-add-card_open');
});

editButton.addEventListener('click', function (){
    let userNameValue = name.textContent;
    let descriptionValue = description.textContent;
    nameInput.value = userNameValue;
    jobInput.value = descriptionValue;
    popup.classList.add('popup_opened');
});

addButton.addEventListener('click', function (){
    popupCard.classList.add('popup-add-card_open');
});

formElement.addEventListener('submit', function(evt) {
    evt.preventDefault();
    let nameValue = nameInput.value;
    let jobValue = jobInput.value;
    name.textContent = nameValue;
    description.textContent = jobValue;
    popup.classList.remove('popup_opened');
});