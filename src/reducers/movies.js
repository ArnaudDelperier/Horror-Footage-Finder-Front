import {
  SET_MOVIE_DATA, SET_TOP_MOVIES, SET_MOVIE_INT_DATA, UPDATE_QUIZ_RESULT_INDEX, CLEAR_QUIZ_RESULT,
} from '../actions/movies';

import {
  END_QUIZ, EDIT_QUIZ_ANSWERS,
} from '../actions/quiz';

import {
  SAVE_RATE_IN_STATE,
} from '../actions/rating';

import {
  MOVIE_ERROR, SELECTION_ERROR,
} from '../actions/errors';

const initialState = {
  topMovies: {
    loaded: false,
  },
  quizResults: {
    tmdbIDs: [],
    currentIndex: 0,
  },
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOP_MOVIES:
      return {
        ...state,
        topMovies: {
          loaded: true,
          tmdbIDs: action.movies,
        },
      };

    case SELECTION_ERROR:
      return {
        ...state,
        topMovies: {
          ...state.topMovies,
          loaded: false,
          error: true,
          errorMessage: action.errorMessage,
        },
      };

    case MOVIE_ERROR:
      return {
        ...state,
        [action.movieID]: {
          ...state[action.movieID],
          error: true,
          errorMessage: action.errorMessage,
        },
      };

    // Ce case sert à la fois à enregistrer les datas et les providers de chaque film.
    case SET_MOVIE_DATA: {
      return {
        //   On retourne le state précédent (state.movies)
        ...state,
        // On récupère l'id dynamique du film qu'on vient insérer dans le state.
        // Ex: state.movies.123.
        [action.movieID]: {
          // On récupère et insère les données du film 123, s'il y en a déjà.
          ...state[action.movieID],
          // On insère un paramètre spécifique pour chaque film, en l'occurence, data ou providers.
          // Par ex: state.movies.123.data | state.movies.123.providers.
          [action.format]: {
            // On insère les données de TMDB dans le state.
            // Ex: state.movies.123.data.movie_title | state.movies.123.providers.rent
            ...action.tmdbData,
          },
        },
      };
    }

    // Ce case sert à enregistrer les tags d'un film.
    case SET_MOVIE_INT_DATA: {
      return {
        ...state,
        [action.movieID]: {
          ...state[action.movieID],
          // On insère les données de notre api dans le state.
          // Ex: state.movies.123.tags
          tags: action.tags,
          hffRating: action.movieRatings,
        },
      };
    }

    // Arnaud WIP: on enregistre dans le state
    case SAVE_RATE_IN_STATE: {
      return {
        ...state,
        [action.movieID]: {
          ...state[action.movieID],
          userRating: action.value,
        },
      };
    }

    // On gère l'intégration des IDs TMDB dans le state.
    case END_QUIZ: {
      return {
        ...state,
        quizResults: {
          tmdbIDs: action.tmdbIDs,
          currentIndex: 0,
        },
      };
    }

    // Si l'utilisateur veut modifier la liste des films à afficher
    case EDIT_QUIZ_ANSWERS:
      return {
        ...state,
        quizResults: {
          ...state.quizResults,
          tmdbIDs: action.tmdbIDs,
        },
      };

    // On gère l'avancée dans les résultats de quiz
    case UPDATE_QUIZ_RESULT_INDEX: {
      return {
        ...state,
        quizResults: {
          ...state.quizResults,
          currentIndex: state.quizResults.currentIndex + 1,
        },
      };
    }

    // On gère la suppression des résultats de quiz
    case CLEAR_QUIZ_RESULT: {
      return {
        ...state,
        quizResults: {
          tmdbIDs: [],
          currentIndex: 0,
        },
      };
    }

    default:
      return state;
  }
};

export default moviesReducer;
