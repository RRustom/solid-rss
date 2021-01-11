import { useEffect, useState } from 'react';
import { fetchDocument } from 'plandoc';

export const useProfile = (podData) => {
  const [profile, setProfile] = useState();

  useEffect(() => {
    if (!podData) {
      return;
    }

    fetchDocument(podData.profileDoc).then((fetchedProfileDoc) => {
      const profile = fetchedProfileDoc?.getSubject(podData.webId);
      if (!fetchedProfileDoc || !profile) {
        return;
      }
      setProfile(profile);
    });
  }, [podData]);

  return profile;
}

//export default useProfile;
