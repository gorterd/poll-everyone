import React from 'react'
import { useAnimation } from '../../util/custom_hooks'

export function Animated ({
  children,
  className,
  ...animationProps
}) {
  const [renderState, animationStyle, key] = useAnimation({
    ...animationProps
  })

  return renderState && (
    <div key={key} style={animationStyle} className={className}>
      {children}
    </div>
  )
}