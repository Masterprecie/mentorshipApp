import { ClipLoader } from "react-spinners";
import { PrimaryMultiSelect } from "../../../../components/multi-select/MultipleSelect";
import propTypes from "prop-types";
import { GoPencil } from "react-icons/go";
import ExperienceIcon from "assets/svg/experience.svg?react";
import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

import {
  useAddExperienceMutation,
  useDeleteExperienceMutation,
  useEditExperienceMutation,
} from "../../../../features/auth/api";
import { useFormik } from "formik";
import { alert } from "../../../../utils/alert";
import { formatDate } from "../../../../utils/helpers";
import Modal from "../../../../components/modal/Modal";

const Experience = ({
  values: eValue,
  touched: eTouched,
  // handleChange: eHandleChange,
  handleBlur: eHandleBlur,
  handleSubmit: eHandleSubmit,
  errors: eErrors,
  loading: eLoading,
  setFieldValue: eSetFieldValue,
  handleClose,
  profile,
}) => {
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [endDate, setEndDate] = useState(false);
  const [experienceId, setExperienceId] = useState(null);
  const toggleEndDate = () => {
    setEndDate(!endDate);
  };
  const toggleAdd = () => {
    setAdd(!add);
    setEdit(false);
    setExperienceId(null);
  };
  const toggleEdit = (experience) => {
    console.log("exp", experience);
    setEdit(!edit);
    setAdd(false);
    setExperienceId(experience._id);
    setValues({
      role: experience.role || "",
      company: experience.company || "",
      industry: experience.industry || [],
      startDate: experience.startDate || "",
      endDate: experience.endDate || "",
      briefContribution: experience.briefContribution || "",
    });
  };

  const [addExperience, { isLoading: isAdding }] = useAddExperienceMutation();
  const [editExperience, { isLoading: isEditing }] =
    useEditExperienceMutation();
  const [deleteExperience, { isLoading: isDeleting }] =
    useDeleteExperienceMutation();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setValues,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      role: "",
      company: "",
      industry: [],
      startDate: "",
      endDate: "",
      briefContribution: "",
    },

    onSubmit: (values) => {
      if (edit) {
        handleEditExperience(values);
      } else {
        handleAddExperience(values);
      }
    },
  });

  const handleAddExperience = (values) => {
    console.log(values);
    const payload = {
      workExperience: {
        ...values,
      },
    };

    addExperience(payload)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.error) {
          console.log(res?.message);
          return;
        }
        alert({
          type: "success",
          message: "Profile Updated successfully",
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
  const handleEditExperience = (values) => {
    console.log(values);
    const entryId = experienceId;
    console.log(entryId);

    const payload = {
      workExperience: {
        ...values,
      },
      entryId,
    };

    editExperience(payload)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.error) {
          console.log(res?.message);
          return;
        }
        alert({
          type: "success",
          message: "Profile Updated successfully",
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

  const handleDeleteClick = (id) => {
    setExperienceId(id);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteExperience(experienceId)
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

  const expertiseOptions = [
    { label: "Technology", value: "Technology " },
    { label: "Agriculture", value: "Agriculture" },
    { label: "Finance Management", value: "Finance Management" },
    { label: "Art and Creativity", value: "Art and Creativity" },
    { label: "Entrepreneurship", value: "Entrepreneurship" },
    { label: "Healthcare", value: "Healthcare" },
    { label: "Communication", value: "Art and Creativity" },
  ];

  const industryOptions = [
    { label: "Technology", value: "Technology " },
    { label: "Agriculture", value: "Agriculture" },
    { label: "Finance Management", value: "Finance Management" },
    { label: "Art and Creativity", value: "Art and Creativity" },
    { label: "Entrepreneurship", value: "Entrepreneurship" },
    { label: "Healthcare", value: "Healthcare" },
    { label: "Communication", value: "Art and Creativity" },
  ];

  return (
    <div>
      <form onSubmit={eHandleSubmit} className="space-y-5">
        {/* Expertise */}
        <div>
          <label
            htmlFor="email"
            className="text-sm text-[#474747] font-medium block pb-2"
          >
            What’s your expertise? (2max)
          </label>

          <PrimaryMultiSelect
            options={expertiseOptions}
            value={eValue.expertise}
            onChange={(selectedOptions) =>
              eSetFieldValue("expertise", selectedOptions)
            }
            onBlur={() => eHandleBlur("expertise")}
          />
          {eTouched.expertise && eErrors.expertise && (
            <p className="text-red-500 font-semibold text-sm">
              {eErrors.expertise}
            </p>
          )}
        </div>
        {profile?.workExperience?.length === 0 && (
          <p className="flex items-center justify-between mt-5 mb-3 text-black text-sm font-medium">
            Experience
          </p>
        )}

        {!edit && (
          <div>
            {profile?.workExperience?.map((exp) => (
              <div key={exp._id}>
                <p className="flex items-center justify-between mt-5 mb-3 text-black text-sm font-medium">
                  Experience
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-gray-100 h-6 w-6 flex items-center justify-center">
                      <RiDeleteBinLine
                        onClick={() => handleDeleteClick(exp._id)}
                      />
                    </div>
                    <div className="rounded-full bg-gray-100 h-6 w-6 flex items-center justify-center">
                      <GoPencil onClick={() => toggleEdit(exp)} />
                    </div>
                  </div>
                </p>
                <div>
                  <div className="flex gap-5 items-center text-sm ">
                    <div className="w-[8%] ">
                      <ExperienceIcon />
                    </div>
                    <div className="w-[92%] flex justify-between">
                      <div>
                        <h1 className="text-black font-semibold text-sm">
                          {exp.role}
                        </h1>
                        <p className="text-gray-500 text-xs">{exp.company}</p>
                      </div>
                      <div>
                        <p className="text-black rounded px-2 py-1 bg-blue-100 font-medium text-[10px]">
                          {formatDate(exp.startDate)} -{" "}
                          {exp.endDate ? formatDate(exp.endDate) : "PRESENT"}
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
              {/* First Name */}
              <div>
                <label
                  htmlFor="role"
                  className="text-sm text-[#474747] font-medium block pb-2"
                >
                  Role
                </label>
                <input
                  type="text"
                  placeholder="Role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="role"
                  className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
                />
              </div>
              {/* Company*/}
              <div>
                <label
                  htmlFor="company/school"
                  className="text-sm text-[#474747] font-medium block pb-2"
                >
                  Company/School
                </label>
                <input
                  type="text"
                  placeholder="Company/School"
                  value={values.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="company"
                  className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
                />
              </div>

              {/* industry */}
              <div>
                <label
                  htmlFor="industry"
                  className="text-sm text-[#474747] font-medium block pb-2"
                >
                  Industry
                </label>

                <PrimaryMultiSelect
                  options={industryOptions}
                  value={values.industry}
                  onChange={(selectedOptions) =>
                    setFieldValue("industry", selectedOptions)
                  }
                  onBlur={() => handleBlur("industry")}
                />
                {touched.industry && errors.industry && (
                  <p className="text-red-500 font-semibold text-sm">
                    {errors.industry}
                  </p>
                )}
              </div>

              {/* startDate and  */}
              <div className="flex gap-5 ">
                <div>
                  <label
                    htmlFor="startDate"
                    className="text-sm text-[#474747] font-medium block pb-2"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    placeholder="Start Date"
                    value={values.startDate}
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

              {/* {EndDate} */}
              {!endDate && (
                <div>
                  <label
                    htmlFor="startDate"
                    className="text-sm text-[#474747] font-medium block pb-2"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    placeholder="End Date"
                    value={values.endDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
                  />
                </div>
              )}
              {/* briefContribution */}

              <div className="col-span-2">
                <label
                  htmlFor="briefContribution"
                  className="text-sm text-[#474747] font-medium block pb-2"
                >
                  Write a brief on your contribution
                </label>
                <textarea
                  rows="5"
                  placeholder="Enter some description about your role"
                  value={values.briefContribution}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="briefContribution"
                  className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
                />
                {touched.briefContribution && errors.briefContribution && (
                  <p className="text-red-500 font-semibold text-sm">
                    {errors.briefContribution}
                  </p>
                )}
              </div>

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
                    "Save Experience"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
        {add && (
          <div className="border rounded-md py-2 px-4">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              {/* role */}
              <div>
                <label
                  htmlFor="role"
                  className="text-sm text-[#474747] font-medium block pb-2"
                >
                  Role
                </label>
                <input
                  type="text"
                  placeholder="Role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="role"
                  className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
                />
              </div>
              {/* Company*/}
              <div>
                <label
                  htmlFor="company/school"
                  className="text-sm text-[#474747] font-medium block pb-2"
                >
                  Company/School
                </label>
                <input
                  type="text"
                  placeholder="Company/School"
                  value={values.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="company"
                  className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
                />
              </div>

              {/* industry */}
              <div>
                <label
                  htmlFor="industry"
                  className="text-sm text-[#474747] font-medium block pb-2"
                >
                  Industry
                </label>

                <PrimaryMultiSelect
                  options={industryOptions}
                  value={values.industry}
                  onChange={(selectedOptions) =>
                    setFieldValue("industry", selectedOptions)
                  }
                  onBlur={() => handleBlur("industry")}
                />
                {touched.industry && errors.industry && (
                  <p className="text-red-500 font-semibold text-sm">
                    {errors.industry}
                  </p>
                )}
              </div>

              {/* startDate and  */}
              <div className="flex  items-center gap-5 ">
                <div>
                  <label
                    htmlFor="startDate"
                    className="text-sm text-[#474747] font-medium block pb-2"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    placeholder="Start Date"
                    value={values.startDate}
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

              {/* {EndDate} */}
              {!endDate && (
                <div>
                  <label
                    htmlFor="startDate"
                    className="text-sm text-[#474747] font-medium block pb-2"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    placeholder="End Date"
                    value={values.endDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
                  />
                </div>
              )}
              {/* briefContribution */}

              <div className="col-span-2">
                <label
                  htmlFor="briefContribution"
                  className="text-sm text-[#474747] font-medium block pb-2"
                >
                  Write a brief on your contribution
                </label>
                <textarea
                  rows="5"
                  placeholder="Enter some description about your role"
                  value={values.briefContribution}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="briefContribution"
                  className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
                />
                {touched.briefContribution && errors.briefContribution && (
                  <p className="text-red-500 font-semibold text-sm">
                    {errors.briefContribution}
                  </p>
                )}
              </div>

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
              {profile?.workExperience?.length === 0
                ? "+ Add Experience"
                : " + Add Another Experience"}
            </button>
          </div>
        )}

        <div className="pt-5 col-span-2">
          <button
            type="submit"
            className="bg-blue-900 py-3 px-4 text-[#FAFAFA] w-full font-bold rounded-[8px] text-base"
          >
            {eLoading ? (
              <ClipLoader color="#ffffff" loading={true} size={15} />
            ) : (
              "Update Profile"
            )}
          </button>
        </div>
      </form>

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

Experience.propTypes = {
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

export default Experience;
