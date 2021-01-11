import React from 'react';
import deleteIcon from 'material-design-icons/action/svg/production/ic_delete_24px.svg';

import Article from './Article';

import {useDocument} from '../hooks/useDocument';
import byDate from '../helpers/byDate'
import getArticles from '../helpers/getArticles';

import styles from './feedSourceList.module.scss';

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
      <div className={styles.feedSourceElement}>
        <Article article={article} />
        <div>
          <a
            onClick={() => deleteArticle(article)}
            title="Delete this article"
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
      <hr/>
    </div>
  ));

  return (
    <div className={styles.container}>
      {articleListElements}
    </div>
  );
};

export default Articles;
