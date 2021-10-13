import Koji from '@withkoji/core';

export const requestGrants = async () => {
  try {
    const hasGrant = await Koji.identity.requestGrants(['username', 'push_notifications']);
    return hasGrant;
  } catch (err) {
    return false;
  }
};
