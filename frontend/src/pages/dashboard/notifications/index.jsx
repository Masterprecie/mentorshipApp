import { useAuth } from "../../../features/auth/hook";
import { useGetNotificationsQuery } from "../../../features/users/api";

const Notifications = () => {
  const { user } = useAuth();
  const {
    data: allNotifications,
    isLoading,
    error,
  } = useGetNotificationsQuery(user?.id);

  console.log(allNotifications);
  return (
    <div className="mt-28 pb-5 px-10">
      <h1>Notifications</h1>

      {isLoading ? (
        <div className="p-5">
          {/* <Loader /> */}
          Loading...
        </div>
      ) : error ? (
        <div className="">No Notifications Found</div>
      ) : (
        allNotifications?.map((notification) => (
          <div key={notification.id}>
            <h1>{notification.title}</h1>
            <p>{notification.message}</p>
          </div>
        ))
      )}
    </div>
  );
};
export default Notifications;
