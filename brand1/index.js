var cookieSession = require('cookie-session')
var express = require('express')
var morgan = require('morgan')

var app = express()
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(cookieSession({
  name: 'sid',
  keys: ['ffff'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.get('/', function (req, res, next){
    req.session.views = (req.session.views || 0) + 1
    
    // Write response
    //res.end(req.session.views + ' views')
    res.send('<html><head><title>Auth Test</title><script src="/js/cors.js"></script><body>' + req.session.views + ' views</body></html>')
})
  
app.use(express.static('public'))

app.listen(1111, function () {
    console.log('brand1.com web server listening on port 1111')
})