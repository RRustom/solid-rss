import { schema } from 'rdf-namespaces';

const byDate = (itemA, itemB) => {
  const updatedDateA = itemA.getDateTime(schema.dateModified);
  const updatedDateB = itemB.getDateTime(schema.dateModified);
  const createdDateA = itemA.getDateTime(schema.dateCreated);
  const createdDateB = itemB.getDateTime(schema.dateCreated);

  const latestA = updatedDateA ?? createdDateA;
  const latestB = updatedDateB ?? createdDateB;
  if (latestB === null) {
    // No date known for B - A comes first
    return -1;
  }
  if (latestA === null) {
    // Date known for B but not for A - B comes first
    return 1;
  }

  // Whichever was latest comes first:
  return latestB.getTime() - latestA.getTime();
}

export default byDate;
