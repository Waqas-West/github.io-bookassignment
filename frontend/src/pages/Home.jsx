import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingComp from '../components/LoadingComp';
import { Link } from 'react-router-dom';
import BooksTable from '../components/home/BooksTable';
import BooksCards from '../components/home/BooksCards';
import Searchbar from '../components/Searchbar';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5174/books')
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className=''>
    <div className='flex justify-end items-center gap-x-4 h-16  bg-black'>
      <button
        className='bg-yellow-300 hover:bg-yellow-600 px-4 py-1 rounded-lg text-black'
        onClick={() => setShowType('table')}
      >
        Table
      </button>
      <button
        className='bg-purple-300 hover:bg-yellow-600 px-4 py-1 rounded-lg text-black'
        onClick={() => setShowType('card')}
      >
        Card
      </button>
      <div className='flex'>
        <a href="/">
          <button className='bg-purple-300 hover:bg-yellow-600 px-4 py-1 rounded-lg text-black mx-2'>
            logout
          </button>
        </a>
        <Link to='/signup'>
          <button className='bg-yellow-300 hover:bg-yellow-600 px-4 py-1 rounded-lg text-black mx-2'>
            Signup
          </button>
        </Link>
      </div>
      </div>
      
<div className='flex justify-center items-center bg-blue-200'>

        <h1 className='text-3xl my-8'></h1>
        <div className='flex justify-between items-center'>
         
          {/* <Searchbar /> */}
        </div>
      </div>
      {loading ? (
        <LoadingComp />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCards books={books} />
      )}
    </div>
  );
};

export default Home;
