import React from 'react'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Markdown from 'react-markdown'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function BaseLayout({ children, title }) {
  const router = useRouter()

  console.log(router.pathname)

  return (
    <>
      <Navbar bgOpacity={0.99} />

      <h2
        style={{
          marginTop: 'calc(var(--nav-height) + 30px)',
          paddingLeft: 50,
          color: 'white',
        }}
      >
        {title}
      </h2>
      <div
        style={{
          paddingLeft: 50,
          display: 'flex',
          gap: 12,
        }}
      >
        <Link
          className={router.pathname === '/about' ? 'active' : ''}
          href="/about"
        >
          About
        </Link>
        <Link
          className={router.pathname === '/contact' ? 'active' : ''}
          href="/contact"
        >
          Contact
        </Link>
        <Link
          className={router.pathname === '/legal/tos' ? 'active' : ''}
          href="/legal/tos"
        >
          Terms
        </Link>
        <Link
          className={router.pathname === '/legal/privacy' ? 'active' : ''}
          href="/legal/privacy"
        >
          Privacy
        </Link>
        <Link
          className={router.pathname === '/legal/disclaimer' ? 'active' : ''}
          href="/legal/disclaimer"
        >
          Disclaimer
        </Link>
        <Link
          className={
            router.pathname === '/legal/marketplace-disclaimer' ? 'active' : ''
          }
          href="/legal/marketplace-disclaimer"
        >
          Marketplace Disclaimer
        </Link>
        <Link
          className={
            router.pathname === '/legal/news-disclaimer' ? 'active' : ''
          }
          href="/legal/news-disclaimer"
        >
          News Disclaimer
        </Link>
      </div>
      <div style={{ minHeight: '90vh', padding: '50px', marginBottom: 50 }}>
        <Markdown>{children}</Markdown>
      </div>

      <Footer style={{ position: 'fixed', zIndex: 200, bottom: 0 }} />
    </>
  )
}
