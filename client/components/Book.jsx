import React from 'react';
import Image from 'next/image';

const Book = (props) => {
  const handleClick = props.handleClick;
  const pathString = props.book.imgPath;
  const convertedPath = pathString && pathString.replace(/\\/g, '/');
  const imgPath = convertedPath && convertedPath.split('/public')[1];
  return (
    <div
      onClick={() => {
        handleClick(props.book);
        props.setOpen(!props.open);
      }}
      className="bg-white shadow-lg border border-gray-300 p-4 rounded-md cursor-pointer"
    >
      <div>
        <img
          src={imgPath && `/static${imgPath}`}
          className="w-40 h-48 block mx-auto object-contain"
          alt=""
        />
      </div>
      <div className="mt-2">
        <h2 className="font-semibold text-black text-sm truncate">
          {props.book.title}
        </h2>
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-gray-200">
        <div className="mt-2">
          <h3 className="text-xs text-gray-600">Author</h3>
          <p className="text-xs font-semibold w-28 truncate">
            {props.book.author}
          </p>
        </div>
        <div className="text-end mt-2">
          <h3 className="text-xs text-gray-600">Pages</h3>
          <p className="text-xs font-semibold w-28 truncate">
            {props.book.pages}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Book;
