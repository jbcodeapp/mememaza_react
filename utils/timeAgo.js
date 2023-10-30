export function timeAgo(timestamp) {
  const currentDate = new Date()
  const inputDate = new Date(timestamp)

  const secondsAgo = Math.floor((currentDate - inputDate) / 1000)
  const minutesAgo = Math.floor(secondsAgo / 60)
  const hoursAgo = Math.floor(minutesAgo / 60)
  const daysAgo = Math.floor(hoursAgo / 24)

  if (daysAgo > 365) {
    const yearsAgo = Math.floor(daysAgo / 365)
    return yearsAgo === 1 ? 'one year ago' : `${yearsAgo} years ago`
  }

  if (daysAgo >= 2) {
    return `${daysAgo} days ago`
  }

  if (hoursAgo >= 1) {
    return `${hoursAgo}h`
  }

  if (minutesAgo >= 2) {
    return `${minutesAgo}m`
  }

  if (minutesAgo === 1) {
    return 'a minute ago'
  }

  if (secondsAgo > 10) {
    return `${secondsAgo} seconds ago`
  }

  return 'a few seconds ago'
}
