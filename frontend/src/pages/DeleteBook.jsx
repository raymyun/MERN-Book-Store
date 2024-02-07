import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton';
import Loader from '../components/Loader';

const DeleteBook = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

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
            
        </div>
    )
}

export default DeleteBook