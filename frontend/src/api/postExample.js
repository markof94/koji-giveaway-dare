import Koji from '@withkoji/core';
import axios from 'axios';

export const getExample = async (postData) => {
  try {
    const { data } = await axios.post(`${Koji.services.backend}/example`, {
      ...postData,
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
