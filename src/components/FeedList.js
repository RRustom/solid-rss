import { useState, useEffect } from 'react';
import { schema } from 'rdf-namespaces';

import {useDocument} from '../hooks/useDocument';

import getArticles from '../helpers/getArticles';
import getFeedSources from '../helpers/getFeedSources';

import Feed from './Feed.js';

const FeedList = ({ podData }) => {
  const [feedSources, updateFeedSources] = useDocument(podData.feedSourcesDoc);
  const [articlesList, setArticlesList] = useDocument(podData.articlesDoc);

  if (!feedSources) {
    return null;
  }
  const sources = getFeedSources(feedSources);

  const articles = articlesList ? getArticles(articlesList) : null;

  const listItems = sources.map(source => {
    const url = source.getString(schema.url)
    const name = source.getString(schema.name)

    return (
      <li key={url}>
        <Feed feedSource={url} feedName={name} articlesList={articlesList} />
      </li>
    )
  })

  return (
    <div>
      <ul>
        {listItems}
      </ul>
    </div>
  )
}

export default FeedList;
