
const express = require('express') //express framework
const http_request = require('request') //helpful npm module for easy http requests
const PORT = process.env.PORT || 3000 //allow environment variable to possible set PORT
const bodyParser = require('body-parser') //parses bodies of POST messsages


let API_KEY = '3811628764de732526a001fe10ce5fa3' //API KEY



const app = express()

function myLogger(request, response, next) {
  console.log(`METHOD: ${request.method}`)
  console.log(`URL: ${request.url}`)
  console.log(`PATH: ${request.path}`)
  next() //allow next middleware to run
}
function messageSeparator(request, response, next) {
  console.log(`---------------------------------------------------------`)
  next() //allow next middleware to run
}

//Middleware
app.use(messageSeparator)
app.use(myLogger)
app.use(express.static(__dirname + '/public')) //static server
app.use(bodyParser.json()) //parse JSON in POST bodies.

//Routes
app.get(['/', '/index.html', '/recipes.html', '/recipes'], (request, response) => {
  response.sendFile(__dirname + '/views/index.html')

})

app.get('/recipes', (request, response) => {

  //using queries
  let ingredient = request.query.ingredient

  let url = ''
  if (!ingredient) {
    return response.json({ message: 'Please enter an ingredient name' })
    url = `https://food2fork.com/api/search?key=${API_KEY}`
  }
  else {
    url = `https://food2fork.com/api/search?key=${API_KEY}&q=${ingredient}`
  }
  http_request.get(url, (err, res, data) => {
    return response.contentType('application/json').json(JSON.parse(data))


  })

})

app.post('/recipes', (request, response) => {
  // using json data from client
  let ingredient_data = request.body
  let ingredient = ingredient_data.ingredient


  let url = ''
  if (!ingredient) {
    return response.json({ message: 'Please enter an ingredient name' })
    url = `https://food2fork.com/api/search?key=${API_KEY}`
  }
  else {
    url = `https://food2fork.com/api/search?key=${API_KEY}&q=${ingredient}`
  }
  http_request.get(url, (err, res, data) => {
    return response.contentType('application/json').json(JSON.parse(data))


  })
})


//start server
app.listen(PORT, err => {
  if (err) console.log(err)
  else {
    console.log(`Server listening on port: ${PORT}`)
    console.log(`To Test:`)
    console.log('http://localhost:3000/recipes.html')
    console.log('http://localhost:3000/recipes')
    console.log('http://localhost:3000/')
    console.log(`http://localhost:3000/recipes?ingredient=Basil`)
    console.log(`http://localhost:3000`)
  }
})
