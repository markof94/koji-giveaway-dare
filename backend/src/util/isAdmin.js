import { KojiBackend } from '@withkoji/core';

const sendDispatch = async (res, token) => {
  if (!res || !token) return false;

  const identity = new KojiBackend.Identity({ res });
  const { role } = await identity.resolveUserFromToken(token);

  return role === 'admin';
};

export default sendDispatch;
