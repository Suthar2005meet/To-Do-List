const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors({
  origin: "https://your-frontend.vercel.app/"
}));

const DBConnection = require('./src/Config/DBConnection')
DBConnection()

const UserRoute = require('./src/Route/UserRoute')
app.use('/user', UserRoute)

const TaskRoute = require('./src/Route/TaskRoute')
app.use('/task', TaskRoute)


const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

