import {
  PASS_SPLASH,
  TOGGLE_ACTION,
  TOGGLE_MODAL,
  TOGGLE_GLITCH,
} from '../actions/ui';
import {
  SUBMIT_WATCHLIST_AND_WATCHED,
  ADD_MOVIE_IN_REDUCER,
  REMOVE_MOVIE_IN_REDUCER,
} from '../actions/watchlist';
import {
  LOCALSTORAGEMODIFYUI,
} from '../actions/login';

const initialState = {
  splashPassed: false,
  toggles: {
    toggleAnimations: true,
    toggleSound: false,
    toggleExcludingWatched: false,
    // chaque nouvel état par défaut de toggle s'ajoute ici
  },
  watchlist: null,
  watched: null,
  modal: false,
  glitch: false,
};

const UIreducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCALSTORAGEMODIFYUI: {
      let watchListStorage = null;
      let watchedStorage = null;

      watchListStorage = action.watchlistStorage;
      watchedStorage = action.watchedStorage;

      return {
        ...state,
        watchlist: watchListStorage,
        watched: watchedStorage,
      }; }
    case PASS_SPLASH:
      return {
        ...state,
        splashPassed: true,
      };
    case ADD_MOVIE_IN_REDUCER: {
      const newList = [...state[action.name], action.newMovie];
      localStorage.setItem(action.name, newList.join());
      return {
        ...state,
        [action.name]: [...state[action.name], action.newMovie],
      };
    }
    case REMOVE_MOVIE_IN_REDUCER: {
      const newList = state[action.name].filter((movieID) => movieID !== action.idRemoveMovie);
      localStorage.setItem(action.name, newList.join());
      return {
        ...state,
        [action.name]: newList,
      }; }
    case SUBMIT_WATCHLIST_AND_WATCHED:
      return {
        ...state,
        watchlist: action.watchlist,
        watched: action.watched,
      };
    case TOGGLE_ACTION:
      return {
        ...state,
        toggles: {
          ...state.toggles,
          [action.toggleName]: !state.toggles[action.toggleName],
        },
      };

    case TOGGLE_MODAL:
      return {
        ...state,
        modal: !state.modal,
      };

    case TOGGLE_GLITCH:
      return {
        ...state,
        glitch: !state.glitch,
      };

    default:
      return state;
  }
};

export default UIreducer;
