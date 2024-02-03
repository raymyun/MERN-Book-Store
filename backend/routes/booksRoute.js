import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route - Adding a new book to the database
router.post('/', async (request, response) => {
    try {
        // Check that the user has provided all required fields properly
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            // Status 400 for client error
            return response.status(400).send({ message: 'Provide all required fields: title, author, publishYear'});
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };
        const book = await Book.create(newBook);
        // Status 201 for creation
        return response.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        // Status 500 for server error
        response.status(500).send({ message: error.message })
    }
});

// Route - Get all books from the database
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        // Status 200 for success
        // Return found books
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route - Get a book from the database by ID
router.get('/:id', async (request, response) => {
    try {
        // Destructure request to get ID of desired book
        const { id } = request.params;
        const book = await Book.findById(id);
        // Status 200 for success
        // Return found book
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route - Update an existing book in the database
router.put('/:id', async (request, response) => {
    try {
        // Again, check that the user has provided all required fields properly
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({ message: 'Provide all required fields: title, author, publishYear'});
        }
        // Destructure request to get ID of desired book
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        // Check if the book exists in the database
        // Status 404 for object not found
        // Note: Not a bug, but
        // 1: When the ID is of correct length, but with incorrect characters, we get a FALSE result and get error with status 404
        // 2: When the ID is of incorrect length, it is CAUGHT by the trycatch, and we get an error with status 500
        if (!result) {
            return response.status(404).json({ message: 'Book with provided ID does not exist in the database.'});
        }
        else {
            // If found, status 200 for success
            return response.status(200).send({ message: 'Book was updated successfully.'});
        }

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route - Deleting an existing book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: 'Book with provided ID does not exist in the database.'});
        }
        else {
            return response.status(200).send({ message: 'Book was deleted successfully.'});
        }
        
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

export default router;