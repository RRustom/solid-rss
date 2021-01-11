import { useEffect, useState } from 'react';
import { LoggedIn, LoggedOut, LoginButton, useWebId } from '@solid/react';

import PodConnector from './components/PodConnector';

import Home from './pages/Home';

import styles from './App.module.scss'

const App = () => {
  return (
    <div className={styles.page}>
      <LoggedIn >
        <Home />
      </LoggedIn>
      <LoggedOut>
        <div className={styles.center}>
          <div className={styles.login}>
          <h1> A simple RSS reader for Solid </h1>
          <p className="content">Connect to your Pod to begin.</p>
          <PodConnector/>
          </div>
        </div>
      </LoggedOut>
    </div>
  )
}

export default App;
