/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import RNALogo from '../../assets/images/logo1.png';

import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {baseURL} from '../../baseurl'
import { data } from 'autoprefixer';
import jwtDecode from "jwt-decode";
import { BiSolidChevronDown,BiSolidChevronUp } from 'react-icons/bi';
import { TbPoint } from 'react-icons/tb';
import { LiaFileInvoiceSolid } from 'react-icons/lia';
import { GiTakeMyMoney } from 'react-icons/gi';
import { FaUsersCog,FaAddressBook  } from "react-icons/fa";
import { HiOutlineUsers, HiOutlineCash  } from "react-icons/hi";



const NavBa = () => {
  const [activeSidebar, setActiveSidebar] = useState(null);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
   const navigate = useNavigate();
   const [isOpen, setIsOpen] = useState(false);
      const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };
  const [retirementOpen, setRetirementOpen] = useState(false);
      const retirementDropdown = () => {
        setRetirementOpen(!retirementOpen);
    };
    const [openCashoffice, setOpenCashoffice] = useState(false);
      const cashofficeDropdown = () => {
        setOpenCashoffice(!openCashoffice);
    };


  const [openInvoice, setOpenInvoice] = useState(false);
  const invoiceDropdown = () => {
    setOpenInvoice(!openInvoice);
  };


  const handleSidebarClick = (sidebar) => {
    setActiveSidebar(sidebar);
    setIsDropdownActive(true);
  };

  const handleSidebarLeave = () => {
    setActiveSidebar(null);
    setIsDropdownActive(false);
  };
  const [navbar, setNavbar] = useState(false); 
  const [status, setStatus] = useState(false);
  const [profile, setProfile]= useState();
  const [profileImage, setProfileImage]= useState()
  const [userinfo, setUserinfo] = useState([]);

  let [RefreshToken, setAuthToken]= useState(null)
  let [authAccess, setAuthAccess]= useState(null)
 

  useEffect(() => {
    const storedRole = localStorage.getItem('authToken');
    if (storedRole){
      const decode = jwtDecode(storedRole)      
      var first_name = decode.first_name
 
    }
    // console.log(first_name)
    setUserinfo(first_name)
  
  }, []);  

  useEffect( () => {     
    // console.log(token)    
     
     const url = baseURL +`/profile/view/`; 
     const token = localStorage.getItem('authAccess');   
  fetch(url, {     
            
     headers: {
       "Content-Type":"application/json",
       'Authorization': `Bearer ${token}`,
     },
   })
   

   .then((response)=>{    
     if (response.status === 200){
       return response.json();   
     }else if(response.statusText === 'Unauthorized'){
       setAuthToken(null)
       setAuthAccess(null) 
       localStorage.removeItem("authToken", (data.refresh));
       localStorage.removeItem("authAccess", (data.access));
       navigate("/");
     }   
           
   
        
   })
   .then((data)=>{
     setProfile(data.fi);
     setProfileImage(data.profile);
     setStatus(data.verified);
     // console.log(data.fullname);  
   })
   
     
}, []);


