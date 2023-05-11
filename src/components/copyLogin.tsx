import React, { useState, useContext } from "react";
import { Formik } from "formik";
import * as EmailValidator from 'email-validator'
import * as Yup from 'yup'

import UserContext from "../context/UserContext";
import useForm from "../hooks/useForm";
import { loginUser } from "../utils/helperFunction";
import ModalMsg from "./ModalMsg";



type Props = {
  setRegister: (val: boolean) => void;
};

const Login = ({ setRegister }: Props) => {
  const { setState } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  // const [error, setError] = useState(null)

  const { formData: credentials, handleChange } = useForm();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await loginUser(credentials);
    console.log(res);
    if (res?.status === 200) setState.setUser({ ...res.data });
    // else setError(res?.data);
  };

  return (
    <>
      <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
        <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
          <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
            <div className="my-3 text-4xl font-bold tracking-wider text-center">
              <a href="#">Slash</a>
            </div>
            <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
              With the power of Slash, you can now focus only on development for
              your digital products, while leaving the bug tracking on us!
            </p>
            <p className="flex flex-col items-center justify-center mt-10 text-center">
              <span>Don't have an account?</span>
              <span
                className="underline cursor-pointer"
                onClick={() => setRegister(true)}
              >
                Get Started!
              </span>
            </p>
            <p className="mt-6 text-sm text-center text-gray-300">
              Read our <span className="underline">terms</span> and{" "}
              <span className="underline">conditions</span>
            </p>
          </div>
          <div className="p-5 bg-white md:flex-1">
            <h3 className="my-4 text-2xl font-semibold text-gray-700">
              Account Login
            </h3>
            <form
              action="#"
              className="flex flex-col space-y-5"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-500"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  autoFocus
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-500"
                  >
                    Password
                  </label>
                  <span
                    onClick={setIsOpen.bind(null, true)}
                    className="text-sm text-blue-600 hover:underline focus:text-blue-800 cursor-pointer"
                  >
                    Forgot Password?
                  </span>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-semibold text-gray-500"
                >
                  Remember me
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isOpen && (
        <ModalMsg
          setIsOpen={setIsOpen}
          message="This feature is under development check back soon!!"
        ></ModalMsg>
      )}
    </>
  );
};

export default Login;
