import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './menuTitle.scss';

// content pour le texte du titre
// title peut prendre 3 valeurs: "main", "sub", "sub-alt"
export function MenuTitle({ content, title }) {
  return (
    <>
      { title === 'main' ? (
        <h2 className="menu-title__main">
          &gt;:
          {content}
        </h2>
      ) : null }
      { title === 'sub' ? (
        <h2 className="menu-title__sub">
          :
          {content}
        </h2>
      ) : null }
      { title === 'sub-alt' ? <h3 className="menu-title__sub-alt">{content}</h3> : null }
    </>
  );
}

MenuTitle.propTypes = {
  content: PropTypes.string.isRequired,
  title: PropTypes.string,
};

MenuTitle.defaultProps = {
  title: 'sub',
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MenuTitle);
