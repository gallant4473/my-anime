export const handleError = async (response) => {
  try {
    const res = await response.json()
    return {
      code: response.status,
      message: res.errorMessage || 'Something went wrong, Please try again later!'
    }
  } catch (error) {
    return {
      code: response.status || 'unknown issue',
      message: response.statusText || 'Something went wrong, Please try again later!'
    }
  }
}

export const apiCall = async ({
  method = 'GET', params = {}, data = {}, url = '', headers = {}
}) => {
  const mainUrl = 'https://watch-my-anime.herokuapp.com/api'
  const queryString = params && Object.keys(params).length ? `?${new URLSearchParams(params).toString()}` : ''
  const request = {
    method,
    ...data && typeof data === 'object' && Object.keys(data).length ? { body: JSON.stringify(data) } : {},
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  }
  try {
    const res = await (fetch(`${mainUrl}${url}${queryString}`, request))
    if (res.ok) {
      const response = await res.json()
      return response
    } else {
      const response = await handleError(res)
      return Promise.reject(response);
    }
  } catch (error) {
    return Promise.reject({
      code: 'unknown issue',
      message: 'Something went wrong, Please try again later!'
    })
  } 
}

export function generateRandomString(stringLength = 10) {
  let randomString = '';
  let randomAscii;
  const asciiLow = 65;
  const asciiHigh = 90
  for (let i = 0; i < stringLength; i += 1) {
    randomAscii = Math.floor((Math.random() * (asciiHigh - asciiLow)) + asciiLow);
    randomString += String.fromCharCode(randomAscii)
  }
  return randomString
}