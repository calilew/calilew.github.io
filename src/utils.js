export const getImages = () => {
  let ids = 0;
  const buildArray = (num, catagory) => {
    const iter = (acc, arr) => {
      if (acc === num + 1) return arr;
      const src = 'img/' + catagory + '/' + 'large/' + acc + '.jpg';
      ids ++;
      loadeImage(src, ids)
      return iter(acc + 1, [].concat(arr, [{
        src,
        catagory,
        loaded: false,
        id: ids
      }]));
    };
    return iter(1, []);
  };
  // return [].concat(buildArray(3, 'fashion'), buildArray(3, 'portrait'), buildArray(3, 'travel'));
  return [].concat(buildArray(18, 'fashion'), buildArray(17, 'portrait'), buildArray(23, 'travel'));
}
