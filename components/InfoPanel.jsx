import styles from '@/styles/components/info-panel.module.css'

export default ({
  image = '/assets/images/Fatal Error.png',
  message,
  title,
  style = {},
}) => (
  <div className={`${styles.infoPanel}`} style={style}>
    <img className={styles.image} src={image} alt="error" />
    <div>
      <p className={styles.title}>{title}</p>
      <p className={styles.message}>{message}</p>
    </div>
  </div>
)
