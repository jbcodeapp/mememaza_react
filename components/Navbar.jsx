import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import { useSearch } from '@/hooks/useSearch'
import { useRouter } from 'next/router';

import styles from '@/styles/components/navbar.module.css'
import { HOME_URL } from '@/def'
import { useAppDispatch, useAppSelector } from '@/src/store'
import { authActions, authSelect, postLogout } from '@/src/services/auth/slice'
import { useEffect } from 'react'
import toastr from 'toastr'

export const searchBarStyling = {
  // backgroundColor: 'rgba(255,255,255,.25) !important',
  backgroundColor: 'rgba(255,255,255,.25)',
  border: '1px solid transparent',
  padding: '8px 35px 8px 10px',
  borderRadius: '3px',
  width: '100%',
  zIndex: 20,
  outline: 0,
  opacity: 0.8,
  height: 45,
  fontSize: '16px',
  fontWeight: 700,
  letterSpacing: 0.4,
  color: '#fff',
  textShadow: 'inherit',
  iconColor: '#fff',
  placeholderColor: '#8b8aa2',
  searchIconMargin: '8px',
}

export default function Navbar({ bgOpacity, style = {searchBarStyling} }) {
  const router = useRouter();

  const [data, setData] = useState([])

  const dispatch = useAppDispatch()

  const { message, error, token, user } = useAppSelector(authSelect);

  useEffect(() => {
    if (message) {
      toastr.success(message, 'MemeMaza')
      dispatch(authActions.clearMessage())
    }
  }, [message])

  useEffect(() => {
    if (typeof error === 'array') {
      error.forEach((item) => toastr.error(item, 'MemeMaza'))
    } else if (error?.length) {
      toastr.success(error, 'MemeMaza')
    }
  }, [error])

  const sendLogoutResponse = (e) => {
    e.preventDefault()
    dispatch(postLogout({ token }))
  }

    const {
      search,
      handleOnSearch,
      handleOnHover,
      handleOnFocus,
      handleOnSelect,
      handleOnChange,
      handleOnBlur,
      handleOnKeyDown,
      onKeyPressHandler,
      // handleKeyPress,
    } = useSearch(data, setData)

    const items = data || [];

    const handleKeyPress = (event) => {
      if (event.key === 'Enter' || event.keyCode == 13 ) {
        handleOnSearch(search, event);
      }
    };

  return (
    <nav
      className={styles.navbar}
      style={{
        backgroundColor: `rgba(23 21 68 / ${bgOpacity})`,
        ...style,
      }}
    >
      <Link legacyBehavior href="/">
        <img
          src={HOME_URL + 'assets/images/logos/logo.png'}
          alt="Logo"
          title="Mememaza"
          height="100%"
          style={{ cursor: 'pointer' }}
        />
      </Link>
      <div className={'nav-outer mx-auto clearfix ' + styles.searchBar}>
        {/* Main Menu */}
        <div
          style={{
            width: '100%',
            position: 'absolute',
            left: 0,
            zIndex: 20,
          }}
        >
          <input
            items={search}
            onChange={handleOnChange}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            onKeyDown={handleKeyPress}
            onBlur={handleOnBlur}
            style={searchBarStyling}
            type="text"
            placeholder="Images, #tags, @users oh my!"
            // autoFocus
            />
          {/* <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            onKeyDown={onKeyDown}
            // onKeyDown={(event) => {
            //   if (event.key === 'Enter') {
            //     const search = event.target.value; 
            //     event.preventDefault();
            //     console.log("press enter")
            //     router.push(`/search/${search}`);
            //   }
            // }}
            onKeyPress={onKeyPressHandler}
            showNoResults={false}
            onChange={handleOnChange}
            // resultStringKeyName="title"
            // autoFocus
            // fuseOptions={{ keys: ["title", "description"] }}
            // formatResult={formatResult}
            styling={searchBarStyling}
            placeholder="Images, #tags, @users oh my!"
          /> */}
          </div>
          {/* Main Menu End*/}
        </div>

      <div className="menu-btns">
        {user?.id ? (
          <>
            <Link legacyBehavior href="">
              {user.name}
            </Link>
            <Link href="" onClick={sendLogoutResponse}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link legacyBehavior href="/sign-in">
              Sign In
            </Link>
            <Link legacyBehavior href="/sign-up">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
