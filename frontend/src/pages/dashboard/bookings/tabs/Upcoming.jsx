import { Link } from "react-router-dom";

const Upcoming = () => {
  return (
    <div>
      <p className="text-sm text-gray-500">
        You have no upcoming bookings - start sharing a conversation with a
        mentor.
      </p>

      <div className="mt-5">
        <Link to="/dashboard/explore">
          <button className="bg-black text-white text-sm h-10 w-[120px] rounded-md flex items-center justify-center">
            Explore Mentors
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Upcoming;
