import FeedSourceList from '../components/FeedSourceList';
import Articles from '../components/Articles';

const Profile = ({ podData }) => {

  return (
    <div>
      <h2>Feeds: </h2>
      <FeedSourceList podData={podData} />
      <h2>Saved Articles: </h2>
      <Articles podData={podData} />
    </div>
  )
}

export default Profile;
