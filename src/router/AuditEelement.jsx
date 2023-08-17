/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet } from 'react-router-dom'
import AuditNavBar  from '../components/portal-shared/AuditNavBar'
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react'
import jwtDecode from "jwt-decode";

import {baseURL} from "../baseurl.jsx"
const StaffEelement = () =>{

   let [RefreshToken, setAuthToken]= useState(null)
   let [authAccess, setAuthAccess]= useState(null)

   const navigate  = useNavigate();
   useEffect(() => {
         if(!localStorage.getItem('authToken')){
            navigate("/login");
         }
       
   })

   let updateToken = async () => {
      // console.log('UpdateToken')
      const url = baseURL + /refresh/;
      const authToken =  localStorage.getItem("authToken");
        const response = await fetch(url,  {  
            method: 'POST',          
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                'refresh' :authToken
            })          
         })
         const data = await response.json()
         if (response.status === 200){        
            setAuthToken(data.refresh)
            setAuthAccess(data.access)          
            localStorage.setItem("authToken", (data.refresh));
            localStorage.setItem("authAccess", (data.access));
        }else{
            setAuthToken(null)
            setAuthAccess(null)          
            localStorage.removeItem("authToken", (data.refresh));
            localStorage.removeItem("authAccess", (data.access));
            navigate("/login");
        }
        
}

useEffect(()=>{
  let fourMinutes = 1000 * 60 *5
  let interval = setInterval(()=>{
       setAuthToken(null)
      if(localStorage.getItem('authToken')){
         updateToken()
      }
   }, fourMinutes)
   return ()=> clearInterval(interval)
},[] )

const [isAdmin, setIsAdmin] = useState(false);

useEffect(() => {
   const storedRole = localStorage.getItem('authToken');
   if (storedRole){
     const decode = jwtDecode(storedRole)
     var user_id = decode.user_id            
     var email = decode.email
     var role = decode.role

   }
   setIsAdmin(role ==='audit')
 
 }, []);   

return(
   isAdmin ?
      <div>
 {/* NavBar  */}
 <AuditNavBar />

<div className="flex overflow-hidden bg-white  pt-12">

<div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
<div id="main-content" className="h-full w-full bg-white relative overflow-y-auto lg:ml-64">
      
       <Outlet/> 

       <footer className="bg-white">
       <p className="text-center text-sm text-gray-500 my-10">
         &copy; 2023 <NavLink to="#" className="hover:underline" target="_blank">Company</NavLink>. All rights reserved.
      </p>


   {/* <ul className="flex items-center flex-wrap mb-6 md:mb-0">
     
      <li><NavLink to="#" className="text-sm no-underline font-normal text-gray-500 hover:underline">Contact</NavLink></li>
   </ul>
   <div className="flex sm:justify-center space-x-6">
      <NavLink to="#" className="text-gray-500 hover:text-gray-900">
         
      </NavLink>
   
      <NavLink to="#" className="text-gray-500 hover:text-gray-900">
         <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
         </svg>
      </NavLink>
      <NavLink to="#" className="text-gray-500 hover:text-gray-900">
        
      </NavLink>
      <NavLink to="#" className="text-gray-500 hover:text-gray-900">
         
      </NavLink>
   </div> */}
</footer>

</div>
</div>
      
</div>
 : 
 <div>You are not authorized</div>      
      
)  
}
export default  StaffEelement;
