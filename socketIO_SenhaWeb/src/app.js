const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = function(state){
    const app = express();

    app.use(bodyParser.urlencoded({ extended:true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors());

    const index = require('./routes/index')(state);

    app.use('/', index);

    return app;
}