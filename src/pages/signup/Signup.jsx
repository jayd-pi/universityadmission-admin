import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const validationSchema = Yup.object({
  fullname: Yup.string().required("Full Name is required"),
  username: Yup.string()
    .min(5, "Username must be at least 5 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[!@#$%^&*])/,
      "Password must contain at least one special character"
    )
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);


  const formilk =
    useFormik({
      initialValues: {
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        try {
          const response = await axios.post(
            "http://localhost:8000/api/auth/register",
            values
          );
          console.log("Register successful:", response.data);
          const token = response.data.token;
          localStorage.setItem('token', token);
          navigate('/login');
        } catch (error) {
          alert(error.message);
          console.error("Register failed:", error.response.data);
        }
      },
    });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (

    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-12 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={formilk.handleSubmit}>
              <div>
                <label
                  htmlFor="fullname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Fullname
                </label>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  value={formilk.values.fullname}
                  onChange={formilk.handleChange}
                  onBlur={formilk.handleBlur}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${formilk.touched.fullname && formilk.errors.fullname
                    ? "border-red-500" : ""
                    }`}
                  placeholder="Phuoc Huu"
                  required=""
                />
                {formilk.touched.fullname && formilk.errors.fullname && (
                  <div className="text-red-500 text-sm">{formilk.errors.fullname}</div>
                )}
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formilk.values.username}
                  onChange={formilk.handleChange}
                  onBlur={formilk.handleBlur}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${formilk.touched.username && formilk.errors.username
                    ? "border-red-500"
                    : " "
                    }`}
                  placeholder="phuochuu"
                  required=""
                />
                {formilk.touched.username && formilk.errors.username && (
                  <div className="text-red-500 text-sm">{formilk.errors.username}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formilk.values.email}
                  onChange={formilk.handleChange}
                  onBlur={formilk.handleBlur}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${formilk.touched.email && formilk.errors.email ? "border-red-500" : ""
                    }`}

                  placeholder="example@example.com"
                  required=""
                />
                {formilk.touched.email && formilk.errors.email && (
                  <div className="text-red-500 text-sm">{formilk.errors.email}</div>
                )}
              </div>

              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      value={formilk.values.password}
                      onBlur={formilk.handleBlur}
                      onChange={formilk.handleChange}
                      placeholder="••••••••"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${formilk.touched.password && formilk.errors.password
                        ? "border-red-500"
                        : " "
                        }`}
                      required=""
                    />
                    <span
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      style={{ right: "20px" }}
                      onClick={togglePassword}>
                      <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                    </span>
                  </div>
                  {formilk.touched.password && formilk.errors.password && (
                    <div className="text-red-500 text-sm">{formilk.errors.password}</div>
                  )}
                </div>

                <div className="flex-1 relative">
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={formilk.values.confirmPassword}
                      onBlur={formilk.handleBlur}
                      onChange={formilk.handleChange}
                      placeholder="••••••••"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${formilk.touched.confirmPassword && formilk.errors.confirmPassword
                        ? "border-red-500"
                        : " "
                        } `}
                      required=""
                    />
                    {formilk.touched.confirmPassword && formilk.touched.confirmPassword && (
                      <div className="text-red-500 text-sm">
                        {formilk.errors.confirmPassword}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    onChange={formilk.handleChange}
                    onBlur={formilk.handleBlur}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign Up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
