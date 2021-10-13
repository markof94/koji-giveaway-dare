import Koji from '@withkoji/core';
import axios from 'axios';

export const getWinner = async () => {
  try {
    const { data } = await axios.get(`${Koji.services.backend}/winner`);

    return data.winner;
  } catch (err) {
    Koji.ui.present.alert({
      title: 'Error',
      message: 'There was an error while fetching the winner. Please try again.',
    });

    return {};
  }
};
