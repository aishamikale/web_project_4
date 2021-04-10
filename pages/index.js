import { settings } from "../utils/utils.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

import {
  editButton,
  addButton,
  nameInput,
  titleInput,
  cardTitleInput,
  cardUrlInput,
  initialCards } from "../utils/constants.js";

//validators
const editProfileValidator = new FormValidator(settings, document.querySelector(".form_type_edit-profile"));
const addCardValidator = new FormValidator(settings, document.querySelector(".form_type_add-card"));
editProfileValidator.enableValidation();
addCardValidator.enableValidation();

//add new card functionality
function addCard(cardItem) { 
  const card = new Card({
      data: cardItem, 
      handleCardClick: (link, name) => {
        imagePopup.open(link, name);
      }
    }, ".card-template")
    return card.generateCard();
}

//retrieve user information
const userData = new UserInfo ({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle"
});

//opens popup image
const imagePopup = new PopupWithImage(".modal_type_image");

//store logic to create card instances and add to DOM
const cardsList = new Section({
  items: initialCards,
  renderer: (cardInfo) => {
    cardsList.addItem(addCard(cardInfo));
  },
}, ".cards__grid"
);

cardsList.renderItems();

//adds new user info based on name and title input
const editProfilePopup = new PopupWithForm ({
  popupSelector: ".modal_type_edit-profile",
  handleFormSubmit: () => {
    userData.setUserInfo(nameInput.value, titleInput.value);
    editProfilePopup.close();
  }
});

//adds new card based on title input and url input
const addCardPopup = new PopupWithForm ({
  popupSelector: ".modal_type_add-card",
  handleFormSubmit: () => {
    cardsList.addItem(addCard({name: cardTitleInput.value, link: cardUrlInput.value}));
    addCardPopup.close();
  }
});

//setEventListeners
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();

//get user info and display in the open form
editButton.addEventListener("click", () => {
  const userFormData = userData.getUserInfo();
  nameInput.value = userFormData.name;
  titleInput.value = userFormData.job;
  editProfilePopup.open();
  editProfileValidator.resetValidation();
});

addButton.addEventListener("click", () => {
  addCardPopup.open();
  addCardValidator.resetValidation();
});