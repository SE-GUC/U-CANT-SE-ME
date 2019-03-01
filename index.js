const express = require('express');
const app = express();
app.use(express.json());

const external_entities = require('./routes/api/externalentities');

app.get('/', (req, res) => {
  res.send(`<h1>Welcome to Sumerge's RCES</h1>
  <a href="/api/externalentities">External Entities</a>`
  );
})

app.use('/api/externalentities', external_entities)

app.use((req, res) => {
  res.status(404).send({error: 'We can not find what you are looking for'});
})

const port = process.env.PORT | 3000
app.listen(port, () => console.log(`Server up and running on port ${port}`))
