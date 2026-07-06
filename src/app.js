const express = require('express');
const { cookieSecret } = require('../src/configs/env')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { authRoutes } = require('./routes/auth.route');
const { eventRoutes } = require('./routes/event.route');
const { attendanceRoutes } = require('./routes/attendance.route');
const { reviewRoutes } = require('./routes/review.route');
const app = express()

app.use(cors({
    credentials: true
}));
app.use(cookieParser(cookieSecret))
app.use(express.json());

app.use('/auth',authRoutes)
app.use('/events',eventRoutes)
app.use('/attendances', attendanceRoutes)
app.use('/reviews', reviewRoutes)

module.exports = { app };