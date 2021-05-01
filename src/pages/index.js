import 'regenerator-runtime/runtime';
import "../pages/index.css";
import { settings } from "../utils/utils.js"; 
import Card from "../components/Card.js"; 
import FormValidator from "../components/FormValidator.js"; 
import PopupWithImage from "../components/PopupWithImage.js"; 
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js"; 
import UserInfo from "../components/UserInfo.js"; 
import Api from "../components/Api.js";
 
import {
  editButton, 
  addButton, 
  nameInput, 
  titleInput } from "../utils/constants.js";

const deletePopup = document.querySelector(".modal_type_delete-card");
const cardPopup = document.querySelector(".modal_type_add-card");
const profilePopup = document.querySelector(".modal_type_edit-profile");
const photoPopup = document.querySelector(".modal_type_image");
const avatarPopup = document.querySelector(".modal_type_avatar");

const usernameInput = document.querySelector(".profile__title");
const jobInput = document.querySelector(".profile__subtitle");
const avatarInput = document.querySelector(".profile__avatar");

const avatarEditButton = document.querySelector(".profile__avatar-overlay");
 
//validators 
const editProfileValidator = new FormValidator(settings, document.querySelector(".form_type_edit-profile")); 
const addCardValidator = new FormValidator(settings, document.querySelector(".form_type_add-card"));
const avatarCardValidator = new FormValidator(settings, document.querySelector(".form_type_avatar"));

editProfileValidator.enableValidation(); 
addCardValidator.enableValidation();
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
        cardsList.addItem(createNewCard(cardInfo)); 
      }, 
    }, ".cards__grid" 
    );    
    cardsList.renderItems();

    //adds new card based on title input and url input
    const addCardPopup = new PopupWithForm(cardPopup, (inputValues) => {
      api.addCard({name: inputValues.place, link: inputValues.website})
        .then(inputValues => {
          cardsList.addItem(createNewCard(inputValues))
          addCardPopup.close();
        })
        .catch(err => console.log(err))
    })

    //Profile info set up via UserInfo class
      const userData = new UserInfo(usernameInput, jobInput, avatarInput);
      userData.setUserInfo({updatedName: userInfo.name, updatedJob: userInfo.about});
      userData.setUserAvatar({avatar: userInfo.avatar});

      //adds new user info based on name and title input
      const editProfilePopup = new PopupWithForm (profilePopup, (inputs) => {
        api.editProfile({name: inputs.username, about: inputs.title})
          .then(userInputs => {
            userData.setUserInfo({updatedName: userInputs.name, updatedJob: userInputs.about})
            editProfilePopup.close()            
          })
          .catch(err => console.log(err))
      });

      //avatar
      const avatarEditPopup = new PopupWithForm(avatarPopup, (data) => {
        api.updateAvatar(data.avatar)
          .then((res) => {
            userData.setUserAvatar({avatar: res.avatar});
            //avatarInput.src = res.avatar;
            avatarEditPopup.close();
          })
          .catch(err => console.log(err));
      });

        //add new card functionality
        function createNewCard(cardItem) {
          const card = new Card({ 
            data: cardItem,  
            handleCardClick: (url, caption) => { 
            imagePopup.open(url, caption); 
            },
            //pass cardId to identify my images
            handleDeleteClick: (cardId) => {
              deleteCardPopup.open(cardId);
              deleteCardPopup.setSubmitFormAction(() => {
                api.removeCard(cardId)
                .then(() => {
                  card.deleteCard();
                  deleteCardPopup.close();
                })
                .catch(err => console.log(err))
              })
            },
            handleLikeClick: (likeButton, cardId) => {
              if(likeButton.classList.contains("card__like_button_active")) {
                api.removeLike(cardId)
                  .then(res => {
                    card.displayTotalLikes(res.likes.length);
                    card.toggleLikeButton(likeButton);
                  })
                  .catch(err => console.log(err))
              } else {
                api.addLikes(cardId)
                  .then(res => {
                    card.displayTotalLikes(res.likes.length);
                    card.toggleLikeButton(likeButton);
                  })
                  .catch(err => console.log(err))
              }
            }
          }, userId, ".card-template") 
          return card.generateCard(); 
        }


        const imagePopup = new PopupWithImage(photoPopup);
        //Event Listeners
        imagePopup.setEventListeners();
        avatarEditPopup.setEventListeners();
        editProfilePopup.setEventListeners();
        addCardPopup.setEventListeners();

        avatarEditButton.addEventListener("click", () => {
          avatarEditPopup.open();
        });
  
        //get user info and display in the open form 
        editButton.addEventListener("click", () => { 
          const userFormData = userData.getUserInfo(); 
          nameInput.value = userFormData.name; 
          titleInput.value = userFormData.job; 
          editProfilePopup.open(); 
        });

        addButton.addEventListener("click", () => { 
          addCardPopup.open(); 
        });

})
.catch(err => console.log(err))