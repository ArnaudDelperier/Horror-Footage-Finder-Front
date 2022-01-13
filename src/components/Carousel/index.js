/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Arrow from '../Arrow';
import Movie from '../Movie';

import './carousel.scss';

// Le Carousel peux prendre deux formats :
// - format="small", avec l'affiche, les tags, le titre, les notes et les boutons de vues
// - format="mini", seulement avec l'affiche
export const Carousel = ({ format, movies, watchlist }) => {
  // On mappe la liste d'IDs TMDB reçus pour en afficher chaque composant Movie
  const movieList = movies.map((id) => (
    <div key={id} className="carousel__movie">
      <Movie format={format} movieID={id} />
    </div>
  ));

  const carouselList = useRef();
  const onClickArrowRight = () => {
    carouselList.current.scrollLeft += carouselList.current.offsetWidth;
  };
  const onClickArrowLeft = () => {
    carouselList.current.scrollLeft -= carouselList.current.offsetWidth;
  };

  // Gestion du slider et des flèches
  //! Gérer la taille dynamique du 2 (movies.length ?)
  const [fullLeftScroll, setFullLeftScroll] = useState(true);
  const [fullRightScroll, setFullRightScroll] = useState(false);
  useEffect(() => {
    const carouselScrollListener = () => {
      if (carouselList.current.scrollLeft === 0) {
        setFullLeftScroll(true);
      } else if (carouselList.current.scrollLeft
        >= carouselList.current.offsetWidth * (movies.length - 2) - 1) {
        setFullRightScroll(true);
      } else {
        setFullLeftScroll(false);
        setFullRightScroll(false);
      }
    };
    carouselList.current?.addEventListener('scroll', carouselScrollListener, { passive: true });

    return () => {
      carouselList.current?.removeEventListener('scoll', carouselScrollListener);
    };
  }, []);

  return (
    <div className={`carousel ${watchlist && ' carousel-watchlist'}`}>
      {fullLeftScroll || (
      <div className="carousel__arrow-back" onClick={onClickArrowLeft}>
        <Arrow type="rewind" size="md" />
      </div>
      )}
      <div className="carousel__list" ref={carouselList}>
        {movieList}
      </div>
      {fullRightScroll || (
      <div className="carousel__arrow-next" onClick={onClickArrowRight}>
        <Arrow type="forward" size="md" />
      </div>
      )}

    </div>
  );
};

Carousel.propTypes = {
  format: PropTypes.string,
  movies: PropTypes.arrayOf(
    PropTypes.number,
  ).isRequired,
  watchlist: PropTypes.bool,
};

Carousel.defaultProps = {
  format: 'small',
  watchlist: false,
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
