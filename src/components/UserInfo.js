export default class UserInfo {
    constructor( nameSelector, jobSelector, avatarSelector ) {
        this._userName = nameSelector;
        this._userJob = jobSelector;
        this._avatar = avatarSelector;
    }
    getUserInfo() {
        //returns object with info about the user
            return {name: this._userName.textContent, job: this._userJob.textContent};
    }
    setUserInfo({updatedName, updatedJob}) {
        //takes new user data and adds it on the page
        this._userName.textContent = updatedName;
        this._userJob.textContent = updatedJob;
    }
    getUserAvatar() {
        return {
            avatar: this._avatar.src
        }
    }
    setUserAvatar({avatar}) {
        this._avatar.src = avatar;
    }
}