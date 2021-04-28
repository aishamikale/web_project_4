export default class Card {
    constructor ({ data, handleCardClick, handleDeleteClick, handleLikeClick }, userId, cardTemplateSelector) {
        this._link = data.link;
        this._name = data.name;
        this._id = data._id;
        this._owner = data.owner._id;
        this._userId = userId;
        this.__arrayOfLikes = data.likes;
        this._totalLikes = data.likes.length;
        this._cardTemplateSelector = cardTemplateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    }
    
    //return id num
    id() {
        return this._id;
    }

    deleteCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }

       //removes delete button from cards other than the owners - not functioning
    _deleteButton() {
        const cardTrashButton = this._cardElement.querySelector(".card__delete-button");
        if (this._owner !== this._userId) {
            cardTrashButton.remove();
            //cardTrashButton.classList.add("card__delete-button_display");
        }
    }

    //toggles like button
    toggleLikeButton() {
      const cardLikeButton = this._cardElement.querySelector(".card__like-button");
      cardLikeButton.classList.toggle("card__like_button_active");
    }

    //display amount of likes in the card__likes class
    displayTotalLikes(totalLikes) {
        this._cardElement.querySelector(".card__likes").textContent = totalLikes;
    }

    //create array from liked cards
    _handleCardLikes() {
        const cardLikeButton = this._cardElement.querySelector(".card__like-button");
        //make an array from the liked cards
        const cardLikes = Array.from(this.__arrayOfLikes);
        //iterate over each like and fill in heart if I have liked the card
        cardLikes.forEach(element => {
            if (element._id === this._userId) {
                cardLikeButton.classList.add("card__like_button_active");
            }
        })
    }

    _setEventListeners() {
        const cardLikeButton = this._cardElement.querySelector(".card__like-button");
        const cardDeleteButton = this._cardElement.querySelector(".card__delete-button");
        const cardImage = this._cardElement.querySelector(".card__image");

        cardDeleteButton.addEventListener("click", () => this._handleDeleteClick(this.id()));
        cardLikeButton.addEventListener("click", () => this._handleLikeClick(this._cardElement, this.id()));
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
        const cardLikeCount = this._cardElement.querySelector(".card__likes");

        cardImage.style.backgroundImage = `url(${this._link})`;
        cardImage.alt = this._name;
        cardTitle.textContent = this._name;
        cardLikeCount.textContent = this._totalLikes;


        this._setEventListeners();
        this._handleCardLikes();
        this._deleteButton();
        return this._cardElement;
    }
}