export const state = {
  search1: {},
  search2: {},

  choosen1: {
    id: '',
    short: {},
    full: {},
  },
  choosen2: {
    id: '',
    short: {},
    full: {},
  },

  disciplines: {
    name: ['Box Office', 'Awards', 'Metascore', 'IMDB Rating', 'IMDB Votes'],
    apiName: ['BoxOffice', 'Awards', 'Metascore', 'imdbRating', 'imdbVotes'],
    winners: [],
  },

  compare: false,
};

export const loadQuery = async (query, id) => {
  try {
    const response = await axios.get('https://www.omdbapi.com/', {
      params: {
        apikey: '2e5dce06',
        s: `${query}`,
      },
    });

    id === 1
      ? (state.search1 = response.data.Search)
      : (state.search2 = response.data.Search);
  } catch (err) {
    throw err;
  }
};

const loadFullQuery = async function (id) {
  try {
    const response = await axios.get('https://www.omdbapi.com/', {
      params: {
        apikey: '2e5dce06',
        i: `${id}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const loadChoosenShort = (movieID, id) => {
  if (id === 1) {
    state.choosen1.id = movieID;
    state.choosen1.short = state.search1.find(
      search => search.imdbID === movieID
    );
  }

  if (id === 2) {
    state.choosen2.id = movieID;
    state.choosen2.short = state.search2.find(
      search => search.imdbID === movieID
    );
  }
};

export const loadChoosenFull = async () => {
  const loadFull = async function (choosen) {
    const data = await loadFullQuery(state[choosen].id);
    state[choosen].full = data;
  };

  await loadFull('choosen1');
  await loadFull('choosen2');
};

export const checkBothChoosen = () => {
  if (
    Object.keys(state.choosen1.short).length &&
    Object.keys(state.choosen2.short).length
  )
    state.compare = true;
};

export const checkWinners = function () {
  state.disciplines.apiName.forEach(apiName => {
    const discPair = document.querySelectorAll(`[data-name='${apiName}']`);
    const [disc1, disc2] = [discPair[0], discPair[1]];
    let [val1, val2] = [disc1.textContent, disc2.textContent];

    val1 === 'N/A' ? (val1 = 0) : undefined;
    val2 === 'N/A' ? (val2 = 0) : undefined;

    if (val1 !== 0 && val2 === 0) state.disciplines.winners.push(disc1);
    if (val1 === 0 && val2 !== 0) state.disciplines.winners.push(disc2);

    if (val1 > val2) state.disciplines.winners.push(disc1);
    if (val1 < val2) state.disciplines.winners.push(disc2);
    if (val1 === val2) state.disciplines.winners.push('');
  });
};
