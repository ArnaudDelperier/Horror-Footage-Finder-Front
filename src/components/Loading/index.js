import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

export const Loading = () => {
  // On gère les petits points qui s'affichent :)
  const [dots, setDots] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDots(`${dots}.`);
      if (dots.length > 5) {
        setDots('');
      }
    }, 500);
    // On n'oublie pas de clearTimeout, sans quoi, le setTimeOut se répète !
    return () => clearTimeout(timer);
  }, [dots]);

  return (
    <div className="loading-screen-ui">
      &gt;:Chargement
      {dots}
    </div>
  );
};

Loading.propTypes = {
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
