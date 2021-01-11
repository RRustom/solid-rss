import { useEffect, useState } from 'react';
import { Router, Link } from '@reach/router';
import { LoggedIn, LoggedOut, LoginButton, useWebId } from '@solid/react';

import Home from './pages/Home';
import Profile from './pages/Profile';

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
          </div>
        </section>
      </LoggedOut>
    </div>
  )
}

export default App;
