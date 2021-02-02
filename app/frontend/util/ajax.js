const csrfToken = document.querySelector('meta[name=csrf-token').content
const headers = new Headers({
  'X-CSRF-Token': csrfToken,
  'Content-Type': 'application/json'
})

export default async function ajax({ url, method = 'GET',  data }) {
  const options = { headers, method }

  if (data && method === 'GET') {
    url += '?' + new URLSearchParams(data).toString()
  } else if (data) {
    options.body = JSON.stringify(data)
  }

  const response = await fetch(url, options)
  const responseJSON = await response.json()
  
  return response.ok
    ? responseJSON
    : Promise.reject(responseJSON)
}