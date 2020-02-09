const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to use
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Yulong Kwok'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Yulong Kwok'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'There is some helpful text.',
        title: 'Help',
        name: 'Yulong Kwok'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { location, geo } = {}) => {
        if (error) {
            return res.send({ error: error })
        }
        forecast(geo, (error, data) => {
            if (error) {
                return res.send({ error: error })
            }
            return res.send({
                location,
                address: req.query.address,
                forecast: data
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search item'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yulong Kwok',
        errorMessage: 'Help article not found',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yulong Kwok',
        errorMessage: 'Page not found'
    })
})
app.listen(3000, () => {
    console.log('Server running...')
})