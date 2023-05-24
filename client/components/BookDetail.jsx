import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function Example(props) {
  const setOpen = props.setOpen;
  const open = props.open;
  const singleBook = props.singleBook;

  console.log(singleBook);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
                <div className='py-2 flex items-center justify-between border-b border-gray-300'>
                  <h2 className='font-semibold'>{singleBook.title}</h2>
                  <button onClick={() => setOpen(!open)} className='bg-orange-700 text-white px-6 py-2 rounded-full'>Close</button>
                </div>
                <div className='grid grid-cols-10 mt-3'>
                  <div className='col-span-3'>
                    <img src={singleBook.cover} className='w-40 h-48 block mx-auto object-contain' alt="" />
                  </div>
                  <div className='grid grid-cols-8 gap-4 col-span-7'>
                  <div className='col-span-4'>
                    <div>
                      <h3 className='font-semibold'>Author</h3>
                      <p className='line-clamp-3'>{singleBook.author}</p>
                    </div>                    
                  </div>
                  <div className='col-span-2'>
                    <div>
                      <h3 className='font-semibold'>Year</h3>
                      <p>{singleBook.year}</p>
                    </div>                                      
                  </div>
                  <div className='col-span-2'>
                    <div>
                      <h3 className='font-semibold'>Edition</h3>
                      <p>{singleBook.edition}</p>
                    </div>                    
                  </div>
                  <div className='col-span-4'>
                    <div>
                      <h3 className='font-semibold'>Categories</h3>
                      <p className='w-60 line-clamp-3'>{singleBook.categories}</p>
                    </div>                    
                  </div>
                  <div className='col-span-2'>
                    <div>
                      <h3 className='font-semibold'>Language</h3>
                      <p>{singleBook.language}</p>
                    </div>                                      
                  </div>
                  <div className='col-span-2'>
                    <div>
                      <h3 className='font-semibold'>Pages</h3>
                      <p>{singleBook.pages}</p>
                    </div>                    
                  </div>
                  <div className='col-span-4'>
                    <h3 className='font-semibold'>Description</h3>
                    <p className='line-clamp-3'>{singleBook.description}</p>
                  </div>
                  <div className='col-span-4'>
                    <h3 className='font-semibold'>Book Format</h3>
                    <p>{singleBook.file_extension}</p>
                  </div>
                </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setOpen(false)}
                  >
                    Go back to dashboard
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
