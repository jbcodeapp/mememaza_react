import React from 'react'

export default function CircularSkeleton({ radius, style }) {
  return (
    <div
      style={{
        height: radius,
        width: radius,
        borderRadius: radius / 2,
        ...style,
        animation: `ripple${
          variant ? `-${variant}` : ''
        } 1s var(--animation-function) infinite`,
      }}
    ></div>
  )
}
