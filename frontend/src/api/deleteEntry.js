import Koji from '@withkoji/core';
import axios from 'axios';

export const deleteEntry = async (id) => {
  try {
    const { data } = await axios.delete(`${Koji.services.backend}/entry/${id}`);

    return data.success;
  } catch (err) {
    Koji.ui.present.alert({
      title: 'Error',
      message: 'There was an error while deleting an entry. Please try again.',
    });

    return false;
  }
};
