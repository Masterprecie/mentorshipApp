import { GoPencil } from "react-icons/go";
import Education from "assets/svg/education.svg?react";
import Experience from "assets/svg/experience.svg?react";

const Overview = () => {
  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="pb-5">
        <h2>I am a Frontend Developer at Techbeaver. I love coding.</h2>
        <div>
          <p className="mt-5 mb-3 text-gray-500  text-sm font-medium">
            Interest
          </p>
          <div className="inline-block text-sm bg-orange-300 text-orange-700 px-4 py-2 rounded-md font-medium">
            Engineering
          </div>
        </div>
        <div>
          <p className="flex items-center justify-between mt-5 mb-3 text-black text-sm font-medium">
            Experience
            <div className="rounded-full bg-gray-100 h-6 w-6 flex items-center justify-center">
              <GoPencil />
            </div>
          </p>
          <div className=" flex gap-5 items-center text-sm ">
            <div>
              <Experience />
            </div>
            <div>
              <h1 className="text-black font-semibold text-sm">
                Bachelors of Science
              </h1>
              <p className="text-gray-500 text-xs">
                Michael Okpara University <span> 2014 - 2018 </span>
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="flex items-center justify-between mt-5 mb-3 text-black  text-sm font-medium">
            Education
            <div className="rounded-full bg-gray-100 h-6 w-6 flex items-center justify-center">
              <GoPencil />
            </div>
          </p>
          <div className=" flex gap-5 items-center text-sm ">
            <div>
              <Education />
            </div>
            <div>
              <h1 className="text-black font-semibold text-sm">
                Bachelors of Science
              </h1>
              <p className="text-gray-500 text-xs">
                Michael Okpara University <span> 2014 - 2018 </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Overview;
