import React, { useEffect, useState } from "react";
import { SAVE_TYPE } from "../../../constants/constant";
import { Formik, Field, Form, ErrorMessage } from "formik";
import HeaderCreate from "../HeaderCreate";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../api/voucher.service";
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
    voucherCode: "",
    totalPrice: 0,
    startDate: "",
    endDate: "",

  };
  const validationSchema = Yup.object({
    voucherCode: Yup.string().required("VoucherCode is required"),
    totalPrice: Yup.number()
      .moreThan(0, "TotalPrice must be greater than 0")
      .required("TotalPrice is required"),
    startDate: Yup.date()
      .min(new Date(), "StartDate date must be in the future")
      .required("StartDate date is required"),
    endDate: Yup.date()
      .min(new Date(), "EndDate date must be in the future")
      .required("EndDate date is required"),
  });

  const handleLogin = (formValue) => {
    setLoading(true);
    AuthService.postVoucher({ ...formValue }).then((data) => {
      console.log(data);
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
                htmlFor="voucherCode"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                VoucherCode
              </label>
              <Field
                name="voucherCode"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="voucherCode"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="totalPrice"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                TotalPrice
              </label>
              <Field
                name="totalPrice"
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="totalPrice"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="startDate"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                StartDate
              </label>
              <Field
                name="startDate"
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="startDate"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="endDate"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                EndDate
              </label>
              <Field
                name="endDate"
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="endDate"
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
