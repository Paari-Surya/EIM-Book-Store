import React from "react";

const Book = (props) => {
  const handleClick = props.handleClick;
  return (
    <div
      onClick={() => {
        handleClick(props.book);
        props.setOpen(!props.open);
      }}
      className="grid grid-cols-8 border border-gray-300 p-4 rounded-md cursor-pointer"
    >
      <div className="col-span-2 text-blue-700">
        <div className="flex items-center justify-center rounded-full w-10 h-10 bg-blue-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06v-11a.75.75 0 00-.546-.721A9.006 9.006 0 0015 3a8.963 8.963 0 00-4.25 1.065V16.82zM9.25 4.065A8.963 8.963 0 005 3c-.85 0-1.673.118-2.454.339A.75.75 0 002 4.06v11a.75.75 0 00.954.721A7.506 7.506 0 015 15.5c1.579 0 3.042.487 4.25 1.32V4.065z" />
          </svg>
        </div>
      </div>
      <div className="col-span-6 space-y-2">
        <h2 className="text-sm font-semibold text-gray-900 px-2 py-1">
          {props.book.name}
        </h2>
        <h2>
          <span className="text-sm font-semibold rounded-full text-gray-700 bg-gray-300 px-2 py-1">
            {props.book.author}
          </span>
        </h2>
        <h2>
          <span className="text-sm font-semibold rounded-full text-blue-900 bg-blue-300 px-2 py-1">
            {props.book.publisher}
          </span>
        </h2>
        <h2 className="text-xs font-semibold bg-gray-200 px-2 py-1">
          {props.book.owner}
        </h2>
      </div>
    </div>
  );
};

export default Book;
