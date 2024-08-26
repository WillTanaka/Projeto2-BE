const mongoose = require("mongoose")

module.exports = (req, res, next) => {
    mongoose.connect("mongodb+srv://admin:admin123@projetobe.pimfa.mongodb.net/?retryWrites=true&w=majority&appName=projetobe").catch((err) => {
        console.log("Error ao conectar no banco...")
    })
    return next()    
}