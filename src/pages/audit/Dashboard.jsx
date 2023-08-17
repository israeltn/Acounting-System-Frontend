/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

// import Charts from "../../components/portal-shared/Charts";
// import PieChart from "../../components/portal-shared/PieChart";
import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import {baseURL,imgURL } from "../../baseurl"
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { TbCurrencyNaira } from 'react-icons/tb'; 


const Dashboard = () => {  
  
  const [loading, setLoading] = useState(true);
  const url = baseURL +`/account-cashadvance/`;
  // const urlimg = imgURL;  

  const token = localStorage.getItem('authAccess'); 
  const [viewUsers, setviewUsers] = useState([]); 
    const [previousUrl, setpreviousUrl] = useState();
    const [nextUrl, setnextUrl] = useState();
    const [count, setcount] = useState();
  // const [verified, setVerified] = useState(false);

  const ApprovalButton = ({ isApproved }) => {
    const getButtonStyle = () => {
      if (isApproved === 'processing') {
        return 'bg-red-200';
      } else if (isApproved === 'manager') {
        return 'bg-yellow-300';
      } else if (isApproved === 'account') {
        return 'bg-green-200';
      }else if (isApproved === 'audit') {
        return 'bg-green-200';
      } else if (isApproved === 'paid') {
        return 'bg-green-500';
      } 
      else {
        return '';
      }
    };
    const getButtonText = () => {
      if (isApproved === 'processing') {
        return 'In Review';
      } else if (isApproved === 'manager') {
        return 'Manger Approved';
        
      }  else if (isApproved === 'account') {
        return 'Reviewed by Account';
        
      }  else if (isApproved === 'audit') {
        return 'Reviewed by Audit';
      } else if (isApproved === 'paid') {
        return 'Payment Processed';
        
      } 
      else {
        return '';
      }
    };
          
    return (     
      <> <span
        className={`px-2 inline-flex text-xs leading-5
            font-semibold rounded-sm  text-gray-800 ${getButtonStyle()}`}>
                {getButtonText()}
          </span>
              
    </>
    )
  };

  
  useEffect(() => {
    fetch(url,{
      headers: {
        "Content-Type":"application/json",
        'Authorization': `Bearer ${token}`,
      },        
    })
    

    .then((response)=>{
      return response.json();
    })

    .then((data)=>{
      // console.log(data.role)
      setviewUsers(data.results);  
      setpreviousUrl(data.previous)
      setnextUrl(data.next)
      setcount(data.count)   
         
         
      setLoading(false);
    
    })
    .catch(error => {
      console.log(error);
      setLoading(false);
    });
    
    
  }, []);

  const handlePageChange = async (url) => {
    try {
      const response = await fetch(url,{
        headers: {
          "Content-Type":"application/json",
          'Authorization': `Bearer ${token}`,
        },        
      })
      const data = await response.json();      
      setpreviousUrl(data.previous)
      setnextUrl(data.next)
      setviewUsers(data.results);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <main>
        <div className="py-6 px-4 bg-gray-100">
        <div className="mt-4 w-full  grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {/* Total section */}
                <div className="shadow bg-gradient-to-r from-pink-400 to-pink-800  border-b-1 rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <div className="flex justify-between space-x-4 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-14 h-14 stroke-white"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                      />
                    </svg>

                    <div className="flex-shrink-0">
                      <span className="text-2xl sm:text-3xl leading-none font-bold text-white">
                        {/* {totalauthors} */} 30
                      </span>
                      <h3 className="text-base font-normal text-white">
                        Total Reviwed Cash Advance{" "}
                      </h3>
                    </div>
                    <div className="ml-1 w-auto flex items-center justify-end flex-1 text-white text-base font-bold">
                     
                      {/* <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg> */}
                    </div>
                  </div>
                </div>
                <div className="shadow bg-gradient-to-r from-purple-600 to-purple-800 border-b-1  rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <div className="flex items-center justify-between space-x-4">
                    <svg
                      className="w-14 h-14 stroke-white text-gray-500 flex-shrink-0 group-hover:text-red-600 transition duration-75"
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
                    <div className="flex-shrink-0">
                      <span className="text-2xl sm:text-3xl leading-none font-bold text-white">
                        {/* {totalabstracts} */} 31
                      </span>
                      <h3 className="text-base font-normal text-white">
                        {" "}
                        Total Audited Cash Advance 
                      </h3>
                    </div>
                    <div className="ml-5 w-0 flex items-center justify-end flex-1 text-white text-base font-bold ">
                     
                      <TbCurrencyNaira className="text-xl text-center"/>
                      450,000

                     
                    </div>
                  </div>
                </div>
                <div className="shadow bg-gradient-to-r from-sky-600 to-sky-800 border-b-1   rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <div className="flex items-cente justify-between space-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-14 h-14 stroke-white"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                      />
                    </svg>

                    <div className="flex-shrink-0">
                      <span className="text-2xl sm:text-3xl leading-none font-bold text-white ">
                        {/* {totalparticipant} */} 9
                      </span>
                      <h3 className="text-base font-normal text-white ">
                        Total Cash Advance Retired
                      </h3>
                    </div>
                    <div className="ml-5 w-0 flex items-center justify-end flex-1 text-white  text-base font-bold">
                      
                      <TbCurrencyNaira className="text-xl text-center"/>
                      450,000
                    </div>
                  </div>
                </div>
        </div>
                       
          
              <div className="grid grid-cols-1 ">
              <div className="my-1">
    <div className="flex  mx-3 flex-col">
                <div class="md:flex items-center justify-between mx-4 mt-2">
                  <div className="flex md:justify-start md:items-start text-center">
                    <h2 class="text-gray-600 mt-2 my-4 md:text-xl text-sm font-semibold text-center">
                      Latest Reviewed Cash Advance
                    </h2>
                  </div>
                </div>
                {loading ? (
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
                      <span className="sr-only">Participant Loading...</span>
                    </div>
                  </div>
              ) : (
                <div className="-my-2  justify-center items-center  overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow md:overflow-hidden overflow-x-auto border-b border-gray-200 sm:rounded-lg">
              
                      <table className="min-w-full  divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              S/N
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Title
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                           Amount 
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                               Department
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                               Date
                            </th>
                          
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Status
                            </th>                           

                         
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {/* {display_Participantsdata} */}
                      {viewUsers.map((item,i) => (
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{i + 1}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap  ">
                              <p className="text-sm font-medium text-gray-900">{item.title}</p>
                            </td>
                              
                            <td className="px-6 py-4 whitespace-nowrap">                              
                            <div className="flex text-sm font-medium text-gray-900"><TbCurrencyNaira className="text-xl text-center"/> {item.amount}</div>               
                           </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{item.user.profile.department}</div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{item.formatted_date}</div>
                            </td>
                          

                            <td className="px-6 py-4 whitespace-nowrap">
                            <ApprovalButton isApproved={item.is_approved} />   
                            {/* {item.is_approved === '' ?
                              <span
                                className="px-2 inline-flex text-xs leading-5
                                    font-semibold rounded-sm bg-green-100 text-gray-800"
                              >  
                                  Aproved                             
                              </span> :   <span
                                className="px-2 inline-flex text-xs leading-5
                                    font-semibold rounded-sm bg-red-100 text-red-800"
                              >      Not Aproved                         
                              </span>} */}
                            </td>
                            
                           
                          </tr>

                      ))}
                        </tbody>
                      </table>

                      <div className="flex text-sm font-medium justify-center items-center space-x-2 m-2">
                       
                       {previousUrl &&
                         <button onClick={() => handlePageChange(previousUrl)} className="flex cursor-pointer bg-slate-100 border hover:bg-slate-200 " >
                                  <span className="flex m-1 items-center justify-center  text-center"><BsArrowLeft className="text-center mr-1"/>Previous</span>  
                         </button>
                         }
                                
                           {nextUrl &&
                                 <button  onClick={() => handlePageChange(nextUrl)} className="flex cursor-pointer bg-slate-100 border hover:bg-slate-200">                                  
                                   <span className="flex m-1 items-center justify-center text-center"> Next<BsArrowRight className="text-center ml-1"/></span>  
                                 </button>
                           }
                      </div>
                      <div className="flex text-xs justify-center items-center  m-2">                       
                                
                                          <span>
                                            Total Records {count}
                                          </span>
                                    
                      </div>
                    </div>
                  </div>
                </div>
              )}

              </div>
    </div>
               </div>         
        </div>
      </main>
    </div>
  );
};

export default Dashboard;