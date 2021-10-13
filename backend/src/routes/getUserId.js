import getUserFromToken from '../util/getUserFromToken';

const getUserId = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { id } = await getUserFromToken(res, token);
    return res.status(200).json({ id });
  } catch (err) {
    return res.status(200).json({
      err,
      e: err.toString(),
      id: null,
    });
  }
};

export default getUserId;
