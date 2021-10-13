import { KojiBackend } from '@withkoji/core';
import freezeCache from '../util/freezeCache';

const getEntries = async (req, res) => {
  try {
    const database = new KojiBackend.Database({ res });
    const entries = await database.get('entries') || [];

    const sorted = entries.sort((a, b) => b.date - a.date);

    freezeCache(res, 'entries');
    return res.status(200).json({ entries: sorted });
  } catch (err) {
    return res.status(200).json({
      err,
      e: err.toString(),
      entries: [],
    });
  }
};

export default getEntries;
