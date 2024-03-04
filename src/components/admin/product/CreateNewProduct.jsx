import React, { useEffect, useState } from "react";
import { SAVE_TYPE } from "../../../constants/constant";
import { Formik, Field, Form, ErrorMessage } from "formik";
import HeaderCreate from "../HeaderCreate";
import PrimaryInput from "../PrimaryInput";
import PrimaryTextArea from "../PrimaryTextArea";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../api/product.service";
import { storeImageToFireBase } from "../../../lib/storeImageToFirebase";
function CreateNewProduct() {
  let navigate = useNavigate();
  const [newProduct, setNewProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleCreateNewProduct = () => {
    // handle action create product
  };
  const initialValues = {
    title: "",
    slug: 1,
    description: "",
    price: 0,
    quantity: 0,
    color: "",
    brand: "",
    material: "",
    images: "",
    size: ""
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    price: Yup.number().moreThan(0, "Price must be greater than or equal to 0").required("Price is required"),
    quantity: Yup.number().moreThan(0, "Quantity must be greater than or equal to 0").required("Quantity is required"),
    color: Yup.string().required("Color is required"),
    brand: Yup.string().required("Brand is required"),
    material: Yup.string().required("Material is required"),
    description: Yup.string()
      .min(4, "Description must be at least 4 characters")
      .required("Description is required"),
    size: Yup.number().moreThan(0, "Size must be greater than or equal to 0").required("Size is required"),
  });

  const handleLogin = (formValue) => {
    setLoading(true);
    AuthService.postProduct({ ...formValue, images: image }).then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        navigate("/admin/products");
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
  useEffect(
    () => {
      const uploadImage = async () => {
        setIsLoading(true);
        if (!selectedFile) {
          setIsLoading(false);
          return;
        }
        const { isSuccess, imageUrl, message } = await storeImageToFireBase(
          selectedFile
        );
        if (isSuccess) {
          setImage(imageUrl);
          setIsLoading(false);
          return imageUrl;
        } else {
          console.log(message);
        }
        setIsLoading(false);
      };
      uploadImage();
    },
    // eslint-disable-next-line
    [selectedFile]
  );
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };
  return (
    <HeaderCreate
      homeUrl="/admin/products"
      btnSaveTitle="product"
      btnSaveType={SAVE_TYPE.CREATE}
      handleClickSaveCreate={handleCreateNewProduct}
      disabledBtn={false}
      className="mb-5"
    >
      {/* <PrimaryInput
        title="Name"
        placeholder="Enter product name here"
        onChange={(e) => {
          setNewProduct({
            ...newProduct,
            name: e.target.value,
          });
        }}
      />
      <PrimaryTextArea
        title="Description"
        placeholder="Enter description"
        className="w-full"
        onChange={(e) => {
          setNewProduct({
            ...newProduct,
            description: e.target.value,
          });
        }}
      /> */}
      <div style={{ position: "relative" }}>
        <img
          src={
            image ||
            "https://www.fivebranches.edu/wp-content/uploads/2021/08/default-image.jpg"
          }
          alt=""
          style={{
            marginRight: "20px",
            maxWidth: "150px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "5px",
            left: "0px",
            width: "88%",
            textAlign: "center",
          }}
        >
          {isLoading ? (
            ""
          ) : (
            <>
              <input
                type="file"
                name="profileImageUrl"
                accept="image/*"
                onChange={onSelectFile}
                id="upload"
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  opacity: " 0",
                  left: "0",
                  top: "-37px",
                  zIndex: "1"
                }}
              />
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="35px"
                height="35px"
                viewBox="0,0,256,256"
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  top: "-40px",
                  left: "55px",
                }}
              >
                <g
                  fill="#000000"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth={1}
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit={10}
                  strokeDasharray
                  strokeDashoffset={0}
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                  style={{ mixBlendMode: "normal" }}
                >
                  <g transform="scale(5.12,5.12)">
                    <path d="M25,2c-12.6907,0 -23,10.3093 -23,23c0,12.69071 10.3093,23 23,23c12.69071,0 23,-10.30929 23,-23c0,-12.6907 -10.30929,-23 -23,-23zM25,4c11.60982,0 21,9.39018 21,21c0,11.60982 -9.39018,21 -21,21c-11.60982,0 -21,-9.39018 -21,-21c0,-11.60982 9.39018,-21 21,-21zM24,13v11h-11v2h11v11h2v-11h11v-2h-11v-11z" />
                  </g>
                </g>
              </svg>
            </>
          )}
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Title
              </label>
              <Field
                name="title"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Description
              </label>
              <Field
                name="description"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Price
              </label>
              <Field
                name="price"
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Quantity
              </label>
              <Field
                name="quantity"
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="quantity"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="color"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Color
              </label>
              <Field
                name="color"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="color"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="brand"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Brand
              </label>
              <Field
                name="brand"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="brand"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="material"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Material
              </label>
              <Field
                name="material"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="material"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="size"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Size
              </label>
              <Field
                name="size"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="size"
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

export default CreateNewProduct;
