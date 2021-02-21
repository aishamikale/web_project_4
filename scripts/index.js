import { imageModal, toggleModalWindow } from "./utils.js";
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

function submitAddCardForm(event) {
  event.preventDefault();
  addCard({name: cardTitleInput.value, link: cardUrlInput.value});
  toggleModalWindow(cardModal);
}

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  titleInput.value = profileTitle.textContent;
  editProfileValidator.resetValidation();
  toggleModalWindow(editProfileModal);
});

initialCards.forEach(data => {
  const card = new Card(data, ".card-template");
  grid.append(card.generateCard());
});

function addCard(cardData) {
  const card = new Card(cardData, ".card-template");
  grid.prepend(card.generateCard());
  addCardForm.reset();
}

closeButton.addEventListener("click", () => {
  toggleModalWindow(editProfileModal);
});

addButton.addEventListener("click", () => {
  addCardValidator.resetValidation();
  toggleModalWindow(cardModal);
});

closeCardModalButton.addEventListener("click", () => {
  toggleModalWindow(cardModal);
});

closeImageModalButton.addEventListener("click", () => {
  toggleModalWindow(imageModal);
});

editProfileForm.addEventListener("submit", submitEditProfileForm);
addCardForm.addEventListener("submit", submitAddCardForm);

editProfileModal.addEventListener("click", (evt) => {
  if(evt.target === editProfileModal) {
    toggleModalWindow(editProfileModal);
  }
});

cardModal.addEventListener("click", (evt) => {
  if(evt.target === cardModal) {
    toggleModalWindow(cardModal);
  }
});

imageModal.addEventListener("click", (evt) => {
  if(evt.target === imageModal) {
    toggleModalWindow(imageModal);
  }
});