import { useState, useEffect } from 'react';

import SaveButton from './SaveButton';
import { fetchFeed } from '../helpers/fetchFeed.js';

import styles from './feedList.module.scss';

const Feed = ({ feedSource, feedName, articlesList }) => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const getFeed = async () => {
      const feedItems = await fetchFeed(feedSource)
      setFeed([...feed, ...feedItems])
    }
    getFeed()
  }, []);

  const listItems = feed.map(item =>
    <div key={item.link} className={styles.feedItem}>
      <div>
        <span>
          [{feedName}]&nbsp;
        </span>
        <a href={item.link}>{item.title}</a>
        &nbsp;
      </div>
      <SaveButton articleName={item.title} articleURL={item.link} articlesList={articlesList}/>
    </div>
  )

  return (
    <div className={styles.container}>
      {listItems}
    </div>
  )
}

export default Feed;
