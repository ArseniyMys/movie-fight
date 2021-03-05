import View from './View.js';

class ResultsView extends View {
  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const id = e.target.parentElement.dataset.id;
      handler(id);
    });
  }

  displayButton() {
    const btn = document.querySelector('.button-compare');

    btn.style.transform = 'scale(1)';
    btn.style.opacity = '1';
  }

  _updateStyle() {
    this._parentEl.style.maxHeight = '45rem';

    if (!Array.isArray(this._data)) this._parentEl.style.maxHeight = '15rem';
  }

  _generateMarkup() {
    let markup;
    if (!this._data) {
      markup = `<div class="search__movies-empty">No films found!</div>`;
    } else if (Array.isArray(this._data)) {
      markup = this._data
        .map(
          movie => `
          <li class="search__movies-item" data-id="${movie.imdbID}">
            <img src="${movie.Poster}" alt="Movie image" class="search__movies-img" />
            <h3 class="heading-3 search__movies-name">${movie.Title} <span class="search__movies-year">(${movie.Year})</span> </h3>
          </li>
        `
        )
        .join(' ');
    } else {
      const movie = this._data;
      markup = `
        <li class="search__movies-item" data-id="${movie.imdbID}">
          <img src="${movie.Poster}" alt="Movie image" class="search__movies-img" />
          <h3 class="heading-3 search__movies-name">${movie.Title} <span class="search__movies-year">(${movie.Year})</span> </h3>
        </li>
      `;
    }

    return markup;
  }
}

class ResultsView1 extends ResultsView {
  _parentEl = document.querySelector('#search__movies-1');
}
class ResultsView2 extends ResultsView {
  _parentEl = document.querySelector('#search__movies-2');
}

export const resultsView1 = new ResultsView1();
export const resultsView2 = new ResultsView2();
