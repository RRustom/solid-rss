import { useState } from 'react';

const NewFeedSource = ({ onSave }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [feedURL, setFeedURL] = useState('');
  const [feedName, setFeedName] = useState('');

  const saveFeedSource = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    await onSave(feedName, feedURL);
    setFeedURL('');
    setFeedName('');
    setIsSubmitting(false);
  };

  const isLoading = isSubmitting ? 'is-loading' : '';

  return <>
    <form onSubmit={saveFeedSource}>
      <div className="field">
        <div className="control">
          <label htmlFor="feedName">Feed Name:</label>
          <input
            name="feedName"
            placeholder="EFF"
            value={feedName}
            onChange={(e) => { e.preventDefault(); setFeedName(e.target.value); }}
            type="text"
            required
          >
          </input>
          <label htmlFor="feedURL">Feed URL:</label>
          <input
            name="feedURL"
            placeholder="ex:https://www.eff.org/rss/updates.xml"
            value={feedURL}
            onChange={(e) => { e.preventDefault(); setFeedURL(e.target.value); }}
            type="url"
            required
          >
          </input>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button
            type="submit"
            className={`button is-primary ${isLoading}`}
            disabled={isSubmitting}
          >Add Feed</button>
        </div>
      </div>
    </form>
  </>;
};

export default NewFeedSource;
