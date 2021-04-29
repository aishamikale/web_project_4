import 'regenerator-runtime/runtime';
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
  cardUrlInput } from "./utils/constants.js";
import Popup from './components/Popup';

const deletePopup = document.querySelector(".modal_type_delete-card");
const cardPopup = document.querySelector(".modal_type_add-card");
const profilePopup = document.querySelector(".modal_type_edit-profile");
const photoPopup = document.querySelector(".modal_type_image");
const avatarPopup = document.querySelector(".modal_type_avatar");

const usernameInput = document.querySelector(".profile__title");
const jobInput = document.querySelector(".profile__subtitle");
const avatarInput = document.querySelector(".profile__avatar");

const templateSelector = document.querySelector(".card-template");

const avatarEditButton = document.querySelector(".avatar__overlay");
 
//validators 
const editProfileValidator = new FormValidator(settings, document.querySelector(".form_type_edit-profile")); 
const addCardValidator = new FormValidator(settings, document.querySelector(".form_type_add-card"));
const deleteCardValidator = new FormValidator(settings, document.querySelector(".form_type_delete-card"));
const avatarCardValidator = new FormValidator(settings, document.querySelector(".form_type_avatar"));

editProfileValidator.enableValidation(); 
addCardValidator.enableValidation();
deleteCardValidator.enableValidation();
avatarCardValidator.enableValidation();

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-7",
  headers: {
    authorization: "0c109f26-b662-41c6-bcff-35a6cf5888c5",
    "Content-Type": "application/json"
  }
});

const deleteCardPopup = new PopupWithForm(deletePopup);
deleteCardPopup.setEventListeners();

//get user info and cards from server
api.getAppInfo()
  .then(([userInfo, initialCards]) => {
    const userId = userInfo._id;

    //load initial cards from the server
    const cardsList = new Section({ 
      items: initialCards,
      renderer: (cardInfo) => { 
        cardsList.addItem(newCard(cardInfo)); 
      }, 
    }, ".cards__grid" 
    );    
    cardsList.renderItems();

    //adds new card based on title input and url input
    const addCardPopup = new PopupWithForm(cardPopup, (inputValues) => {
      api.addCard({name: inputValues.place, link: inputValues.website})
        .then(inputValues => {
          cardsList.addItem(newCard(inputValues))
          addCardPopup.close();
        })
    })
    addCardPopup.setEventListeners();
    addButton.addEventListener("click", () => { 
      addCardPopup.open(); 
      addCardValidator.resetValidation(); 
    });

    //Profile info set up via UserInfo class
      const userData = new UserInfo(usernameInput, jobInput, avatarInput);
      userData.setUserInfo({updatedName: userInfo.name, updatedJob: userInfo.about});
      userData.setUserAvatar({avatar: userInfo.avatar});

      //adds new user info based on name and title input
      const editProfilePopup = new PopupWithForm (profilePopup, (inputs) => {
        api.editProfile({name: inputs.username, about: inputs.title})
          .then(inputs => {
            userData.setUserInfo({updatedName: inputs.name, updatedJob: inputs.about})
            editProfilePopup.close()            
          })
      });

      //avatar
      const avatarEditPopup = new PopupWithForm(avatarPopup, (data) => {
        api.updateAvatar(data.avatar)
          .then((res) => {
            avatarInput.src = res.avatar;
            avatarEditPopup.close();
          })
          .catch(err => console.log(err));
      });

      avatarEditButton.addEventListener("click", () => {
        avatarEditPopup.open();
      });
      avatarEditPopup.setEventListeners();


      editProfilePopup.setEventListeners();
      //get user info and display in the open form 
      editButton.addEventListener("click", () => { 
        userData.getUserInfo({name:nameInput.value, job:titleInput.value});
        const userFormData = userData.getUserInfo(); 
        nameInput.value = userFormData.name; 
        titleInput.value = userFormData.job; 
        editProfilePopup.open(); 
        editProfileValidator.resetValidation(); 
      });

        //add new card functionality
        function newCard(cardItem) {
          const card = new Card({ 
            data: cardItem,  
            handleCardClick: (data) => { 
            imagePopup.open(data); 
            },
            //pass cardId to identify my images
            handleDeleteClick: (cardId) => {
              deleteCardPopup.open(cardId);
              deleteCardPopup.submitFormAction(() => {
                api.removeCard(cardId)
                .then(() => {
                  card.deleteCard();
                  deleteCardPopup.close();
                })
                .catch(err => console.log(err))
              })
            },
            handleLikeClick: (cardElement, cardId) => {
              if(cardElement.classList.contains(".card__like_button_active")) {
                api.removeLike(cardId)
                  .then(res => {
                    card.displayTotalLikes(res.likes.length);
                    card.toggleLikeButton();
                  })
                  .catch(err => console.log(err))
              } else {
                api.addLikes(cardId)
                  .then(res => {
                    card.displayTotalLikes(res.likes.length);
                    card.toggleLikeButton();
                  })
                  .catch(err => console.log(err))
              }
            }
          }, userId, templateSelector) 
          return card.generateCard(); 
        }


})


//opens popup image 
const imagePopup = new PopupWithImage(photoPopup); 

//setEventListeners 
// editProfilePopup.setEventListeners(); 
//addCardPopup.setEventListeners();
imagePopup.setEventListeners();