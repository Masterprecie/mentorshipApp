import { ClipLoader } from "react-spinners";
import propTypes from "prop-types";
import { GoPencil } from "react-icons/go";
import EducationIcon from "assets/svg/education.svg?react";
import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

import {
  useAddEducationMutation,
  useDeleteEducationMutation,
  useEditEducationMutation,
} from "../../../../features/auth/api";
import { useFormik } from "formik";
import { alert } from "../../../../utils/alert";
import { formatDate } from "../../../../utils/helpers";
import Modal from "../../../../components/modal/Modal";

const Education = ({ handleClose, profile }) => {
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [endDate, setEndDate] = useState(false);
  const [educationId, seEducationId] = useState(null);
  const [addEducation, { isLoading: isAdding }] = useAddEducationMutation();
  const [editEducation, { isLoading: isEditing }] = useEditEducationMutation();
  const [deleteEducation, { isLoading: isDeleting }] =
    useDeleteEducationMutation();

  const toggleEndDate = () => {
    setEndDate(!endDate);
  };
  const toggleAdd = () => {
    setAdd(!add);
    setEdit(false);
    seEducationId(null);
  };
  const toggleEdit = (education) => {
    console.log("education", education);
    setEdit(!edit);
    setAdd(false);
    seEducationId(education._id);
    setValues({
      schoolName: education.schoolName || "",
      degree: education.degree || "",
      startYear: education.startYear || [],
      endYear: education.endYear || "",
    });
  };

  const handleDeleteClick = (id) => {
    seEducationId(id);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteEducation(educationId)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.error) {
          console.log(res?.message);
          return;
        }
        alert({
          type: "success",
          message: "Education Deleted successfully",
          timer: 1000,
          cb: () => setOpen(false),
        });
      })
      .catch((err) => {
        console.log(err);
        alert({
          type: "error",
          message: err.data.message.message || "An error occurred",
          timer: 3000,
        });
      });
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const {
    values,
    // errors,
    // touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      schoolName: "",
      degree: [],
      startYear: "",
      endYear: "",
    },

    onSubmit: (values) => {
      if (edit) {
        handleEditEducation(values);
      } else {
        handleAddEducation(values);
      }
    },
  });

  const handleAddEducation = (values) => {
    console.log(values);
    const payload = {
      education: {
        ...values,
      },
    };

    addEducation(payload)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.error) {
          console.log(res?.message);
          return;
        }
        alert({
          type: "success",
          message: "Education Added successfully",
          timer: 2000,
          cb: () => handleClose(),
        });
      })
      .catch((err) => {
        console.log(err);
        alert({
          type: "error",
          message: err.data.message.message || "An error occurred",
          timer: 3000,
        });
      });
  };
  const handleEditEducation = (values) => {
    console.log(values);
    const entryId = educationId;
    console.log(entryId);

    const payload = {
      education: {
        ...values,
      },
      entryId,
    };

    editEducation(payload)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.error) {
          console.log(res?.message);
          return;
        }
        alert({
          type: "success",
          message: "Education Updated successfully",
          timer: 2000,
          cb: () => handleClose(),
        });
      })
      .catch((err) => {
        console.log(err);
        alert({
          type: "error",
          message: err.data.message.message || "An error occurred",
          timer: 3000,
        });
      });
  };

  return (
    <div>
      <div className="space-y-5">
        {profile?.education?.length === 0 && (
          <p className="flex items-center justify-between mt-5 mb-3 text-black text-sm font-medium">
            Education
          </p>
        )}

        {/* Education */}
        {!edit && (
          <div>
            {profile?.education?.map((edu) => (
              <div key={edu._id}>
                <p className="flex items-center justify-between mt-5 mb-3 text-black text-sm font-medium">
                  Education
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-gray-100 h-6 w-6 flex items-center justify-center">
                      <RiDeleteBinLine
                        onClick={() => handleDeleteClick(edu._id)}
                      />
                      {/* <RiDeleteBinLine onClick={() =>   /> */}
                    </div>
                    <div className="rounded-full bg-gray-100 h-6 w-6 flex items-center justify-center">
                      <GoPencil onClick={() => toggleEdit(edu)} />
                    </div>
                  </div>
                </p>
                <div>
                  <div className="flex gap-5 items-center text-sm ">
                    <div className="w-[8%] ">
                      <EducationIcon />
                    </div>
                    <div className="w-[92%] flex justify-between">
                      <div>
                        <h1 className="text-black font-semibold text-sm">
                          {edu.degree}
                        </h1>
                        <p className="text-gray-500 text-xs">
                          {edu.schoolName}
                          <span>
                            {" "}
                            {formatDate(edu.startYear)} -{" "}
                            {edu.endYear ? formatDate(edu.endYear) : "PRESENT"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {edit && (
          <div className="border rounded-md py-2 px-4">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              {/* school*/}
              <div>
                <label
                  htmlFor="school"
                  className="text-sm text-[#474747] font-medium block pb-2"
                >
                  School
                </label>
                <input
                  type="text"
                  placeholder="School Name"
                  value={values.schoolName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="schoolName"
                  className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
                />
              </div>

              {/* Degree */}
              <div>
                <label
                  htmlFor="degree"
                  className="text-sm text-[#474747] font-medium block pb-2"
                >
                  Degree
                </label>
                <input
                  type="text"
                  placeholder="Degrree"
                  value={values.degree}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="degree"
                  className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
                />
              </div>

              {/* startyear  */}
              <div className="flex gap-5 ">
                <div>
                  <label
                    htmlFor="startYear"
                    className="text-sm text-[#474747] font-medium block pb-2"
                  >
                    Start Date
                  </label>
                  <input
                    type="text"
                    name="startYear"
                    placeholder="Start Year"
                    value={values.startYear}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <p>to</p>
                  <input type="checkbox" onClick={toggleEndDate} />
                  <p>Present</p>
                </div>
              </div>

              {/* Endyear*/}
              {!endDate && (
                <div>
                  <label
                    htmlFor="endYear"
                    className="text-sm text-[#474747] font-medium block pb-2"
                  >
                    End Year
                  </label>
                  <input
                    type="text"
                    name="endYear"
                    placeholder="End Year"
                    value={values.endYear}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
                  />
                </div>
              )}

              <div className="pt-5 col-span-2 grid grid-cols-2 gap-5">
                <button
                  type="button"
                  onClick={toggleEdit}
                  className=" py-3 px-4 border border-black text-black w-full font-bold rounded-[8px] text-base"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="bg-blue-900 py-3 px-4 text-[#FAFAFA] w-full font-bold rounded-[8px] text-base"
                >
                  {isAdding || isEditing ? (
                    <ClipLoader color="#ffffff" loading={true} size={15} />
                  ) : (
                    "Save Education"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
        {add && (
          <div className="border rounded-md py-2 px-4">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              {/* school*/}
              <div>
                <label
                  htmlFor="company/school"
                  className="text-sm text-[#474747] font-medium block pb-2"
                >
                  School
                </label>
                <input
                  type="text"
                  placeholder="School Name"
                  value={values.schoolName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="schoolName"
                  className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
                />
              </div>
              {/* degree */}
              <div>
                <label
                  htmlFor="role"
                  className="text-sm text-[#474747] font-medium block pb-2"
                >
                  Degree
                </label>
                <input
                  type="text"
                  placeholder="Degree"
                  value={values.degree}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="degree"
                  className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
                />
              </div>
              {/* startyear   */}
              <div className="flex  items-center gap-5 ">
                <div>
                  <label
                    htmlFor="startyear"
                    className="text-sm text-[#474747] font-medium block pb-2"
                  >
                    Start Year
                  </label>
                  <input
                    type="text"
                    name="startYear"
                    placeholder="Start Year"
                    value={values.startYear}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <p>to</p>
                  <input type="checkbox" onClick={toggleEndDate} />
                  <p>Present</p>
                </div>
              </div>

              {/* endyear */}
              {!endDate && (
                <div>
                  <label
                    htmlFor="startDate"
                    className="text-sm text-[#474747] font-medium block pb-2"
                  >
                    End Year
                  </label>
                  <input
                    type="text"
                    name="endYear"
                    placeholder="End Year"
                    value={values.endYear}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
                  />
                </div>
              )}

              <div className="pt-5 col-span-2 grid grid-cols-2 gap-5">
                <button
                  type="button"
                  onClick={toggleAdd}
                  className=" py-3 px-4 border border-black text-black w-full font-bold rounded-[8px] text-base"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="bg-blue-900 py-3 px-4 text-[#FAFAFA] w-full font-bold rounded-[8px] text-base"
                >
                  {isAdding || isEditing ? (
                    <ClipLoader color="#ffffff" loading={true} size={15} />
                  ) : (
                    "Save Experience"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
        {!add && (
          <div>
            <button
              onClick={toggleAdd}
              className="border text-sm  border-black rounded-md w-full h-8 flex justify-center items-center"
            >
              {profile?.education?.length === 0
                ? "+ Add Education"
                : " + Add Another Education"}
            </button>
          </div>
        )}
      </div>

      <Modal open={open} handleClose={handleClose}>
        <div className="px-[20px]  w-[300px] flex flex-col items-center ">
          {" "}
          <p className="font-bold ">Confirm Delete?</p>
          <div className="flex items-center mt-5 gap-5">
            <button
              onClick={handleCloseModal}
              className="border h-10 w-32 rounded-lg text-black flex font-medium text-base items-center justify-center"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="border bg-red-500 rounded-lg h-10 w-32 flex items-center justify-center text-white font-medium text-base "
            >
              {isDeleting ? (
                <ClipLoader color="#ffffff" loading={true} size={15} />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Education.propTypes = {
  values: propTypes.object.isRequired,
  touched: propTypes.object.isRequired,
  handleChange: propTypes.func.isRequired,
  handleBlur: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
  errors: propTypes.object.isRequired,
  loading: propTypes.bool.isRequired,
  setFieldValue: propTypes.func.isRequired,
  profile: propTypes.object.isRequired,
  handleClose: propTypes.func.isRequired,
};

export default Education;
