import { imageModal, escModal, toggleModalWindow } from "./utils.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import initialCards from "./array.js";

//wrappers &overlays
const editProfileModal = document.querySelector(".modal_type_edit-profile");
const cardModal = document.querySelector(".modal_type_add-card");
const grid = document.querySelector(".cards__grid");

//open buttons
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

//close buttons
const closeButton = document.querySelector(".modal__button");
const closeCardModalButton = cardModal.querySelector(".modal__button");
const closeImageModalButton = imageModal.querySelector(".modal__image-button");

//profile section
const profileName = document.querySelector(".profile__title");
const profileTitle = document.querySelector(".profile__subtitle");

//forms
const editProfileForm = document.querySelector(".form_type_edit-profile");
const addCardForm = document.querySelector(".form_type_add-card");

//form inputs
const nameInput = document.querySelector(".form__input_type_name");
const titleInput = document.querySelector(".form__input_type_title");
const cardTitleInput = document.querySelector(".form__input_type_card-title");
const cardUrlInput = document.querySelector(".form__input_type_url");


const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible"
}

const editProfileValidator = new FormValidator(settings, document.querySelector(".form_type_edit-profile"));
const addCardValidator = new FormValidator(settings, document.querySelector(".form_type_add-card"));
editProfileValidator.enableValidation();
addCardValidator.enableValidation();

function submitEditProfileForm(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileTitle.textContent = titleInput.value;
  toggleModalWindow(editProfileModal);
}

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  titleInput.value = profileTitle.textContent;
  toggleModalWindow(editProfileModal);
});

initialCards.forEach(data => {
  const card = new Card(data, ".card-template");
  grid.append(card.generateCard());
});

function addCard(event) {
  event.preventDefault();

  const addCardInfo = {
    name: cardTitleInput.value,
    link: cardUrlInput.value
  };

  const newCard = new Card(addCardInfo, ".card-template");
  grid.prepend(newCard.generateCard());
  toggleModalWindow(cardModal);
}

closeButton.addEventListener("click", () => {
  toggleModalWindow(editProfileModal);
});

addButton.addEventListener("click", () => {
  toggleModalWindow(cardModal);
});

closeCardModalButton.addEventListener("click", () => {
  toggleModalWindow(cardModal);
});

closeImageModalButton.addEventListener("click", () => {
  toggleModalWindow(imageModal);
});

editProfileForm.addEventListener("submit", submitEditProfileForm);
addCardForm.addEventListener("submit", addCard);

editProfileModal.addEventListener("click", (evt) => {
  if(evt.target === editProfileModal) {
    escModal(editProfileModal);
  }
});

cardModal.addEventListener("click", (evt) => {
  if(evt.target === cardModal) {
    escModal(cardModal);
  }
});

imageModal.addEventListener("click", (evt) => {
  if(evt.target === imageModal) {
    escModal(imageModal);
  }
});