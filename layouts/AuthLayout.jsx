import React from 'react'
import styles from '@/styles/layouts/authLayout.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AuthLayout({ title, children }) {
  const router = useRouter()
  return (
    <div className={styles.authLayout}>
      <div className={styles.authContent}>
        <div className={styles.authLogoBar}>
          <Link href="/">
            <img
              src="assets/images/logos/logo.png"
              alt="mememaza logo"
              className={styles.authLogo}
            />
          </Link>
          <h1 className={styles.title}>{title}</h1>
        </div>
        {children}
        <div
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            width: '100%',
          }}
        >
          <img
            src="/assets/images/arrow-left-svgrepo-com.svg"
            alt="arrow left"
            height={25}
            style={{ opacity: 0.6 }}
          />
          <a
            href=""
            onClick={(e) => {
              e.preventDefault()
              router.back()
            }}
          >
            Go Back
          </a>
        </div>
      </div>
    </div>
  )
}
