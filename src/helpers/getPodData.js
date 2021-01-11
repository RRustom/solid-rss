import { describeSubject, describeDocument, describeContainer } from 'plandoc';
import { space, solid, rdf, schema } from 'rdf-namespaces';

export const getPodData = (webId) => {
  const profileDoc = describeDocument().isFoundAt(webId);
  const profile = describeSubject().isFoundAt(webId);

  const storage = describeContainer().isFoundOn(profile, space.storage);

  const publicTypeIndex = describeDocument().isFoundOn(profile, solid.publicTypeIndex)

  const feedSourcesSubject = describeSubject()
    .isEnsuredIn(publicTypeIndex)
    .withRef(rdf.type, solid.TypeRegistration)
    .withRef(solid.forClass, schema.DataFeed)

  const articlesSubject = describeSubject()
    .isEnsuredIn(publicTypeIndex)
    .withRef(rdf.type, solid.TypeRegistration)
    .withRef(solid.forClass, schema.WebPage)

  const feedSourcesDoc = describeDocument()
    .isEnsuredOn(feedSourcesSubject, solid.instance, storage);

  const articlesDoc = describeDocument()
    .isEnsuredOn(articlesSubject, solid.instance, storage);

  return {
    webId,
    profileDoc,
    publicTypeIndex,
    feedSourcesDoc,
    articlesDoc
  };
}
