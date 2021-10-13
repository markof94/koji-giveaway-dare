import Koji from '@withkoji/core';
import axios from 'axios';

export const getEntries = async () => {
  try {
    const { data } = await axios.get(`${Koji.services.backend}/entries`);

    return data.entries;
  } catch (err) {
    Koji.ui.present.alert({
      title: 'Error',
      message: 'There was an error while fetching entries. Please try again.',
    });

    return {};
  }
};
