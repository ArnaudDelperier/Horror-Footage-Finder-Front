import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Button from '../Button';
import './style.scss';

export default function pageConfirm() {
  return (
    <>
      <Header />
      <div className="pageConfirm__container">
        <p className="pageConfirm__text">Un mail de confirmation vous a été envoyé, veuillez le confirmer pour finaliser votre compte.</p>
        <Button to="/" textContent="Retour à l'accueil" />
        {/* <NavLink className="pageConfirm__link" to="/">Page d&apos;accueil</NavLink> */}
      </div>
      <Footer />
    </>
  );
}
