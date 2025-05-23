'use client';
import { useState } from 'react';
import axios from 'axios';
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation"

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signup/`,
        formData
      );
      router.push('/')
      localStorage.setItem("token", res.data.access)
      // Redirect or toast success here
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
        <h3 className="text-2xl lg:text-4xl font-bold">Sign Up</h3>
        <p className="mt-2 lg:mt-4 font-medium text-[#3E3E3E] w-[80%] lg:w-[50%] mx-auto">
          Sign up today and let's turn your vision into reality!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="my-4 lg:my-8 space-y-3 lg:space-y-6 px-6 lg:px-12">
            {['email', 'username', 'password'].map((field) => (
              <div className="relative" key={field}>
                <input
                  type={field === 'password' ? 'password' : 'text'}
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="!pointer-events-auto block px-8 py-4 w-full bg-[#171717] text-sm text-gray-900 rounded-full appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer"
                  placeholder=" "
                />
                <label
                  htmlFor={field}
                  className="absolute text-sm text-[#3E3E3E] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-8 peer-focus:px-8 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                {errors[field] && (
                  <p className="text-red-500 text-xs mt-1 px-4 text-left">
                    {errors[field][0]}
                  </p>
                )}
              </div>
            ))}
          </div>
          <Button className="my-4 2xl:my-8 mx-auto" type="outline">
            Sign Up
          </Button>
        </form>
      </div>
      <p className="text-[#3E3E3E] pt-4 lg:pt-8 max-lg:text-xs">
        Already have an account?{" "}
        <Link href="/signin" className="text-[#BABABA] font-semibold">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
