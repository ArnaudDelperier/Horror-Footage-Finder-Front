import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './creditsElement.scss';

export const CreditsElement = ({ text }) => (
  <div className="credits-element">
    <div className="credits-element__text">
      {text}
    </div>
  </div>
);

CreditsElement.propTypes = {
  text: PropTypes.string.isRequired,
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(CreditsElement);
