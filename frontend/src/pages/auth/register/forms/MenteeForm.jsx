import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import propTypes from "prop-types";
import { PrimaryMultiSelect } from "../../../../components/multi-select/MultipleSelect";

const MenteeForm = ({
  values,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  errors,
  loading,
  setFieldValue,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const interestOptions = [
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
      {" "}
      <form
        onSubmit={handleSubmit}
        className="mt-[30px] lg:grid grid-cols-2 space-y-5 lg:space-y-0  gap-5 max-w-[559px] mx-auto"
      >
        {/* First Name */}
        <div>
          <label
            htmlFor="firstName"
            className="text-sm text-[#474747] font-medium block pb-2"
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
            className="text-sm text-[#474747] font-medium block pb-2"
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
            className="text-sm text-[#474747] font-medium block pb-2"
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

        <div className="grid grid-cols-2 gap-5">
          {/* Age */}
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
          {/* Gender */}
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
        </div>

        {/* Interest */}
        <div>
          <label
            htmlFor="email"
            className="text-sm text-[#474747] font-medium block pb-2"
          >
            Interest (2max)
          </label>

          <PrimaryMultiSelect
            options={interestOptions}
            value={values.interest}
            onChange={(selectedOptions) =>
              setFieldValue("interest", selectedOptions)
            }
            onBlur={() => handleBlur("interest")}
          />
          {touched.interest && errors.interest && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.interest}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="text-sm text-[#474747] font-medium block pb-2"
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

        {/* about */}
        <div className="col-span-2">
          <label
            htmlFor="about"
            className="text-sm text-[#474747] font-medium block pb-2"
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

MenteeForm.propTypes = {
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

export default MenteeForm;
