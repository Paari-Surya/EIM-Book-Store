import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import axios from 'axios';

const UserAddBook = () => {
  const router = useRouter();
  const [singleBook, setSingleBook] = useState();
  const [userBooks, setUserBooks] = useState();
  const [show, setShow] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = router.query;
      if (data) {
        const decodedData = decodeURIComponent(data);
        const deserializedObject = JSON.parse(decodedData);
        setSingleBook(deserializedObject);
      }

      const response = await axios.get('/api/getclient');
      const responseData = await response.data;
      if (responseData.result.status === 'success') {
        const books = responseData.result.data.books;
        setUserBooks(books);
        setDataLoaded(true);
        console.log(books);
        console.log(singleBook);
      }
    })();
  }, []);

  useEffect(() => {
    if (userBooks && singleBook) {
      let hasBook = false;
      for (let i = 0; i < userBooks.length; i++) {
        if (userBooks[i]._id === singleBook._id) {
          hasBook = true;
        }
      }
      setShow(hasBook);
      // console.log(userBooks);
      // console.log(singleBook);
    }
  }, [userBooks, dataLoaded, show]);

  const handleButton = () => {
    router.push('/user');
  };

  const handleClick = (e, singleBook) => {
    console.log(singleBook);
    console.log(singleBook.id);
    fetch('/api/useraddbook', {
      method: 'POST',
      body: JSON.stringify({
        bookId: singleBook.id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.result.status === 'success') {
          router.push('/user');
        }
      });
  };

  return (
    <>
      <Header title="All Books" handleButton={handleButton} />
      <div>
        <div className="space-y-4 mt-10 w-2/3 py-4 border border-gray-300 mx-auto shadow-lg rounded-lg">
          <div className="mb-4 text-center font-xl text-black font-bold">
            BOOK DETAILS
          </div>
          <div className="grid grid-cols-2">
            <div>
              <p className="text-base text-center font-bold text-gray-900">
                Name
              </p>
            </div>
            <div>
              <p className="text-base text-center capitalize font-bold text-gray-600">
                {singleBook ? singleBook.name.toLowerCase() : ''}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <p className="text-base text-center font-bold text-gray-900">
                Author
              </p>
            </div>
            <div>
              <p className="text-base text-center capitalize font-bold text-gray-600">
                {singleBook ? singleBook.author.toLowerCase() : ''}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <p className="text-base text-center font-bold text-gray-900">
                Publisher
              </p>
            </div>
            <div>
              <p className="text-base text-center capitalize font-bold text-gray-600">
                {singleBook ? singleBook.publisher.toLowerCase() : ''}
              </p>
            </div>
          </div>
          <div className="mt-4 block">
            {show ? (
              <div className="block w-10/12 px-4 py-2 bg-green-200 text-green-900 text-center mx-auto">
                On Your Collection!
              </div>
            ) : (
              <button
                onClick={(e) => handleClick(e, singleBook)}
                className="block mx-auto rounded px-6 py-3 bg-slate-800 text-white font-medium"
              >
                Add Book
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAddBook;
