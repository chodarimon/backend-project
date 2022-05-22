const axios = require('axios')

function fetchWikiImage(searchQuery) {
  const endpoint = `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${searchQuery}&prop=text&formatversion=2`
  axios.get(endpoint).then((response) => {
    const parsedPage = response.data.parse.text
    const fileName =
      'https://' + parsedPage
        .match(/"(\/{2}upload)(.*?)"/gm)[0]
        .replace(/("|(\/){2})/gm, '')
    console.log(fileName)
    return fileName
  })
}

module.exports = { fetchWikiImage }
