import React from 'react';
import { BrowserRouter as Router, Routes, Route, redirect }
    from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import EditInventory from './pages/EditInventory';
import Login from './pages/Login';
import ProtectedRoutes from './navigation/ProtectedRoutes';
import { Navigate } from "react-router-dom";
import FindItem from './pages/FindItem';
import Delivery from './pages/Delivery';
import Shipping from './pages/Shipping';
import AdminDashboard from './pages/AdminDashboard';
import SignUp from './pages/SignUp';
import useLocalStorage from './hooks/LocalStorageHook';

function App() {
  const userList = ['ROLE_EMPLOYEE', 'ROLE_MANAGER', 'ROLE_ADMIN'];

  // The currently logged in user: employee, manager or admin.
  // Any other value means no user is logged in.
  const [user, setUser, removeUser] = useLocalStorage("user_role", "");
  const onUserChange = (usern) => setUser(usern);
  const onRemoveUser = () => removeUser();
  
  const [userId, setUserId, removeUserId] = useLocalStorage("user_id", "");
  const onUserIdChange = (id) => setUserId(id);
  const onRemovedUserId = () => removeUserId();
  
  const [warehouseId, setWarehouseId, removeWarehouseId] = useLocalStorage("warehouse_id", "1");
  const onWarehouseIdChange = (id) => setWarehouseId(id);
  const onRemoveWarehouseId = () => removeWarehouseId();
  
  // todo, get data somehow
  const [warehouseStreet, setWarehouseStreet, removeWarehouseStreet] = useLocalStorage("warehouse_street", "");
  const onWarehouseStreetChange = (s) => setWarehouseStreet(s);
  const onWarehouseStreetUser = () => removeWarehouseStreet();

  function onLogoutClick() {
    onRemoveUser();
    onRemovedUserId();
    onRemoveWarehouseId();
    onWarehouseStreetUser();
    redirect("/");
  }

  const isAdmin = (user === "ROLE_ADMIN" ? true : false)
  const isAuth = (userList.includes(user) ? true : false)

  return (
    <Router>
    <Routes>
       {/* Routes that require the user to be logged in */}
       <Route element={<ProtectedRoutes user={user} onLogout={onLogoutClick}/>}>
          <Route exact path='/' element={isAdmin ? <AdminDashboard /> : <Dashboard user={user}/>} />
          <Route path='/inventory' element={isAdmin ? <Navigate to="/" replace/> : <Inventory warehouseId={warehouseId} />} />
          <Route path='/edit-inventory' element={isAdmin ? <Navigate to="/" replace/> : <EditInventory/>} />
          <Route path='/find-item' element={isAdmin ? <Navigate to="/" replace/> : <FindItem warehouseId={warehouseId} />} />
          <Route path='/delivery' element={isAdmin ? <Navigate to="/" replace/> : <Delivery user={user} warehouseId={warehouseId} />} />
          <Route path='/shipping' element={isAdmin ? <Navigate to="/" replace/> : <Shipping user={user} warehouseId={warehouseId}/>} />
        </Route>

       {/* Routes that don't require the user to be logged in */}
        <Route path='/login' element={
          isAuth 
            ? <Navigate to="/" /> 
            : <Login onUserChange={onUserChange} onUserIdChange={onUserIdChange} />} />
        <Route path='/sign-up' element={isAdmin ?  <SignUp /> : <Navigate to="/" />} />
    </Routes>
    </Router>
  );
}

export default App;
