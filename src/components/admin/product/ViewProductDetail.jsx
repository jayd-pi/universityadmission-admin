import React, { useState } from "react";
import HeaderDetail from "../HeaderDetail";
import PrimaryInput from "../PrimaryInput";
import PrimaryTextArea from "../PrimaryTextArea";
import { useLocation, useParams } from "react-router-dom";

function ViewProductDetail() {
  const [productDetail, setProductDetail] = useState();
  const { id } = useParams();
  return (
    <HeaderDetail
      homeUrl="/admin/products"
      editUrl={`/admin/products/${id}/edit`}
    >
      <PrimaryInput
        title="Name"
        placeholder="Enter product name here"
        disabled
        value={productDetail?.name || ""}
      />
      <PrimaryTextArea
        title="Description"
        placeholder="Enter description"
        className="w-full"
        disabled
        value={productDetail?.description || ""}
      />
    </HeaderDetail>
  );
}

export default ViewProductDetail;
