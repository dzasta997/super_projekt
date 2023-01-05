import { Navigate, Outlet } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import AdminNavbar from "./AdminNavbar";

const UserLayout = () => (
    <>
      <UserNavbar />
      <Outlet />
    </>
);

const AdminLayout = () => (
    <>
      <AdminNavbar />
      <Outlet />
    </>
);

const ProtectedRoutes = ({user}) => {

    switch(user) {
      case "employee":
        return <UserLayout />;
      case "manager":
        return <UserLayout />;
      case "admin":
        return <AdminLayout />;
      default:
        return <Navigate to="/login" replace/>;
    }
    // return (isUser ? <UserLayout /> : <Navigate to="/login" replace/>)
}
export default ProtectedRoutes;