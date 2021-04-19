class Api {
    constructor({ baseUrl, headers }) {
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
      return fetch(this._baseUrl + "/users/me", {
        headers: this._headers
      })
      .then(res => res.ok ? res.json() : Promise.reject("Error!" + res.statusText))
      .catch(err => console.log(err))
  }
  //post method, adds a new card
    postCard({ name, link }) {
      return fetch(this._baseUrl + "/cards", {
        headers: this._headers,
        method: "POST",
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(res => res.ok ? res.json() : Promise.reject("Error!" + res.statusText))
      .catch(err => console.log(err))
    }
}
  
export default Api;