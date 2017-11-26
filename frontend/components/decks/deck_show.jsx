import React from 'react';
import { Link } from 'react-router-dom';

import DeckDetail from './deck_detail';

class DeckShow extends React.Component {

  componentDidMount(){
    const { fetchDeck, match } = this.props;
    fetchDeck(match.params.deckId);
  }

  render() {
    return (
      <div className="deck-show-container">
        <DeckDetail {...this.props} />
      </div>
    );
  }

}

export default DeckShow;
