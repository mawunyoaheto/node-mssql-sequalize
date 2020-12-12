var express = require('express');
const app = express();
const config = require('./config');
var bodyParser = require('body-parser');
var sequelize = require('./app/api/v1/util/db');
const models = require('./app/api/v1/models');
const passport = require('passport');
const path = require('path');

var helmet = require('helmet');
const rateLimit = require('express-rate-limit')
//const flash = require('express-flash');
const cors = require("cors");
var compression = require('compression');
var morgan = require('morgan');
const winston = require('./app/api/v1/util/winston');



var swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const session = require('express-session');


const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "POS API",
            version: "1.0.1",
            description: "An API for Point of Sale",
            contact: {
                name: "KAZIHUB - EVERYTHING INOVATION"
            }
            //servers:["http://localhost:5001/api/v2"]
        },
        servers: [
            {
                url: 'http://{urlpath}:{port}{basePath}',
                description: 'The Test API server',
                variables: {
                    urlpath: {
                        default: 'localhost',
                        description: 'this value is assigned by the service provider, in this example `gigantic-server.com`'
                    },
                    port: {
                        enum: [
                            '5004',
                            '443',
                            '8080'
                        ],
                        default: '5004'
                    },
                    basePath: {
                        default: '/api/v1'
                    }
                }
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: {
            bearerAuth: []
        }
    },
    apis: ['./app/api/v1/routes/*.js']
    //apis: ['./api/v2/routes/*.js']

}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  })
  );

  global.__basedir = __dirname;
  
  //app.set('view engine', 'ejs');
  //app.use(flash())
  app.use(passport.initialize())
  app.use(passport.session());
  app.use(helmet());
 // app.use(limiter)
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  app.use(morgan('combined', {
    stream: winston.stream
  }));
  
  // Routes which should handle requests
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(express.static(path.join(__dirname, "util")));
  
  app.use(cors());
  app.use(compression());

  
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//  models.sequelize.sync({ force: false })
// .then(() => {
//   console.log(`Database & tables created!`);
// });


//import routes
require('./app/api/v1/routes/currencies')(app);
require('./app/api/v1/routes/taxes')(app);
require('./app/api/v1/routes/outlets')(app);
require('./app/api/v1/routes/orders')(app);
require('./app/api/v1/routes/itembaseunits')(app);
require('./app/api/v1/routes/product_categories')(app);
require('./app/api/v1/routes/products')(app);
require('./app/api/v1/routes/suppliers')(app);



const server = app.listen(config.port, function (req, res) {
    app.set('json spaces', 40);
    console.log(`Server running at http://${config.host}:${config.port}...`);
});

