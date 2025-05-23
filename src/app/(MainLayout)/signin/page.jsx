'use client';
import { useState } from 'react';
import axios from 'axios';
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signin/`,
        formData
      );
      localStorage.setItem("token", res.data.access)
      localStorage.setItem("refresh_token", res.data.refresh);
      console.log('token => ', res.data)
      router.push('/')
      // ✅ Save token/userID or redirect as needed
    } catch (error) {
      if (error.response?.data) {
        setErrors(error.response.data);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div className="relative lg:w-xl text-center">
      <img
        className="size-8 lg:size-auto absolute z-50 -top-4 left-0 right-0 mx-auto"
        src="/images/icons/lock.svg"
        alt=""
      />
      <div className="form-bg bg-[#17171791] backdrop-blur-xs pt-12 2xl:pt-16 pb-4 2xl:pb-8">
        <h3 className="text-2xl lg:text-4xl font-bold">Sign In</h3>
        <p className="mt-2 lg:mt-4 font-medium text-[#3E3E3E] w-[80%] lg:w-[50%] mx-auto">
          Welcome back! Let's turn your vision into reality.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="my-4 lg:my-8 space-y-3 lg:space-y-6 px-6 lg:px-12">
            <div className="relative">
              <input
                type="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="!pointer-events-auto block px-8 py-4 w-full bg-[#171717] text-sm text-gray-900 rounded-full appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer"
                placeholder=" "
              />
              <label
                htmlFor="username"
                className="absolute text-sm text-[#3E3E3E] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-8 peer-focus:px-8 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Username
              </label>
              {errors.username && (
                <p className="text-red-500 text-xs mt-1 px-4 text-left">
                  {errors.username[0]}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="!pointer-events-auto block px-8 py-4 w-full bg-[#171717] text-sm text-gray-900 rounded-full appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute text-sm text-[#3E3E3E] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-8 peer-focus:px-8 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Password
              </label>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 px-4 text-left">
                  {errors.password[0]}
                </p>
              )}
            </div>
          </div>
          <Button type="outline" className="my-4 2xl:my-8 w-[190px] mx-auto">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
