const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const fetch = require('node-fetch')

const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
const app = express()

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Indira Sarkar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About the app',
        name: 'Indira Sarkar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help is on the way!!',
        title: 'Help',
        name: 'Indira Sarkar'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: 'It is hot',
    //     location: 'Mumbai'
    // })
})

app.get('*', (req, res) => {
    res.send('<h1>404: Page not found!!</h1>')
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})

// const weatherForm = document.querySelector('form')
// 
//const search = document.querySelector('input')
// weatherForm.addEventListener('submit', () => {
//     console.log('testing!')
// })


