import React from "react";
import styles from "@/styles/layouts/authLayout.module.css";
import Link from "next/link";

export default function AuthLayout({ title, children }) {
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
      </div>
    </div>
  );
}
