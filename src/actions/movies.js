// Movies Actions
import api, { tmdbAPI } from '../utils/api';
import { movieError, selectionError } from './errors';

// Gestion du nombre de films vus dans les résultats de quiz
export const UPDATE_QUIZ_RESULT_INDEX = 'UPDATE_QUIZ_RESULT_INDEX';
export const updateQuizResultIndex = () => ({
  type: UPDATE_QUIZ_RESULT_INDEX,
});

// Action d'écriture du top 3 de la page d'accueil dans le state
export const SET_TOP_MOVIES = 'SET_TOP_MOVIES';
export const setTopMovies = (movies) => ({
  type: SET_TOP_MOVIES,
  movies,
});
// Middleware pour récupérer le top 3 depuis l'API HFF
// via Redux-Thunk
//! Add catch logic !
export const getTopMovies = (nbOfMovies) => (dispatch) => {
  api.get(`selection/${nbOfMovies}`)
    .then((response) => {
      // On récupère la data (id et tmdbId)
      const { data: { data } } = response;
      // On filtre pour ne sortir que les tmdbIDs dans un array simple
      const topTmdbMovies = data.map(({ id: tmdbID }) => (tmdbID));
      dispatch(setTopMovies(topTmdbMovies));
    }).catch((error) => {
      const errorMessage = error.response.data.error;
      dispatch(selectionError(errorMessage));
    });
};

// Action d'écriture des données API des films dans le state
export const SET_MOVIE_DATA = 'SET_MOVIE_DATA';
export const setCurrentMovie = (movieID, tmdbData, format) => ({
  type: SET_MOVIE_DATA,
  movieID,
  tmdbData,
  format,
});
// Middleware pour récupérer les données depuis l'API tierce TMDB (movieInfo, movieProviders)
// via Redux-Thunk
//! Add catch logic !
export function fetchMovie(movieID, format, isSeries) {
  // On conditionne les paramètres de requêtes (API, langage)

  // On construit le coeur de la requête selon les données qu'on souhaite obtenir
  // et l'ID TMDB du film souhaité
  let request;
  switch (format) {
    case 'data':
      request = `${isSeries ? 'tv' : 'movie'}/${movieID}`;
      break;

    case 'providers':
      request = `${isSeries ? 'tv' : 'movie'}/${movieID}/watch/providers`;
      break;

    default:
      break;
  }

  // On assemble la requête complète
  return (dispatch) => {
    // On execute la requête, grâce au constructeur axios.create()
    tmdbAPI.get(request)
      .then((response) => {
        // Selon le format de données souhaités,
        // on conditionne là où chercher les datas dans response
        // on transfère le format (data, providers...) pour que le reducer sache où ranger l'info
        switch (format) {
          case 'data':
            dispatch(setCurrentMovie(movieID, response.data, format));
            break;

          case 'providers':
            dispatch(setCurrentMovie(movieID, response.data.results.FR, format));
            break;

          // Par défaut, on renvoie les données response.data standards
          default:
            dispatch(setCurrentMovie(movieID, response.data, format));
            break;
        }
      })
      .catch(() => {
        const errorMessage = 'Une erreur est survenue avec l\'API TMDB';
        dispatch(movieError(movieID, errorMessage));
      });
  };
}

// Action d'écriture des tags et des moyennes générales des films dans le state
export const SET_MOVIE_INT_DATA = 'SET_MOVIE_INT_DATA';
export const setMovieIntData = (movieID, tags, movieRatings) => ({
  type: SET_MOVIE_INT_DATA,
  movieID,
  tags,
  movieRatings,
});

// Création d'un middleware pour la récupération des tags et de la moyenne d'un film
// et leur inscription dans le state
export function fetchMovieIntData(movieID) {
  return (dispatch) => {
    api.get(`movie/${movieID}`)
      .then((response) => {
        const { tags, movieRatings } = response.data;
        dispatch(setMovieIntData(movieID, tags, movieRatings));
      })
      .catch((error) => {
        const errorMessage = error.response.data.error;
        dispatch(movieError(movieID, errorMessage));
      });
  };
}

// Clear Quiz Result
export const CLEAR_QUIZ_RESULT = 'CLEAR_QUIZ_RESULT';
export const clearQuizResult = () => ({
  type: CLEAR_QUIZ_RESULT,
});
