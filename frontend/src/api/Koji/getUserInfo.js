import Koji from '@withkoji/core';

export const getUserInfo = async () => {
  try {
    const { presumedAttributes } = await Koji.identity.getToken();
    return presumedAttributes;
  } catch (err) {
    console.log(err);
    return { username: '', profilePicture: '' };
  }
};
