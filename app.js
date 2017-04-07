
var express = require('express')
   , routes = require('./routes')
   , http = require('http')
   , path = require('path')
   , connection  = require('express-myconnection')
   , favicon = require('express-favicon')
   , bodyParser = require('body-parser')
   , cookieParser = require('cookie-parser')
   , log4js = require('log4js')
   , methodOverride = require('method-override')
   , session = require('express-session')
   , expressWinston = require('express-winston')
   , winston = require('winston')
   , myframework = require('myframework');
   
var app = express();
console.log(process.env.salesorder_service_port);
app.set('port', process.env.PORT || 3406);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.use(cookieParser('secret'));
app.use(session({secret:'yoursecret', cookie:{maxAge:10*60*1000}}));
app.use(methodOverride());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// development only
if ('development' == app.get('env')) {
  //app.use(express.errorHandler());
}


app.use(express.Router());
require('./routes/index')(app);
require('./routes/inventory')(app);
require('./routes/warehouse')(app);
require('./routes/salesorder')(app);
require('./routes/alert')(app);
require('./routes/dashboard')(app);

app.use(expressWinston.logger({
  transports: [
    new(winston.transports.File)({
              filename:'/app/logs/gw.log',
       colorize: false,
      //level: 'error',
       json: false
    })
  ],
  statusLevels: true,
  meta: false,
  msg: "{{res.statusCode}}\t{{req.ip}}\t{{req.xhr}}\t{{req.method}}\t{{res.responseTime}}ms\t{{req.url}}"
}));

app.use(function(err, req, res, next) {
  //console.log("**************** "+err.message);
  res.status(500);
  next(err);
});

log4js.configure('./config/log4js.json',{});
app.set('logger',log4js);
var logger = log4js.getLogger("app.js");

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
