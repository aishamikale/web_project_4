import { settings } from "./utils/utils.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import Api from "./components/Api.js";
import "./pages/index.css";

import {
  editButton,
  addButton,
  nameInput,
  titleInput,
  cardTitleInput,
  cardUrlInput,
  initialCards } from "./utils/constants.js";
import { data } from "autoprefixer";

//validators
const editProfileValidator = new FormValidator(settings, document.querySelector(".form_type_edit-profile"));
const addCardValidator = new FormValidator(settings, document.querySelector(".form_type_add-card"));
editProfileValidator.enableValidation();
addCardValidator.enableValidation();

/*const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-7",
  headers: {
    authorization: "0c109f26-b662-41c6-bcff-35a6cf5888c5",
    "Content-Type": "application/json"
  }
});*/

//add new card functionality
/*function addCard(cardItem) { 
  const card = new Card({
      data: cardItem, 
      handleCardClick: (link, name) => {
        imagePopup.open(link, name);
      }
    }, ".card-template")
    return card.generateCard();
}*/

/*api.getInitialCards()
  .then(res => {
    const cardList = new Section({
      items: res,
      renderer: (cardInfo) => {
        const card = new Card({
          cardInfo,
          handleCardClick: (imageInfo) => {
            imagePopup.open(imageInfo);
          }
        }, "card-template")
        return card.generateCard();
      },
    }, ".cards__grid")
  })
  cardsList.renderItems();*/

  const cardList = new Section({
    items: initialCards,
    renderer: (cardInfo) => {
      const card = new Card({
        data: cardInfo,
        handleCardClick: (imageInfo) => {
          imagePopup.open(imageInfo);
        }
      }, ".card-template")
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    }
  }, ".cards__grid")
  cardList.renderItems();

 //renders initial cards from the server
/*api.getInitialCards().then(res => {
  const cardsList = new Section({
    items: res,
    renderer: (cardInfo) => {
      cardsList.addItem(addCard(cardInfo));
    },
  }, ".cards__grid"
  );
  
  cardsList.renderItems();
})
.catch(err => console.log(err));*/

//get and set user info
//api.getUsersInfo().then(res => {
  //userData.setUserInfo(res.name, res.about, res.avatar);
//});

const userData = new UserInfo ({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle"
});

//opens popup image
const imagePopup = new PopupWithImage(".modal_type_image");

//adds new user info based on name and title input
const editProfilePopup = new PopupWithForm ({
  popupSelector: ".modal_type_edit-profile",
  handleFormSubmit: () => {
    userData.setUserInfo(nameInput.value, titleInput.value);
    editProfilePopup.close();
  }
});

//adds new card
const addCardPopup = new PopupWithForm ({
  popupSelector: ".modal_type_add-card",
  handleFormSubmit: () => {
    const newCard = new Card({
      data: data,
      handleCardClick: (imageInfo) => {
        imagePopup.open(imageInfo);
      }
    }, ".card-template")
    cardList.addItem(newCard);
    //cardsList.addItem(addCard({name: cardTitleInput.value, link: cardUrlInput.value}));
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