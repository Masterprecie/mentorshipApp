import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { HiOutlineDotsVertical } from "react-icons/hi";
import avatar from "assets/images/avatar.jpg";
import { formatDate } from "../../../../utils/helpers";
export default function TableComponent({
  totalCount,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  isLoading,
  columns,
  data,
  onSearch,
  searchBar = true,
  emailRequest,
  editActions,
  // error,
}) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleEdit = () => {
    navigate("/dashboard/users/mentor?id=" + selectedRow);
    // Handle edit action
    console.log("Edit", selectedRow);
    handleMenuClose();
  };

  const handleDelete = () => {
    // Handle delete action
    console.log("Delete", selectedRow);
    handleMenuClose();
  };

  return (
    <>
      {searchBar && (
        <div className="flex p-[16px] justify-between border shadow-md items-center mt-10">
          <div className="flex gap-8 items-center">
            <input
              onChange={(e) => onSearch(e.target.value)}
              type="search"
              placeholder="Search here..."
              className="border rounded-[8px] outline-0 py-[8px] px-[24px] shadow-md border-[#BEBEBE]"
            />
          </div>
        </div>
      )}

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {isLoading ? (
          <div className="p-5">
            {/* <Loader /> */}
            Loading...
          </div>
        ) : data && data?.length === 0 ? (
          <div className="p-5">No Mentor Found</div>
        ) : (
          <>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        sx={{
                          fontSize: "14px",
                          backgroundColor: "#f5f5f5",
                          fontWeight: "bold",
                          color: "gray",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                    {(emailRequest || editActions) && (
                      <TableCell
                        sx={{
                          fontSize: "14px",
                          backgroundColor: "#f5f5f5",
                          fontWeight: "bold",
                          color: "gray",
                        }}
                        align="right"
                      >
                        Actions
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns?.map((column) => {
                        const value = row[column.id];
                        if (column.id === "isProfileComplete") {
                          const backgroundColor = value ? "#00FF00" : "#FF0000";

                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              sx={{
                                textTransform: "capitalize",
                              }}
                            >
                              <span
                                // className={`px-2 py-1 rounded-[10px] bg-${dotColor}`}
                                style={{
                                  padding: "5px 8px",
                                  borderRadius: "10px",
                                  backgroundColor: backgroundColor,
                                  whiteSpace: "nowrap",
                                  width: "100px",
                                  display: "inline-block",
                                  textAlign: "center",
                                  alignItems: "center",
                                  color: value ? "white" : "black",
                                }}
                              >
                                {value ? "Completed" : "Incomplete"}
                              </span>
                            </TableCell>
                          );
                        } else if (column.id === "profilePictureURL") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {/* {value ? value : "--"}  */}

                              <img
                                src={value || avatar}
                                alt=""
                                className="w-5 h-5 rounded-full"
                              />
                            </TableCell>
                          );
                        } else if (column.id === "createdAt") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {formatDate(value)}
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value ? value : "--"}
                            </TableCell>
                          );
                        }
                      })}
                      {(emailRequest || editActions) && (
                        <TableCell align="right">
                          {editActions && (
                            <>
                              <IconButton
                                onClick={(event) =>
                                  handleMenuOpen(event, row._id)
                                }
                              >
                                <HiOutlineDotsVertical />
                              </IconButton>
                              <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                              >
                                <MenuItem onClick={handleEdit}>View</MenuItem>
                                <MenuItem onClick={handleDelete}>
                                  Delete
                                </MenuItem>
                              </Menu>
                            </>
                          )}
                          {emailRequest && (
                            <>
                              <IconButton
                                onClick={(event) =>
                                  handleMenuOpen(event, row.userId)
                                }
                              >
                                <HiOutlineDotsVertical />
                              </IconButton>
                              <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                              >
                                <MenuItem onClick={handleEdit}>Change</MenuItem>
                              </Menu>
                            </>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 20, 50, 100]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => onChangePage(newPage)}
              onRowsPerPageChange={(event) =>
                onChangeRowsPerPage(+event.target.value)
              }
            />
          </>
        )}
      </Paper>
    </>
  );
}

TableComponent.propTypes = {
  data: PropTypes.array.isRequired,
  stats: PropTypes.array,
  adButton: PropTypes.bool,
  tableType: PropTypes.string,
  columns: PropTypes.array,
  totalCount: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  isLoading: PropTypes.bool,
  onSearch: PropTypes.func,
  error: PropTypes.object,
  searchBar: PropTypes.bool,
  emailRequest: PropTypes.bool,
  editActions: PropTypes.bool,
};

// Function to determine dot color based on status
// const status = (isProfileCompleted) => {
//   console.log("isProfileCompleted", isProfileCompleted);
//   if (!isProfileCompleted) {
//     return "#FF0000"; // Red color for incomplete profiles
//   } else {
//     return "#00FF00"; // Green color for complete profiles
//   }
// };
