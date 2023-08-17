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



const Adminlogin = ()  => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    let [RefreshToken, setRefreshToken]= useState(null)
    let [authAccess, setAuthAccess]= useState(null)
    let [user, setUser]= useState(null)

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
    const loginUser = async (e) => {
        e.preventDefault()
        const url = baseURL + /token/;
        const response = await fetch(url,  {
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                'email':e.target.email.value, 'password':e.target.password.value
            })
        })
        let data = await response.json();
        // console.log(data);
        if (response.status === 200) {
          setRefreshToken(data.refresh)
          setAuthAccess(data.access)          
          localStorage.setItem("authToken", (data.refresh));
          localStorage.setItem("authAccess", (data.access));
          navigate("/dashboard");
        }else {
          console.log('Error Loging in');
        }

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

                                className="border rounded-lg px-3 py-2 mt-1 text-sm w-full" />
                                <span className="pb-2 mb-2 text-sm text-red-600">

                                </span>
                            </div>
                            <div className="mb-5">
                                <label className="font-semibold text-sm text-black pb-1 block">
                                Password
                                </label>
                                <input
                                type="password"
                                name="password"
                                

                                className="border rounded-lg px-3 py-2 mt-1  text-sm w-full" />
                                <span className="pb-2 mb-2 text-sm text-red-600">

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
                            <NavLink to="/chashadvance"> 
                                <button className="flex items-center text-center justify-center transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-100 hover:bg-gray-100 hover:text-black focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                <FaWpforms size='1.0rem' className='text-yellow-400 text-center justify-center'/>
                                <span className="inline-block ml-1 hover:text-black">Chash Advance</span>
                                </button>
                            </NavLink>
                            </div>
                            <div className="text-center sm:text-right whitespace-nowrap">
                        <NavLink to="/retirementvoucher"> 
                            <button className="flex items-center text-center justify-center transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg  text-gray-100 hover:bg-gray-100 hover:text-black focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                            <FaWpforms size='1.0rem' className='text-red-600 text-center justify-center'/>
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
  
  export default Adminlogin;