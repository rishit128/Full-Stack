import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import Routes from './Routes/userRoute.js'
const app = express();
app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
    
app.use('/users', Routes);
const CONNECTION_URL = 'mongodb+srv://crudproject:crudproject@cluster0.ffqoy.mongodb.net/KCS?retryWrites=true&w=majority';
const PORT = process.env.PORT || '8080';


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => { 

    app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
}).catch((error) => {
    console.log('Error:', error.message)
})