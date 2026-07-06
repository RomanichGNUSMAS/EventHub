const { app } = require('./src/app')
const { startDB } = require('./src/configs/db')

startDB()
    .then(() => {
        app.listen(3001, () => {
            console.log('server started at 3001')
        })
    })