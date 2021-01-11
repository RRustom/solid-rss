import { useState, useEffect } from 'react';
import { fetchDocument } from 'plandoc';

export const useDocument = (virtualDocument) => {
  const [document, setDocument] = useState();

  useEffect(() => {
    fetchDocument(virtualDocument).then(setDocument);
  }, [virtualDocument]);

  return [document, setDocument];
}
