import { useState } from "react";
import { useGetAllContactUsMessageQuery } from "../../../features/admin/api";
import TableComponent from "../allUsers/components/TableComponent";

const columns = [
  {
    id: "fullName",
    label: "Full Name",
    minWidth: 150,
    align: "left",
  },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
    align: "left",
  },
  {
    id: "message",
    label: "Message",
    minWidth: 200,
    align: "left",
  },
  {
    id: "createdAt",
    label: "Date",
    minWidth: 100,
    align: "left",
  },
];

const AllSupports = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const {
    data: allSupports,
    isLoading,
    error,
  } = useGetAllContactUsMessageQuery({
    page: page,
    limit: rowsPerPage,
  });

  const support = allSupports?.docs || [];

  // Handler for changing the page
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  // Handler for changing the rows per page
  const handleChangeRowsPerPage = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };
  return (
    <div className="mt-28 pb-5 px-10">
      <h1 className="pb-5 font-semibold text-2xl">Contact Us Messages</h1>
      <TableComponent
        data={support}
        status={isLoading}
        columns={columns}
        totalCount={allSupports?.totalDocs}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        error={error}
        searchBar={false}
        emailRequest={false}
        editActions={false}
      />
    </div>
  );
};
export default AllSupports;
