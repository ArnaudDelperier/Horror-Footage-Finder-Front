import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers';
import dataHorror from '../middlewares/dataHorror';
import settings from '../middlewares/settings';

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(dataHorror, settings, thunk),
  ),
);

export default store;
