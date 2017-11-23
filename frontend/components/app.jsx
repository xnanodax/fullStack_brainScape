import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';

import SessionFormContainer from './session/session_form_container';
import HomePageNotLoggedInContainer from './homepage/homepage_not_logged_in_container';



import NavBarLoggedInContainer from './navbar_log/navbar_logged_in_container';
import DeckContainer from './decks/deck_container';
import DeckShowContainer from './decks/deck_show_container';

import {
  AuthRoute,
  ProtectedRoute
} from '../utils/route_util';

// <Redirect to ="/deck_feed" from="/" / >
const App = () => (
  <div className="app">
    <Redirect to="/login" from='/' />

    <Route path="/login" component={HomePageNotLoggedInContainer} />
    <Route path="/signup" component={HomePageNotLoggedInContainer} />

    <Route path="/deck_feed" component={DeckContainer} />
    <Route path="/deck_feed" component={NavBarLoggedInContainer} />
    <Route path="/deck/:deckId" component={DeckShowContainer} />
  </div>
);

export default App;

// <ProtectedRoute path="/deck_feed" component={SessionFormContainer} />

// <Route path="/" component={NavBarContainer} />
// <ProtectedRoute path="/deck_feed" component={SessionFormContainer} />



// NOTES
//ADD
// UPDATE LINK 19 component={DeckIndex}


// make 2 routes
// route render = {}
//
// make a master component
