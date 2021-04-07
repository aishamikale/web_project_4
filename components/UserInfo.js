export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._userName = document.querySelector(nameSelector);
        this._userJob = document.querySelector(jobSelector);
    }
    getUserInfo() {
        //returns object with info about the user
        return {
            name: this._userName.textContent,
            job:  this._userJob.textContent
        }
        
    }
    setUserInfo(name, job) {
        //takes new user data and adds it on the page
        this._userName.textContent = name;
        this._userJob.textContent = job;
    }
}

/*profileName.textContent = nameInput.value;
profileTitle.textContent = titleInput.value;*/