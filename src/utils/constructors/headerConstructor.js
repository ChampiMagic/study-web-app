/* eslint-disable no-undef */

// Constructor used to make http requests to the backend with axios

const HeaderConstructor = (extra) => {
  const config = {
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
      ...extra
    }
  }

  return config
}

export default HeaderConstructor
