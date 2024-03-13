const express = require('express')
const app = express()
const port = 3000
const mainRouter = require('./MainRouter')

// app.get('/', (req, res) => {
    // res.send('Hello World!')
    // res.json({ message: 'ola' })
// })

app.use(express.json());
app.use('/api', mainRouter);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})