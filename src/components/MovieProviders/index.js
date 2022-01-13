import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// IMPORT D'ACTIONS/DISPATCH
import { fetchMovie } from '../../actions/movies';
import mapProviders from '../../utils/mapProviders';

// SCSS
import './movieprovider.scss';

// COMPOSANTS EXTERNES
import Loading from '../Loading';

// RENDU DU COMPOSANT
export const MovieProviders = ({
  movieID, getMovieProviders, currentProviders,
}) => {
  // On récupère les providers du film à partir de l'API TMDB
  useEffect(() => {
    // On évite de relancer la requête si le film est déjà dans le store
    if (!currentProviders) {
      getMovieProviders(movieID);
    }
  }, [movieID]);

  // On empêche l'effet de bord si les datas du film
  // ne sont pas encore récupérées : si les datas d'un film sont vides, on retourne le loading.
  if (!currentProviders) {
    return <Loading />;
  }

  // On récupère les providers du film à partir du state
  // suivant l'ID du film. Par exemple, un film avec l'ID 123
  // sera récupéré à partir du state : state.movie.123.providers
  // Le currentProviders n'est jamais un objet vide,
  // car s'il l'est, on returne le Loading ci-dessus.
  // Si l'objet des providers est vide = requête réussie chez TMDB mais aucun provider.
  // On retourne un message général.
  if (Object.keys(currentProviders).length === 0) {
    return (
      <div className="movie-providers">
        <h3 className="movie-providers__title">
          Aucune méthode de streaming disponible pour ce film.
        </h3>
      </div>
    );
  }

  // On mappe chacun des différents providers (Streaming, Location) pour leur affichage.
  // La fonction est factorisée dans utils/mapProviders
  const rentProviders = mapProviders(currentProviders.rent);
  const streamProviders = mapProviders(currentProviders.flatrate);

  // Si tout va bien, on affiche les différents providers
  return (
    <div className="movie-providers">
      <div className="movie-providers__part">
        <h3 className="movie-providers__title">SVOD</h3>
        <div className="movie-providers__list">
          {streamProviders || 'Non disponible en SVOD'}
        </div>
      </div>
      <div className="movie-providers__part">
        <h3 className="movie-providers__title">VOD</h3>
        <div className="movie-providers__list">
          {rentProviders || 'Non disponible en VOD'}
        </div>
      </div>
    </div>
  );
};

MovieProviders.propTypes = {
  // FROM PARENT
  movieID: PropTypes.number.isRequired,
  // FROM REDUX STATE
  getMovieProviders: PropTypes.func.isRequired,
  currentProviders: PropTypes.shape({
    rent: PropTypes.arrayOf(PropTypes.shape({})),
    flatrate: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

MovieProviders.defaultProps = {
  currentProviders: null,
};

const mapStateToProps = ({ movies }, { movieID }) => ({
  // Le "?" est indispensable pour éviter une erreur au premier rendu du composant (pas de data)
  currentProviders: movies[movieID]?.providers,
});

const mapDispatchToProps = (dispatch) => ({
  getMovieProviders: (movieID) => {
    dispatch(fetchMovie(movieID, 'providers'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieProviders);
