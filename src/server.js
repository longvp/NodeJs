import express from "express";
import configViewEngine from "./configs/configViewEngine";
import initWebRoute from "./router/web";
import initAPIRoute from "./router/api";
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const morgan = require('morgan');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(morgan('combined'));

// view engine
configViewEngine(app);

// init web route
initWebRoute(app);

// init api route
initAPIRoute(app);

// handle 404 not found
app.use((req, res) => {
    return res.render('404.ejs');
});

app.listen(port, () => {
    console.log('App running');
});