import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup";
import axios from "axios";


const validationSchema = Yup.object({
  email: Yup.string()
    .min(5, "Email must be at least 5 characters")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

const LogIn = () => {
  const navigate = useNavigate()
  const formilk = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/auth/login",
          values
        );
        console.log("Login successful:", response.data);
        if (response.data.isAdmin) {
          console.log("Redirecting to admin dashboard...");
          navigate('/admin')
        } else {
          console.log("Redirecting to user dashboard...");
          navigate('/home')
        }
      } catch (error) {
        console.error("Login failed:", error.response.data);
      }
    },
  }
  );

  return (
    <section className="bg-gray-50 dark:bg-gray-200 form">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-200 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formilk.handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${formilk.touched.email && formilk.errors.email
                    ? "border-red-500"
                    : ""
                    }`}
                  placeholder="name@company.com"
                  onChange={formilk.handleChange}
                  onBlur={formilk.handleBlur}
                  value={formilk.values.email}
                  required=""
                />
                {formilk.touched.email && formilk.errors.email && (
                  <div className="text-red-500 text-sm mt-2">
                    {formilk.errors.email}
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${formilk.touched.password && formilk.errors.password
                    ? "border-red-500"
                    : ""
                    }`}
                  placeholder="••••••••"
                  onChange={formilk.handleChange}
                  onBlur={formilk.handleBlur}
                  value={formilk.values.password}
                  required=""
                />
                {formilk.touched.password && formilk.errors.password && (
                  <div className="text-red-500 text-sm mt-2">
                    {formilk.errors.password}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full cursor-pointer text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Submit
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-100 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div>
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <img
                        className="h-5 w-5"
                        src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                        alt=""
                      />
                    </a>
                  </div>
                  <div>
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <img
                        className="h-5 w-5"
                        src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                        alt=""
                      />
                    </a>
                  </div>
                  <div>
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <img
                        className="h-6 w-6"
                        src="https://www.svgrepo.com/show/506498/google.svg"
                        alt=""
                      />
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogIn;


