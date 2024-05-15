import express from 'express'
import forecast from '../src/routes/forecast.js'
import current from '../src/routes/current.js'
import 'dotenv/config'

var app = express()
const port = process.env.PORT || 3000

app.use('/current', current)
app.use('/forecast', forecast)

app.listen(port, () => {console.log("Listening to port " + port + "...")})

export default app
