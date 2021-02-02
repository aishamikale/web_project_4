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
const profileName = document.querySelector('.profile__title');
const profileTitle = document.querySelector('.profile__subtitle');

//forms
const editProfileForm = document.querySelector('.form_type_edit-profile');
const addCardForm = document.querySelector('.form_type_add-card');

//form inputs
const nameInput = document.querySelector('.form__input_type_name');
const titleInput = document.querySelector('.form__input_type_title');
const cardTitleInput = document.querySelector('.form__input_type_card-title');
const cardUrlInput = document.querySelector('.form__input_type_url');


const modalImage = imageModal.querySelector('.modal__image');
const modalImageTitle = imageModal.querySelector('.modal__image-title');

//edit profile modal
function toggleModalWindow(modal) {
  modal.classList.toggle('modal_open');
}

function submitEditProfileForm(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileTitle.textContent = titleInput.value;
  toggleModalWindow(editProfileModal);
}

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  titleInput.value = profileTitle.textContent;
  toggleModalWindow(editProfileModal);
});

closeButton.addEventListener('click', () => {
  toggleModalWindow(editProfileModal);
});

addButton.addEventListener('click', () => {
  toggleModalWindow(cardModal);
});

closeCardModalButton.addEventListener('click', () => {
  toggleModalWindow(cardModal);
});

closeImageModalButton.addEventListener('click', () => {
  toggleModalWindow(imageModal);
});

editProfileForm.addEventListener('submit', submitEditProfileForm);

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
  cardImage.alt = name;

  function cardImagePopup() {
    modalImage.src = link;
    modalImageTitle.textContent = name;
    modalImage.alt = name;
    toggleModalWindow(imageModal);
  }

  cardImage.addEventListener('click', cardImagePopup);

  function likeButton () {
    cardLikeButton.classList.toggle("card__like_button_active");
  }

  cardLikeButton.addEventListener('click', likeButton);

  function deleteButton () {
    cardElement.remove();
  }

  cardDeleteButton.addEventListener('click', deleteButton);

  return cardElement;
}

initialCards.forEach(function (data){
  const cardElement = createCardElement(data.name, data.link);
  grid.prepend(cardElement);
});

function addCard(event) {
  event.preventDefault();
  const cardElement = createCardElement(`${cardTitleInput.value}`, `${cardUrlInput.value}`);
  toggleModalWindow(cardModal);
  grid.prepend(cardElement);
}

addCardForm.addEventListener('submit', addCard);