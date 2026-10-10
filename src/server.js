require('dotenv').config();
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]); // Fix Error querySrv MongoDB Atlas
const express = require('express');
const cors = require('cors'); // Cho phép TẤT CẢ domain gọi API
const connectDB = require('./config/db');
const configViewEngine = require('./config/viewEngine');
const apiRouter = require('./router/api');
const webRouter = require('./router/web');
const fileUpload = require('express-fileupload');

const app = express();

const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME || 'localhost';

// Middle
app.use(cors());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
configViewEngine(app);

// Router
app.use('/', webRouter);
app.use('/api/v1', apiRouter);



(async () => {
    try {
        await connectDB();
        app.listen(port, hostname, () => {
            console.log(`Máy chủ được chạy trên ${hostname} - cổng ${port}`);
        });
    } catch (error) {
        console.error('Lỗi Máy chủ chưa được chạy', error);
    }
})();