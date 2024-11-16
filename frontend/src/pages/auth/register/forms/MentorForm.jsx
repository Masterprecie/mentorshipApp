import { useState } from "react";
// import Button from "../../../../components/button/Button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import propTypes from "prop-types";
import { PrimaryMultiSelect } from "../../../../components/multi-select/MultipleSelect";

const MentorForm = ({
  values,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  errors,
  setFieldValue,
  loading,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const expertiseOptions = [
    { label: "Technology", value: "Technology " },
    { label: "Agriculture", value: "Agriculture" },
    { label: "Finance Management", value: "Finance Management" },
    { label: "Art and Creativity", value: "Art and Creativity" },
    { label: "Entrepreneurship", value: "Entrepreneurship" },
    { label: "Healthcare", value: "Healthcare" },
    { label: "Communication", value: "Communication" },
  ];

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mt-[30px] lg:grid grid-cols-2 space-y-5 lg:space-y-0  gap-5 max-w-[559px] mx-auto"
      >
        {/* First Name */}
        <div>
          <label
            htmlFor="firstName"
            className="text-sm text-white   font-medium block pb-2"
          >
            First Name
          </label>
          <input
            type="text"
            placeholder="First Name"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            name="firstName"
            className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
          />
          {touched.firstName && errors.firstName && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.firstName}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label
            htmlFor="lastName"
            className="text-sm text-white  font-medium block pb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            placeholder="Last Name"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            name="lastName"
            className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
          />
          {touched.lastName && errors.lastName && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.lastName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="text-sm text-white  font-medium block pb-2"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
          />
          {touched.email && errors.email && (
            <p className="text-red-500 font-semibold text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="text-sm text-white   font-medium block pb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              placeholder="Enter your password"
              type={passwordVisible ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
              className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
            />{" "}
            {passwordVisible ? (
              <AiOutlineEye
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              />
            ) : (
              <AiOutlineEyeInvisible
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              />
            )}
          </div>
          {touched.password && errors.password && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.password}
            </p>
          )}
        </div>

        {/* <div className="grid grid-cols-2 gap-5">
          Age
          <div>
            <label
              htmlFor="email"
              className="text-sm text-[#474747] font-medium block pb-2"
            >
              Age
            </label>
            <input
              type="number"
              placeholder="Age"
              value={values.age}
              onChange={handleChange}
              onBlur={handleBlur}
              name="age"
              className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
            />
            {touched.age && errors.age && (
              <p className="text-red-500 font-semibold text-sm">{errors.age}</p>
            )}
          </div>
          Gender
          <div>
            <label
              htmlFor="email"
              className="text-sm text-[#474747] font-medium block pb-2"
            >
              Gender
            </label>
            <select
              name="gender"
              value={values.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            {touched.gender && errors.gender && (
              <p className="text-red-500 font-semibold text-sm">
                {errors.gender}
              </p>
            )}
          </div>
        </div> */}

        {/* expertise */}
        <div className="col-span-2">
          <label
            htmlFor="email"
            className="text-sm text-white  font-medium block pb-2"
          >
            Expertise (2max)
          </label>

          <PrimaryMultiSelect
            options={expertiseOptions}
            value={values.expertise}
            onChange={(selectedOptions) =>
              setFieldValue("expertise", selectedOptions)
            }
            onBlur={() => handleBlur("expertise")}
          />
          {touched.expertise && errors.expertise && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.expertise}
            </p>
          )}
        </div>

        {/* yearsOfExperience */}
        <div>
          <label
            htmlFor="yearsOfExperience"
            className="text-sm text-white   font-medium block pb-2"
          >
            Years Of Experience
          </label>
          <input
            type="number"
            placeholder="  Years Of Experience"
            value={values.yearsOfExperience}
            onChange={handleChange}
            onBlur={handleBlur}
            name="yearsOfExperience"
            className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
          />
          {touched.yearsOfExperience && errors.yearsOfExperience && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.yearsOfExperience}
            </p>
          )}
        </div>

        {/* linkedinUrl */}
        <div>
          <label
            htmlFor="LinkedIn Profile URL"
            className="text-sm text-white   font-medium block pb-2"
          >
            LinkedIn Profile URL
          </label>
          <input
            type="text"
            placeholder="LinkedIn Profile URL"
            value={values.linkedinUrl}
            onChange={handleChange}
            onBlur={handleBlur}
            name="linkedinUrl"
            className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
          />
          {touched.linkedinUrl && errors.linkedinUrl && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.linkedinUrl}
            </p>
          )}
        </div>

        {/* about */}
        <div className="col-span-2">
          <label
            htmlFor="about"
            className="text-sm text-white  font-medium block pb-2"
          >
            About
          </label>
          <textarea
            rows="5"
            placeholder="Brief summary about yourself"
            value={values.about}
            onChange={handleChange}
            onBlur={handleBlur}
            name="about"
            className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
          />
          {touched.about && errors.about && (
            <p className="text-red-500 font-semibold text-sm">{errors.about}</p>
          )}
        </div>

        <div className="pt-5 col-span-2">
          <button
            type="submit"
            className="bg-blue-900 py-3 px-4 text-[#FAFAFA] w-full font-bold rounded-[8px] text-base"
          >
            {loading ? (
              <ClipLoader color="#ffffff" loading={true} size={15} />
            ) : (
              "Create account"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

MentorForm.propTypes = {
  values: propTypes.object.isRequired,
  touched: propTypes.object.isRequired,
  handleChange: propTypes.func.isRequired,
  handleBlur: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
  resetForm: propTypes.func.isRequired,
  errors: propTypes.object.isRequired,
  loading: propTypes.bool.isRequired,
  setFieldValue: propTypes.func.isRequired,
};

export default MentorForm;
