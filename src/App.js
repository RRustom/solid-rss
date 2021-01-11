import { useEffect, useState } from 'react';
import { Router, Link } from '@reach/router';
import { LoggedIn, LoggedOut, LoginButton, useWebId } from '@solid/react';

import PodConnector from './components/PodConnector';

import Home from './pages/Home';

const App = () => {
  return (
    <div>
      <LoggedIn>
        <Router>
          <Home path="/" />
        </Router>
      </LoggedIn>
      <LoggedOut>
        <section className="section">
          <div className="container">
            <LoginButton popup="popup.html" className="button is-large is-primary">
              Log in
            </LoginButton>
            <p className="content">Please connect to your Pod to start taking notes.</p>
            <p className="content">
              <PodConnector/>
            </p>
          </div>
        </section>
      </LoggedOut>
    </div>
  )
}

export default App;
