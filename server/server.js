import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./configs/mongodb.js"
import { clerkMiddleware } from "@clerk/express"
import educatorRouter from "./routes/educatorRoutes.js"
import { clerkWebhooks } from "./controllers/webhooks.js"

// Initialize Express
const app = express()

// Middlewares
app.use(cors())
app.use(clerkMiddleware)
app.use(express.json()) // parse incoming JSON

// Routes
app.get('/', (req, res) => res.send("API Working"))
app.post('/clerk', clerkWebhooks)
app.use('/api/educator', educatorRouter)

// Port
const PORT = process.env.PORT || 7000


// Start server after DB connects
const startServer = async () => {
    try {
        await connectDB()
        console.log("Connected to database.")
        app.listen(PORT, () => {
            console.log(`Server is running at ${PORT}`)
        })
    } catch (error) {
        console.error("Failed to connect to DB:", error)
    }
}

startServer()
