import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { login } from "../../redux/slice/auth";
import { clearMessage } from "../../redux/slice/message";
import * as Yup from "yup";

const LogIn = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(5, "Username must be at least 5 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
  });

  const handleLogin = (formValue) => {
    const { username, password } = formValue;
    setLoading(true);

    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        navigate("/admin");
      })
      .catch(() => {
        setLoading(false);
      });
  };
  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="col-span-12 lg:col-span-12 login-form">
      <div className="lg:w-1/4 md:w-1/2 sm:w-full xl:w-1/3 mx-auto">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="mx-auto w-16 h-16 rounded-full mb-4"
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Username
                  </label>
                  <Field
                    name="username"
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <svg
                        className="animate-spin h-4 w-4 mr-2 border-b-2 border-white rounded-full"
                        viewBox="0 0 24 24"
                      ></svg>
                    ) : (
                      <span>Login</span>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        {message && (
          <div className="mb-4">
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogIn;
