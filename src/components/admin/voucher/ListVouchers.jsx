import { useEffect, useState } from "react";
import Title from "../Title";
import SearchInput from "../SearchInput";
import { Link } from "react-router-dom";
import PrimaryBtn from "../PrimaryBtn";
import Table from "../Table";
// import useDebounce from "../../../custom-hooks/useDebounce";
import ShowDetail from "../ShowDetail";
import Pagination from "../Pagination";
import EditButton from "../EditButton";
import DeleteBtn from "../DeleteBtn";
import AuthService from "../../../api/product.service";
import { toast } from "react-toastify";
function ListVouchers() {
  // const listProducts = {
  //   data: [{ id: 1, productName: "Snack", description: "Big and nice" }],
  //   total: 5,
  // };
  const [searchParam, setSearchParam] = useState();
  const [listProducts, setListProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [load, setLoad] = useState(null);
  // const debouncedSearchValue = useDebounce(searchParam, 500);
  useEffect(() => {
    AuthService.getProduct().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setListProducts(data.data);
      }
    });
  }, [load]);
  const deleteProductFunc = (id) => {
    AuthService.deleteProduct(id).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        toast.success("delete product successfully", {
          // position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setLoad(data.data);
      }
    });
  };

  const columns = [
    {
      Header: " ",
      columns: [
        {
          Header: "Title",
          accessor: (data) => <p>{data?.title}</p>,
        },
        {
          Header: "price",
          accessor: (data) => <p>{data?.price}</p>,
        },
        {
          Header: "color",
          accessor: (data) => <p>{data?.color}</p>,
        },
        {
          Header: "brand",
          accessor: (data) => <p>{data?.brand}</p>,
        },
        {
          Header: "category",
          accessor: (data) => <p>{data?.category}</p>,
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
                <Link className="" to={`/admin/products/${data?._id}/edit`}>
                  <EditButton />
                </Link>
                <DeleteBtn
                  id={data?._id}
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

  return (
    <div>
      <Title >List Products</Title>
      <div className="flex-col gap-4 py-5 md:items-center md:flex-row md:justify-end">
        <SearchInput
          placeholder="Search by name"
          onChange={(e) => setSearchParam(e.target.value)}
          value={searchParam || ""}
        />
        <Link to={`/admin/vouchers/create`}>
          <PrimaryBtn className="min-w-[180px]">+ Add Voucher</PrimaryBtn>
        </Link>
      </div>
      <div className="bg-white table-style block-border">
        <Table
          pageSizePagination={limit}
          columns={columns}
          data={listProducts}
        />
      </div>

      <Pagination
        pageSize={limit}
        setPageSize={setLimit}
        currentPage={page}
        setCurrentPage={setPage}
        totalItems={listProducts.lenhth}
      />
    </div>
  );
}

export default ListVouchers;