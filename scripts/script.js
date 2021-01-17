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

function submitForm(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileTitle.textContent = titleInput.value;
    modal.classList.remove('modal_open');
}

form.addEventListener('submit', submitForm);