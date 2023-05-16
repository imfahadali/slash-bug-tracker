import React, { useState, useContext } from "react";
import { Formik } from "formik";
import { useAuth0 } from "@auth0/auth0-react";

import UserContext from "../context/UserContext";
import useForm from "../hooks/useForm";
import { loginUser } from "../utils/helperFunction";
import ModalMsg from "./ModalMsg";
import { LoginSchema } from "../utils/constants";
import LoadingSpinner from "./LoadingSpinner";

type Props = {
  setRegister: (val: boolean) => void;
};

const Login = ({ setRegister }: Props) => {
  // const { loginWithRedirect } = useAuth0();

  const { setState } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmission = async (values: any, { setSubmitting }: any) => {
    setIsLoading(true);
    const res = await loginUser(values);
    if (res?.status === 200) setState.setUser({ ...res.data });
    else setError(res?.data);
    setIsLoading(false);
    setSubmitting(false);
  };

  const handleLoginWithTestAccount = async () => {
    const values = { email: "fahadali2@gmail.com", password: "fahad123" };
    setIsLoading(true);
    const res = await loginUser(values);
    if (res?.status === 200) setState.setUser({ ...res.data });
    else setError(res?.data);
    setIsLoading(false);
  };

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmission}
        validationSchema={LoginSchema}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange: handleChangeFormik,
            handleBlur,
            handleSubmit,
          } = props;

          const changeHandler = (e: any) => {
            setError(null);
            handleChangeFormik(e);
          };
          return (
            <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
              <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
                <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
                  <div className="my-3 text-4xl font-bold tracking-wider text-center">
                    <a href="#">Slash</a>
                  </div>
                  <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
                    With the power of Slash, you can now focus only on
                    development for your digital products, while leaving the bug
                    tracking on us!
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
                <div
                  className={`relative p-5 bg-white md:flex-1 ${
                    isLoading ? "opacity-25" : ""
                  }`}
                >
                  <h3 className="my-4 text-2xl font-semibold text-gray-700">
                    Account Login
                  </h3>
                  <form
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
                        value={values.email}
                        onChange={changeHandler}
                        onBlur={handleBlur}
                        className={`px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 ${
                          errors.email && touched.email
                            ? "focus:ring-red-200"
                            : "focus:ring-blue-200"
                        }`}
                      />
                      {errors.email && touched.email && (
                        <div className="text-red-500">{errors.email}</div>
                      )}
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
                        value={values.password}
                        onChange={changeHandler}
                        onBlur={handleBlur}
                        className={`px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 ${
                          errors.password && touched.password
                            ? "focus:ring-red-200"
                            : "focus:ring-blue-200"
                        }`}
                      />
                      {errors.password && touched.password && (
                        <div className="text-red-500">{errors.password}</div>
                      )}
                      {error && (
                        <div className="text-red-500 text-right">{error}</div>
                      )}
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
                        disabled={isSubmitting}
                      >
                        Log in
                      </button>
                    </div>
                    <span
                      className="flex justify-center cursor-pointer text-center w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-black rounded-md shadow hover:opacity-80 focus:outline-none focus:ring-blue-200 focus:ring-4"
                      // disabled={isSubmitting}
                      onClick={handleLoginWithTestAccount}
                    >
                      Log in with Test Account
                    </span>
                    {/* <div className="flex flex-col space-y-5">
                      <span className="flex items-center justify-center space-x-2">
                        <span className="h-px bg-gray-400 w-14"></span>
                        <span className="font-normal text-gray-500">
                          or login with
                        </span>
                        <span className="h-px bg-gray-400 w-14"></span>
                      </span> */}

                    {/* <div className="flex flex-col space-y-4">
                        <a className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group hover:bg-gray-800 focus:outline-none">
                          <span>
                            <svg
                              className="w-5 h-5 text-gray-800 fill-current group-hover:text-white"
                              viewBox="0 0 16 16"
                              version="1.1"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                              ></path>
                            </svg>
                          </span>
                          <span className="text-sm font-medium text-gray-800 group-hover:text-white">
                            Github
                          </span>
                        </a>
                        <a
                          href="#"
                          className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-blue-500 rounded-md group hover:bg-blue-500 focus:outline-none"
                        >
                          <span>
                            <svg
                              className="text-blue-500 group-hover:text-white"
                              width="20"
                              height="20"
                              fill="currentColor"
                            >
                              <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                            </svg>
                          </span>
                          <span className="text-sm font-medium text-blue-500 group-hover:text-white">
                            Twitter
                          </span>
                        </a>
                      </div> */}
                    {/* </div> */}
                  </form>
                  {isLoading && (
                    <span className="absolute top-1/2 left-1/2 -translate-y-5 -translate-x-1/2">
                      <LoadingSpinner />
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        }}
      </Formik>

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
