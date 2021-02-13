export function clamp(val, min, max) {
  if (val < min) return min
  if (val > max) return max
  return val
}

export const objMap = (object, mapFn) => Object.fromEntries(
  Object.entries(object).map(([key, val]) => [key, mapFn([key, val])])
)

export const hasTruthyValue = arrayOrObject =>
  arrayOrObject instanceof Array
    ? arrayOrObject.some(value => value)
    : Object.values(arrayOrObject).some(value => value)

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