import { debouncer } from '../utilities.js';

export default class View {
  _data;
  _header = document.querySelector('.header');

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();

    this._clear(this._parentEl);
    this._parentEl.insertAdjacentHTML('afterbegin', markup);

    this._updateStyle();
  }

  _clear(element) { 
    element.innerHTML = '';
  }

  _updateStyle() {}
}
