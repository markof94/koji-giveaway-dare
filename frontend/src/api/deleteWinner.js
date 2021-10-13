import Koji from '@withkoji/core';
import axios from 'axios';

export const deleteWinner = async () => {
  try {
    const { data } = await axios.delete(`${Koji.services.backend}/winner`);

    return data.success;
  } catch (err) {
    Koji.ui.present.alert({
      title: 'Error',
      message: 'There was an error while removing the winner. Please try again.',
    });

    return {};
  }
};
