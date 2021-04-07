export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._classSelector = document.querySelector(classSelector);
  }
  renderItems() {
    //index.js will tell us what to do with renderer()
    this._renderedItems.forEach(item => this._renderer(item));
  }
  addItem(element) {
      this._classSelector.append(element);
  }
}

//items serves as an array of data, which you need to add on a page when initializing the class.
//renderer is a function responsible for creating and rendering data on a page, 
//index.js will tell us what to do with it.
//classSelector tells us where we'll add the elements