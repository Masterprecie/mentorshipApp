import { useState } from "react";
import TableComponent from "../components/TableComponent";
import { useGetAllMentorsQuery } from "../../../../features/users/api";

const columns = [
  // { id: "_id", label: "", minWidth: 50 },
  {
    id: "profilePictureURL",
    label: "Image",
    minWidth: 50,
    align: "left",
  },
  {
    id: "firstName",
    label: "First Name",
    minWidth: 100,
    align: "left",
  },
  {
    id: "lastName",
    label: "Last Name",
    minWidth: 100,
    align: "left",
  },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
    align: "left",
  },
  {
    id: "age",
    label: "Age",
    minWidth: 100,
    align: "left",
  },
  {
    id: "country",
    label: "Country",
    minWidth: 100,
    align: "left",
  },
  {
    id: "gender",
    label: "Gender",
    minWidth: 100,
    align: "left",
  },
  {
    id: "isProfileComplete",
    label: "Profile Status",
    minWidth: 100,
    align: "left",
  },

  {
    id: "createdAt",
    label: "Joined",
    minWidth: 100,
    align: "left",
  },
];

const Mentors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const {
    data: allMentors,
    isLoading,
    error,
  } = useGetAllMentorsQuery({
    page: page,
    limit: rowsPerPage,
    search: searchQuery,
  });

  const mentors = allMentors?.docs || [];

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
    <div>
      <TableComponent
        data={mentors}
        status={isLoading}
        columns={columns}
        totalCount={allMentors?.totalDocs}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        onSearch={setSearchQuery}
        error={error}
        emailRequest={false}
        editActions={true}
      />
    </div>
  );
};
export default Mentors;
