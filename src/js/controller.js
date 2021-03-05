import * as model from './model.js';

import comparisonView from './views/comparisonView.js';
import { searchView1 } from './views/searchView.js';
import { searchView2 } from './views/searchView.js';
import { resultsView1 } from './views/resultsView.js';
import { resultsView2 } from './views/resultsView.js';

import { debouncer } from './utilities.js';

const controlSearch1 = async function () {
  const query = searchView1.getQuery();
  await model.loadQuery(query, 1);
  resultsView1.render(model.state.search1);
};
const controlSearch2 = async function () {
  const query = searchView2.getQuery();
  await model.loadQuery(query, 2);
  resultsView2.render(model.state.search2);
};

const controlMovieClick1 = function (choosenID) {
  if (!choosenID) return;

  model.loadChoosenShort(choosenID, 1);
  resultsView1.render(model.state.choosen1.short);
  model.checkBothChoosen();

  if (model.state.compare) resultsView1.displayButton();
};
const controlMovieClick2 = function (choosenID) {
  if (!choosenID) return;

  model.loadChoosenShort(choosenID, 2);
  resultsView2.render(model.state.choosen2.short);
  model.checkBothChoosen();

  if (model.state.compare) resultsView2.displayButton();
};

const controlComparison = async function () {
  await model.loadChoosenFull();
  comparisonView.render([
    model.state.choosen1.full,
    model.state.choosen2.full,
    model.state.disciplines,
  ]);

  model.checkWinners();
  comparisonView.updateWinners(model.state.disciplines.winners);
};

const init = function () {
  console.log('init');

  searchView1.addHandlerRender(controlSearch1);
  searchView2.addHandlerRender(controlSearch2);

  resultsView1.addHandlerClick(controlMovieClick1);
  resultsView2.addHandlerClick(controlMovieClick2);

  comparisonView.addHandlerClick(controlComparison);
};
init();
