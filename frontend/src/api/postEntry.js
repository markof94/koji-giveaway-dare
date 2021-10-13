import Koji from '@withkoji/core';
import axios from 'axios';

export const postEntry = async (postData) => {
  try {
    const { token } = await Koji.identity.getToken();
    const { data } = await axios.post(`${Koji.services.backend}/entry`, {
      ...postData,
      token,
    });

    return data.success;
  } catch (err) {
    Koji.ui.present.alert({
      title: 'Error',
      message: 'There was an error performing this request. Please try again.',
    });

    return false;
  }
};
