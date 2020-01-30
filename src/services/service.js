const get = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(processRequest)
      .then(resolve)
      .catch(reject)
  })
}
const post = (url, body) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(body)
  }

  return new Promise((resolve, reject) => {
    fetch(url, config)
      .then(processRequest)
      .then(resolve)
      .catch(reject)
  })
}

const processRequest = response => {
  if (response.status !== 200) {
    throw new Error('Not 200 response')
  } else {
    return response.json()
  }
}

export default {
  get,
  post,
  processRequest
}
