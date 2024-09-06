const mongodb= require('mongoose');
require('dotenv').config()
mongodb.connect(process.env.MONGO_URL);