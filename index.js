const express = require('express');
const companies = require('./routes/api/company.js')

//Require Route Handlers
const investors = require('./routes/api/investors');


const app = express();

//Middleware
app.use(express.json());


//Homepage
app.get('/', (req, res) => res.send('HomePage'));


//Use Route Handlers
app.use('/api/investors', investors);
app.use('/api/company', companies)


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
