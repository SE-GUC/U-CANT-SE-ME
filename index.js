const express = require('express');

//Require Route Handlers
const investors = require('./routes/api/investors');
const admins = require('./routes/api/admins');

const app = express();

//Middleware
app.use(express.json());


//Homepage
app.get('/', (req, res) => res.send('HomePage'));


//Use Route Handlers
app.use('/api/investors', investors);
app.use('/api/admins', admins);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
