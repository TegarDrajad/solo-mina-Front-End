import { Routes, Route, useNavigate } from "react-router-dom";
import React from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

// routes
import Login from './auth/Login';
import LandingPage from './routes/LandingPage';
import ForgotPassword from "./auth/ForgotPassword";
import About from "./routes/About";

//admin routes
import Home from "./routes/admin/Home";
import SalesInfo from "./routes/admin/SalesInformation";

// super admin routes
import HomeBackOffice from "./routes/superadmin/Home";
import SalesInformation from "./routes/superadmin/SalesInformation";
import AddDataSaling from "./routes/superadmin/AddDataSaling";
import AdminManajemen from "./routes/superadmin/AdminManajemen";
import CustomerManajemen from "./routes/superadmin/CustomerManajemen";
import FishData from "./routes/superadmin/FishData";
import PriceByCustomer from "./routes/superadmin/PriceByCustomer";


// function untuk protected route checking authentikasi
const ProtectedRoute = ({children}) => {
  
  //Acces get token 
  if (!localStorage.getItem("access_token")) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {

  const routeConfig = [
    {path: "/login", component: Login},
    {path: "/forgotPassword", component: ForgotPassword},
    {path: "/aboutus", component: About},

  ];

  const adminRoute = [
    {path: "/admin/dashboard", component: Home},
    {path: "/admin/salesInfo", component: SalesInfo},
  ];

  const superAdminRoute = [
    {path: "/backoffice/dashboard", component: HomeBackOffice},
    {path: "/backoffice/salesInfo", component: SalesInformation},
    {path: "/backoffice/addDataSale", component: AddDataSaling},
    {path: "/backoffice/adminManajemen", component: AdminManajemen},
    {path: "/backoffice/customerManajemen", component: CustomerManajemen},
    {path: "/backoffice/fishData", component: FishData},
    {path: "/backoffice/priceByCustomer", component: PriceByCustomer},
  ];

  const publicRoutes = routeConfig.map((route, index) => (
    <Route key={index} path={route.path} element={<route.component/>}></Route>
  ));

  const protectRoutesAdmin = adminRoute.map((adminRoutes, index) => (
    <Route key={index} path={adminRoutes.path} element={<ProtectedRoute><adminRoutes.component/></ProtectedRoute>}></Route>
  ));

  const protectRoutesSuperAdmin = superAdminRoute.map((superAdminRoutes, index) => (
    <Route key={index} path={superAdminRoutes.path} element={<ProtectedRoute><superAdminRoutes.component/></ProtectedRoute>}></Route>
  ));
  
  return (
    <>
   
      <Routes>
        {publicRoutes}
        {protectRoutesAdmin}
        {protectRoutesSuperAdmin}
      </Routes>
    
    </>
  );  
};

export default App;
