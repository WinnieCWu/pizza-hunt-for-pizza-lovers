const express = require('express');
const mongoose = reauire('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

//tells Mongoose which db to connect to (ie Heroku; else, will be to local route)
mongoose.connect(process.env.MONGOD_URI) || 'mongod://localhost:3001/pizza-hunt-for-lovers', {
    userNewUrlParser: true,
    useUniifiedTopogophy: true
});
//Use this to log mono queries being executed!
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Conn'ected on localhost:${PORT}`));
