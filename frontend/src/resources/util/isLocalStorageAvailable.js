// Simple check to see if we can use the localStorage
// It will not be available in private browsing, for example

const isLocalStorageAvailable = () => {
  const test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

export default isLocalStorageAvailable;
