const express = require('express')

const companies = require('./routes/api/company.js')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to Sumerge</h1>
    <a href="/api/company">Company</a>`);
})

app.use('/api/company', companies)

app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
 })

const port = 3000
app.listen(port, () => console.log(`Server up and running on port ${port}`))
