import Koji from '@withkoji/core';

export const hasGrants = async () => {
  try {
    const hasGrant = await Koji.identity.checkGrants(['username', 'push_notifications']);
    return hasGrant;
  } catch (err) {
    return false;
  }
};
