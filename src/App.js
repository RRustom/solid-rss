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
            <p className="content">Please connect to your Pod to start taking notes.</p>
            <PodConnector/>
          </div>
        </section>
      </LoggedOut>
    </div>
  )
}

export default App;
