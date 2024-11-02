import Tabs from "../profile/tabs/Tabs";
import History from "./tabs/History";
import Pending from "./tabs/Pending";
import Upcoming from "./tabs/Upcoming";

const Bookings = () => {
  const tabs = [
    {
      label: "Upcoming",
      content: (
        <div>
          <Upcoming />
        </div>
      ),
    },
    {
      label: "Pending",
      content: (
        <div>
          <Pending />
        </div>
      ),
    },
    {
      label: "History",
      content: (
        <div>
          <History />
        </div>
      ),
    },
  ];
  return (
    <div className="mt-28 pb-5 px-10">
      <div>
        <h1 className="font-bold text-3xl">Bookings</h1>
        <p className="pt-3">
          The session timings are following your local timezone Africa/Lagos
        </p>
      </div>

      <div>
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};
export default Bookings;
