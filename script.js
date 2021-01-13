const editButton = document.querySelector('.profile__edit-button'); //selector of the element you want to find
const closeButton = document.querySelector('.modal__button');
const form = document.querySelector('.form');
const modal = document.querySelector('.modal');
const nameInput = document.querySelector('.form__input_type_name');
const titleInput = document.querySelector('.form__input_type_title');
const profileName = document.querySelector('.profile__title');
const profileTitle = document.querySelector('.profile__subtitle');

//open and closes the modal
function toggleModal() {
    modal.classList.toggle('modal_open');
}

editButton.addEventListener('click', toggleModal)

closeButton.addEventListener('click', toggleModal)

//Changes and submits name and title info
form.addEventListener('submit', function(event) {
    event.preventDefault(); //prevent default behavior of refreshing page after clicking submit

    profileName.textContent = nameInput.value;
    profileTitle.textContent = titleInput.value;

    toggleModal();
})