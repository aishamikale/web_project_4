//wrappers
const editProfileModal = document.querySelector('.modal_type_edit-profile');
const cardModal = document.querySelector('.modal_type_add-card');
const imageModal = document.querySelector('.modal_type_image');

//open buttons
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//close buttons
const closeButton = document.querySelector('.modal__button');
const closeCardModalButton = cardModal.querySelector('.modal__button');
const closeImageModalButton = imageModal.querySelector('.modal__image-button');

//profile section
let profileName = document.querySelector('.profile__title');
let profileTitle = document.querySelector('.profile__subtitle');

//forms
const editProfileForm = document.querySelector('.form_type_edit-profile');
const addCardForm = document.querySelector('.form_type_add-card');

//form inputs
let nameInput = document.querySelector('.form__input_type_name');
let titleInput = document.querySelector('.form__input_type_title');
let cardTitleInput = document.querySelector('.form__input_type_card-title');
let cardUrlInput = document.querySelector('.form__input_type_url');


const modalImage = imageModal.querySelector('.modal__image');
const modalImageTitle = imageModal.querySelector('.modal__image-title');

//edit profile modal
function toggleModalWindow(modal) {
  nameInput.value = profileName.textContent;
  titleInput.value = profileTitle.textContent;
  modal.classList.toggle('modal_open');
}

editButton.addEventListener('click', () => {
  toggleModalWindow(editProfileModal);
})

closeButton.addEventListener('click', () => {
  toggleModalWindow(editProfileModal);
})

addButton.addEventListener('click', () => {
  toggleModalWindow(cardModal);
})

closeCardModalButton.addEventListener('click', () => {
  toggleModalWindow(cardModal);
})

closeImageModalButton.addEventListener('click', () => {
  toggleModalWindow(imageModal);
})

//form inputs
function submitForm(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileTitle.textContent = titleInput.value;
    toggleModalWindow(editProfileModal);
}

editProfileForm.addEventListener('submit', submitForm);

//initial cards
const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
      name: "Vanoise National Park",
      link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
  ];

const cardTemplate = document.querySelector(".card-template").content.querySelector(".card");
const grid = document.querySelector(".cards__grid");

function createCardElement(name, link ) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.style.backgroundImage = `url(${link})`;

  cardImage.addEventListener('click', () => {
    modalImage.src = link;
    modalImageTitle.textContent = name;
    toggleModalWindow(imageModal);
  })

  cardLikeButton.addEventListener('click', () => {
    cardLikeButton.classList.toggle("card__like_button_active");
  })

  cardDeleteButton.addEventListener('click', () => {
    cardElement.remove();
  })

  return cardElement;
}

initialCards.forEach(function (data){
  const cardElement = createCardElement(data.name, data.link);
  grid.prepend(cardElement);
})

function addCard(event) {
  event.preventDefault();
  const cardElement = createCardElement(`${cardTitleInput.value}`, `${cardUrlInput.value}`);
  toggleModalWindow(cardModal);
  grid.prepend(cardElement);
}

addCardForm.addEventListener('submit', addCard);