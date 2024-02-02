import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DashboardProfile, DashboardSidebar } from "../components";
import DashboardPosts from "../components/DashboardPosts";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    console.log(tabFromUrl);

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* sidebar */}
        <DashboardSidebar />
      </div>

      {/* profile */}
      {tab === "profile" && <DashboardProfile />}

      {/* posts */}
      {tab === "posts" && <DashboardPosts />}
    </div>
  );
};

export default Dashboard;
