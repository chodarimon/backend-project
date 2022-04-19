const express = require('express')

const axios = require('axios')

const app = express()
const port = 3000
app.use(express.urlencoded())
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/about.html')
})

app.post('/find', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://celebrity-by-api-ninjas.p.rapidapi.com/v1/celebrity',
    params: { name: `${req.body.dd}` },
    headers: {
      'X-RapidAPI-Host': 'celebrity-by-api-ninjas.p.rapidapi.com',
      'X-RapidAPI-Key': 'ed04e19701msh5b1ef1bad158febp1ac3f0jsn08bb7653a75c',
    },
  }

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data[0].name)
      console.log(response.data[0].gender)
      console.log(response.data[0].occupation)
      for (let i = 0; i < response.data[0].occupation.length; i++) {
        if (response.data[0].occupation[i] == 'actor') {
          console.log('It is an actor!')
        }
      }

      //console.log(response.data[0].height);
    })
    .catch(function (error) {
      console.error(error)
    })

  //console.log(req.body.dd);
  //res.sendFile(__dirname + "/info_page.html");
})

app.use(express.static(__dirname + '/public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
