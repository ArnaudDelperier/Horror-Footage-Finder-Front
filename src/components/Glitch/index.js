import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// SCSS
import './glitch.scss';

// IMPORT D'ACTION/DISPATCH
import { toggleGlitch } from '../../actions/ui';

// RENDU DU COMPOSANT
export const Glitch = ({ glitch, onToggleGlitch }) => {
  const splashPassedInLocalStorage = localStorage.getItem('splashPassed');

  if (!glitch) {
    return null;
  }
  // On fait disparaître ce composant au bout de quelques secondes
  const glitchDiv = useRef(null);
  useEffect(() => {
    const glitchEffect = setTimeout(() => {
      onToggleGlitch();
    }, Math.random() * (400 - 200) + 750);

    return () => {
      clearTimeout(glitchEffect);
    };
  }, [glitch]);

  // Get a random number between 1 and 4
  const randomGlitch = Math.floor(Math.random() * (5 - 1) + 1);

  return (
    <div className={`glitch-ui glitch-ui__${!splashPassedInLocalStorage ? '1' : randomGlitch}`} ref={glitchDiv} />
  );
};

Glitch.propTypes = {
  glitch: PropTypes.bool.isRequired,
  onToggleGlitch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ ui: { glitch } }) => ({
  glitch,
});

const mapDispatchToProps = (dispatch) => ({
  onToggleGlitch: () => dispatch(toggleGlitch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Glitch);
