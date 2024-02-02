import React, { useState } from "react";
import { SAVE_TYPE } from "../../../constants/constant";
import HeaderEdit from "../HeaderEdit";
import PrimaryInput from "../PrimaryInput";
import PrimaryTextArea from "../PrimaryTextArea";

function EditProductDetail() {
  const [productDetail, setProductDetail] = useState();
  const handleUpdateProductDetail = () => {};

  return (
    <HeaderEdit
      updatedTime={productDetail?.updatedAt}
      homeUrl="/admin/products"
      handleClickSave={handleUpdateProductDetail}
      disabledBtn={false}
      btnSaveTitle="product"
      btnSaveType={SAVE_TYPE.UPDATE}
    >
      <PrimaryInput
        title="Name"
        placeholder="Enter product name here"
        onChange={(e) => {
          setProductDetail({
            ...productDetail,
            name: e.target.value,
          });
        }}
        value={productDetail?.name || ""}
      />
      <PrimaryTextArea
        title="Description"
        placeholder="Enter description"
        className="w-full"
        onChange={(e) => {
          setProductDetail({
            ...productDetail,
            description: e.target.value,
          });
        }}
        value={productDetail?.description || ""}
      />
    </HeaderEdit>
  );
}

export default EditProductDetail;
