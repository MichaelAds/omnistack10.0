const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://omnistack10:michael123@cluster0-v4h4l.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors());

app.use(express.json());
app.use(routes);


app.get('/', (req, res) => {
    return res.send( 'Hello World' );
})

app.listen(3333)