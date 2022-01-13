/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// SCSS
import './homepage.scss';

// COMPOSANTS EXTERNES
import Button from '../Button';
import Carousel from '../Carousel';
import Error from '../Error';
import Header from '../Header';
import Loading from '../Loading';
import Footer from '../Footer';

// IMPORTS D'ACTIONS/DISPATCH
import { getTopMovies } from '../../actions/movies';

// RENDU DU COMPOSANT
export const Homepage = ({
  loadTopMovies,
  topMovies: { loaded, tmdbIDs }, isLogged,
  errorMessage,
  errorSelection,
}) => {
  useEffect(() => {
    // Appel à l'API interne pour récupérer les 3 films les plus populaires
    // selon les utilisateurs du site
    loadTopMovies(3);
  }, []);

  return (
    <>
      <Header />
      <div className="homepage">
        <div className="homepage__main">
          <h2 className="homepage__title">
            &gt;: Votre cassette n&apos;attend que vous.
          </h2>
          <p className="homepage__subtitle">
            En quelques questions,
            <br />
            Trouvez le found footage parfait à voir ce soir.
          </p>
          <Button to="/quiz" textContent="● Lancer le quiz ●" className="button-ui__launch" />

          <div className="homepage__login">
            <h2 className="homepage__title">
              &gt;: Gérez votre filmothèque
            </h2>
            <p className="homepage__subtitle">Notez les films et marquez vos résultats comme vus ou à voir.</p>
            {isLogged ? (
              <Button to="/profile" textContent="Mon profil" />
            ) : (
              <Button to="/login" textContent="Se connecter" />
            )}
          </div>
        </div>

        <div id="home-carousel">
          {loaded ? (
            <>
              <h2 className="homepage__title">
                &gt;: La sélection
              </h2>
              <p className="homepage__subtitle">Découvrez les 3 films qui effraient le plus nos membres</p>
              <Carousel format="small" movies={tmdbIDs} />
            </>
          )
            : errorSelection ? (
              <Error errorMessage={errorMessage} />) : <Loading />}
        </div>
      </div>
      <Footer />
    </>
  );
};

Homepage.propTypes = {
  loadTopMovies: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  topMovies: PropTypes.shape({
    loaded: PropTypes.bool.isRequired,
    tmdbIDs: PropTypes.arrayOf(
      PropTypes.number,
    ),
  }).isRequired,
  errorSelection: PropTypes.bool,
  errorMessage: PropTypes.string,
};

Homepage.defaultProps = {
  errorSelection: false,
  errorMessage: '',
};

const mapStateToProps = ({
  movies: { topMovies },
  login: { isLogged },
}) => ({
  topMovies,
  isLogged,
  errorSelection: topMovies.error,
  errorMessage: topMovies.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  loadTopMovies: (movies) => {
    dispatch(getTopMovies(movies));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
