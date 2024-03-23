import { useEffect, useState } from "react";
import Title from "../Title";
import SearchInput from "../SearchInput";
import { Link } from "react-router-dom";
import PrimaryBtn from "../PrimaryBtn";
import Table from "../Table";
// import useDebounce from "../../../custom-hooks/useDebounce";
// import ShowDetail from "../ShowDetail";
import Pagination from "../Pagination";
import EditButton from "../EditButton";
import DeleteBtn from "../DeleteBtn";
import AuthService from "../../../api/admissionMethod.service";
import { toast } from "react-toastify";
function ListAdmissionPlan() {
  const [searchParam, setSearchParam] = useState();
  const [listVouchers, setlistVouchers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [load, setLoad] = useState(null);


  // const debouncedSearchValue = useDebounce(searchParam, 500);
  const fetchVoucher = async () => {
    await AuthService.getAdmissionPlan().then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setlistVouchers(data.data);
      }
    });

  }
  useEffect(() => {
    fetchVoucher();
  }, [load]);
  const deleteAdmissionFormFunc = (id) => {
    setLoad(true)
    AuthService.deleteAdmissionPlan(id).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        toast.success("Delete AdmissionMethod successfully", {
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
    setLoad(false)
  };

  const columns = [
    {
      Header: " ",
      columns: [
        {
          Header: "SchoolYear",
          accessor: (data) => <p>{data?.name}</p>,
        },
        {
          Header: "University",
          accessor: (data) => <p>{data?.AdmissionScore}</p>,
        },
        {
          Header: "PlantDescription",
          accessor: (data) => <p>{data?.plantDescription}</p>,
        },
        {
          Header: " ",
          accessor: (data) => {
            return (
              <div className="flex justify-end gap-4">
                <Link className="" to={`/admin/admissionPlan/${data?._id}/edit`}>
                  <EditButton />
                </Link>
                <DeleteBtn
                  id={data?._id}
                  deleteFunction={deleteAdmissionFormFunc}
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
      <Title >List AdmissionPlan</Title>
      <div className="flex flex-col gap-4 py-5 md:items-center md:flex-row md:justify-end">
        <SearchInput
          placeholder="Search by name"
          onChange={(e) => setSearchParam(e.target.value)}
          value={searchParam || ""}
        />
        <Link to={`/admin/admissionPlan/create`}>
          <PrimaryBtn className="min-w-[180px]">+ Add AdmissionPlan</PrimaryBtn>
        </Link>
      </div>
      <div className="bg-white table-style block-border">
        <Table
          pageSizePagination={limit}
          columns={columns}
          data={listVouchers}
        />
      </div>
      <Pagination
        pageSize={limit}
        setPageSize={setLimit}
        currentPage={page}
        setCurrentPage={setPage}
        totalItems={listVouchers.length}
      />
    </div>
  );
}
export default ListAdmissionPlan;
