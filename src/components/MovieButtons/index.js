/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addMovieInWatchlist,
  addMovieInWatched,
  removeMovieInWatchlist,
  removeMovieInWatched,
} from '../../actions/watchlist';

// SCSS
import './moviebuttons.scss';

// COMPOSANTS EXTERNES
import Button from '../Button';

// IMPORTS D'ACTIONS
import { updateQuizResultIndex } from '../../actions/movies';
import { quizInit } from '../../actions/quiz';

export const MovieButtons = ({
  format, quizResults,
  resultsLength,
  currentIndex,
  updateResultsIndex,
  onResetQuizz,
  handleAddMovieWatchList,
  handleAddMovieInWatched,
  movieID,
  watchlist,
  watched,
  handleRemoveMovieInWatchlist,
  handleRemoveMovieInWatched,
  isLogged,
}) => {
  // On enregistre le nombre de réponses restantes dans le cas d'un résultat de quiz
  const resultsLeft = (resultsLength - currentIndex) - 1;

  return (
    <div className="movie-buttons">
      {isLogged
        ? !watched.includes(movieID)
          ? <Button textContent="Déjà vu ?" onClick={() => { handleAddMovieInWatched(movieID); handleRemoveMovieInWatchlist(movieID); }} />
          : (
            <Button
              selected
              textContent="déjà vu &#10004;"
              onClick={() => handleRemoveMovieInWatched(movieID)}
            />
          ) : null}

      {isLogged && !watched.includes(movieID)
        ? !watchlist.includes(movieID)
          ? <Button textContent="à voir ?" onClick={() => handleAddMovieWatchList(movieID)} />
          : (
            <Button
              selected
              textContent="à voir &#10004;"
              onClick={() => handleRemoveMovieInWatchlist(movieID)}
            />
          ) : null}

      {/* Affichage conditionnel si le format = full seulement */}
      {format === 'full' && (
        <>
          {/* Seulement s'il reste d'autres résultats, on affiche le bouton */}
          {resultsLeft > 0 ? (
            <Button
              to={`/movie/${quizResults[currentIndex + 1]}`}
              onClick={updateResultsIndex}
              textContent="Autre résultat"
            />
          ) : null}
          <Button to="/quiz" textContent="Lancer le quiz" onClick={onResetQuizz} />
          {resultsLeft > 0 ? (
            <div className="movie-buttons__other-results">
              {resultsLeft}
              {' '}
              {resultsLeft === 1 ? 'autre résultat correspond' : 'autres résultats correspondent'}
              {' '}
              à votre recherche.
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

MovieButtons.propTypes = {
  format: PropTypes.string.isRequired,
  quizResults: PropTypes.arrayOf(PropTypes.number).isRequired,
  resultsLength: PropTypes.number.isRequired,
  updateResultsIndex: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,
  onResetQuizz: PropTypes.func.isRequired,
  handleAddMovieWatchList: PropTypes.func.isRequired,
  handleAddMovieInWatched: PropTypes.func.isRequired,
  movieID: PropTypes.number.isRequired,
  watchlist: PropTypes.arrayOf(PropTypes.number),
  watched: PropTypes.arrayOf(PropTypes.number),
  handleRemoveMovieInWatchlist: PropTypes.func.isRequired,
  handleRemoveMovieInWatched: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
};
MovieButtons.defaultProps = {
  watchlist: [],
  watched: [],
};

const mapStateToProps = ({
  movies: {
    quizResults: {
      tmdbIDs: quizResults,
      currentIndex,
    },
  },
  ui,
  login,
}) => ({
  quizResults,
  resultsLength: quizResults.length,
  currentIndex,
  watchlist: ui.watchlist,
  watched: ui.watched,
  isLogged: login.isLogged,

});

const mapDispatchToProps = (dispatch) => ({
  updateResultsIndex: () => dispatch(updateQuizResultIndex()),
  onResetQuizz: () => {
    dispatch(quizInit());
  },
  handleAddMovieWatchList: (newWatchlistId) => {
    const action = addMovieInWatchlist(newWatchlistId);
    dispatch(action);
  },
  handleAddMovieInWatched: (newWatchedId) => {
    const action = addMovieInWatched(newWatchedId);
    dispatch(action);
  },
  handleRemoveMovieInWatched: (movieID) => {
    const action = removeMovieInWatched(movieID);
    dispatch(action);
  },
  handleRemoveMovieInWatchlist: (movieID) => {
    const action = removeMovieInWatchlist(movieID);
    dispatch(action);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieButtons);
