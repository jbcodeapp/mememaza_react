import React from 'react'

export default function RectSkeleton({
  height,
  width,
  variant = '',
  style,
  borderRadius = 8,
}) {
  return (
    <div
      style={{
        height: height,
        borderRadius,
        marginBottom: 8,
        ...style,
        animation: `ripple${
          variant ? `-${variant}` : ''
        } 1s var(--animation-function) infinite`,
        width: width,
      }}
    ></div>
  )
}
