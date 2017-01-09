export const reduceArrayByProp = (arr = [], prop = 'id') => {
  return arr.reduce((obj, item) => {
    obj[item[prop]] = item;
    return obj;
  }, {});
};

export const shuffle = (arr = []) => {
  var j, x, i;

  console.time('Shuffle Array');
  for (i = arr.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = arr[i - 1];
    arr[i - 1] = arr[j];
    arr[j] = x;
  }

  console.timeEnd('Shuffle Array');

  return arr;
}
