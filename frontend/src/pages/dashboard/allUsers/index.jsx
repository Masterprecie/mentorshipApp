import Tabs from "../profile/tabs/Tabs";
import Mentees from "./mentees/Mentees";
import Mentors from "./mentors/Mentors";

const AllUsers = () => {
  const tabs = [
    {
      label: "Mentors",
      content: (
        <div>
          <Mentors />
        </div>
      ),
    },
    {
      label: "Mentees",
      content: (
        <div>
          <Mentees />
        </div>
      ),
    },
  ];
  return (
    <div className="mt-16 pb-5 px-10">
      <Tabs tabs={tabs} />
    </div>
  );
};
export default AllUsers;
