const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const options = {
            dbName: process.env.DB_NAME,
            user: process.env.DB_USER,
            pass: process.env.DB_PASS,
        }
        await mongoose.connect(process.env.NODE_ENV, options);
    } catch (error) {
        console.error('Lỗi Connect Db - ', error);
    }
}

module.exports = connectDB;
