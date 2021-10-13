import { KojiBackend } from '@withkoji/core';
import sendDispatch from '../util/sendDispatch';
import unfreezeCache from '../util/unfreezeCache';

const postWinner = async (req, res) => {
  try {
    const {
      id,
    } = req.body;

    if (!id || id === '') return res.status(200).json({ success: false, error: 'id required' });

    const database = new KojiBackend.Database({ res });

    await database.set('winner', 'winner', { id });
    await sendDispatch(res, 'setWinner', { id });

    unfreezeCache(res, 'winner');

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      err,
      e: err.toString(),
      success: false,
    });
  }
};

export default postWinner;
