class Api {
    constructor({ baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
    getInitialCards() {
      return fetch(this._baseUrl + "/cards", {
        headers: this._headers
      })
      .then(res => res.ok ? res.json() : Promise.reject("Error!" + res.statusText))
      .catch(err => console.log(err))
  }
    getUsersInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then(res => res.ok ? res.json() : Promise.reject("Could not return user info " + res.statusText))
      .catch(err => console.log(err))
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
      .then(res => res.ok ? res.json() : Promise.reject("Could not add card " + res.statusText))
      .catch(err => console.log(err))
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
      .then(res => res.ok ? res.json() : Promise.reject("Could not update user information " + res.statusText))
      .catch(err => console.log(err))
    }
    removeCard(cardId) {
      return fetch(this._baseUrl + "/cards" + cardId, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(res => res.ok ? res.json() : Promise.reject("Could not delete card " + res.statusText))
      .catch(err => console.log(err))
    }
}
  
export default Api;