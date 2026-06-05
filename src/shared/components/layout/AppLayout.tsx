import Footer from "@/shared/components/layout/Footer/Footer";
import Navbar from "@/shared/components/layout/Header/Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-svh flex flex-col">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
