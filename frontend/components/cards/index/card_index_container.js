import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CardIndex from './card_index';

import {
  fetchCards,
  fetchCard,
  updateCard
} from './../../../actions/card_actions';

const mapStateToProps = (state, ownProps) => ({
  cards: Object.values(state.entities.cards),
  deckId: ownProps.match.params.deckId
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchCards: (deckId) => dispatch(fetchCards(deckId)),
  updateCard: (deckId, card) => dispatch(updateCard(deckId, card))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CardIndex));