import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'

// Initialize Express
const app = express()

// Connect to database
await connectDB(process.env.MONGODB_URL)

// Middleware
app.use(cors())
app.use(express.json()) // Ensure JSON middleware is applied

// Routes
app.get('/', (req, res) => res.send("API Working"))
app.post('/clerk', clerkWebhooks)

// Port
const PORT = process.env.PORT || 6000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`) 
})