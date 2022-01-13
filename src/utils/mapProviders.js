import React from 'react';

/** Cette fonction permet de mapper en strings les providers de chaque film.
 * @param {Array} providerData La liste des providers en Array (ex: currentMovieProviders.rent)
 * @returns {Array} La liste des providers mappés en string, ou null s'il n'y a pas de provider.
 */
const mapProviders = (providerData) => {
  // Empêche de crasher si la liste est vide (map ne fonctionne pas avec un tableau vide)
  if (!providerData) {
    return null;
  }
  // Sinon, on process le tableau
  return (
    providerData.map(
      (provider, index) => (
        <span key={provider.provider_id}>
          {provider.provider_name}
          {/* On retire la virgule de séparation si nous sommes sur le dernier élément */}
          { index < providerData.length - 1 ? ', ' : '' }
        </span>
      ),
    ));
};

export default mapProviders;
