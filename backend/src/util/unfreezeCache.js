import { KojiBackend } from '@withkoji/core';

const unfreezeCache = async (res, name) => {
  const utilities = new KojiBackend.Utilities({ res });
  await utilities.unfreeze(name);
};

export default unfreezeCache;
