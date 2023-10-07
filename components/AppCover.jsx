import React from 'react'
import styles from '@/styles/components/app-cover.module.css';

export default function AppCover({children}) {
  return (
    <div className={styles.appCover}>
        {children}
    </div>
  )
}
