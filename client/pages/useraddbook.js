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
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [imgPath, setImgPath] = useState('');

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
        if (singleBook === undefined) setBtnDisabled(true);
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
      const pathString = singleBook.imgPath;
      const convertedPath = pathString && pathString.replace(/\\/g, '/');
      let imagePath = convertedPath && convertedPath.split('/public')[1];
      setImgPath(imagePath);
      if (singleBook !== undefined) setBtnDisabled(false);

      // console.log(userBooks);
      // console.log(singleBook);
    }
  }, [userBooks, dataLoaded, show]);

  const handleButton = () => {
    router.push('/user');
  };
  const handleDelete = () => {
    fetch('/api/deletebook', {
      method: 'POST',
      body: JSON.stringify({
        bookId: singleBook.id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.result.status === 'success') {
          router.push('/user');
        } else {
          alert('Something Went Wrong');
        }
      });
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

          {singleBook && (
            <div className="grid grid-cols-10 mt-3">
              <div className="col-span-3">
                <img
                  src={imgPath && `/static${imgPath}`}
                  className="w-40 h-48 block mx-auto object-contain"
                  alt=""
                />
              </div>
              <div className="grid grid-cols-8 gap-4 col-span-7">
                <div className="col-span-4">
                  <div>
                    <h3 className="font-semibold">Title</h3>
                    <p className="line-clamp-3">{singleBook.name}</p>
                  </div>
                </div>
                <div className="col-span-4">
                  <div>
                    <h3 className="font-semibold">Author</h3>
                    <p className="line-clamp-3">{singleBook.author}</p>
                  </div>
                </div>
                <div className="col-span-2">
                  <div>
                    <h3 className="font-semibold">Year</h3>
                    <p>{singleBook.year}</p>
                  </div>
                </div>
                <div className="col-span-2">
                  <div>
                    <h3 className="font-semibold">Edition</h3>
                    <p>{singleBook.edition}</p>
                  </div>
                </div>
                <div className="col-span-4">
                  <div>
                    <h3 className="font-semibold">Categories</h3>
                    <p className="w-60 line-clamp-3">
                      {singleBook && singleBook.categories}
                    </p>
                  </div>
                </div>
                <div className="col-span-2">
                  <div>
                    <h3 className="font-semibold">Language</h3>
                    <p>{singleBook.language}</p>
                  </div>
                </div>
                <div className="col-span-2">
                  <div>
                    <h3 className="font-semibold">Pages</h3>
                    <p>{singleBook.pages}</p>
                  </div>
                </div>
                <div className="col-span-4">
                  <h3 className="font-semibold">Description</h3>
                  <p className="line-clamp-3">{singleBook.description}</p>
                </div>
                {/* <div className="col-span-4">
                  <h3 className="font-semibold">Book Format</h3>
                  <p>{singleBook.file_extension}</p>
                </div> */}
              </div>
            </div>
          )}

          <div className="mt-4 block">
            {show ? (
              <div>
                <div className="block w-10/12 px-4 py-2 bg-green-200 text-green-900 text-center mx-auto">
                  On Your Collection!
                </div>
                <button
                  onClick={handleDelete}
                  className="flex items-center mx-auto mt-2 gap-2 bg-red-800 text-white rounded-md px-6 py-2"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </span>
                  Remove Book
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => handleClick(e, singleBook)}
                className="block mx-auto rounded px-6 py-3 bg-slate-800 text-white font-medium"
                disabled={btnDisabled}
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
