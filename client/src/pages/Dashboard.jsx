import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DashboardProfile, DashboardSidebar } from "../components";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    // console.log(tabFromUrl);

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div>
      <div className="">
        {/* sidebar */}
        <DashboardSidebar />
      </div>

      {/* profile */}
      {tab === "profile" && <DashboardProfile />}
    </div>
  );
};

export default Dashboard;
