const mongoose = require("mongoose")

module.exports = (req, res, next) => {
    // Conexão via cloud
    //mongoose.connect("mongodb+srv://admin:admin123@projetobe.pimfa.mongodb.net/?retryWrites=true&w=majority&appName=projetobe").catch((err) => {
    
    // Conexão local
    mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.0").catch((err) => {
        console.log("Error ao conectar no banco...")
    })
    return next()    
}