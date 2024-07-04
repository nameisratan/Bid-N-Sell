// Imports

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const dbConfig = require('./config/dbConfig');
const cors = require('cors');
//Middlewares

app.use(express.json());
app.use(cors());
//Routes

// Routes : 
const homeRouter = require('./routes/home');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const productsRouter = require('./routes/products');
const ownerRouter = require('./routes/owner');
const profileRouter = require('./routes/profile');
const uploadRouter = require('./routes/upload');
const bidsRouter = require('./routes/bids');

// Routes initialize : 

app.use('/upload', uploadRouter);
app.use('/product', productsRouter);
app.use('/', homeRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/owner', ownerRouter);
app.use('/profile', profileRouter);
app.use('/bids', bidsRouter);
// Server starting
app.listen(PORT, ()=>{
    console.log("Node JS Server is running on port : " + PORT );
});