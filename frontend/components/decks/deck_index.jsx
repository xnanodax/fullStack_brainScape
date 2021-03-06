import React from 'react';
import DeckIndexListItem from './deck_index_list_item';
import { Link } from 'react-router-dom';

class DeckIndex extends React.Component {
  componentDidMount() {
    const { fetchDecks } = this.props;
    fetchDecks();
  }

  componentWillUnmount() {
    this.props.clearDecks();
  }

  render() {
    const { decks, deckCount, currentDeckId } = this.props;
    const deckWord = deckCount === 1 ? (<p className="inline">Deck</p>) : (<p className="inline">Decks</p>);

    return (
          <div className="deck-index-container">
            <ul className="deck-index-title deck-index-item-padding">
              <div className="deck-header-box flexbox-row">
                <ul className="deck-header-box-text flexbox-column">
                  <li className="deck-header-font deck-title-padding">Your Decks</li>
                  <li> { deckCount } {deckWord} </li>
                </ul>

                <div>
                  <Link to="/deck/new">
                   <i className="fas fa-plus fa-2x green-dark-hover" aria-hidden="true"></i>
                  </Link>
                </div>

              </div>
            </ul>

            <ul className="all_decks">
              { decks.map((deck) => <DeckIndexListItem key={deck.id} deck={deck} currentDeck={deck.id === currentDeckId}/>) }
            </ul>
          </div>
    );
  }
}

export default DeckIndex;
