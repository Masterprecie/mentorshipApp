import { useState } from "react";
import { useGetAllEmailChangeRequestQuery } from "../../../features/admin/api";
import TableComponent from "../allUsers/components/TableComponent";

const columns = [
  {
    id: "userId",
    label: "UserID",
    minWidth: 100,
    align: "left",
  },
  {
    id: "newEmail",
    label: "New Email",
    minWidth: 100,
    align: "left",
  },
  {
    id: "reason",
    label: "Reason",
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

const AllRequests = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const {
    data: allRequests,
    isLoading,
    error,
  } = useGetAllEmailChangeRequestQuery({
    page: page,
    limit: rowsPerPage,
  });

  const request = allRequests?.docs || [];

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
      <h1 className="pb-5 font-semibold text-2xl">Email Change Request</h1>

      <TableComponent
        data={request}
        status={isLoading}
        columns={columns}
        totalCount={allRequests?.totalDocs}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        error={error}
        searchBar={false}
        emailRequest={true}
        editActions={false}
      />
    </div>
  );
};
export default AllRequests;
