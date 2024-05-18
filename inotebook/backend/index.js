const connenctToMongo = require('./db')
const express = require('express')


connenctToMongo();


const app = express()
// const port = 3000
const port = 5000

/* 
app.get('/', (req, res) => {
  res.send('Hello World!')
})
*/

app.use(express.json())  // req.body will give o/p if we write this request 


app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})