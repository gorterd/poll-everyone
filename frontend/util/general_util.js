export const mergeArrays = (array_1, array_2) => {
  const uniques = {};
  array_1.forEach( el => uniques[el] = true );
  array_2.forEach( el => uniques[el] = true );
  return Object.keys(uniques);
}

export const concatIfNew = (array, el) => {
  if (array) {
    return array.includes(el) ? array : array.concat(el);
  } else {
    return [el]
  }
}

export const twoTierMerge = (object_1, object_2) => {
  let clone = {};
  Object.keys(object_1).concat(Object.keys(object_2)).forEach( key => 
    ( clone[key] = Object.assign({}, object_1[key], object_2[key] ) )
  )
  return clone;
}
