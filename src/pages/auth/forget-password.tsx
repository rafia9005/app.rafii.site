import React, { useState } from 'react';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth'; // Import modul yang diperlukan
import app from '@/lib/firebase';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth(app); // Inisialisasi objek auth menggunakan objek app
      await sendPasswordResetEmail(auth, email); // Gunakan objek auth yang diinisialisasi
      setMessage('Email reset password telah dikirim. Silakan periksa kotak masuk Anda.');
    } catch (error) {
      setMessage('Terjadi kesalahan. Silakan coba lagi.');
      console.error('Reset password error:', error);
    }
  };

  return (
    <>


      <div className='flex justify-center items-center' style={{ height: '100vh' }}>
        <div className="flex h-full items-center flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Forget Password ?
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleEmailChange}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Forget Password
                </button>
              </div>
            </form>
            {message && (
              <p className="text-center text-md mt-3 text-gray-900">{message}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
