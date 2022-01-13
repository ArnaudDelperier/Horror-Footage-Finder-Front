/* eslint-disable dot-notation */
import {
  SUBMIT_SETTINGS, DELETE_ACCOUNT, updateTextInfo,
} from '../actions/settings';
import {
  saveNewLoginState,
  clearUser,
} from '../actions/login';
import api from '../utils/api';

const settings = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_SETTINGS: {
      const submitSettings = async () => {
        try {
          const state = store.getState();
          let getPseudo = '';
          let getEmail = '';
          let getPassword = '';
          let response;

          // on verifie si le password a etait modifié.
          // Si oui, on envoie un requête patch sur la route de modification du password.
          if (state.settings.newPassword.length > 0) {
            // On vérifie que le password et la confirmation correspondent
            // sinon on ne lance pas la requête
            if (state.settings.newPassword === state.settings.newPasswordConfirm) {
              getPassword = state.settings.newPassword;
              // eslint-disable-next-line dot-notation
              api.defaults.headers.common['authorization'] = `Bearer ${state.login.token}`;
              response = await api.patch(`user/${state.login.id}/change`, {
                password: getPassword,
              });
            } else {
              store.dispatch(updateTextInfo('Le mot de passe doit correspondre à la confirmation'));
            }
          } else {
          // Si non, c'est que ce sont le mail/pseudo qui ont été modifié.
          // on vérifie que les modifs reçus soit ok pour les changer en BDD
            if (state.settings.newPseudo.length > 0) {
              getPseudo = state.settings.newPseudo;
            } else {
              getPseudo = state.login.pseudo;
            }

            if (state.settings.newEmail.length > 0) {
              getEmail = state.settings.newEmail;
            } else {
              getEmail = state.login.email;
            }

            api.defaults.headers.common['authorization'] = `Bearer ${state.login.token}`;
            response = await api.patch(`user/${state.login.id}`, {
              pseudo: getPseudo,
              email: getEmail,
            });
            localStorage.setItem('pseudo', getPseudo);
            localStorage.setItem('email', getEmail);
          }
          // on vérifie qu'il y a une réponse (utilise pour renvoyer
          // un message d'erreur sur la foncirmation du password)
          if (response) {
            // on vérifie que la réponse contient des datas pour un update le state
            if (response.data) {
              store.dispatch(saveNewLoginState(response.data.data));
            }
          }
        } catch (error) {
          store.dispatch(updateTextInfo('Erreur lors de la modifications des informations personnelles'));
        }
      };
      submitSettings();
      break;
    }
    case DELETE_ACCOUNT: {
      const deleteAccount = async () => {
        const state = store.getState();
        try {
          api.defaults.headers.common['authorization'] = `Bearer ${state.login.token}`;
          await api.delete(`user/${state.login.id}`);
          store.dispatch(clearUser());
        } catch (error) {
          store.dispatch(updateTextInfo('Erreur lors de la suppression du compte'));
        }
      };
      deleteAccount();
      break;
    }
    default:
      next(action);
  }
};

export default settings;
