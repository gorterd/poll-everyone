import { merge } from 'lodash'
window.merge = merge

export function mergeArrays(array1, array2) {
  const uniques = {}
  array1.forEach( el => uniques[el] = true )
  array2.forEach( el => uniques[el] = true )
  return Object.keys(uniques)
}

export function concatIfNew(array, el) {
  if (array) {
    return array.includes(el) ? array : array.concat(el)
  } else {
    return [el]
  }
}

export function twoTierMerge(object1, object2) {
  const clone = {}
  
  Object.keys(object1).concat(Object.keys(object2)).forEach( key => (
    clone[key] = Object.assign( {}, object1[key], object2[key] ) 
  )) 

  return clone
}

export function clamp(val, min, max) {
  if (val < min) return min
  if (val > max) return max
  return val
}

export function classNames(...args) {
  const klassNames = args
    .map( arg => {
      if (arg instanceof Array) {
        return arg[0] ? arg[1] : null
      } else {
        return arg
      }
    })
    .filter(arg => arg !== null)
    .join(' ')

  return { className: klassNames }
}

export function mergeIdIntoState(state, entityId, idArrayName, idToAdd) {
  const entity = state[entityId]
  if (!entity) return state

  const newIds = concatIfNew(entity[idArrayName], idToAdd)
  const newEntity = { ...entity, [idArrayName]: newIds }
  return { ...state, [entityId]: newEntity }
}

export function smoothScrollToY(y, { 
  bailOut = 1000, 
  pause = 0,
  threshold = 5
}) {
  if (Math.abs(window.scrollY - y) < threshold) {
    window.scrollTo({ top: y })
    return Promise.resolve()
  }

  window.scrollTo({ top: y, behavior: 'smooth' })

  return new Promise( (resolve) => { 
    const asyncActivities = {}

    asyncActivities.timeout = setTimeout(() => {
      window.removeEventListener('scroll', asyncActivities.listener)
      resolve(false)
    }, bailOut)

    asyncActivities.listener = () => {
      if (window.scrollY === y) {
        window.clearTimeout(asyncActivities.timeout)
        window.removeEventListener('scroll', asyncActivities.listener)
        window.setTimeout(() => resolve(true), pause)
      }
    }
    
    window.addEventListener('scroll', asyncActivities.listener)
  })
}

export function objMap(object, mapFn) {
  const newEntries = Object.entries(object).map(mapFn)
  return Object.fromEntries(newEntries)
}

export const hasTruthyValue = arrayOrObject => 
  arrayOrObject instanceof Array
    ? arrayOrObject.some(value => value)
    : Object.values(arrayOrObject).some(value => value)
