    export default class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
        this._inputs = settings.inputs;
        this._button = settings.button;
    }
    _showErrorMessage(input) {
        const error = this._formElement.querySelector("#" + input.id + "-error");

        error.textContent = input.validationMessage;
    
        error.classList.add(this._settings.errorClass);
        input.classList.add(this._settings.inputErrorClass);
    }

    _hideErrorMessage(input) {
        const error = document.querySelector("#" + input.id + "-error");
        error.textContent = "";
    
        error.classList.remove(this._settings.errorClass);
        input.classList.remove(this._settings.inputErrorClass);
    }

    _checkInputValidity(input) {
        if(input.validity.valid) {
            this._hideErrorMessage(input);
        } else {
            this._showErrorMessage(input);
        }
    }

    _toggleButtonState() {
        const isValid = this._inputs.every((input) => input.validity.valid);
        if(isValid) {
            this._button.classList.remove(this._settings.inactiveButtonClass);
            this._button.disabled = false;
        } else {
            this._button.classList.add(this._settings.inactiveButtonClass);
            this._button.disabled = true;
        }
    }

    _setEventListeners() {
        this._inputs = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        this._button = this._formElement.querySelector(this._settings.submitButtonSelector);

        this._inputs.forEach((input) => {
            input.addEventListener("input", () => {
                this._checkInputValidity(input);
                this._toggleButtonState();
            });
        });

        this._formElement.addEventListener("reset", () => {
            this._inputs.forEach((input) => {
                this._hideErrorMessage(input);
            })
            this._button.disabled = true;
            this._button.classList.add(this._settings.inactiveButtonClass);
        })
    }

    resetValidation() {
        this._inputs.forEach((inputElement) => {
          this._hideErrorMessage(inputElement);
        });
  
        this._toggleButtonState();
      }

    enableValidation () {
        this._formElement.addEventListener("submit", (event) => {
            event.preventDefault();
        })

        this._setEventListeners();
    }
}