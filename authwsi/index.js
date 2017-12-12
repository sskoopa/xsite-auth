var cookieSession = require('cookie-session')
var express = require('express')
var cors = require('cors')
var morgan = require('morgan')

var app = express()
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req[cookie]'))

app.use(cookieSession({
    name: 'auth',
    keys: ['ffff'],
  
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))
  
var whitelist = ['http://authwsi.com:8888', 'http://brand1.com:1111', 'http://brand2.com:2222']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.get('/products/:id', cors(corsOptions), function (req, res, next) {
    req.session.corsViews = (req.session.corsViews || 0) + 1
    console.log('browser has viewed ' + req.session.corsViews + ' times')
    res.json({msg: 'This is CORS-enabled for a whitelisted domain.'})
})

app.get('/*', function (req, res, next){
    req.session.views = (req.session.views || 0) + 1
    res.send('Hello Non CORS Request')
})

app.listen(8888, function () {
  console.log('CORS-enabled web server listening on port 8888')
})