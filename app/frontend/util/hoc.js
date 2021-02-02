import React from 'react'

export function withLazy(importCb) {
  const WrapperObject = { promise: null }
  
  const fetch = () => {
    if (WrapperObject.promise) return
    WrapperObject.promise = importCb()
    WrapperObject.Component = React.lazy(() => WrapperObject.promise)
  }
  
  const component = props => {
    if (!WrapperObject.promise) fetch()
    return <WrapperObject.Component {...props} />
  }

  return [component, fetch]
}