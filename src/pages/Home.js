import { useMemo, useState } from 'react';
import { LogoutButton, useWebId } from '@solid/react';
import { foaf } from 'rdf-namespaces';

import Profile from '../pages/Profile';
import Dashboard from '../components/Dashboard';
import { useProfile } from '../hooks/useProfile';
import { getPodData } from '../helpers/getPodData';

import styles from './home.module.scss';

const Home = () => {
  const [showProfile, setShowProfile] = useState(false);
  const webId = useWebId();
  const podData = useMemo(() => (typeof webId === 'string') ? getPodData(webId) : undefined, [webId]);
  const profile = useProfile(podData);

  if (!podData) {
    return (
      <section className="section">
        <p className="content">Loading data&hellip;</p>
      </section>
    );
  }

  const name = (profile) ? profile.getString(foaf.name) : null;

  const handleClick = (e) => {
    e.preventDefault()
    setShowProfile(sshowProfile => !showProfile)
  }

  const title = (name)
    ? `Welcome to your feed, ${name}`
    : 'Feed';

  return (
    <div className={styles.page}>
      <div className={styles.navContainer}>
        <div className={styles.nav}>
          <div className={styles.logoItems}>
            <h1 className={styles.logo}>
              Solid RSS
            </h1>
            <p>
              <a
                href="https://github.com/RRustom/solid-rss"
                title="View the source code on GitHub"
              >Source code</a>
            </p>
          </div>
          <h2 className={styles.welcome}>
            {title}
          </h2>

          <div className={styles.buttons}>
            <button
              type="button"
              onClick={handleClick}
              class={styles.profileButton}
            >
              {showProfile ? "Feed" : "Profile"}
            </button>
            <LogoutButton />
          </div>
        </div>
      </div>
      <div className={styles.contentContainer}>
        {
          showProfile ? <Profile name={name} podData={podData} />: <Dashboard name={name} podData={podData}/>
        }
      </div>
    </div>
  )
}

export default Home;
