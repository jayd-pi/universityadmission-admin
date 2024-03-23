import React, { useEffect, useState } from "react";
import { SAVE_TYPE } from "../../../constants/constant";
import { Formik, Field, Form, ErrorMessage } from "formik";
import HeaderCreate from "../HeaderCreate";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../api/admissionMethod.service";
function CreateAdmissionPlan() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleCreateNewVoucher = () => {
  };
  const initialValues = {
    name: "",
    admissionScore: 1, // Thay đổi thành số nguyên
    numberOfStudent: 1, // Thay đổi thành số nguyên
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    admissionScore: Yup.number().required("AdmissionScore is required").min(1, "AdmissionScore must be greater than 0"),
    numberOfStudent: Yup.number().required("Number Of Student is required").min(1, "Number Of Student must be greater than 0"),
  });


  const handleLogin = (formValue) => {
    setLoading(true);
    AuthService.postAdmissionMethod({ ...formValue }).then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        navigate("/admin/admissionMethod");
      }
      setLoading(false);
    });
  };


  return (
    <HeaderCreate
      homeUrl="/admin/admissionPlan"
      btnSaveTitle="AdmissionPlan"
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
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
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
              <label htmlFor="admissionScore" className="block text-gray-700 text-sm font-bold mb-2">
                Admission Score
              </label>
              <Field
                name="admissionScore"
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="admissionScore"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>


            <div className="mb-4">
              <label htmlFor="numberOfStudent" className="block text-gray-700 text-sm font-bold mb-2">
                Number of Student
              </label>
              <Field
                name="numberOfStudent"
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="numberOfStudent"
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

export default CreateAdmissionPlan;
