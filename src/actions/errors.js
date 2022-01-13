// Action de gestion d'erreur (TMDB ou API interne)
export const MOVIE_ERROR = 'MOVIE_ERROR';
export const movieError = (movieID, errorMessage) => ({
  type: MOVIE_ERROR,
  movieID,
  errorMessage,
});

export const SELECTION_ERROR = 'SELECTION_ERROR';
export const selectionError = (errorMessage) => ({
  type: SELECTION_ERROR,
  errorMessage,
});

export const QUIZ_ERROR = 'QUIZ_ERROR';
export const quizError = (errorMessage) => ({
  type: QUIZ_ERROR,
  errorMessage,
});
