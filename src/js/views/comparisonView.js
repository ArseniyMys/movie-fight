import View from './View.js';

import { debouncer } from '../utilities.js';

class ComparisonView extends View {
  _parentEl = document.querySelector('.comparison');
  _btn = document.querySelector('.button-compare');
  _searchMoviesEl = [...document.querySelectorAll('.search__movies')];

  addHandlerClick(handler) {
    this._btn.addEventListener('click', function () {
      handler();

      [...document.querySelectorAll('.search__movies')].forEach(
        el => (el.style.maxHeight = '0')
      );
      document.querySelector('.button-compare').style.opacity = '0';
      document.querySelector('.button-compare').style.transform = 'scale(0)';
    });
  }

  updateWinners(winners) {
    winners.forEach(winner => winner.classList.add('discipline--winner'));
  }

  _generateMarkup() {
    const movies = [this._data[0], this._data[1]];
    const disciplines = this._data[2];

    let markup = '';

    markup += `
      <span class="discipline__empty"></span>
    `;

    disciplines.name.forEach(
      name => (markup += this._generateMarkupName(name))
    );

    movies.forEach(movie => {
      markup += `
        <img class="movie__img" src="${movie.Poster}" alt="Movie image"></img>
        <h3 class="heading-3 movie__name">${
          movie.Title
        }<span class="search__movies-year"> (${movie.Year}) </span></h3>
        ${disciplines.apiName
          .map(apiName => this._generateMarkupValue(movie[apiName], apiName))
          .join(' ')}
      `;
    });

    return markup;
  }

  _generateMarkupName(name) {
    return `<h3 class="heading-3 discipline__name">${name}</h3>`;
  }

  _generateMarkupValue(value, name) {
    if (!value) value = 'N/A';
    return `<p class="discipline__value" data-name="${name}">${value}</p>`;
  }

  _updateStyle() {
    this._parentEl.style.transform = 'scale(1)';
    this._parentEl.style.opacity = '1';
  }
}

export default new ComparisonView();
