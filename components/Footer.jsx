import { API_PATH } from '@/def'
import React from 'react'
import styles from "@/styles/components/footer.module.css";

export default function Footer({banners}) {
  return (
    <div className={styles.footer}>
        {
          banners?.map(item => <img style={{maxWidth: 800}} src={API_PATH + '/' + item.banner} alt="advertisement" />)
        }
        <div className={styles.footerContainer}>
        <ul className={styles.footerNavbar}>
            <li>© 2023 MemesMaza</li>
            <li><a href="/about">About</a></li>
            <li><a href="/tos">Terms</a></li>
            <li><a href="/privacy">Privacy</a></li>
        </ul>
        </div>
    </div>
  )
}
