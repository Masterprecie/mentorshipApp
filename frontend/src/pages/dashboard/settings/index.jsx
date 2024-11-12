import { useAuth } from "../../../features/auth/hook";
import Tabs from "../profile/tabs/Tabs";
import Notifications from "./tabs/Notifications";
import Security from "./tabs/Security";
import Verification from "./tabs/Verification";

const Settings = () => {
  const { user } = useAuth();
  const tabs = [
    {
      label: "Verification",
      content: (
        <div>
          <Verification />
        </div>
      ),
    },
    {
      label: "Notifications",
      content: (
        <div>
          <Notifications />
        </div>
      ),
    },
    {
      label: "Security",
      content: (
        <div>
          <Security />
        </div>
      ),
    },
  ];
  const filteredTabs =
    user?.role === "mentee"
      ? tabs.filter((tab) => tab.label !== "Verification")
      : tabs;

  return (
    <div className="mt-28 pb-5 px-10">
      <Tabs tabs={filteredTabs} />
    </div>
  );
};
export default Settings;
