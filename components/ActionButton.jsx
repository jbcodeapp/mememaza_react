import styles from '@/styles/components/action-button.module.css'
import Spinner from './Spinner'

const ActionButton = ({
  icon,
  text = '',
  ref,
  active,
  onClick,
  lg = false,
  color = 'white',
  hoverColor = '#00000020',
  iconStyle = {},
  style = {},
  loading = false,
  count,
}) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`${styles.actionBtn} ${lg ? styles.actionBtnLg : null} ${
        active ? styles.actionBtnActive : null
      }`}
      style={{ ...style, color }}
      disabled={loading}
    >
      <i
        style={{ ...iconStyle, position: 'relative' }}
        className={`fas fa-${icon}`}
      ></i>{' '}
      {count !== null ? <span>{count}</span> : null}
      <>{text}</>
      {loading ? <Spinner /> : null}
    </button>
  )
}

export default ActionButton
