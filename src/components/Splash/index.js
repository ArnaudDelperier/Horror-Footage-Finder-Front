import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DelayLink from 'react-delay-link';
import { Redirect } from 'react-router-dom';
import { passSplash, toggleGlitch } from '../../actions/ui';

// SCSS
import './splash.scss';
import './glitch.scss';

// COMPONENTS
import Toggle from '../Toggle';
import Glitch from '../Glitch';

// FONCTION
export const Splash = ({
  onPassSplash, toggleAnimations, splashPassed, onToggleGlitch, glitch,
}) => {
  // La durée du splash, en millisecondes (par défaut : 4s)
  const splashTime = 4000;

  // Si jamais il y a déjà un splashPassed dans le localStorage, c'est qu'on est déjà passé ici
  // On redirige vers la page d'accueil !
  const splashPassedInLocalStorage = localStorage.getItem('splashPassed');
  if (splashPassedInLocalStorage) {
    return <Redirect to="/" />;
  }

  // La fonction pour l'animation de la page
  const onClickPlay = () => {
    onPassSplash();
    if (toggleAnimations) {
      const findMe = document.querySelector('.experiment-title');
      setTimeout(() => {
        findMe.classList.add('experiment-title__flicker');
        findMe.innerText = 'Found me';
      }, splashTime / 4);
      setTimeout(() => {
        findMe.innerText = 'Found you';
      }, splashTime / 2);
      setTimeout(() => {
        onToggleGlitch();
      }, splashTime - 750);
      setTimeout(() => {
        localStorage.setItem('splashPassed', true);
      }, splashTime);
    }
  };

  // Retour de fonction
  return (
    <div className="splash">
      {(glitch && toggleAnimations) && <Glitch />}
      <div className={`splash__launch-app ${toggleAnimations && 'portfolio-experiment'}`}>
        <div className="experiment-title">
          <DelayLink delay={toggleAnimations ? splashTime : 0} to="/" clickAction={onClickPlay} replace={false} className="experiment-title splash__launch-app">Find me</DelayLink>
        </div>
      </div>
      <div className="splash__options">
        <div className={`splash__options-item ${toggleAnimations && splashPassed && 'splash__fade-out'}`}>
          <Toggle textContent={toggleAnimations ? 'Animations activees' : 'Animations desactivees'} name="toggleAnimations" />
        </div>
      </div>
    </div>
  );
};

Splash.propTypes = {
  onPassSplash: PropTypes.func.isRequired,
  toggleAnimations: PropTypes.bool.isRequired,
  splashPassed: PropTypes.bool.isRequired,
  glitch: PropTypes.bool.isRequired,
  onToggleGlitch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ ui: { splashPassed, glitch, toggles: { toggleAnimations } } }) => ({
  toggleAnimations,
  splashPassed,
  glitch,
});

const mapDispatchToProps = (dispatch) => ({
  onPassSplash: () => {
    dispatch(passSplash());
  },
  onToggleGlitch: () => {
    dispatch(toggleGlitch());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
