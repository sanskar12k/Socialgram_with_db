const mongoose = require('mongoose');

//connecting to MongoDB
const db = process.env.DATABASE;

mongoose
    .connect(db,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
    .then(() =>{console.log('Mongo connected')})
    .catch(err => console.log('no connection'));