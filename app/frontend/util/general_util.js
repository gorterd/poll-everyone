export function mergeArrays(array_1, array_2) {
  const uniques = {};
  array_1.forEach( el => uniques[el] = true );
  array_2.forEach( el => uniques[el] = true );
  return Object.keys(uniques);
}

export function concatIfNew(array, el) {
  if (array) {
    return array.includes(el) ? array : array.concat(el);
  } else {
    return [el]
  }
}

export function twoTierMerge(object_1, object_2) {
  const clone = {};
  
  Object.keys(object_1).concat(Object.keys(object_2)).forEach( key => (
    clone[key] = Object.assign( {}, object_1[key], object_2[key] ) 
  )); 

  return clone;
}

export function clamp(val, min, max) {
  if (val < min) return min;
  if (val > max) return max;
  return val;
}

export function classNames(...args) {
  const klassNames = args
    .map( arg => {
      if (arg instanceof Array) {
        return arg[0] ? arg[1] : null;
      } else {
        return arg;
      }
    })
    .filter(arg => arg !== null)
    .join(' ');

  return { className: klassNames };
}

export function mergeIdIntoState(state, entityId, idArrayName, idToAdd) {
  const entity = state[entityId]
  if (!entity) return state;

  const newIds = concatIfNew(entity[idArrayName], idToAdd);
  const newEntity = { ...entity, [idArrayName]: newIds };
  return { ...state, [entityId]: newEntity };
}

export function smoothScrollToY(y, { 
  bailOut = 1000, 
  pause = 0,
  threshold = 5
}) {
  if (Math.abs(window.scrollY - y) < threshold) {
    window.scrollTo({ top: y });
    return Promise.resolve();
  }

  window.scrollTo({ top: y, behavior: 'smooth' });

  return new Promise( (resolve) => { 
    const asyncActivities = {};

    asyncActivities.timeout = setTimeout(() => {
      window.removeEventListener('scroll', asyncActivities.listener);
      resolve(false)
    }, bailOut);

    asyncActivities.listener = () => {
      if (window.scrollY === y) {
        window.clearTimeout(asyncActivities.timeout);
        window.removeEventListener('scroll', asyncActivities.listener);
        window.setTimeout(() => resolve(true), pause);
      };
    }
    
    window.addEventListener('scroll', asyncActivities.listener);
  });
}