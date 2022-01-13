import axios from 'axios';
// on peut pré-configurer une instance d'axios
// ici on passe le baseUrl, ainsi quand on utilisera "api"
// on aura pas besoin de préciser cette valeur de baseUrl

const api = axios.create({
  baseURL: 'https://horror-footage-api.herokuapp.com/api/v1',
  // baseURL: 'http://localhost:3001/api/v1',
  withCredentials: true,
});

export const tmdbAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
    language: 'fr-FR',
  },
});

export default api;
