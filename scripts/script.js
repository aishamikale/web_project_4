//modals
const modal = document.querySelector('.modal');
const editProfileForm = document.querySelector('.form_type_edit-profile');
const addCardForm = document.querySelector('.form_type_add-card');
const cardModal = document.querySelector('.modal_type_add-card')

//buttons
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.modal__button');
const addButton = document.querySelector('.profile__add-button');
const closeCardModalButton = cardModal.querySelector('.modal__button');


//profile section
let profileName = document.querySelector('.profile__title');
let profileTitle = document.querySelector('.profile__subtitle');

//form inputs
let nameInput = document.querySelector('.form__input_type_name');
let titleInput = document.querySelector('.form__input_type_title');
let cardTitleInput = document.querySelector('.form__input_type_card-title');
let cardUrlInput = document.querySelector('.form__input_type_url');



//edit profile modal
function openModal() {
    modal.classList.add('modal_open');
    nameInput.value = profileName.textContent;
    titleInput.value = profileTitle.textContent;
}

editButton.addEventListener('click', openModal);

function closeModal() {
    modal.classList.remove('modal_open');
}

closeButton.addEventListener('click', closeModal);

//add card modal
function openCardModal() {
    cardModal.classList.add('modal_open');
}

addButton.addEventListener('click', openCardModal);

function closeCardModal() {
    cardModal.classList.remove('modal_open');
}

closeCardModalButton.addEventListener('click', closeCardModal);

//form inputs
function submitForm(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileTitle.textContent = titleInput.value;
    modal.classList.remove('modal_open');
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

   /*cardLikeButton.addEventListener('click', ) {
      //changeLikestate()
    }

    cardDeleteButton.addEventListener('click',) {
      //handleCardDeleteClick()
    }

    cardImage.addEventListener('click',) {
      //open modal
    }*/
    return cardElement;
  }

 initialCards.forEach(function (data){
    const cardElement = createCardElement(data.name, data.link);
    grid.prepend(cardElement);
  });

  function addCard(event) {
    event.preventDefault();
    createCardElement();
    const cardElement = createCardElement(cardTitleInput.value, cardUrlInput.value);
    cardModal.classList.remove('modal_open');
}

addCardForm.addEventListener('submit', addCard);