/* eslint-disable import/no-unresolved */
import React from 'react';
import { NavLink } from 'react-router-dom';
import './404.scss';
import ghostImage from '../../assets/images/halloween.png';

export default function NotFound() {
  return (
    <>

      <div className="fantome" style={{ backgroundImage: { ghostImage } }} />
      <div className="notfound__container">
        <span className="notfound__text">There&apos;s nothing here. You should leave. Now!</span>
        <NavLink className="notfound__link" to="/">GO HOME</NavLink>
        <span className="notfound__kill">OR I&rsquo;ll kill you!</span>
      </div>

    </>
  );
}
