import { ClipLoader } from "react-spinners";
import propTypes from "prop-types";

const SocialLink = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  loading,
}) => {
  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Facebook url */}
        <div>
          <label
            htmlFor="facebookUrl"
            className="text-sm text-[#474747] font-medium block pb-2"
          >
            Facebook Url
          </label>
          <input
            type="text"
            placeholder="Facebook URL"
            value={values.facebookUrl}
            onChange={handleChange}
            onBlur={handleBlur}
            name="facebookUrl"
            className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
          />
        </div>
        {/* Twitter URL */}
        <div>
          <label
            htmlFor="lastName"
            className="text-sm text-[#474747] font-medium block pb-2"
          >
            Twitter URL
          </label>
          <input
            type="text"
            placeholder="Twitter URL"
            value={values.twitterUrl}
            onChange={handleChange}
            onBlur={handleBlur}
            name="twitterUrl"
            className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
          />
        </div>
        {/* linkedin URL */}
        <div>
          <label
            htmlFor="linkedin"
            className="text-sm text-[#474747] font-medium block pb-2"
          >
            Linkedin URL
          </label>
          <input
            type="text"
            placeholder="Linkedin URL"
            value={values.linkedinUrl}
            onChange={handleChange}
            onBlur={handleBlur}
            name="linkedinUrl"
            className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
          />
        </div>

        {/* website URL */}
        <div>
          <label
            htmlFor="websiteUrl"
            className="text-sm text-[#474747] font-medium block pb-2"
          >
            Website URL
          </label>
          <input
            type="text"
            placeholder="Website URL"
            value={values.websiteUrl}
            onChange={handleChange}
            onBlur={handleBlur}
            name="websiteUrl"
            className=" border border-[#D0D5DD] rounded-[8px] outline-0 w-full py-3 px-4"
          />
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

SocialLink.propTypes = {
  values: propTypes.object.isRequired,
  handleChange: propTypes.func.isRequired,
  handleBlur: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,
};

export default SocialLink;
