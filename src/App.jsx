
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layouts"
import Home from "./pages/Home"
import Adminlogin from "./pages/Adminlogin"
import Register from "./pages/Register"



import StaffElement from "./router/StaffEelement"
import StaffDashboard from "./pages/staff/Dashboard"
import UpdateUserProfile from "./pages/staff/UpdateUserProfile"
import EditCashAdvance from "./pages/staff/EditCashAdvance"

import ChashadvanceForm from "./pages/staff/CashAdvanceForm"
import RetirementForm from "./pages/staff/RetirementForm"
import StaffRetirement from "./pages//staff/RetirementVoucher"
import CashAdvanceList from "./pages/staff/CashAdvanceList"


import AuditEelement from "./router/AuditEelement"
import AuditDashboard from "./pages/audit/Dashboard"
import ApproveCashAdvance from "./pages/audit/ApproveCashAdvance"
import AuditCashAdvanceList from "./pages/audit/CashAdvanceList"




import AdminElement from "./router/AdminEelement"
import Dashboard from "./pages/dashboard/Dashboard"
import Users from "./pages/dashboard/UsersList"
import AllCashAdvance from "./pages/dashboard/AllCashAdvance"
import CashAdvanceEdit from "./pages/dashboard/EditCashAdvance"
import AllRetirementVoucher from "./pages/dashboard/AllRetirementVoucher"
import AuditedCashAdvance from "./pages/dashboard/AuditedCashAdvance"
import PaidCashAdvance from "./pages/dashboard/PaidCashAdvance"
import CapitalList from "./pages/dashboard/cash-office/capital/AllCapital"
import AddCapital from "./pages/dashboard/cash-office/capital/AddCapital"

import OverheadList from "./pages/dashboard/cash-office/overhead/AllOverhead"
import AddOverhead from "./pages/dashboard/cash-office/overhead/AddOverhead"


import CantractorList from "./pages/dashboard/contractor/AllContractors"
import AddCantractor from "./pages/dashboard/contractor/AddContractor"



import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
 

  return (
   <div>
    <BrowserRouter>
     
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />  
          <Route path = "adminlogin"element = { < Adminlogin /> }/> 
          <Route path = "register"element = { < Register /> }/> 

      </Route>
      <Route index element={<Home />} />  
      
        { /* Abstract Portal Routes admin */ } 
        <Route path = "/dashboard"
                        element = { <AdminElement> { /* <Layout /> */ } 
                        <Route index element = { < Dashboard />} /> 
                            </AdminElement > }>
                        <Route index element = {< Dashboard />}/>                   
                        <Route path = "users"element = { < Users /> }/>                         
                        <Route path = "cashadvance-list"element = { < AllCashAdvance /> }/> 
                        <Route path = "edit-cashadvance/:id"element = { < CashAdvanceEdit /> }/> 
                        <Route path = "all-retirement"element = { < AllRetirementVoucher /> }/> 
                        <Route path = "audited-cashadvance"element = { < AuditedCashAdvance /> }/> 
                        <Route path = "paid-cashadvance"element = { < PaidCashAdvance /> }/> 

                          {/* Cash Office */}
                        
                        <Route path = "capital"element = { < CapitalList /> }/> 
                        <Route path = "add-capital"element = { < AddCapital /> }/> 

                        <Route path = "over-head"element = { < OverheadList /> }/>
                        <Route path = "add-overhead"element = { < AddOverhead /> }/> 

                        <Route path = "cantractors"element = { < CantractorList /> }/>
                        <Route path = "add-cantractor"element = { < AddCantractor /> }/> 
                        
                        

        </Route>
            { /*  Routes admin */ }

            { /* Staff  Routes */ } 
        <Route path = "/userdashboard"
                        element = { <StaffElement> { /* <Layout /> */ } 
                        <Route index element = { < StaffDashboard />} /> 
                            </StaffElement > }>
                        <Route index element = {< StaffDashboard />}/>   

                        <Route path = "updateprofile"element = { < UpdateUserProfile /> }/> 

                        {/* CashAdvance */}
                        <Route path = "cashadvance"element = { < CashAdvanceList /> }/> 
                        <Route path = "edit-cashadvance/:id"element = { < EditCashAdvance /> }/> 
                        <Route path = "chashadvanceform"element = { < ChashadvanceForm /> }/> 

                         {/* Retirement */}
                        <Route path = "retirementform"element = { < RetirementForm /> }/> 
                        <Route path = "retirementvoucher"element = { < StaffRetirement /> }/> 

                        
        </Route>
            { /* Staff Routes  */ } 


            { /* Audit  Routes */ } 
        <Route path = "/auditdashboard"
                        element = { <AuditEelement> { /* <Layout /> */ } 
                        <Route index element = { < AuditDashboard />} /> 
                            </AuditEelement > }>
                        <Route index element = {< AuditDashboard />}/>   
                        <Route path = "updateprofile"element = { < UpdateUserProfile /> }/>                 
                        <Route path = "cashadvance"element = { < AuditCashAdvanceList /> }/> 
                        <Route path = "approve-cashadvance/:id"element = { < ApproveCashAdvance /> }/> 
                        <Route path = "chashadvanceform"element = { < ChashadvanceForm /> }/> 
                        <Route path = "retirementform"element = { < RetirementForm /> }/> 
                        <Route path = "retirementvoucher"element = { < StaffRetirement /> }/> 
                        

        </Route>
            { /* Portal Routes admin */ } 

      </Routes>
    </BrowserRouter>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        // hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // toastClassName="bg-gradient-to-r to-purple-800 from-pink-700"        
        // bodyClassName="text-white "
      />
   </div>
  )
}

export default App
