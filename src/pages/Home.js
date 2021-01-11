import { useMemo, useState } from 'react';
import { LogoutButton, useWebId } from '@solid/react';
import { foaf } from 'rdf-namespaces';

import Profile from '../pages/Profile';
import Dashboard from '../components/Dashboard';
import { useProfile } from '../hooks/useProfile';
import { getPodData } from '../helpers/getPodData';

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

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={handleClick}
        >
          {showProfile ? "Feed" : "Profile"}
        </button>
      </div>
        {
          showProfile ? <Profile name={name} podData={podData} />: <Dashboard name={name} podData={podData} />
        }
      <footer className="footer">
        <div className="columns">
          <p className="column content">
            <a
              href="https://github.com/RRustom/solid-rss"
              title="View the source code on GitHub"
            >Source code</a>
          </p>
          <div className="column has-text-right">
            <LogoutButton className="button"/>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home;
