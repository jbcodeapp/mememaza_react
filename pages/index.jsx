import styles from '@/styles/Home.module.css'

import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import AppCover from '../components/AppCover'
import { useEffect, useState } from 'react'
import { useAuthCheck } from '@/hooks/useAuthCheck'

import { SITE_URL } from '@/def'
import axios from 'axios'
import PostsView from '@/views/Posts'
import Footer from '../components/Footer'
import toastr from 'toastr'
import InfoPanel from '@/components/InfoPanel'

const getMin = (num1, num2) => {
  if (num1 > num2) return num2
  return num1
}
const Index = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  const [hasFailed, setHasFailed] = useState(false)

  useAuthCheck()

  useEffect(() => {
    if (!data && !loading) {
      fetchIndexData()
    }
  }, [data, loading])

  const fetchIndexData = () => {
    setLoading(true)
    let url = SITE_URL + `/post`

    axios
      .get(url)
      .then((resp) => {
        setLoading(false)
        setData(resp.data)
      })
      .catch(() => {
        toastr.error('Page under construction', 'Memesmaza')
        setHasFailed(true)

        document.body.style.background = '#171544'
      })
  }

  const [bannerTop, setBannerTop] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const newY = window.scrollY
      setBannerTop(newY)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={styles.home}>
      {hasFailed ? (
        <AppCover>
          <Navbar bgOpacity={getMin(bannerTop / 300, 1)} />
          <InfoPanel
            title="Page under Construction"
            message="Please check back in some time!"
          />
        </AppCover>
      ) : (
        <>
          <AppCover>
            <Navbar bgOpacity={getMin(bannerTop / 300, 1)} />

            <Banner
              style={{ transform: `translateY(${-bannerTop * 0.5}px)` }}
              categories={data?.categories}
              stories={data?.stories}
            />
          </AppCover>
          <PostsView
            banners={data?.banners.filter(
              (item) =>
                item.type === 'left' ||
                item.type === 'right' ||
                item.type === 'header'
            )}
          />
          <Footer
            style={{
              position: 'fixed',
              zIndex: 200,
              bottom: bannerTop > 200 ? (-bannerTop + 200) * 0.3 : 0 + 'px',
            }}
            banners={[]}
          />
        </>
      )}

      <Footer
        style={{
          position: 'fixed',
          zIndex: 200,
          bottom: 0,
        }}
        banners={data?.banners.filter((item) => item.type === 'bottom')}
      />
      {/* {data && <Landing props={{ data }} />} */}
    </div>
  )
}
export default Index
