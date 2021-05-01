class Api {
    constructor({ baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    _checkResponse(res) {
      return res.ok ? res.json() : Promise.reject("Error!" + res.statusText);
    }

    getInitialCards() {
      return fetch(this._baseUrl + "/cards", {
        headers: this._headers
      })
      .then(this._checkResponse)
  }
    getUsersInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then(this._checkResponse)
    }

    //get user info and cards from the server
    getAppInfo() {
      return Promise.all([this.getUsersInfo(), this.getInitialCards()])
    }

    addCard({name, link}) {
      return fetch(this._baseUrl + "/cards", {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name,
          link
        })
      })
      .then(this._checkResponse)
    }
    editProfile({name, about}) {
      return fetch(this._baseUrl + "/users/me", {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name,
          about
        })
      })
      .then(this._checkResponse)
    }
    removeCard(cardId) {
      return fetch(this._baseUrl + "/cards/" + cardId, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(this._checkResponse)
    }
    //add likes PUT
    addLikes(cardId){
      return fetch(this._baseUrl + "/cards/likes/" + cardId, {
        method: "PUT",
        headers: this._headers,
      })
      .then(this._checkResponse)
    }
    removeLike(cardId){
      return fetch(this._baseUrl + "/cards/likes/" + cardId, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(this._checkResponse)
    }
    updateAvatar(avatar) {
      return fetch(this._baseUrl + "/users/me/avatar", {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar
        })
      })
      .then(this._checkResponse)
    }
}
  
export default Api;