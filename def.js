export const SITE_URL = 'https://admin.memesmaza.com/api'
export const API_PATH = 'https://admin.memesmaza.com'
export const HOME_URL = 'https://memesmaza.com/'

// export const SITE_URL = 'http://localhost:8000/api'
// export const API_PATH = 'http://localhost:8000'
// export const HOME_URL = 'http://localhost:3000/'

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const REGISTER = 'REGISTER'
export const LOGOUT = 'LOGOUT'
export const LOGOUT_SUCCESSFUL = 'LOGOUT_SUCCESSFUL'
export const LOGOUT_FAILED = 'LOGOUT_FAILED'

export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const TRY_AGAIN = 'TRY_AGAIN'

export const CART_REQUEST = 'CART_REQUEST'
export const CART_LIST = 'CART_LIST'
export const ADD_TO_CART = 'ADD_TO_CART'
export const EMPTY_CART = 'EMPTY_CART'

export const localData = {
  add(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  remove(key, value) {
    localStorage.removeItem(key)
  },
  clear() {
    if (typeof window !== 'undefined') {
      localStorage.clear()
      window.location.href = HOME_URL
    }
  },
  localStorageClear() {
    localStorage.clear()
  },
  load(key) {
    let stored = null
    if (typeof window !== 'undefined') {
      stored = localStorage.getItem(key)
    }
    return stored == null ? null : stored
  },
  headerAccess() {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('token') != null) {
        let token = localStorage.getItem('token')
        return {
          //'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        }
      } else {
        return {
          'Content-type': 'application/json',
        }
      }
    } else {
      return {
        'Content-type': 'application/json',
      }
    }
  },
}
