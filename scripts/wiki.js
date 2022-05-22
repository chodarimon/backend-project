const axios = require('axios')

async function fetchWikiImage(searchQuery) {
  let fileName
  const endpoint = `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${searchQuery}&prop=text&formatversion=2`
  await axios.get(endpoint).then((response) => {
    const parsedPage = response.data.parse.text
    fileName =
      'https://' + parsedPage
        .match(/"(\/{2}upload)(.*?)"/gm)[0]
        .replace(/("|(\/){2})/gm, '')
  })
  return fileName
}

module.exports = { fetchWikiImage }
