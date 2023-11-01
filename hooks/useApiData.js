import { SITE_URL } from '@/def'

import toastr from 'toastr'

const { default: axios } = require('axios')
const { useEffect } = require('react')
const { useState } = require('react')

export const useApiData = ({
  url,
  method = 'GET',
  defaultData,
  payload = {},
  auth = false,
}) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(defaultData)
  const [error, setError] = useState(true)
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    const extraOptions = {}

    if (auth) {
      $token = localStorage.getItem('token')

      if (token) {
        extraOptions['Headers'] = { Authorization: `Bearer ${token}` }
      } else {
        return { loading, data, error: { message: 'Not Authenticated' } }
      }
    }

    if (method === 'POST') {
      extraOptions.body = payload
    }
    axios(SITE_URL + url, {
      method,
      ...extraOptions,
    })
      .then((resp) => {
        setLoading(false)
        setData(resp.data)
        setSuccess(true)
      })
      .catch((err) => {
        setLoading(false)
        setSuccess(false)
        toastr.error(err.message)
        setError(err.message)
      })
  }, [])

  return { loading, data, error, success }
}
