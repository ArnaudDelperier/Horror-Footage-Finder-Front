import React from 'react';
import { connect } from 'react-redux';
import MenuItem from '../MenuItem';
import Header from '../Header';
import Footer from '../Footer';
// SCSS
import './profile.scss';

// COMPOSANTS IMPORTES
import MenuTitle from '../MenuTitle';

// RENDU DU COMPOSANT
export const Profile = () => (
  <>
    <Header />
    <div className="menu-holder">
      <MenuTitle content="compte utilisateur" title="main" />
      <div className="profile__container">
        <MenuItem to="/watchlist" textContent="watchlist" />
        <MenuItem to="/settings" textContent="parametres" />
        <MenuItem to="/" textContent="Retour à la page d'accueil" />
      </div>
    </div>
    <Footer />
  </>
);

Profile.propTypes = {
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
