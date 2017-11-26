import { combineReducers } from 'redux';
import session from './session_errors_reducer';
import DecksErrorReducer from './decks_error_reducer';
import CardsErrorReducer from './cards_errors_reducer';
import TaggingsErrorReducer from './taggings_errors_reducer';

const errorsReducer = combineReducers({
  session,
  decks: DecksErrorReducer,
  cards: CardsErrorReducer,
  tags: TaggingsErrorReducer
});

export default errorsReducer;
