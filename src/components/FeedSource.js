import { useState } from 'react';
import Markdown from 'react-markdown';
import { schema } from 'rdf-namespaces';

const FeedSource = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [feedURL, setFeedURL] = useState(props.feedSource.getString(schema.url) || '');
  const [feedName, setFeedName] = useState(props.feedSource.getString(schema.name) || '');

  const saveFeedSource = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    const updatedName = await props.onChange(feedName);
    if (updatedName) {
      setFeedName(updatedName.getString(schema.name));
    }

    const updatedURL = await props.onChange(feedURL);
    if (updatedURL) {
      setFeedURL(updatedURL.getString(schema.url));
    }
    setIsSubmitting(false);
  };

  const cancelEdit = (event) => {
    props.onCancelEdit();
  };

  if (props.mode === 'editing') {
    const isLoading = isSubmitting ? 'is-loading' : '';

    return <>
      <form onSubmit={saveFeedSource} className="content">
        <div className="field">
          <div className="control">
          <label htmlFor="feedName">Feed Name:</label>
          <input
            name="feedName"
            value={feedName}
            onChange={(e) => { e.preventDefault(); setFeedName(e.target.value); }}
            type="text"
            required
          >
          </input>
          <label htmlFor="feedURL">Feed URL:</label>
          <input
            name="feedURL"
            value={feedURL}
            onChange={(e) => { e.preventDefault(); setFeedURL(e.target.value); }}
            type="url"
            required
          >
          </input>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              className={`button is-primary ${isLoading}`}
              disabled={isSubmitting}
            >Save</button>
          </div>
          <div className="control">
            <button onClick={cancelEdit} className="button is-text">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>;
  }

  return <>
    <article className="card">
      <div className="section content">
        <Markdown source={feedName || ''}/>
        <Markdown source={feedURL || ''}/>
      </div>
    </article>
  </>;
};

export default FeedSource;