const logoutSubmit = () => {
  setAuthToken(null)
  setAuthAccess(null) 
  localStorage.removeItem("authToken", (data.refresh));
  localStorage.removeItem("authAccess", (data.access));
  navigate("/");
  
}

  return (
    <>
    
       <div>
      <nav className="bg-white shadow-md  fixed z-30 w-full">
        <div className="px-3 lg:px-5 lg:pl-1">
          <div className="flex  justify-between">
          <div className="flex items-center justify-start">
              <button
                onClick={() => setNavbar(!navbar)}
                id="toggleSidebarMobile"
                aria-expanded="true"
                aria-controls="sidebar"
                className=" mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
              <Link
                to="/"
                className="text-xl no-underline font-bold flex items-center lg:ml-2.5"
              >
                {/* logo */}
               
              </Link>
           
            </div>
            <div className="flex items-center">
              <button
                
                id="toggleSidebarMobileSearch"
                type="button"
                className="lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100  rounded-lg"
              >
               
              </button>
             
              <Link
                to="#"
                className="hidden no-underline sm:inline-flex ml-5 text-black  focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3"
              >
              <span className="px-2">Welcome {userinfo} </span>
                <div className="border-b-2 shadow-2xl shadow-gray-600 rounded-full">
                 
                <div className="flex items-center">
                  {profileImage && (
                    <img
                      src={profileImage}
                      alt="Image"
                      className="h-12 w-12 rounded-full shadow-none "
                    />
                  )}
                
                </div>
                </div>
              </Link>
              <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-sm hover:bg-pink-600 cursor-pointer">
                <button
                  type="button"
                  onClick={logoutSubmit}
                  className=" py-0.5 px-2 text-white text-center font-medium text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="shadow-md border-1 ">
        <aside
          id="sidebar"
          className={`fixed block z-40 bg-white h-full top-0 left-0 pt-0 lg:flex flex-shrink-0 flex-col w-[257px] transition-width duration-75 " aria-label="Sidebar "
          ${navbar ? "block" : "hidden"}`}
        >
          <div className=" flex-1 flex flex-col lg:min-h-0 min-h-screen shodow-md border-gray-200 pt-0">
            <div className="flex-1 flex h-full flex-col  pb-2 overflow-y-auto">
                {/* Admin Side bar */}
                <div className="flex  h-[73px]  items-center justify-start shadow-md  ">
                <button
                onClick={() => setNavbar(!navbar)}
                  id="toggleSidebarMobile"
                  aria-expanded="true"
                  aria-controls="sidebar"
                  className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2  focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
                >
                {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 hover:fill-gray-100"
                      viewBox="0 0 20 20"
                      fill="currentColor" 
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
             )}
                </button>
                <Link
                  to="/"
                  className="text-md no-underline font-bold flex items-center lg:ml-2.5"
                >              
                  
                  <img src={RNALogo} className="mr-2 w-[50px]" alt="Windster Logo" />
                  <span className="text-black">Accounting System</span>
                
                </Link>
              
                </div>
                <div className="bg-white flex-1 h-full shadow-inner  px-3 bg-gray">
                  <ul className="space-y-1 pb-2">
                                         
                    <li>
                      <NavLink
                        to="/dashboard"
                        className="text-base mt-4 no-underline hover:text-gray-900 text-gray-600 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                      >
                        <svg
                          className="w-6 h-6 text-gray-600 group-hover:text-black transition duration-75"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path> 
                        </svg>
                        <span className={`${status  ? 'ml-3 hover:text-gray-900 ' : 'hover:text-gray-900  ml-3 pointer-events-none'}`}>Dashboard</span>
                      </NavLink>
                    </li>
                  
                    <li>
                        {
                              status ? (
                                <NavLink                            
                                to= "/dashboard/users"
                                onClick={() => handleSidebarClick('user')}
                                className="text-base no-underline hover:text-gray-900 text-black   font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                                
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6 flex-shrink-0  text-black   group-hover:text-gray-900 transition duration-75"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                                  />
                                </svg>

                                <span className={`${status  ? 'ml-3 hover:text-gray-900 text-black   flex-1 whitespace-nowrap' : 'hover:text-gray-900  text-black ml-3'}`}>
                                Users
                                </span>
                              </NavLink>
                              ) : 
                              ( 
                                // disabled menu
                                <Link  
                                to="/dashboard/users"    
                                onClick={() => handleSidebarClick('user')}                   
                                className="text-base no-underline text-gray-600 hover:text-black  font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                                
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6 text-gray-600 flex-shrink-0 group-hover:text-black  transition duration-75"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                                  />
                                </svg>

                                <span className={`${status  ? 'ml-3  flex-1 whitespace-nowrap' : ' hover:text-gray-900 ml-3'}`}>
                                Users
                                </span>
                              </Link>
                              )
                        }
                    </li>
                    <li>
                        {
                              status ? (
                                <NavLink                            
                                to= "/dashboard/cantractors"
                                onClick={() => handleSidebarClick('user')}
                                className="text-base no-underline hover:text-gray-900 text-black   font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                                
                              >
                                <HiOutlineUsers  className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-600 transition duration-75"/>

                                <span className={`${status  ? 'ml-3 hover:text-gray-900 text-black   flex-1 whitespace-nowrap' : 'hover:text-gray-900  text-black ml-3'}`}>
                                Contractors
                                </span>
                              </NavLink>
                              ) : 
                              ( 
                                // disabled menu
                                <Link  
                                to="/dashboard/users"    
                                onClick={() => handleSidebarClick('user')}                   
                                className="text-base no-underline text-gray-600 hover:text-black  font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                                
                              >
                                <HiOutlineUsers  className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-600 transition duration-75"/>

                                <span className={`${status  ? 'ml-3  flex-1 whitespace-nowrap' : ' hover:text-gray-900 ml-3'}`}>
                                Contractors
                                </span>
                              </Link>
                              )
                        }
                    </li>
                                      

                     {/* Cash Office Operation */}

                     <div  
                    
                         onClick={() => handleSidebarClick('cash_office')}
                        >
                          
                    <li>
                      <Link
                        to="#"
                      
                     
                        className={`${ activeSidebar === 'cash_office' ? 'text-base no-underline text-gray-600 hover:text-black  font-normal rounded-lg bg-gray-200 flex items-center p-2 group'
                        : 
                        'text-base no-underline text-gray-600 hover:text-black  font-normal rounded-lg hover:bg-gray-200 flex items-center p-2 group' }`}
                      >
                        {activeSidebar === 'cash_office' ?<GiTakeMyMoney className="w-6 h-6 text-gray-800 flex-shrink-0 group-hover:text-gray-800 transition duration-75"/>:
                          <GiTakeMyMoney className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-600 transition duration-75"/>
                        }
                      
                        <span className="ml-3 flex-1 whitespace-nowrap hover:text-black"
                          
                        >
                        Cash Office
                        </span>
                        
                        {openInvoice ===true  ? <BiSolidChevronUp size='1.2rem' className='text-gray-600 hover:text-black'/> : 
                           <BiSolidChevronDown size='1.2rem' className='text-gray-600 hover:text-black'/>
                        }
                       
                                           
                      </Link>
                      {activeSidebar === 'cash_office' && isDropdownActive && (
                      <li className=' ml-2 bg-opacity-1 '>
                        <ul className="  pl-5 pt-1 mx-1  h-auto w-auto">
                          
                            <li  className= "p-1   hover:bg-gray-300 text-gray-600 hover:text-black rounded-md ">
                               <NavLink to='capital' className='flex '> <TbPoint size='1rem' className='flex pt-1 '/>Capital
                               </NavLink>
                            </li>
                            <li  className=" p-1   hover:bg-gray-300 text-gray-600 hover:text-black rounded-md ">
                            
                               <Link to='over-head' className='flex '> <TbPoint size='1rem' className='flex pt-1 '/> Overhead 
                               </Link>
                            </li>
                            
                            <li className="p-1   hover:bg-gray-300 text-gray-600 hover:text-black rounded-md "> 
                            <Link to='commerial' className='flex '> <TbPoint size='1rem' className='flex pt-1 '/> Commercial/IGR
                               </Link> 
                            </li>
                        
                           
                        </ul>
                      </li>
                     )}
                    </li>
                    </div>
                     {/* Cash Office Operation End */}

                      {/* Invoicing */}
                    <div  
                   
                        onClick={() => handleSidebarClick('invoicing')}
                        >
                         
                  
                    <li>
                      <Link
                        to="#"
                       
                        className={`${ activeSidebar === 'invoicing' ? 'text-base no-underline text-gray-600 hover:text-black  font-normal rounded-lg bg-gray-200 flex items-center p-2 group'
                        : 
                        'text-base no-underline text-gray-600 hover:text-black  font-normal rounded-lg hover:bg-gray-200 flex items-center p-2 group' }`}
                      >
                         {activeSidebar === 'invoicing' ?<LiaFileInvoiceSolid className="w-6 h-6 text-gray-600 flex-shrink-0 group-gray:text-yellow-600 transition duration-75"/>:
                          <LiaFileInvoiceSolid className="w-6 h-6 text-gray-600 flex-shrink-0 group-hover:text-gray-600  transition duration-75"/>
                        }
                        
                      

                        <span className="ml-3 flex-1 whitespace-nowrap hover:text-black">
                          Invoicing
                        </span>
                        {openInvoice ===true ? <BiSolidChevronUp size='1.2rem' className='text-gray-600 hover:text-black'/> : 
                           <BiSolidChevronDown size='1.2rem' className='text-gray-600 hover:text-black'/>
                        }
                       

                    
                      </Link>
                      {activeSidebar === 'invoicing' && isDropdownActive && (
                      <li className=' ml-2 bg-opacity-1 '>
                        <ul className="  pl-4 pt-1 mx-1  h-auto w-auto">
                          
                            <li  className="p-1   hover:bg-gray-300 text-gray-600 hover:text-black rounded-md ">
                               <NavLink to='cashadvance-list' className='flex '> <TbPoint size='1rem' className='flex pt-1 '/>  Payment Voucher
                               </NavLink>
                            </li>
                            <li  className=" p-1   hover:bg-gray-300 text-gray-600 hover:text-black rounded-md ">
                            
                               <Link to='cantractor-payment' className='flex '> <TbPoint size='1rem' className='flex pt-1 '/>Contract Payment
                               </Link>
                            </li>
                            
                            <li className="p-1   hover:bg-gray-300 text-gray-600 hover:text-black rounded-md "> 
                            <Link to='paid-cashadvance' className='flex '> <TbPoint size='1rem' className='flex pt-1 '/>Staff Claims
                               </Link> 
                            </li>
                        
                           
                        </ul>
                      </li>
                     )}
                    </li>
                    </div>
                     {/* Invoicing End */}

                    <li>
                      <Link
                        to="#"
                        onClick={() => handleSidebarClick('advance')}
                        className="text-base no-underlinetext-gray-600 hover:text-black  font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                      >
                       <HiOutlineCash className="w-6 h-6 text-gray-600 flex-shrink-0 group-hover:text-gray-600  transition duration-75" />

                        <span className="ml-3 flex-1 whitespace-nowrap hover:text-black">
                          Advance
                        </span>
                        {isOpen ===true ? <BiSolidChevronUp size='1.2rem' className='ttext-gray-600 hover:text-black'/> : 
                           <BiSolidChevronDown size='1.2rem' className='ttext-gray-600 hover:text-black'/>
                        }
                       

                    
                      </Link>
                      {activeSidebar === 'advance' && isDropdownActive && (
                      <li className=' ml-2 bg-opacity-1 '>
                        <ul className=" pl-4 pt-1 mx-1  h-auto w-auto">
                          
                            <li  className="p-1   hover:bg-gray-300 text-gray-600 hover:text-black rounded-md ">
                               <NavLink to='cashadvance-list' className='flex '> <TbPoint size='1rem' className='flex pt-1 '/>Cash Advance
                               </NavLink>
                            </li>
                            <li  className=" p-1   hover:bg-gray-300 text-gray-600 hover:text-black rounded-md ">
                            
                               <Link to='audited-cashadvance' className='flex '> <TbPoint size='1rem' className='flex pt-1 '/>Rent Advance 
                               </Link>
                            </li>                            
                            
                            <li  className="p-1  hover:bg-gray-300 text-gray-600 hover:text-black rounded-md ">
                               <NavLink to='all-retirement' className='flex '> <TbPoint size='1rem' className='flex pt-1  '/>Retirement Vouchers
                               </NavLink>
                            </li>
                            <li className="p-1   hover:bg-gray-300 text-gray-600 hover:text-black rounded-md "> 
                            <Link to='paid-cashadvance' className='flex '> <TbPoint size='1rem' className='flex pt-1 '/>   Others Advance 
                               </Link> 
                            </li>
                           
                        </ul>
                      </li>
                     )}
                    </li>
                    {/* <li>
                      <Link
                        to="#"
                        onClick={() => handleSidebarClick('retirement')}
                        className="text-base no-underline text-gray-600 hover:text-black  font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                      >
                         <svg
                          className="w-6 h-6 text-gray-600 flex-shrink-0 group-hover:text-black transition duration-75"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                          <path
                            fill-rule="evenodd"
                            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>

                        <span className="ml-3 flex-1 whitespace-nowrap hover:text-black">
                        Retirement
                        </span>
                        {retirementOpen ===true ? <BiSolidChevronUp size='1.2rem' className='text-gray-600 hover:text-black'/> : 
                           <BiSolidChevronDown size='1.2rem' className='text-gray-600 hover:text-black'/>
                        }
                       

                    
                      </Link>
                      {activeSidebar === 'retirement' && isDropdownActive &&  (
                      <li className=' ml-2 bg-opacity-1 '>
                        <ul className=" pl-5 pt-1 mx-1  h-auto w-auto">
                          
                            <li  className="p-1  hover:bg-gray-300 text-gray-600 hover:text-black rounded-md ">
                               <NavLink to='all-retirement' className='flex '> <TbPoint size='1rem' className='flex pt-1  '/>Retirement Vouchers
                               </NavLink>
                            </li>
                            <li  className=" p-1   hover:bg-gray-300 text-gray-600 hover:text-black rounded-md ">
                            
                               <Link to='audited-cashadvance' className='flex '> <TbPoint size='1rem' className='flex pt-1 '/>Audited Retirement
                               </Link>
                            </li>
                            
                            <li className="p-1   hover:bg-gray-300 text-gray-600 hover:text-black rounded-md "> 
                            <Link to='paid-cashadvance' className='flex '> <TbPoint size='1rem' className='flex pt-1 '/>   Approved Retirement
                               </Link> 
                            </li>
                        
                           
                        </ul>
                      </li>
                     )}
                    </li>                  */}
                    
                    <li>
                      <Link
                        to="#"
                        onClick={() => handleSidebarClick('bootkeeping')}
                        className="ml-[2px] text-base no-underline text-gray-600 hover:text-black  font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                      >
                        <svg
                          className="w-6 h-6text-gray-600 flex-shrink-0 group-hover:text-black transition duration-75"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                          />
                        </svg>

                        <span className="ml-3 flex-1 whitespace-nowrap hover:text-black">
                        Book Keeping 
                        </span>
                        {retirementOpen ===true ? <BiSolidChevronUp size='1.2rem' className='text-gray-600 hover:text-black'/> : 
                           <BiSolidChevronDown size='1.2rem' className='text-gray-600 hover:text-black'/>
                        }
                       

                    
                      </Link>
                      {activeSidebar === 'bootkeeping' && isDropdownActive &&  (
                      <li className=' ml-2 bg-opacity-1 '>
                        <ul className="pl-5 pt-1 mx-1  h-auto w-auto">
                          
                            <li  className="p-1  hover:bg-gray-300 text-gray-600 hover:text-black rounded-md ">
                               <NavLink to='all-retirement' className='flex '> <TbPoint size='1rem' className='flex pt-1  '/>General ledger
                               </NavLink>
                            </li>
                            <li  className=" p-1   hover:bg-gray-300 text-gray-600 hover:text-black rounded-md ">
                            
                               <Link to='audited-cashadvance' className='flex '> <TbPoint size='1rem' className='flex pt-1 '/>Traial Balance
                               </Link>
                            </li>
                            
                            <li className="p-1   hover:bg-gray-300 text-gray-600 hover:text-black rounded-md "> 
                            <Link to='paid-cashadvance' className='flex '> <TbPoint size='1rem' className='flex pt-1 '/>   Financial Balance
                               </Link> 
                            </li>
                        
                           
                        </ul>
                      </li>
                     )}
                    </li> 
                    
                                   

                   

                    {/* Profile */}
                    <li>
                      <Link
                        to="#"
                        className="text-base no-underline text-gray-600 hover:text-black font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                      >
                        <svg
                          className="w-6 h-6 text-gray-600flex-shrink-0 group-hover:text-black transition duration-75"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span className="ml-3 flex-1 whitespace-nowrap">
                          Profile
                        </span>
                      </Link>
                    </li>
                    {/* Profile End */}

                  </ul>
                      {/* Report */}
                  <div className="">
                 
                  </div>

                </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
    </>
  );
};


export default NavBa;