//getRandomInt
export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
};

//isEmpty
export const isEmpty = (obj: object) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};
