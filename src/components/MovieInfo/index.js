import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// SCSS
import './movieinfo.scss';
import './vhs.scss';

// IMPORT D'ACTIONS/DISPATCH
import { fetchMovie, fetchMovieIntData } from '../../actions/movies';
import { fetchUserRatingOnSingleMovie } from '../../actions/rating';

// COMPOSANTS EXTERNES
import MovieButtons from '../MovieButtons';
import MovieRate from '../MovieRate';
import Divider from '../Divider';
import MovieProviders from '../MovieProviders';
import Error from '../Error';
import Loading from '../Loading';

// RENDU DU COMPOSANT
export const MovieInfo = ({
  movieID, getMovie, format, getMovieIntData,
  currentData, currentTags, isLogged, hffRating, userID, getUserRatingOnSingleMovie,
  error, errorMessage, tmdbIDs,
}) => {
  // On check si le film est une série ou non (bool)
  const isSeries = currentTags?.includes('series');

  // On récupère le film à partir de l'API
  useEffect(() => {
    // Appel API
    if (!currentTags) {
      getMovieIntData(movieID);
    }
    // On évite de relancer la requête si le film est déjà dans le store
    // On envoie si c'est une série
    // Appel TMDB
    if (!currentData && isSeries !== undefined) {
      getMovie(movieID, isSeries);
    }

    if (isLogged) {
      getUserRatingOnSingleMovie(userID, movieID);
    }
  }, [movieID, currentTags]);

  // S'il y a une erreur TMDB ou d'API interne, on affiche une erreur
  // On n'affiche le bouton retour que si le format est full (hors carousel)
  if (error) {
    return (
      <div>
        <Error errorMessage={errorMessage} goBackToHome={format === 'full'} />
      </div>
    );
  }

  // On empêche l'effet de bord si les datas du film
  // ne sont pas encore récupérées : si les datas d'un film sont vides, on retourne le loading.
  if (!currentData || !currentTags) {
    return <Loading />;
  }

  // On récupère les informations du film à partir du state
  // suivant l'ID du film. Par exemple, un film avec l'ID 123
  // sera récupéré à partir du state : state.movie.123.data
  // Le currentMovie n'est jamais un objet vide, car s'il l'est, on returne le Loading ci-dessus.

  const poster = format !== 'full' ? (
    <NavLink to={`/movie/${movieID}`}>
      <img className="movie-info__poster" src={`https://www.themoviedb.org/t/p/w300/${currentData.poster_path}`} alt={`${currentData.original_title} movie poster`} title={`${currentData.original_title} movie poster`} />
    </NavLink>
  )
    : (<img className="movie-info__poster" src={`https://www.themoviedb.org/t/p/w300/${currentData.poster_path}`} alt={`${currentData.original_title} movie poster`} title={`${currentData.original_title} movie poster`} />);

  if (format === 'mini') {
    return (
      <div className="movie-info">
        <div className="movie-info__left-side">
          {poster}
          <div>
            {isLogged && <MovieRate movieID={movieID} />}
          </div>
          <div className="movie-info__tags">
            {currentTags}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`movie-info ${format === 'full' && 'movie-info__full'}`}>
      {/* LEFT SIDE */}
      {/* ICI on peut checker dans le state si tmdbid.length > 0 si oui, c'est qu'on
      est après un quizz et on peut jouer l'animation */}
      <div className="movie-info__left-side">

        <div className="wrapper__vhs">
          {tmdbIDs.length > 0
            ? (
              <>
                <div id="vhs-background" />
                <div id="vhs">
                  <span id="dyan">Dynamicron</span>
                  T-120
                  <div id="footer">
                    <span id="footer-vhs">VHS</span>
                    <span id="footer-vid">VIDEO CASSETTE</span>
                  </div>
                </div>
                {poster}
              </>
            ) : (
              <>{ poster }</>
            )}
        </div>

        <div>
          {isLogged && <MovieRate movieID={movieID} />}
        </div>
        <div className="movie-info__tags">
          {currentTags}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="movie-info__right-side">
        <div className="movie-info__title">
          {isSeries ? currentData.original_name : currentData.original_title}
          {' '}
          -
          {' '}
          {isSeries ? currentData.first_air_date.slice(0, 4) : currentData.release_date.slice(0, 4)}
        </div>
        <div className="movie-info__rating">
          {hffRating && (
            <>
              Note HFF :
              {' '}
              {parseFloat(hffRating).toFixed(1)}
              /5
              <br />
            </>
          )}

          Note TMDB :
          {' '}
          {(currentData.vote_average / 2).toFixed(1)}
          /5
        </div>
        {/* On passe le format à MovieButtons pour qu'il affiche ou non les deux boutons de quiz */}
        <MovieButtons format={format} movieID={movieID} />

        {/* Affichage conditionnel de la description si le format est full */}
        {format === 'full' && (
          <>
            <Divider />
            <div className="movie-info__description">
              {/* Affichage conditionnel de la collection si le film en possède une */}
              {currentData.belongs_to_collection
              && (
                <div className="movie-info__collection">
                  Collection :
                  {' '}
                  {currentData.belongs_to_collection.name}
                </div>
              )}
              {currentData.overview}
            </div>
            <Divider />
            <MovieProviders movieID={movieID} />
          </>
        )}
      </div>
    </div>
  );
};

MovieInfo.propTypes = {
  movieID: PropTypes.number.isRequired,
  getMovie: PropTypes.func.isRequired,
  format: PropTypes.string.isRequired,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  currentData: PropTypes.shape({
    poster_path: PropTypes.string,
    original_title: PropTypes.string,
    original_name: PropTypes.string,
    release_date: PropTypes.string,
    overview: PropTypes.string,
    first_air_date: PropTypes.string,
    vote_average: PropTypes.number,
    belongs_to_collection: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  currentTags: PropTypes.string,
  getMovieIntData: PropTypes.func.isRequired,
  hffRating: PropTypes.number,
  isLogged: PropTypes.bool.isRequired,
  userID: PropTypes.number.isRequired,
  getUserRatingOnSingleMovie: PropTypes.func.isRequired,
  tmdbIDs: PropTypes.arrayOf(PropTypes.number).isRequired,
};

MovieInfo.defaultProps = {
  currentData: null,
  currentTags: null,
  hffRating: null,
  error: false,
  errorMessage: '',
};

const mapStateToProps = ({ movies, login: { id, isLogged } }, { movieID }) => ({
  // Le "?" est indispensable pour éviter une erreur au premier rendu du composant (pas de data)
  currentData: movies[movieID]?.data,
  // L'API nous retourne un array de tags : on le transforme en une string séparée par des ","
  currentTags: movies[movieID]?.tags?.join(', '),
  hffRating: movies[movieID]?.hffRating,
  error: movies[movieID]?.error,
  errorMessage: movies[movieID]?.errorMessage,
  isLogged,
  userID: id,
  tmdbIDs: movies.quizResults.tmdbIDs,
});

const mapDispatchToProps = (dispatch) => ({
  getMovie: (movieID, isSeries) => {
    dispatch(fetchMovie(movieID, 'data', isSeries));
  },
  getMovieIntData: (movieID) => {
    dispatch(fetchMovieIntData(movieID));
  },
  getUserRatingOnSingleMovie: (userID, movieID) => {
    dispatch(fetchUserRatingOnSingleMovie(userID, movieID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
