import Tabs from "../profile/tabs/Tabs";
import PasswordChange from "./tabs/PasswordChange";
import Security from "./tabs/Security";

const Settings = () => {
  const tabs = [
    {
      label: "Change Password",
      content: (
        <div>
          <PasswordChange />
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
  return (
    <div className="mt-28 pb-5 px-10">
      <Tabs tabs={tabs} />
    </div>
  );
};
export default Settings;
