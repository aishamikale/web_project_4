const editButton = document.querySelector('.profile__edit-button');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.modal__button');
const form = document.querySelector('.form');
let nameInput = document.querySelector('.form__input_type_name');
let titleInput = document.querySelector('.form__input_type_title');
let profileName = document.querySelector('.profile__title');
let profileTitle = document.querySelector('.profile__subtitle');

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

//form inputs
function submitForm(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileTitle.textContent = titleInput.value;
    modal.classList.remove('modal_open');
}

form.addEventListener('submit', submitForm);

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

  initialCards.forEach(function (data){
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const cardLikeButton = cardElement.querySelector(".card__like-button");
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");
    
    cardTitle.textContent = data.name;
    cardImage.style.backgroundImage = `url(${data.link})`;

    grid.prepend(cardElement);
  });