/* eslint-disable dot-notation */
/* eslint-disable no-console */
import Cookies from 'universal-cookie';

import {
  LOGIN,
  toggleConnected,
  changeStateWhenConnected,
  errorMessage,
} from '../actions/login';
import {
  SUBMITREGISTER,
  deleteInfoInReducer,
} from '../actions/register';
import {
  submitWatchlistAndWatched,
  ADD_MOVIE_IN_WATCHED,
  ADD_MOVIE_IN_WATCHLIST,
  REMOVE_MOVIE_IN_WATCHED,
  REMOVE_MOVIE_IN_WATCHLIST,
  addMovieInReducer,
  removeMovieInReducer,
} from '../actions/watchlist';
import {
  RATE_MOVIE, saveRateInState,
} from '../actions/rating';
import api from '../utils/api';

const dataHorror = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMITREGISTER: {
      const submitRegister = async () => {
        try {
          const state = store.getState();
          const getPseudo = state.register.registerPseudo;
          const getEmail = state.register.registerEmail;
          const getPassword = state.register.registerConfirmPassword;
          await api.post('register/', {
            pseudo: getPseudo,
            email: getEmail,
            password: getPassword,
          });
          deleteInfoInReducer();
        } catch (error) {
          console.log('error', error);
        }
      };
      submitRegister();
      break;
    }

    case LOGIN: {
      const login = async () => {
        try {
          const state = store.getState();
          const getEmail = state.login.loginEmail;
          const getPassword = state.login.loginPassword;
          const response = await api.post('login', {
            email: getEmail,
            password: getPassword,
          });

          store.dispatch(changeStateWhenConnected(response.data.data));
          store.dispatch(submitWatchlistAndWatched(response.data.watchlist[0],
            response.data.watched[0]));
          if (response.data.data.pseudo) {
            store.dispatch(toggleConnected());
            localStorage.setItem('pseudo', response.data.data.pseudo);
            localStorage.setItem('email', response.data.data.email);
            if (response.data.watchlist !== null) {
              localStorage.setItem('watchlist', response.data.watchlist);
            }
            if (response.data.watched !== null) {
              localStorage.setItem('watched', response.data.watched);
            }
            localStorage.setItem('id', response.data.data.id);
            localStorage.setItem('timeStamp', response.data.time);
          }
        } catch (error) {
          console.dir(error.response.data.error);
          store.dispatch(errorMessage(error.response.data.error));
        }
      };
      login();
      break;
    }

    case RATE_MOVIE: {
      const rateMovieDataBase = async () => {
        try {
          const state = store.getState();
          const { value } = action;
          const { movieID } = action;
          // api.defaults.headers.common['authorization'] = `Bearer ${state.login.token}`;
          await api.put(`user/${state.login.id}/rating/movie/${movieID}`, {
            rating: value,
          });
          // TODO dispatch une action pour mettre la note du user dans le state.
          store.dispatch(saveRateInState(movieID, parseFloat(value)));
        } catch (error) {
          console.log('error', error);
        }
      };
      rateMovieDataBase();
      break;
    }

    case ADD_MOVIE_IN_WATCHED: {
      const submitAddMovieInWatched = async () => {
        try {
          const state = store.getState();
          const getWatched = state.ui.watched;
          const getIdUser = state.login.id;
          if (!getWatched.includes(action.newWatchedId)) {
            // api.defaults.headers.common['authorization'] = `Bearer ${state.login.token}`;
            await api.post(`user/${getIdUser}/watched/${action.newWatchedId}`);
            store.dispatch(addMovieInReducer('watched', action.newWatchedId));
          }
        } catch (error) {
          console.log('error', error);
        }
      };
      submitAddMovieInWatched();
      break;
    }

    case ADD_MOVIE_IN_WATCHLIST: {
      const submitAddMovieInWatchlist = async () => {
        try {
          const state = store.getState();
          const getWatchlist = state.ui.watchlist;
          if (!getWatchlist.includes(action.newWatchlistId)) {
            const getIdUser = state.login.id;
            // api.defaults.headers.common['authorization'] = `Bearer ${state.login.token}`;
            await api.post(`/user/${getIdUser}/watchlist/${action.newWatchlistId}`);
            store.dispatch(addMovieInReducer('watchlist', action.newWatchlistId));
          }
        } catch (error) {
          console.log('error', error);
        }
      };
      submitAddMovieInWatchlist();
      break;
    }

    case REMOVE_MOVIE_IN_WATCHED: {
      const submitRemoveMovieInWatched = async () => {
        try {
          const state = store.getState();
          console.log('newWatchlised', action.movieID);
          const getIdUser = state.login.id;
          console.log('getiduser', getIdUser);
          // api.defaults.headers.common['authorization'] = `Bearer ${state.login.token}`;
          const response = await api.patch(`user/${getIdUser}/watched/${action.movieID}`);
          console.log('remove watched', response);
          store.dispatch(removeMovieInReducer('watched', action.movieID));
        } catch (error) {
          console.log('error', error);
        }
      };
      submitRemoveMovieInWatched();
      break;
    }

    case REMOVE_MOVIE_IN_WATCHLIST: {
      const submitRemoveMovieInWatchlist = async () => {
        try {
          const state = store.getState();
          const getIdUser = state.login.id;
          // api.defaults.headers.common['authorization'] = `Bearer ${state.login.token}`;
          await api.patch(`/user/${getIdUser}/watchlist/${action.movieID}`);
          store.dispatch(removeMovieInReducer('watchlist', action.movieID));
        } catch (error) {
          console.log('error', error);
        }
      };
      submitRemoveMovieInWatchlist();
      break;
    }
    default:
      next(action);
  }
};

export default dataHorror;
