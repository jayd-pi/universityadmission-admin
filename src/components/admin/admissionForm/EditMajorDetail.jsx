import { useEffect, useState } from "react";
import { SAVE_TYPE } from "../../../constants/constant";
import { Formik, Field, Form, ErrorMessage } from "formik";
import HeaderCreate from "../HeaderCreate";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../../../api/admissionForm.service";
import { toast } from "react-toastify";
function EditAdmissionFormDetail() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [newVoucher, setNewVoucher] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AuthService.getAdmissionFormById(id);
        if (data.error) {
          console.log(data.error);
        } else {
          setNewVoucher(data.data);
        }
      } catch (error) {
        console.error("Error fetching AdmissionForm:", error);
      }
    };
    fetchData(); // Gọi hàm fetchData để thực hiện việc gọi API
  }, [id]); // Đảm bảo useEffect được gọi lại khi id thay đổi
  const initialValues = {
    formType: newVoucher?.formType || "",
    formDate: newVoucher?.formDate || "",
    submissionDeadline: newVoucher?.submissionDeadline || ""
  };
  const validationSchema = Yup.object({
    formType: Yup.string().required("FormType is required"),
    formDate: Yup.string().required("FormDate is required"),
    submissionDeadline: Yup.string().required("SubmissionDeadline date is required")
  });

  const handleLogin = (formValue) => {
    setLoading(true);
    AuthService.putMajor(id, { ...formValue }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        toast.success("Edit MajorInPlan successfully", {
          // position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/admin/mjp");
      }
    });
    setLoading(false);
  };

  return (
    newVoucher && (
      <HeaderCreate
        homeUrl="/admin/admissionForm"
        btnSaveTitle="AdmissionForm"
        btnSaveType={SAVE_TYPE.UPDATE}
        // handleClickSaveCreate={handleCreateNewProduct}
        // disabledBtn={false}
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
                <label htmlFor="formType" className="block text-gray-700 text-sm font-bold mb-2">
                  Form Type
                </label>
                <Field
                  name="formType"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="formType"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="formDate" className="block text-gray-700 text-sm font-bold mb-2">
                  Form Date
                </label>
                <Field
                  name="formDate"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="formDate"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="submissionDeadline" className="block text-gray-700 text-sm font-bold mb-2">
                  Submission Deadline
                </label>
                <Field
                  name="submissionDeadline"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="submissionDeadline"
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
