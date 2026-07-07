const { app } = require('./app')
const { startDB } = require('./configs/db')

startDB()
    .then(() => {
        app.listen(3001, () => {
            console.log('server started at 3001')
        })
    })
    .catch(err => {
        console.log(err.message)
        
    })