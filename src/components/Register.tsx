import React, { useState, useContext } from "react";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";

import UserContext from "../context/UserContext";
import useForm from "../hooks/useForm";
import { registerUser } from "../utils/helperFunction";
import { RegistrationValidation } from "../utils/constants";

type Props = {
  setRegister: (val: boolean) => void;
};

const Register = ({ setRegister }: Props) => {
  const { setState } = useContext(UserContext);

  const [error, setError] = useState(null);

  const handleSubmission = async (values: any, { setSubmitting }: any) => {
    //TODO: handle case if the user upload file other than image
    // const isImage = credentials.profile.type.split("/")[0] === "image";
    // if (!isImage) return setValError("Only image is allowed");

    const res = await registerUser(values);
    if (res?.status === 201) setState.setUser(res.data);
    else setError(res?.data);

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", profile: null, name: "" }}
      onSubmit={handleSubmission}
      validationSchema={RegistrationValidation}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          setFieldValue,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
            <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
              <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
                <div className="my-3 text-4xl font-bold tracking-wider text-center">
                  <a href="">Slash</a>
                </div>
                <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
                  With the power of Slash, you can now focus only on development
                  for your digital products, while leaving the bug tracking on
                  us!
                </p>
                <p className="flex flex-col items-center justify-center mt-10 text-center">
                  <span>Already have an account?</span>
                  <span
                    className="underline"
                    onClick={() => setRegister(false)}
                  >
                    Sign In!
                  </span>
                </p>
                <p className="mt-6 text-sm text-center text-gray-300">
                  Read our <span className="underline">terms</span> and{" "}
                  <span className="underline">conditions</span>
                </p>
              </div>
              <div className="p-5 bg-white md:flex-1">
                <h3 className="my-4 text-2xl font-semibold text-gray-700">
                  Account Register
                </h3>
                <form
                  className="flex flex-col space-y-5"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="name"
                      className="text-sm font-semibold text-gray-500"
                    >
                      Name
                    </label>
                    <input
                      type="name"
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoFocus
                      className={`px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 ${
                        errors.name && touched.name
                          ? "focus:ring-red-200"
                          : "focus:ring-blue-200"
                      }`}
                    />
                    {errors.name && touched.name && (
                      <div className="text-red-500">{errors.name}</div>
                    )}
                  </div>
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
                      onChange={handleChange}
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
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 ${
                        errors.email && touched.email
                          ? "focus:ring-red-200"
                          : "focus:ring-blue-200"
                      }`}
                    />
                    {errors.password && touched.password && (
                      <div className="text-red-500">{errors.password}</div>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="profile"
                        className="text-sm font-semibold text-gray-500"
                      >
                        Profile picture
                      </label>
                    </div>
                    <input
                      type="file"
                      id="profile"
                      name="profile"
                      onChange={(e: any) =>
                        setFieldValue("profile", e.target.files[0])
                      }
                      onBlur={handleBlur}
                      className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    />
                  </div>
                  {error && (
                    <div className="text-red-500 text-right">{error}</div>
                  )}
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
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Register;
