import {
  useGetDashboardAnalyticsQuery,
  useGetDashboardStatsQuery,
} from "../../../features/admin/api";

const AdminHome = () => {
  const year = new Date().getFullYear();
  console.log("year", year);
  const { data: dashboardStats } = useGetDashboardStatsQuery();
  const { data: dashboardAnalytics } = useGetDashboardAnalyticsQuery(year);

  console.log(dashboardStats);
  console.log(dashboardAnalytics);

  return (
    <div className="mt-28 px-10">
      <h1>Dashboard Statistics</h1>
      <p>Total Mentors: {dashboardStats?.totalMentors}</p>
      <p>Total Mentees: {dashboardStats?.totalMentee}</p>
    </div>
  );
};
export default AdminHome;
