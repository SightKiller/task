const express = require('express');
const cors = require('cors');
const { connectDatabase } = require('./database/db');
const routes = require('./Routes/router');

const app = express();

connectDatabase();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(routes);  

app.listen(8000, () => {
    console.log('The server is listening on port 8000');
});
