export default class Card {
    constructor ({ data, handleCardClick }, templateSelector) {
        this._link = data.link;
        this._name = data.name;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }
    
    _likeButton() {
      const cardLikeButton = this._cardElement.querySelector(".card__like-button");
      cardLikeButton.classList.toggle("card__like_button_active");
    }

    _deleteButton() {
        this._cardElement.remove();
    }

    _setEventListeners() {
        const cardLikeButton = this._cardElement.querySelector(".card__like-button");
        const cardDeleteButton = this._cardElement.querySelector(".card__delete-button");
        const cardImage = this._cardElement.querySelector(".card__image");

        cardDeleteButton.addEventListener("click", () => this._deleteButton());
        cardLikeButton.addEventListener("click", () => this._likeButton());
        cardImage.addEventListener("click", () => this._handleCardClick(this._link, this._name));
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(".card-template").content.querySelector(".card");

        return cardTemplate;
    }

    generateCard() {
        this._cardElement = this._getTemplate().cloneNode(true);
        const cardImage = this._cardElement.querySelector(".card__image");
        const cardTitle = this._cardElement.querySelector(".card__title");

        cardImage.style.backgroundImage = `url(${this._link})`;
        cardImage.alt = this._name;
        cardTitle.textContent = this._name;

        this._setEventListeners();
        return this._cardElement;
    }
}
