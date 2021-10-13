import Koji from '@withkoji/core';
import axios from 'axios';

export const getUserId = async () => {
  try {
    const { token } = await Koji.identity.getToken();

    const { data } = await axios.get(`${Koji.services.backend}/userId`, {
      headers: {
        Authorization: token,
      },
    });

    return data.id;
  } catch (err) {
    Koji.ui.present.alert({
      title: 'Error',
      message: 'There was an error. Please try again.',
    });

    return null;
  }
};
