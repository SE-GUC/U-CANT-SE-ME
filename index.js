const express = require('express')
const lawyers =require('./routes/api/lawyers')
const app = express()

app.use(express.json())


app.get('/', (req, res) => {
    res.send(`<h1>MainPageforLawyers</h1>
    <a href="/api/lawyers/">Lawyers</a>
    `);
})
app.use('/api/lawyers', lawyers)






const port = 3000
app.listen(port, () => console.log(`Server up and running on port ${port}`))