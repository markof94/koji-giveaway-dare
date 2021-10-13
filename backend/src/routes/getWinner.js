import { KojiBackend } from '@withkoji/core';
import freezeCache from '../util/freezeCache';

const getWinner = async (req, res) => {
  try {
    const database = new KojiBackend.Database({ res });
    const winner = await database.get('winner', 'winner') || null;

    freezeCache(res, 'winner');
    return res.status(200).json({ winner });
  } catch (err) {
    return res.status(200).json({
      err,
      e: err.toString(),
      entries: [],
    });
  }
};

export default getWinner;
