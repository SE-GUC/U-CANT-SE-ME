const express = require('express');

//Require Route Handlers
const investors = require('./routes/api/investors');
const admins = require('./routes/api/admins');
const notifications = require('./routes/api/notifications');
const companies = require('./routes/api/company.js');

const app = express();

//Middleware
app.use(express.json());


//Homepage
app.get('/', (req, res) => res.send('HomePage'));


//Use Route Handlers
app.use('/api/investors', investors);
app.use('/api/admins', admins);
app.use('/api/company', companies)
app.use('/api/notifications', notifications);

// Handling 404
app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
 })

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
