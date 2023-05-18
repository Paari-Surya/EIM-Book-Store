import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const [Error, setError] = useState(false);

  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
      fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.result.status === 'success') {
            if (res.result.data.user.role === 'user') {
              router.push('/user');
            }

            if (res.result.data.user.role === 'client') {
              router.push('/client');
            }
          } else {
            setError(true);
            setTimeout(() => {
              setError(false);
            }, 3000);
          }
        });
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="block border border-gray-300 w-4/12 rounded-lg shadow-lg px-10 py-5">
        <h3 className="text-xl font-bold text-gray-800 text-center">Login</h3>
        <form onSubmit={handleSubmit}>
          {Error && (
            <div className="bg-red-200 mt-2 rounded px-4 py-2 text-red-800 font-semibold text-center">
              Invalid Credentials
            </div>
          )}
          <div className="block mt-2 px-4">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="block w-full focus:outline-none rounded-md px-4 py-1.5 text-gray-700 border border-gray-400"
            />
          </div>
          <div className="block mt-2 px-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="block w-full focus:outline-none rounded-md px-4 py-1.5 text-gray-700 border border-gray-400"
            />
          </div>
          <div className="mt-3">
            <button className="block px-4 py-2 mx-auto bg-blue-700 text-white rounded ">
              Submit
            </button>
          </div>
          <div className="mt-3">
            <p className="text-center">
              Already have an account{' '}
              <span>
                <a href="/signup" className="font-medium text-blue-700">
                  Sign Up
                </a>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
