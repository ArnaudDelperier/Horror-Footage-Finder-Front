import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import api from '../../utils/api';

// GIF IMPORTS
import staticBG from '../../assets/images/static-wb.gif';
import glitch1 from '../../assets/images/glitch1-wb.gif';
import glitch2 from '../../assets/images/glitch2-wb.gif';
import glitch3 from '../../assets/images/glitch3-wb.gif';
import glitch4 from '../../assets/images/glitch4-wb.gif';

// SCSS
import './App.scss';
import './scanlines.scss';

// IMPORT D'ACTION/DISPATCH
import { localStorageModifyLOGIN, localStorageModifyUI } from '../../actions/login';

// COMPOSANTS EXTERNES
import Quiz from '../Quiz';
// import Header from '../Header';
// import Footer from '../Footer';
import Splash from '../Splash';
import Movie from '../Movie';
import Homepage from '../Homepage';
import Register from '../Register';
import Profile from '../Profile';
import Watchlist from '../Watchlist';
import Settings from '../Settings';
import Login from '../Login';
import Credits from '../Credits';
import NotFound from '../NotFound';
import Loading from '../Loading';
import Confirmation from '../pageConfirm';

// RENDU DE COMPOSANT
function App({
  splashPassed,
  handleLocalStorageModifyLOGIN,
  handleLocalStorageModifyUI,
  toggleAnimations,
}) {
  const [imgsLoaded, setImgsLoaded] = useState(false);
  const gifsToLoad = [staticBG, glitch1, glitch2, glitch3, glitch4];

  // Get CSRF Token and use it in every axios request
  const getCsrfToken = async () => {
    const { data: { csrfToken } } = await api.get('/csrf-token');
    // Make API requests with CSRF Token
    api.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
  };

  useEffect(() => {
    // Loading GIF Images to ensure smooth animations
    const loadImage = (image) => new Promise((resolve, reject) => {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        setTimeout(() => {
          resolve(image);
        }, 1000);
      };
      img.onerror = () => {
        reject(image);
      };
    });
    Promise.all(gifsToLoad.map((image) => loadImage(image))).finally(() => {
      setImgsLoaded(true);
    });

    // Get CSRF Token
    getCsrfToken();
  }, []);

  if (!imgsLoaded) {
    return (
      <div className="app-wrapper">
        <div className="app app__loading">
          <Loading />
        </div>
      </div>
    );
  }

  const email = localStorage.getItem('email');
  const pseudo = localStorage.getItem('pseudo');
  const id = localStorage.getItem('id');
  const watchlistItem = localStorage.getItem('watchlist');

  if (email && pseudo && id) {
    let watchlistArray = watchlistItem.split(',');
    if (watchlistItem.length > 0) {
      watchlistArray = watchlistArray.map((element) => parseInt(element, 10));
    } else {
      watchlistArray = [];
    }
    const watchedItem = localStorage.getItem('watched');
    let watchedArray = watchedItem.split(',');
    if (watchedItem.length > 0) {
      watchedArray = watchedArray.map((element) => parseInt(element, 10));
    } else {
      watchedArray = [];
    }

    handleLocalStorageModifyLOGIN(email, pseudo, true, id);
    handleLocalStorageModifyUI(watchlistArray, watchedArray);
  }

  // Quand on lance l'appli si la date actuel dépasse de 3h (10 800 000 ms) la
  // date de création du token on clear le localStorage
  if ((Date.now() - 10800000) > parseInt(localStorage.getItem('timeStamp'), 10)) {
    localStorage.clear();
  }

  return (
  // <div className={`app-wrapper ${toggleAnimations && 'scanlines app-wrapper__animated'}`}>
    <div className={`app-wrapper ${toggleAnimations && 'app-wrapper__animated'}`}>
      <div className="app">
        { splashPassed || <Redirect to="/splash" />}
        <Switch>
          {/* En tant qu'application basée sur l'expérience utilisateur,
        le splash passe toujours avant la home, d'où cette redirection. */}
          <Route path="/splash" component={Splash} />
          {/* <Header />
            <main className="app__content"> */}
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/movie/:id">
            <Movie />
          </Route>
          <Route path="/quiz">
            <Quiz />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/watchlist">
            <Watchlist />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/confirmation">
            <Confirmation />
          </Route>
          {/* test crédits */}
          <Route path="/credits">
            <Credits />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
          {/* </main>
            <Footer /> */}
        </Switch>
      </div>
    </div>
  );
}

App.propTypes = {
  splashPassed: PropTypes.bool.isRequired,
  handleLocalStorageModifyLOGIN: PropTypes.func.isRequired,
  handleLocalStorageModifyUI: PropTypes.func.isRequired,
  toggleAnimations: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ ui: { splashPassed, toggles: { toggleAnimations } } }) => ({
  splashPassed,
  toggleAnimations,
});

const mapDispatchToProps = (dispatch) => ({
  handleLocalStorageModifyLOGIN: (email, pseudo, bool, id) => {
    const action = localStorageModifyLOGIN(email, pseudo, bool, id);
    dispatch(action);
  },
  handleLocalStorageModifyUI: (watchlistStorage, watchedStorage) => {
    const action = localStorageModifyUI(watchlistStorage, watchedStorage);
    dispatch(action);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
