import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton';
import Loader from '../components/Loader';

const DeleteBook = () => {
    const [loading, setLoading] = useState(false);
    const [book, setBook] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/books/${id}`)
            .then((response) => {
                setBook(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, []);


    const handleDeleteBook = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:5555/books/${id}`)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error occurred. Please check console for details.');
                console.log(error);
            })
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>
                Delete Book
            </h1>
            {loading ? <Loader /> : ''}
            <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
                <h3 className='text-2xl'>
                    Are you sure you want to <span className='text-red-700 font-semibold'>delete</span> this book?
                </h3>
                <h3 className='text-2xl'>
                    <span className='font-bold'>{book.title}</span> by <span className='font-semibold'>{book.author}</span>
                </h3>
                <button
                    className='p-4 bg-red-700 text-white font-semibold mt-6 w-[200px] rounded-xl'
                    onClick={handleDeleteBook}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DeleteBook