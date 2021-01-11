import { useState } from 'react';
import { schema } from 'rdf-namespaces';

const Article = ({ article }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!article) {
    return null;
  }

  const articleURL = article.getString(schema.url)
  const articleName = article.getString(schema.name)

  return <>
    <article className="card">
      <div className="section content">
        <a href={articleURL}>{articleName}</a>
      </div>
    </article>
  </>;
};

export default Article;
