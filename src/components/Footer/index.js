import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './footer.scss';
import Clock from '../Clock';

const Footer = () => (
  <footer className="footer">
    <div className="footer__slp">
      SLP
      <Clock />
    </div>
    <NavLink className="footer__link" to="/credits">Credits</NavLink>
  </footer>
);

Footer.propTypes = {
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
