import React from 'react';
import { useRouter } from 'next/router';
import { useApiData } from '@/hooks/useApiData';
import PostsView from '@/views/Posts';
import RectSkeleton from '@/components/skeletons/RectSkeleton';
import { API_PATH } from '@/def';
import Navbar from '@/components/Navbar';

export default function SearchPage() {
  const router = useRouter();
  const { search } = router.query;

  if (search) {
    const { loading, error, data, success } = useApiData({
      url: `/search/${search}`,
    });
    console.log("THis is my log", data);

    return (
      <>
        <Navbar bgOpacity={1} />
        {!success ? (
          <RectSkeleton
            style={{ marginTop: 'var(--nav-height)', marginBottom: 0 }}
            height={300}
            width={'100vw'}
            variant="light"
          />
        ) : (
          <div
            style={{
              marginTop: 'var(--nav-height)',
              height: 300,
              width: '100vw',
              background: 'hsl(243 51% 9% / 1)',
              backgroundSize: 'cover',
              backgroundPosition: 'bottom',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                background: '#00000092',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                height: 300,
              }}
            >
              <h1 style={{ color: 'white', textTransform: 'uppercase' }}>
                {/* {data?.obj.name} */}
                {search}
              </h1>
              <p style={{ color: 'whitesmoke', opacity: 0.9 }}>
                {/* {data?.obj.posts_count} Posts | {data?.obj.reels_count} Reels */}
                 Posts |  Reels
              </p>
            </div>
          </div>
        )}
              
        <PostsView search={search} />
      </>
    );
  }

  return null;
}
