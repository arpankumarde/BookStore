import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS policy
//1. Allow all origins with default of cors(*)
app.use(cors())
//2. Allow custom origin
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    })
)


app.get('/', (request, response) => {
    // console.log(request);
    return response.status(234).send('Welcome to the Book Store');
})

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then((val) => {
        console.log('App connected to Database');
        app.listen(PORT, () => {
            console.log(`App is listening to PORT: ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })