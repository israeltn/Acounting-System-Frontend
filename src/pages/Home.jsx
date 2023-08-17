/* eslint-disable @typescript-eslint/no-unused-vars */
// import FeatureImg from '../assets/images/saving.png';
import { NavLink } from "react-router-dom";
import { FaWpforms } from 'react-icons/fa';
import RNALogo from '../assets/images/Logo1.png';
import login from '../assets/images/Accountant-amico.svg';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {baseURL} from "../baseurl"
import jwtDecode from "jwt-decode";
import { toast } from 'react-toastify';



const Home = ()  => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(false);
    let [RefreshToken, setRefreshToken]= useState(null)
    let [authAccess, setAuthAccess]= useState(null)
    let [user, setUser]= useState(null)

    const [loginInput, setLogin] = useState({  
        email: "",
        password: "",
        error_list: [],
      });

    useEffect(() => {
        const storedRole = localStorage.getItem('authToken');
        if (storedRole){
          const decode = jwtDecode(storedRole)
          var user_id = decode.user_id            
          var email = decode.email
          var role = decode.role
     
        }
        setIsAdmin(role ==='staff')
      
      }, []); 
      
      
      const handleInput = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
      };

 
        
     
    const loginUser = async (e) => {
        e.preventDefault();
        
        
        const formdata = {         
          
          email: loginInput.email,          
          password: loginInput.password,
        };
        setLoading(true);

        const url = baseURL + /token/;
        const response = await fetch(url,  {
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(formdata),
        })
        let data = await response.json();
        // console.log(data);
        if (response.status === 200) {
          setRefreshToken(data.refresh)
          setAuthAccess(data.access)          
          localStorage.setItem("authToken", (data.refresh));
          localStorage.setItem("authAccess", (data.access)); 

        const token = localStorage.getItem('authAccess');    
                if (token) {
                const decodedToken = jwtDecode(token);
                const userRole = decodedToken.role;
                if (userRole === 'admin') {
                    toast.success('Login Successful!');
                    navigate("/dashboard");
                } else if (userRole === 'staff') {
                    toast.success('Login Successful!');
                    navigate("/userdashboard");
                }
                else if (userRole === 'audit') {
                  toast.success('Login Successful!');
                  navigate("/auditdashboard");
              }
                
                 }
                 
                 setLoading(false);
         
        }else {
        //   console.log('Error Loging in');
        toast.error(data.detail);
          setLogin({
            ...loginInput,
            error_list: data,           
          });
          setLoading(false);
        }

    }
  
    
    if (loading) {
        return (
          <div className="text-center max-w-screen-xl max-h-screen-[72] mx-auto justify-center items-center ">
            <div role="status" className="mt-[20rem]">
              <svg
                aria-hidden="true"
                className="inline w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        );
      }

    return (
<>
<div className="md:overflow-hidden h-full w-full" >
     <div className="flex w-auto h-screen  justify-center items-center space-x-4 bg-gradient-to-r from-purple-800 to-pink-700">
         <div className='flex w-full  justify-center items-center h-full '>
            <div className="flex flex-wrap md:w-[75%] w-[97%]  h-[90%] ">
                    <div className="md:w-1/2 w-auto flex h-full justify-center items-center ">

                    <div className="md:pt-12 pt-2 justify-center items-center mx-auto w-auto md:w-full lg:max-w-md  md:max-w-md md:px-0 px-4">

                        <NavLink
                        to="/"
                        className="text-xl font-bold justify-center flex items-center px-3"
                        >

                        <img src={RNALogo} className="justify-center w-[100px] flex items-center mb-2"
                            alt="Windster Logo" />

                        </NavLink>

                        <div className="justify-center uppercase mb-2 items-center text-gray-200 text-xl text-center w-auto font-bold">
                        <span className="text-green-500"> </span> Accounting System
                        </div>
                       
                        <div className=" shadow border-2 border-gray-400 w-full rounded-md">
                        <form onSubmit={loginUser} className='text-white'>
                        <div className="justify-center items-center text-xl text-center w-auto font-bold pt-2">
                        Login
                        </div>
                            <div className="px-5 py-3 justify-center item-center text-black">
                            <div className="mb-5 ">
                                <label className="font-semibold text-sm text-black pb-1 block">
                                E-mail
                                </label>
                                <input
                                type="text"
                                name="email" 
                                onChange={handleInput}
                                value={loginInput.email}                                

                                className="border rounded-lg px-3 py-2 mt-1 text-sm w-full" />
                                <span className="pb-2 mb-2 text-sm text-red-400">
                                    {loginInput.error_list.email}
                                </span>
                            </div>
                            <div className="mb-5">
                                <label className="font-semibold text-sm text-black pb-1 block">
                                Password
                                </label>
                                <input
                                type="password"
                                name="password"
                                onChange={handleInput}
                                value={loginInput.password} 

                                className="border rounded-lg px-3 py-2 mt-1  text-sm w-full" />
                                <span className="pb-2 mb-2 text-sm text-red-400">
                                    {loginInput.error_list.password}
                                </span>
                                
                                
                            </div>
                            <div className="item-center justify-center flex">

                                <button
                                    type="submit"

                                    className="transition w-full duration-200 bg-purple-900 hover:bg-gray-600  focus:ring-opacity-50 text-white py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                                >
                                    <span className="inline-block mr-2">

                                    </span>

                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-4 h-4 inline-block"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                   <span> login</span>
                                </button> 
                                </div>
                            </div>
                        </form>
                        <div className="text-center text-white hover:text-black">
                            <NavLink to="/register">Don't have an account</NavLink>
                        </div>

                        <div className="py-5">
                            <div className="grid grid-cols-2 gap-1">
                            <div className="text-center justify-center sm:text-left whitespace-nowrap">
                            <NavLink to="/Adminlogin"> 
                                <button className="flex items-center text-center justify-center transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-100 hover:bg-gray-100 hover:text-black focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                <FaWpforms size='1.0rem' className='text-yellow-400 text-center justify-center'/>
                                <span className="inline-block ml-1 hover:text-black">Chash Advance</span>
                                </button>
                            </NavLink>
                            </div>
                            <div className="text-center sm:text-right whitespace-nowrap">
                        <NavLink to="/retirementvoucher"> 
                            <button className="flex items-center text-center justify-center transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg  text-gray-100 hover:bg-gray-100 hover:text-black focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                            <FaWpforms size='1.0rem' className='text-red-400 text-center justify-center'/>
                                <span className="inline-block ml-1 hover:text-black">Retirement Voucher</span>
                            </button>
                        </NavLink>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="py-5">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-center sm:text-left whitespace-nowrap">
                            <button className="transition duration-200 mx-5 px-5 py-2 cursor-pointer font-normal text-sm rounded-lg text-red-500 hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-4 h-4 inline-block align-text-top"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <NavLink
                                to="/"
                                className="inline-block text-gray-200 hover:text-gray-800 font-medium ml-1"
                                >
                                FRCN Official Website
                                </NavLink>
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>

                    </div>
                    <div className="justify-center items-center w-1/2 hidden md:flex h-full ">
                    {/* from-cyan-500 from-10% via-cyan-500 via-30% to-cyan-800 to-10% */}
                    <div className="items-center justify-center">
                        
                        <div className="flex py-8 items-center justify-center ">
                        <img src={login} className="justify-center flex items-center mt-20 h-[25rem]" alt="Windster Logo" />
                        </div>

                    </div>
                    </div>
            </div>
         
        </div>
     </div>
       
                    {/* End Loan Section */}
</div>
</>
    );
  };
  
  export default Home;