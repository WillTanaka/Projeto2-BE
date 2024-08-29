//const mongoose = require("mongoose")
//
//module.exports = (req, res, next) => {
//    mongoose.connect("mongodb+srv://admin:admin123@projetobe.pimfa.mongodb.net/?retryWrites=true&w=majority&appName=projetobe").catch((err) => {
//        console.log("Error ao conectar no banco...")
//    })
//    return next()    
//}

const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    const mongoDBUrl = process.env.MONGO_URI;
    try {
        await mongoose.connect(mongoDBUrl);
        console.log("Conectado ao MongoDB");
    } catch (err) {
        console.error("Erro ao conectar ao MongoDB:", err);
        process.exit(1);
    }
};
module.exports = connectDB;