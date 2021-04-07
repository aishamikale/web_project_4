import { imageModal, settings } from "../utils/utils.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import initialCards from "../utils/array.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";

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

//validators
const editProfileValidator = new FormValidator(settings, document.querySelector(".form_type_edit-profile"));
const addCardValidator = new FormValidator(settings, document.querySelector(".form_type_add-card"));
editProfileValidator.enableValidation();
addCardValidator.enableValidation();

const userData = new UserInfo ({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle"
});

const imagePopup = new PopupWithImage(".modal_type_image");
imagePopup.setEventListeners();

function newCard (items) {
  const card = new Card({
    data: items,
    handleCardClick: (link, name) => {
      imagePopup.open(link, name);
    }
  }, ".card-template")
  return card.generateCard();
}

const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    cardsList.addItem(newCard(cardItem));
  }
}, ".cards__grid");

cardsList.renderItems();

//store logic to create card instances and add to DOM
/*const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card({
      data: cardItem, 
      handleCardClick: (link, name) => {
        imagePopup.open(link, name);
      }
    }, ".card-template")
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  },
}, ".cards__grid"
);

cardsList.renderItems();*/

const addCardPopup = new PopupWithForm({
  popupSelector: ".modal_type_add-card", 
  handleFormSubmit: (cardInfo) => {
    cardsList.addItem(newCard(cardInfo));
    addCardPopup.close();
  }
});
addCardPopup.setEventListeners();

//form_type_add-card

/*const addCardPopup = new PopupWithForm ({
  popupSelector: ".modal_type_add-card",
  handleFormSubmit: (data) => {
    //cardsList.append(createCard(data));
    createCard(cardUrlInput.value, cardTitleInput.value);
    addCardPopup.close();
  }
});*/

/*function createCard(cardData) {
  const card = new Card({
      data: cardData,
      handleCardClick: (link, name) => {
          imagePopup.open(link, name);
      }
  }, ".card-template");
  return card.generateCard();
}*/


/*const cards = new Section({
  items: initialCards,
  renderer: (item) => {
    cards.addItem(createCard(item));
  }
},
".cards__grid");

cards.renderItems();*/

//const imagePopup = new PopupWithImage(".modal_type_image");


/*const editProfilePopup = new PopupWithForm({
  popupSelector: ".modal_type_edit-profile",
  handleFormSubmit: ({ name, job }) => {
    userData.setUserInfo(name, job);
    editProfilePopup.close();
  }
});*/

//setEventListeners
//editProfilePopup.setEventListeners();
//addCardPopup.setEventListeners();
//imagePopup.setEventListeners();

  /*const card = new Card(cardData, ".card-template");
  grid.prepend(card.generateCard());
  //addCardForm.reset();*/


/*function submitEditProfileForm(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileTitle.textContent = titleInput.value;
  toggleModalWindow(editProfileModal);
}*/

/*function submitAddCardForm(event) {
  event.preventDefault();
  addCard({name: cardTitleInput.value, link: cardUrlInput.value});
  //toggleModalWindow(cardModal);
}*/

/*editButton.addEventListener("click", () => {
  editProfilePopup.open();
  nameInput.value = profileName.textContent;
  titleInput.value = profileTitle.textContent;
  editProfileValidator.resetValidation();
});*/

/*closeButton.addEventListener("click", () => {
  editProfilePopup.close();
});*/

addButton.addEventListener("click", () => {
  addCardPopup.open();
  addCardValidator.resetValidation();
});

closeCardModalButton.addEventListener("click", () => {
  addCardPopup.close();
});

closeImageModalButton.addEventListener("click", () => {
  imagePopup.close();
});

/*editProfileForm.addEventListener("submit", submitEditProfileForm);*/
//addCardForm.addEventListener("submit", submitAddCardForm);

/*editProfileModal.addEventListener("click", (evt) => {
  if(evt.target === editProfileModal) {
    toggleModalWindow(editProfileModal);
  }
});*/

/*cardModal.addEventListener("click", (evt) => {
  if(evt.target === cardModal) {
    toggleModalWindow(cardModal);
  }
});*/

/*imageModal.addEventListener("click", (evt) => {
  if(evt.target === imageModal) {
    toggleModalWindow(imageModal);
  }
});*/