import { useState } from 'react';
import { schema } from 'rdf-namespaces';

import addArticle from '../helpers/addArticle';
import getArticles from '../helpers/getArticles';

const SaveButton = ({ articleName, articleURL, articlesList }) => {

  const articles = getArticles(articlesList)

  const articleExists = articles.some(article => article.getString(schema.url) === articleURL)

  const [isSaved, setIsSaved] = useState(articleExists)

  const saveArticle = async (name, url) => {
    const updatedArticles = await addArticle(name, url, articlesList);
  }

  const handleSave = (e) => {
    e.preventDefault();
    saveArticle(articleName, articleURL);
    setIsSaved(true);
  }

  return (
    <div>
      <button
        type='button'
        disabled={isSaved}
        onClick={handleSave}
      >
        {isSaved ? 'Saved!' : 'Save'}
      </button>
    </div>
  )
}

export default SaveButton;
