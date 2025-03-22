import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./configs/mongodb.js"
import { clerkWebhooks } from "./controllers/webhooks.js"

// Initialize Express
const app = express()

// Middlewares
app.use(cors())

// Connect to database
await connectDB()

// Routes
app.get('/', (req, res) => res.send("API Working"))
app.post('/clerk', express.json(), clerkWebhooks)

// Port
const PORT = process.env.PORT || 7000

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})