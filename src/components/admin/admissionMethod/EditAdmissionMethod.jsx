import { useEffect, useState } from "react";
import { SAVE_TYPE } from "../../../constants/constant";
import { Formik, Field, Form, ErrorMessage } from "formik";
import HeaderCreate from "../HeaderCreate";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../../../api/admissionMethod.service";
import { toast } from "react-toastify";
function EditAdmissionFormDetail() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [newVoucher, setNewVoucher] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AuthService.getAdmissionMethodById(id);
        if (data.error) {
          console.log(data.error);
        } else {
          setNewVoucher(data.data);
        }
      } catch (error) {
        console.error("Error fetching AdmissionMethod:", error);
      }
    };
    fetchData(); // Gọi hàm fetchData để thực hiện việc gọi API
  }, [id]); // Đảm bảo useEffect được gọi lại khi id thay đổi
  const initialValues = {
    name: newVoucher?.name || "",
    admissionScore: newVoucher?.AdmissionScore || "",
    numberOfStudent: newVoucher?.NumberOfStudent || ""
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    admissionScore: Yup.number().required("AdmissionScore is required").min(1, "AdmissionScore must be greater than 0"),
    numberOfStudent: Yup.number().required("Number Of Student is required").min(1, "Number Of Student must be greater than 0"),
  });

  const handleLogin = (formValue) => {
    setLoading(true);
    AuthService.putAdmissionMethod(id, { ...formValue }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        toast.success("Edit AdmissionMethod successfully", {
          // position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/admin/admissionMethod");
      }
    });
    setLoading(false);
  };

  return (
    newVoucher && (
      <HeaderCreate
        homeUrl="/admin/admissionMethod"
        btnSaveTitle="AdmissionMethod"
        btnSaveType={SAVE_TYPE.UPDATE}
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
    )
  );
}

export default EditAdmissionFormDetail;
