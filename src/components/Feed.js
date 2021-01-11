import { useState, useEffect } from 'react';

import SaveButton from './SaveButton';
import { fetchFeed } from '../helpers/fetchFeed.js'

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
    <li key={item.link}>
      <div>
        [{feedName}]
        <a href={item.link}>{item.title}</a>
        <SaveButton articleName={item.title} articleURL={item.link} articlesList={articlesList}/>
      </div>
    </li>
  )

  return (
    <div>
      <ul>
        {listItems}
      </ul>
    </div>
  )
}

export default Feed;
