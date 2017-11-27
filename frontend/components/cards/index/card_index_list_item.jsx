import React from 'react';
import ClickToEdit from './../../click_to_edit/index.js';

const CardIndexListItem = ({num, card, deckId, updateCard, deleteCard}) => (
  <div>
    <div className="container">
      <div className="table-row wrapper">

        <div className="text-xsmall">
          {num}
        </div>

        <div className="text-short">
          <ClickToEdit
            className = "text-short"
            endEditing={
              (value) => {
                card.keyword = value;
                updateCard(deckId, card);
              }
            }
          >
          {card.keyword}
          </ClickToEdit>
        </div>

        <div className="text-long">
          <ClickToEdit
            className = "text-long"
            endEditing={
              (value) => {
                card.body = value;
                updateCard(deckId, card);
              }
            }
          >
          {card.body}
          </ClickToEdit>
        </div>

        <i className="fa fa-times fa-1x" aria-hidden="true" onClick={() => deleteCard(deckId, card.id)}>
        </i>


      </div>

    </div>
  </div>
);

export default CardIndexListItem;
