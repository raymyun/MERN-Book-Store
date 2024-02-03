import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

import { PORT, mongoDBURL } from "./config.js";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';

const app = express();

// Middleware(software that allows services/capabilities the app that are otherwise not provided by the operating system)
// This allows parsing of the request body
app.use(express.json());

// Middleware
// Handle CORS policy (2 methods)
// Method 1 - Allow all origins with default of cors(*) :
app.use(cors());

// Method 2 is better as I have more control over who can access my server
// Method 2 - Allow custom origins :
// app.use(
//     cors({
//         // Only clients with this origin can access our server
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type']
//     })
// );

// Get request
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Get / Test with Response Status of 234');
});

// Middleware
// Any request with a prefix of 'books' will be handled by booksRoute
app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App is successfully connected to the database.');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });