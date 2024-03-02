import React, { useEffect, useState } from "react";
import { SAVE_TYPE } from "../../../constants/constant";
import { Formik, Field, Form, ErrorMessage } from "formik";
import HeaderCreate from "../HeaderCreate";
import PrimaryInput from "../PrimaryInput";
import PrimaryTextArea from "../PrimaryTextArea";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../api/voucher.service";
import { storeImageToFireBase } from "../../../lib/storeImageToFirebase";
function CreateNewVoucher() {
  let navigate = useNavigate();
  const [newVoucher, setNewVoucher] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleCreateNewVoucher = () => {
  };
  const initialValues = {
    name: "",
    discount: 0,
    expiry: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    discount: Yup.number()
      .moreThan(0, "Discount must be greater than 0")
      .required("Discount is required"),
    expiry: Yup.date()
      .min(new Date(), "Expiry date must be in the future")
      .required("Expiry date is required"),
  });

  const handleLogin = (formValue) => {
    setLoading(true);
    AuthService.postVoucher({ ...formValue }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        navigate("/admin/vouchers");
      }
    });
    // dispatch(
    //   login({ ad: search === "?ad" ? true : false, username, password })
    // )
    //   .unwrap()
    //   .then(() => {
    //     navigate("/admin/products");
    //     // window.location.reload();
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });
  };
  return (
    <HeaderCreate
      homeUrl="/admin/vouchers"
      btnSaveTitle="voucher"
      btnSaveType={SAVE_TYPE.CREATE}
      handleClickSaveCreate={handleCreateNewVoucher}
      disabledBtn={false}
      className="mb-5"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <Field
                name="name"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="discount"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Discount
              </label>
              <Field
                name="discount"
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="discount"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Expiry
              </label>
              <Field
                name="expiry"
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="expiry"
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
                  <span>Submit</span>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </HeaderCreate>
  );
}

export default CreateNewVoucher;
