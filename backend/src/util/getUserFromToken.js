import { KojiBackend } from '@withkoji/core';

const getUserFromToken = async (res, token) => {
  let user = null;
  try {
    const identity = new KojiBackend.Identity({ res });
    if (token) {
      const data = await identity.resolveUserFromToken(token);
      user = data;
    }
  } catch (err) {
    console.log(err);
  }

  return user;
};

export default getUserFromToken;
