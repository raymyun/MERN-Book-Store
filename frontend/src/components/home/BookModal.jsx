import React from 'react'
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

const BookModal = ({ book, onClose }) => {
    return (
        <div
            className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
            onClick={onClose}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative'
            >
                <AiOutlineClose
                    className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
                    onClick={onClose}
                />
                <h2 className='w-fit px-4 py-1 bg-gray-300 text-black rounded-lg'>
                    {book.publishYear}
                </h2>
                <h4 className='my-2 text-gray-800'>
                    <span className=''>Book ID: </span>
                    {book._id}
                </h4>
                <div className='flex justify-start items-center gap-x-2'>
                    <PiBookOpenTextLight className='text-blue-500 text-2xl' />
                    <h2 className='font-semibold my-1'>
                        {book.title}
                    </h2>
                </div>
                <div className='flex justify-start items-center gap-x-2'>
                    <BiUserCircle className='text-blue-500 text-2xl' />
                    <h2 className='font-semibold my-1'>
                        {book.author}
                    </h2>
                </div>
                <p className='mt-4'>Book Summary</p>
                <p className='my-2'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Quisque non tellus orci ac auctor augue mauris augue. Vitae aliquet nec ullamcorper sit amet risus nullam eget felis.
                    Placerat orci nulla pellentesque dignissim enim sit amet venenatis urna. Nam libero justo laoreet sit amet. 
                    Nunc eget lorem dolor sed viverra ipsum. Urna et pharetra pharetra massa. A arcu cursus vitae congue mauris. 
                    Id donec ultrices tincidunt arcu non sodales neque. Eget egestas purus viverra accumsan.
                </p>
            </div>
        </div>
    )
}

export default BookModal