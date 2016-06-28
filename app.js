var express 		 = require("express"),
    app          = express(),
    // favicon      = require('serve-favicon'),
		path 				 = require("path"),
		logger 			 = require('morgan'),
		cookieParser = require('cookie-parser'),
		bodyParser 	 = require('body-parser'),
		helmet       = require("helmet"),
		port 				 = process.env["PORT"] || 8080,
    csrf         = require("csurf");


// development modules
require("./private/private-data")();
app.use( logger( (process.env["NODE_ENV"] || "dev").toLowerCase() ) );

// config
// view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard("allow-from", process.env["WEB_HOSTNAME"] || ("http://localhost:8080") ));
app.use(helmet.contentSecurityPolicy({
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "*.jsdelivr.net", "jsconsole.com"],
  styleSrc: ["'self'", "'unsafe-inline'", "*.jsdelivr.net"],
  imgSrc: ["'self'", "*.jsdelivr.net"],
  connectSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "ws://*"],
  fontSrc: ["fonts.google.com"],
  objectSrc: ["'self'"],
  mediaSrc: ["'self'"],
  frameSrc: ["'self'"],
  //sandbox: ["allow-forms", "allow-scripts", "allow-same-origin"],
  reportUri: '/report-violation',
  //reportOnly: true, // set to true if you only want to report errors
  //setAllHeaders: false, // set to true if you want to set all headers
  //disableAndroid: false, // set to true if you want to disable Android (browsers can vary and be buggy)
  //safari5: false // set to true if you want to force buggy CSP in Safari 5
}));
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);

  next();
});

// require custom modules
// routes module
var routes = require("./custom_modules/routes"),
csrfRoutes = require("./custom_modules/csrf-routes");
app.use(routes);
app.use(csrf({ cookie : true }));
app.use(csrfRoutes);

app.listen(port)
console.log("listening on port:", port);

// log errors to the console
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  // handle CSRF token errors here
  res.status(403).send('form tampered with');
});

process.on('uncaughtException', function (err) {
  console.log("\n\r **Uncaught Exception event** \n\r");
  console.log(err);
});
