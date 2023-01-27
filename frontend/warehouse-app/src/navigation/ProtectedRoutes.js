import { Navigate, Outlet } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import AdminNavbar from "./AdminNavbar";

const UserLayout = ({onLogout}) => (
    <>
      <UserNavbar onLogout={onLogout}/>
      <Outlet />
    </>
);

const AdminLayout = ({onLogout}) => (
    <>
      <AdminNavbar onLogout={onLogout}/>
      <Outlet />
    </>
);

const ProtectedRoutes = ({user, onLogout}) => {

    switch(user) {
      case "ROLE_EMPLOYEE":
        return <UserLayout onLogout={onLogout}/>;
      case "ROLE_MANAGER":
        return <UserLayout onLogout={onLogout}/>;
      case "ROLE_ADMIN":
        return <AdminLayout onLogout={onLogout}/>;
      default:
        return <Navigate to="/login" replace/>;
    }
}
export default ProtectedRoutes;