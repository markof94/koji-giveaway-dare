import { KojiBackend } from '@withkoji/core';
import unfreezeCache from '../util/unfreezeCache';

const deleteEntry = async (req, res) => {
  try {
    const database = new KojiBackend.Database({ res });
    const { id } = req.params;
    const success = await database.delete('entries', id);
    unfreezeCache(res, 'entries');
    return res.status(200).json({ success });
  } catch (err) {
    return res.status(200).json({
      err,
      e: err.toString(),
      entries: [],
    });
  }
};

export default deleteEntry;
