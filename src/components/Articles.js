import React from 'react';
import deleteIcon from 'material-design-icons/action/svg/production/ic_delete_48px.svg';

import Article from './Article';

import {useDocument} from '../hooks/useDocument';
import byDate from '../helpers/byDate'
import getArticles from '../helpers/getArticles';

const Articles = ({ podData }) => {
  const [articlesList, setArticlesList] = useDocument(podData.articlesDoc);

  if (!articlesList) {
    return null;
  }

  const articles = getArticles(articlesList);

  async function deleteArticle(article) {
    const articlesDocument = articlesList;
    if (!articlesDocument) {
      return;
    }

    articlesDocument.removeSubject(article.asRef());
    const updatedDoc = await articlesDocument.save();
    setArticlesList(updatedDoc);
  }

  const articleListElements = articles.sort(byDate).map((article) => (
    <div key={article.asRef()}>
      <div className="columns">
        <div className="column">
          <Article article={article} />
        </div>
        <div className="column is-narrow is-2-desktop">
          <nav className="panel">
            <a
              onClick={() => deleteArticle(article)}
              title="Delete this article"
              className="panel-block"
              role="button"
            >
              <span className="panel-icon">
                <img src={deleteIcon} alt=""/>
              </span>
              Delete
            </a>
          </nav>
        </div>
      </div>
      <hr/>
    </div>
  ));

  return (
    <>
      <section className="section">
        {articleListElements}
      </section>
    </>
  );
};

export default Articles;
