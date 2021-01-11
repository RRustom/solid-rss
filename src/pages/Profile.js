import FeedSourceList from '../components/FeedSourceList';
import Articles from '../components/Articles';

import styles from './profile.module.scss';

const Profile = ({ podData }) => {

  return (
    <div className={styles.container}>
      <div className={styles.content}>
      <h2>Feeds </h2>
      <FeedSourceList podData={podData} />
      <h2>Saved Articles </h2>
      <Articles podData={podData} />
      </div>
    </div>
  )
}

export default Profile;
