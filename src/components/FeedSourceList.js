import React from 'react';
import { schema } from 'rdf-namespaces';
import editIcon from 'material-design-icons/image/svg/production/ic_edit_24px.svg';
import deleteIcon from 'material-design-icons/action/svg/production/ic_delete_24px.svg';

import addFeed from '../helpers/addFeed';
import byDate from '../helpers/byDate';
import getFeedSources from '../helpers/getFeedSources';
import {useDocument} from '../hooks/useDocument';
import FeedSource from './FeedSource';
import NewFeedSource from './NewFeedSource';

import styles from './feedSourceList.module.scss';

const FeedSourceList = ({ podData }) => {
  const [feedList, updateFeedList] = useDocument(podData.feedSourcesDoc);
  const [feedInEditMode, setEditMode] = React.useReducer(
    (prevState, [feedSource, editMode]) => {
      if (editMode) {
        return prevState.concat(feedSource);
      }
      return prevState.filter((ref) => ref !== feedSource);
    },
    [],
  );

  if (!feedList) {
    return null;
  }
  const feedSourceList = getFeedSources(feedList);

  async function saveFeed(name, source) {
    if (!feedList) {
      return;
    }
    const updatedDoc = await addFeed(name, source, feedList);
    updateFeedList(updatedDoc);
  }

  async function editFeed(content, feedSource) {
    const feedDocument = feedList;
    if (!feedDocument) {
      return;
    }

    feedSource.setString(schema.text, content);
    feedSource.setDateTime(schema.dateModified, new Date(Date.now()));
    const updatedDoc = await feedDocument.save();
    if (updatedDoc) {
      setEditMode([feedSource.asRef(), false])
      updateFeedList(updatedDoc);
    }
    return updatedDoc.getSubject(feedSource.asRef());
  }

  async function deleteFeed(feedSource) {
    const feedDocument = feedList;
    if (!feedDocument) {
      return;
    }

    feedDocument.removeSubject(feedSource.asRef());
    const updatedDoc = await feedDocument.save();
    updateFeedList(updatedDoc);
  }

  const feedSourceElements = feedSourceList.sort(byDate).map((feedSource) => (
    <div key={feedSource.asRef()}>
      <div className={styles.feedSourceElement}>
          <FeedSource
            feedSource={feedSource}
            onChange={(updatedContent) => editFeed(updatedContent, feedSource)}
            onCancelEdit={() => setEditMode([feedSource.asRef(), false])}
            mode={feedInEditMode.includes(feedSource.asRef()) ? 'editing' : 'viewing'}
          />
        <div>
          <div>
            <a
              onClick={() => setEditMode([feedSource.asRef(), true])}
              title="Edit this feed"
              className={styles.action}
              role="button"
            >
              <span>
                <img src={editIcon} alt=""/>
              </span>
              Edit
            </a>
            <a
              onClick={() => deleteFeed(feedSource)}
              title="Delete this feed"
              className={styles.action}
              role="button"
            >
              <span>
                <img src={deleteIcon} alt=""/>
              </span>
              Delete
            </a>
          </div>
        </div>
      </div>
      <hr/>
    </div>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <NewFeedSource onSave={saveFeed}/>
      </div>
      <div className={styles.item}>
        {feedSourceElements}
      </div>
    </div>
  );
};

export default FeedSourceList;
