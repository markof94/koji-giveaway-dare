export const moneyString = (value, numDecimals = 0) => {
  const number = Math.floor(Number((value || 0))).toLocaleString(undefined, {
    minimumFractionDigits: numDecimals,
    maximumFractionDigits: numDecimals,
  });

  return `$${number}`;
};
