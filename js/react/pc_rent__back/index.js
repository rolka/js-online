const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const mainRouter = require('./MainRouter')
const setupSessions = require("./utils/sessionSetup");

// app.get('/', (req, res) => {
    // res.send('Hello World!')
    // res.json({ message: 'ola' })
// })

app.use(cors())
app.use(express.json());
setupSessions(app);
app.use('/api', mainRouter);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})