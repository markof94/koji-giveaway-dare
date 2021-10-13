import { KojiBackend } from '@withkoji/core';
import * as uuid from 'uuid';
import getUserFromToken from '../util/getUserFromToken';
import now from '../util/now';
import sendDispatch from '../util/sendDispatch';
import unfreezeCache from '../util/unfreezeCache';

/*
  body:
  contentUrl,
  username,
  profilePicture,
  caption,
  email,
  token,
*/

const postEntry = async (req, res) => {
  try {
    const database = new KojiBackend.Database({ res });

    const entryData = { ...req.body };
    const { token } = req.body;
    delete entryData.token;

    const { id: userId } = await getUserFromToken(res, token);

    const id = uuid.v4();
    const date = now();
    const newEntry = {
      id,
      date,
      userId,
      ...req.body,
    };

    await database.set('entries', id, newEntry);
    await sendDispatch(res, 'addEntry', newEntry);

    unfreezeCache(res, 'entries');

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

export default postEntry;
