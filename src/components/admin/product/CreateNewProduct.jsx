import React, { useState } from "react";
import { SAVE_TYPE } from "../../../constants/constant";
import HeaderCreate from "../HeaderCreate";
import PrimaryInput from "../PrimaryInput";
import PrimaryTextArea from "../PrimaryTextArea";

function CreateNewProduct() {
  const [newProduct, setNewProduct] = useState();
  const handleCreateNewProduct = () => {
    // handle action create product
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
      <PrimaryInput
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
      />
    </HeaderCreate>
  );
}

export default CreateNewProduct;
