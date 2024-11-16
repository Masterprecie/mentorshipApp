import { ClipLoader } from "react-spinners";
import { PrimaryMultiSelect } from "../../../../components/multi-select/MultipleSelect";
import propTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
const BasicInfo = ({
  values,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  errors,
  loading,
  setFieldValue,
  profile,
}) => {
  const [countries, setCountries] = useState([]);
  const interestOptions = [
    { label: "Technology", value: "Technology " },
    { label: "Agriculture", value: "Agriculture" },
    { label: "Finance Management", value: "Finance Management" },
    { label: "Art and Creativity", value: "Art and Creativity" },
    { label: "Entrepreneurship", value: "Entrepreneurship" },
    { label: "Healthcare", value: "Healthcare" },
    { label: "Communication", value: "Art and Creativity" },
  ];

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const options = countries?.map((country) => ({
    value: country.name.common,
    label: (
      <div className="flex items-center gap-2 text-[10px]">
        {country.name.common}
      </div>
    ),
  }));

  const sortedOptions = options.sort((a, b) => a.value.localeCompare(b.value));

  const languageOptions = [
    { label: "English", value: "English" },
    { label: "French", value: "French" },
    { label: "Spanish", value: "Spanish" },
    { label: "Portuguese", value: "Portuguese" },
    { label: "Chinese", value: "Chinese" },
    { label: "Arabic", value: "Arabic" },
    { label: "Russian", value: "Russian" },
    { label: "Japanese", value: "Japanese" },
    { label: "German", value: "German" },
    { label: "Italian", value: "Italian" },
    { label: "Dutch", value: "Dutch" },
    { label: "Korean", value: "Korean" },
    { label: "Turkish", value: "Turkish" },
    { label: "Polish", value: "Polish" },
    { label: "Swedish", value: "Swedish" },
    { label: "Norwegian", value: "Norwegian" },
    { label: "Danish", value: "Danish" },
    { label: "Finnish", value: "Finnish" },
    { label: "Greek", value: "Greek" },
    { label: "Hebrew", value: "Hebrew" },
    { label: "Hindi", value: "Hindi" },
    { label: "Urdu", value: "Urdu" },
    { label: "Bengali", value: "Bengali" },
    { label: "Punjabi", value: "Punjabi" },
    { label: "Telugu", value: "Telugu" },
    { label: "Marathi", value: "Marathi" },
    { label: "Tamil", value: "Tamil" },
    { label: "Gujarati", value: "Gujarati" },
    { label: "Kannada", value: "Kannada" },
    { label: "Odia", value: "Odia" },
    { label: "Malayalam", value: "Malayalam" },
    { label: "Sindhi", value: "Sindhi" },
    { label: "Sanskrit", value: "Sanskrit" },
    { label: "Others", value: "Others" },
  ];

  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit} className="space-y-5">
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

        <div className="grid grid-cols-3 gap-5">
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
          {/* yearsOfExperience */}
          <div>
            <label
              htmlFor="yearsOfExperience"
              className="text-sm text-[#474747] font-medium block pb-2"
            >
              Years of Experience
            </label>
            <input
              type="number"
              name="yearsOfExperience"
              value={values.yearsOfExperience}
              onChange={handleChange}
              onBlur={handleBlur}
              className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
            />

            {touched.yearsOfExperience && errors.yearsOfExperience && (
              <p className="text-red-500 font-semibold text-sm">
                {errors.yearsOfExperience}
              </p>
            )}
          </div>
          {/* gender */}
          <div>
            <label
              htmlFor="gender"
              className="text-sm text-[#474747] font-medium block pb-2"
            >
              Gender
            </label>

            <select
              className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3.5 px-4"
              name="gender"
              value={values.gender}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select a Gender</option>
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

        <div className="grid grid-cols-2 gap-5">
          {/* language */}
          <div>
            <label
              htmlFor="email"
              className="text-sm text-[#474747] font-medium block pb-2"
            >
              What Language(s) do you speak
            </label>
            <PrimaryMultiSelect
              options={languageOptions}
              value={values.languages}
              onChange={(selectedOptions) =>
                setFieldValue("languages", selectedOptions)
              }
              onBlur={() => handleBlur("languages")}
            />
            {touched.languages && errors.languages && (
              <p className="text-red-500 font-semibold text-sm">
                {errors.languages}
              </p>
            )}
          </div>

          {/* Country */}
          <div>
            <label
              htmlFor="email"
              className="text-sm text-[#474747] font-medium block pb-2"
            >
              Country
            </label>
            <select
              name="country"
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
              className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3.5 px-4"
            >
              <option value="">Select</option>
              {sortedOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {touched.country && errors.country && (
              <p className="text-red-500 font-semibold text-sm">
                {errors.country}
              </p>
            )}
          </div>
        </div>

        {/* Interest */}
        {profile?.role === "mentee" ? (
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
        ) : null}

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
              "Update Profile"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

BasicInfo.propTypes = {
  values: propTypes.object.isRequired,
  touched: propTypes.object.isRequired,
  handleChange: propTypes.func.isRequired,
  handleBlur: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
  errors: propTypes.object.isRequired,
  loading: propTypes.bool.isRequired,
  setFieldValue: propTypes.func.isRequired,
  profile: propTypes.object.isRequired,
};

export default BasicInfo;
