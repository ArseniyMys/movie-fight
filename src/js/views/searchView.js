import View from './View.js';

import { debouncer } from '../utilities.js';

class SearchView extends View {
  addHandlerRender(handler) {
    this._inputEl.addEventListener('input', debouncer(handler));
  }

  getQuery() {
    return this._inputEl.value;
  }
}

class SearchView1 extends SearchView {
  _parentEl = document.querySelector('#search__container-1');
  _inputEl = this._parentEl.querySelector('.search__input');
}

class SearchView2 extends SearchView {
  _parentEl = document.querySelector('#search__container-2');
  _inputEl = this._parentEl.querySelector('.search__input');
}

export const searchView1 = new SearchView1();
export const searchView2 = new SearchView2();
