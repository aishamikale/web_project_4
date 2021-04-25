import 'regenerator-runtime/runtime';
import "./pages/index.css"; 
import { settings } from "./utils/utils.js"; 
import Card from "./components/Card.js"; 
import FormValidator from "./components/FormValidator.js"; 
import PopupWithImage from "./components/PopupWithImage.js"; 
import PopupWithForm from "./components/PopupWithForm.js"; 
import Section from "./components/Section.js"; 
import UserInfo from "./components/UserInfo.js";

import { 
  editButton, 
  addButton, 
  nameInput, 
  titleInput, 
  cardTitleInput, 
  cardUrlInput, 
  initialCards } from "./utils/constants.js";

//validators 
const editProfileValidator = new FormValidator(settings, document.querySelector(".form_type_edit-profile")); 
const addCardValidator = new FormValidator(settings, document.querySelector(".form_type_add-card")); 
editProfileValidator.enableValidation(); 
addCardValidator.enableValidation();

//adds initial cards to the DOM
const cardList = new Section({
  items: initialCards,
  renderer: (cardInfo) => {
    const card = new Card({
      data: cardInfo,
      handleCardClick: (link, name) => {
        imagePopup.open(link, name);
      }
    }, ".card-template")
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, ".cards__grid")
cardList.renderItems();

const userData = new UserInfo({
  nameSelector: ".profile__title", 
  jobSelector: ".profile__subtitle"
})

const imagePopup = new PopupWithImage(".modal_type_image");

const editProfilePopup = new PopupWithForm({
  popupSelector: ".modal_type_edit-profile",
  handleFormSubmit: (inputValues) => {
    //change name and job on submit
    userData.setUserInfo(inputValues.username, inputValues.title);
    editProfilePopup.close();
  }
});

const addCardPopup = new PopupWithForm({
  popupSelector: ".modal_type_add-card",
  handleFormSubmit: (cardValues) => {
    const newCard = new Card({
      data: cardValues, 
      handleCardClick: (link, name) => {
        imagePopup.open(link, name)
      }
    }, ".card-template")
    const generateNewCard = newCard.generateCard();
    cardList.addItem(generateNewCard);
  }
})

//SET EVENT LISTENERS
imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();


editButton.addEventListener("click", () => { 
  userData.getUserInfo({name:nameInput.value, job:titleInput.value});
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


/*import 'regenerator-runtime/runtime';
import "./pages/index.css"; 
import { settings } from "./utils/utils.js"; 
import Card from "./components/Card.js"; 
import FormValidator from "./components/FormValidator.js"; 
import PopupWithImage from "./components/PopupWithImage.js"; 
import PopupWithForm from "./components/PopupWithForm.js"; 
import Section from "./components/Section.js"; 
import UserInfo from "./components/UserInfo.js"; 
import Api from "./components/Api.js";
 
import { 
  editButton, 
  addButton, 
  nameInput, 
  titleInput, 
  cardTitleInput, 
  cardUrlInput, 
  initialCards } from "./utils/constants.js";
 
//validators 
const editProfileValidator = new FormValidator(settings, document.querySelector(".form_type_edit-profile")); 
const addCardValidator = new FormValidator(settings, document.querySelector(".form_type_add-card")); 
editProfileValidator.enableValidation(); 
addCardValidator.enableValidation();

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-7",
  headers: {
    authorization: "0c109f26-b662-41c6-bcff-35a6cf5888c5",
    "Content-Type": "application/json"
  }
});

//add new card functionality 
  const newCard = cardItem => {
    const card = new Card({ 
      data: cardItem,  
      handleCardClick: (url, caption) => { 
      imagePopup.open(url, caption); 
      } 
    }, ".card-template") 
    return card.generateCard(); 
  }

//load cards from the server
api.getInitialCards()
  .then(res => {
    //store logic to create card instances and add to DOM 
    const cardsList = new Section({ 
      items: res,
      renderer: (cardInfo) => { 
        cardsList.addItem(newCard(cardInfo)); 
      }, 
    }, ".cards__grid" 
    );    
    cardsList.renderItems();

    //adds new card based on title input and url input 
    const addCardPopup = new PopupWithForm ({
      popupSelector: ".modal_type_add-card", 
      handleFormSubmit: (inputValues) => {
        api.addCard({name: inputValues.place, link: inputValues.website})
          .then(inputValues => {
            cardsList.addItem(newCard(inputValues))
          })
        addCardPopup.close(); 
      } 
    });
      addCardPopup.setEventListeners();
      addButton.addEventListener("click", () => { 
        addCardPopup.open(); 
        addCardValidator.resetValidation(); 
      });
  })

//set default user info
api.getUsersInfo()
  .then(res => {
    userData.setUserInfo(res.name, res.about)
  })

//retrieve user information 
const userData = new UserInfo ({ 
  nameSelector: ".profile__title", 
  jobSelector: ".profile__subtitle" 
}); 
 
//opens popup image 
const imagePopup = new PopupWithImage(".modal_type_image"); 

//adds new user info based on name and title input 
const editProfilePopup = new PopupWithForm ({ 
  popupSelector: ".modal_type_edit-profile", 
  handleFormSubmit: (profileData) => {
    api.editProfile({name: profileData.username, about: profileData.title})
      .then(res => {
        userData.setUserInfo(res.name, res.about)
      })
    editProfilePopup.close(); 
  } 
}); 
 
//setEventListeners 
editProfilePopup.setEventListeners(); 
//addCardPopup.setEventListeners();
imagePopup.setEventListeners(); 
 
//get user info and display in the open form 
editButton.addEventListener("click", () => { 
  userData.getUserInfo({name:nameInput.value, job:titleInput.value});
  const userFormData = userData.getUserInfo(); 
  nameInput.value = userFormData.name; 
  titleInput.value = userFormData.job; 
  editProfilePopup.open(); 
  editProfileValidator.resetValidation(); 
});*/