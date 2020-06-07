export const mergeArrays = (array_1, array_2) => {
  const uniques = {};
  array_1.forEach( el => uniques[el] = true );
  array_2.forEach( el => uniques[el] = true );
  return Object.keys(uniques);
}
