const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// Request Logging Middleware
app.use((req, res, next) => {
    const start = Date.now()
    const time = new Date().toLocaleTimeString()
    console.log(`[${time}] 📥 ${req.method} ${req.originalUrl}`)
    res.on("finish", () => {
        const duration = Date.now() - start
        console.log(`[${time}] ✅ ${res.statusCode} ${req.method} ${req.originalUrl} (${duration}ms)`)
    })
    next()
})

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

app.get("/", (req, res) => {
    res.json({ message: "Backend server is running cleanly!", status: "OK" })
})



module.exports = app