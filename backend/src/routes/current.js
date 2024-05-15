import express from 'express'

const BASE_URL = "http://api.openweathermap.org/data/2.5/air_pollution"

process.loadEnvFile()

const router = express.Router()

router.use(express.json())

router.get("/", (req, res) => {
    const url = `${BASE_URL}?lat=${req.query.lat}&lon=${req.query.lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`
    console.log(url)
    const request = new Request(url)
    fetch(request)
        .then(res => res.json())
        .then(data => {
            if (data.cod && data.cod !== 200){
                res.status(500).send("Invalid api request")
                return
            }
            console.log(JSON.stringify(data))
            res.send(data)
        })
})

export default router