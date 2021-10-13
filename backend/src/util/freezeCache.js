const freezeCache = async (res, name) => {
  res.setHeader('x-koji-freeze-key', name);
};

export default freezeCache;
