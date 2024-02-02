import React, { useState } from "react";
import Title from "../Title";
import SearchInput from "../SearchInput";
import { Link } from "react-router-dom";
import PrimaryBtn from "../PrimaryBtn";
import Table from "../Table";
import useDebounce from "../../../custom-hooks/useDebounce";
import ShowDetail from "../ShowDetail";
import Pagination from "../Pagination";
import EditButton from "../EditButton";
import DeleteBtn from "../DeleteBtn";

function ListProducts() {
  const listProducts = {
    data: [{ id: 1, productName: "Snack", description: "Big and nice" }],
    total: 5,
  };
  const [searchParam, setSearchParam] = useState();
  // const [listProducts, setListProducts] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const debouncedSearchValue = useDebounce(searchParam, 500);

  return (
    <div>
      <Title>List Products</Title>
      <div className="flex flex-col gap-4 py-5 md:items-center md:flex-row md:justify-end">
        <SearchInput
          placeholder="Search by name"
          onChange={(e) => setSearchParam(e.target.value)}
          value={searchParam || ""}
        />
        <Link to={`/admin/products/create`}>
          <PrimaryBtn className="min-w-[180px]">+ Add Product</PrimaryBtn>
        </Link>
      </div>
      <div className="bg-white table-style block-border">
        <Table
          pageSizePagination={limit}
          columns={columns}
          data={listProducts?.data}
        />
      </div>

      <Pagination
        pageSize={limit}
        setPageSize={setLimit}
        currentPage={page}
        setCurrentPage={setPage}
        totalItems={listProducts?.total}
      />
    </div>
  );
}

export default ListProducts;

const deleteProductFunc = () => {
  // handle case delefe
};

const columns = [
  {
    Header: " ",
    columns: [
      {
        Header: "Product Name",
        accessor: (data) => <p>{data?.productName}</p>,
      },
      {
        Header: "Product Description",
        accessor: (data) => <p>{data?.description}</p>,
      },
      {
        Header: " ",
        accessor: (data) => {
          return (
            <div className="flex justify-end gap-4">
              <Link to={`/admin/products/${data?.id}`}>
                <ShowDetail />
              </Link>
              <Link className="" to={`/admin/products/${data?.id}/edit`}>
                <EditButton />
              </Link>
              <DeleteBtn
                id={data?.id}
                deleteFunction={deleteProductFunc}
                queryKey={"getListOfficialMember"}
              />
            </div>
          );
        },
      },
    ],
  },
];
