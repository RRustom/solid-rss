import { rdf, schema } from 'rdf-namespaces';

const addArticle = async (articleName, articleURL, articlesList) => {
  const newArticle = articlesList.addSubject();
  newArticle.addRef(rdf.type, schema.WebPage);
  newArticle.addString(schema.name, articleName);
  newArticle.addString(schema.url, articleURL)

  return await articlesList.save([newArticle]);
}

export default addArticle;
