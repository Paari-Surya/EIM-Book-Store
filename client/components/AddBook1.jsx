import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PhotoIcon } from '@heroicons/react/24/outline';

export default function Example(props) {
  // const add = props.add;
  const add = true;
  const setAdd = props.setAdd;
  const [file, setFile] = useState(null);
  const [coverImg, setCoverImg] = useState({ coverImg: '' });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCoverImg = async (e) => {
    const img = e.target.files[0];
    const base64 = await convertToBase64(img);
    setCoverImg({ ...coverImg, coverImg: base64 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(coverImg);
    const author = document.getElementById('author').value;
    const name = document.getElementById('name').value;
    const publisher = document.getElementById('publisher').value;
    // const coverImg = document.getElementById('coverImg').files[0];
    // const bookPdf = document.getElementById('bookPdf').files[0];

    if (author && name && publisher && !!coverImg && !!bookPdf) {
      //   const formData = new FormData();
      //   formData.append('book', bookPdf);
      //   formData.append('coverImg', coverImg);
      //   formData.append('data', JSON.stringify({ name, author, publisher }));

      fetch('/api/createbook', {
        method: 'POST',
        headers: {
          'Content-type': `mutipart/form-data;boundary=${formData._boundary}`,
        },
        body: formData,
      })
        .then((res) => res.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'Book.pdf';
          document.body.appendChild(link);
          link;
          console.log(link);
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        });
    }
  };
  return (
    <Transition.Root show={add} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setAdd}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                  <div>
                    <h2 className="text-center font-xl text-black font-bold">
                      ADD BOOK
                    </h2>

                    <div className="grid grid-cols-2">
                      <div className="block mt-4">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          id="name"
                          className="block rounded-md border border-gray-400 px-4 py-1.5"
                        />
                      </div>
                      <div className="block mt-4">
                        <label htmlFor="author">Author</label>
                        <input
                          type="text"
                          id="author"
                          className="block rounded-md border border-gray-400 px-4 py-1.5"
                        />
                      </div>
                      <div className="block mt-4">
                        <label htmlFor="publisher">Publisher</label>
                        <input
                          type="text"
                          id="publisher"
                          className="block rounded-md border border-gray-400 px-4 py-1.5"
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <p>Cover Image</p>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <PhotoIcon
                            className="mx-auto h-12 w-12 text-gray-300"
                            aria-hidden="true"
                          />
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="coverImg"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="coverImg"
                                name="coverImg"
                                type="file"
                                className="sr-only"
                                onChange={handleCoverImg}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-600">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 flex items-center justify-end gap-4">
                    <button
                      type="submit"
                      className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="rounded-md border border-gray-600 px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                      onClick={() => setAdd(false)}
                    >
                      Go back to dashboard
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
