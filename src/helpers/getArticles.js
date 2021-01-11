import { schema } from 'rdf-namespaces';

const getArticles = (articlesList) => {
  return articlesList.getSubjectsOfType(schema.WebPage);
}

export default getArticles;
