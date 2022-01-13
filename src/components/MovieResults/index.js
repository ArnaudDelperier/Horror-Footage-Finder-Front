import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Arrow from '../Arrow';

import './movieresults.scss';

export const MovieResults = () => (
  <div className="movie-results">
    <p className="movie-results__textinfo">
      20 autres résultats correspondent à vos réponses.
    </p>
    <div className="movie-results__another-result">
      <NavLink to="/movie/10086">
        <Arrow />
        {' '}
        Me proposer un autre résultat parmi les mêmes critères
        {' '}
      </NavLink>
    </div>
    <div className="movie-results__another-quiz">
      {/* !!! PREVOIR LE ONCLICK RESET QUIZ !!! */}
      <NavLink to="/quiz">
        {' '}
        <Arrow type="double" />
        {' '}
        Relancer un test
        {' '}
      </NavLink>
    </div>
  </div>
);

MovieResults.propTypes = {
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MovieResults);
