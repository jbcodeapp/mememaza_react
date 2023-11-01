import React from 'react'
import styles from '@/styles/components/footer.module.css'

export default function Footer({ banners, style }) {
  return (
    <div style={style} className={styles.footer}>
      {banners?.map((item) => (
        <img style={{ maxWidth: 800 }} src={item.banner} alt="advertisement" />
      ))}
      <div className={styles.footerContainer}>
        <ul className={styles.footerNavbar}>
          <li>© 2023 MemesMaza</li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/legal/tos">Terms</a>
          </li>
          <li>
            <a href="/legal/privacy">Privacy</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
