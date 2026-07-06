const mongoose = require('mongoose')
const { mongoUrl } = require('./env')

exports.startDB = async function () {
    try {
        await mongoose.connect(mongoUrl)
        console.log('mongodb connected');
    } catch (err) {
        console.error(err)
    }
}