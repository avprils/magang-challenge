const express = require('express')
const app = express()
const port = 3001

//import file routes
const routerUser = require ('./routes/user')
const routerAuth = require ('./routes/auth')
//load routes
app.use('/user', routerUser)
app.use('/login', routerAuth)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })