import { schema } from 'rdf-namespaces';

const getFeedSources = (feedSourcesList) => {
  return feedSourcesList.getSubjectsOfType(schema.DataFeed);
}

export default getFeedSources;
