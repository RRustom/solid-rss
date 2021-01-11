import { rdf, schema } from 'rdf-namespaces';

const addFeed = async (name, source, feedList) => {
  const newFeed = feedList.addSubject();
  newFeed.addRef(rdf.type, schema.DataFeed);
  newFeed.addString(schema.name, name);
  newFeed.addString(schema.url, source)
  newFeed.addDateTime(schema.dateCreated, new Date(Date.now()))

  return await feedList.save([newFeed]);
}

export default addFeed;
