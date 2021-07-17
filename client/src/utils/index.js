export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const localeDateTimeString = (data) => {
  return new Date(data).toLocaleString().slice(0, -3);
};

export const localeDateString = (data) => {
  return new Date(data).toLocaleDateString();
};
