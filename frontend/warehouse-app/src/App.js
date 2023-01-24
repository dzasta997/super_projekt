import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route}
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
import SignIn from './pages/SignIn';

function App() {
  const userList = ['employee', 'manager', 'admin'];

  // The currently logged in user: employee, manager or admin.
  // Any other value means no user is logged in.
  const [user, setUser] = useState("admin");

  const isAdmin = (user === "admin" ? true : false)
  const isAuth = (userList.includes(user) ? true : false)

  return (
    <Router>
    <Routes>
       {/* Routes that require the user to be logged in */}
       <Route element={<ProtectedRoutes user={user}/>}>
          <Route exact path='/' element={isAdmin ? <AdminDashboard /> : <Dashboard />} />
          <Route path='/inventory' element={isAdmin ? <Navigate to="/" replace/> : <Inventory/>} />
          <Route path='/edit-inventory' element={isAdmin ? <Navigate to="/" replace/> : <EditInventory/>} />
          <Route path='/find-item' element={isAdmin ? <Navigate to="/" replace/> : <FindItem/>} />
          <Route path='/delivery' element={isAdmin ? <Navigate to="/" replace/> : <Delivery/>} />
          <Route path='/shipping' element={isAdmin ? <Navigate to="/" replace/> : <Shipping user={user}/>} />
        </Route>

       {/* Routes that don't require the user to be logged in */}
        <Route path='/login' element={isAuth ? <Navigate to="/" /> : <Login />} />
        <Route path='/sign-in' element={isAuth ? <Navigate to="/" /> : <SignIn />} />
    </Routes>
    </Router>
  );
}

export default App;
