import Koji from '@withkoji/core';

export const getUserRole = async () => {
  try {
    const { presumedRole } = await Koji.identity.getToken();
    return presumedRole;
  } catch (err) {
    return 'unknown';
  }
};
