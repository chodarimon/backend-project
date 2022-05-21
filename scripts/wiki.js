const axios = require('axios')

function fetchWikiExtract(pageTitle) {
  const wikiEndpoint = 'https://commons.wikipedia.org/w/api.php'
  // prop=extracts&exsentences=10&exlimit=1&titles=Pet_door&explaintext=1&formatversion=2
  const wikiParams =
    '?action=query' +
    '&titles=' +
    pageTitle.replace(' ', '_') +
    '&prop=extracts' +
    '&exsentences=3' +
    '&exlimit=1' +
    '&explaintext=1' +
    '&formatversion=2'

  const wikiLink = wikiEndpoint + wikiParams
  console.log(wikiLink)

  var wikiConfig = {
    timeout: 6500
  }

  async function getJsonResponse(url, config) {
    const res = await axios.get(url, config)
    return res.data
  }

  return getJsonResponse(wikiLink, wikiConfig)
    .then((result) => {
      return result
    })
    .catch((error) => {
      console.log('an error has occured' + error)
      return null
    })
}

module.exports = { fetchWikiExtract }
