import { KojiBackend } from '@withkoji/core';
import unfreezeCache from '../util/unfreezeCache';

const deleteWinner = async (req, res) => {
  try {
    const database = new KojiBackend.Database({ res });
    const success = await database.delete('winner', 'winner');
    unfreezeCache(res, 'winner');
    return res.status(200).json({ success });
  } catch (err) {
    return res.status(200).json({
      err,
      e: err.toString(),
    });
  }
};

export default deleteWinner;
