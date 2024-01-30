/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import {baseURL, } from "../../baseurl"
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';


const UsersList = () => {

    const [loading, setLoading] = useState(true);
    const url = baseURL +`/users/`;
    // const urlimg = imgURL;  
    const token = localStorage.getItem('authAccess'); 
    const [viewUsers, setviewUsers] = useState([]);
    const [previousUrl, setpreviousUrl] = useState();
    const [nextUrl, setnextUrl] = useState();
    const [count, setcount] = useState();

    

    

    // useEffect(() => {
    //     fetch(url,{
    //       headers: {
    //         "Content-Type":"application/json",
    //         'Authorization': `Bearer ${token}`,
    //       },        
    //     })
        
    
    //     .then((response)=>{
          
    //       return response.json();
    //     })
    
    //     .then((data)=>{
    //       const { previous, next, count, page, pages } = data.data;
    //       // console.log(data.role)
    //       setviewUsers(data.data);
    //       setPagination({
    //         previous,
    //         next,
    //         count,
    //         currentPage: page,
    //         totalPages: pages,
    //       });    
    //       // setVerified(data.data.profile.verified);     
    //       setLoading(false);
        
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       setLoading(false);
    //     });
        
        
    //   }, []);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch(url,{
                  headers: {
                    "Content-Type":"application/json",
                    'Authorization': `Bearer ${token}`,
                  },        
                })
          const data = await response.json();
         
          setviewUsers(data.results);
          setpreviousUrl(data.previous)
          setnextUrl(data.next)
          setcount(data.count)
          setLoading(false);

        } catch (error) {
          console.error(error);
        }
      };
  
      fetchUsers();
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
    <div className="grid grid-cols-1 mx-12 mt-4 ">
    <div className="my-1">
      <div className="flex mx-3 flex-col">
        <div class="md:flex items-center justify-between mx-4 mt-2">
          <div className="flex md:justify-start md:items-start text-center">
            <h2 class="text-gray-600 mt-2 my-4 md:text-xl text-[12px] font-semibold text-center">
              Latest Enrolled Staff
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
      ) : viewUsers.length > 0 ? (
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow-md md:overflow-hidden overflow-x-auto border border-gray-200 sm:rounded-lg">
      
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider"
                    >
                      S/N
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Photo
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider"
                    >
                     IPPIS No
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider"
                    >
                       Name/Email
                    </th>
                  
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Verified
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Department/Designation
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Phone
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* {display_Participantsdata} */}
              {viewUsers.map((item,i) => (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-[12px] font-medium text-gray-900">{i + 1}</div>
                    </td>
                     {/* <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.id}</div>
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">                                
                          {item && (
                            <img
                            
                              src={`${item.profile.profile}`}
                              alt="Image"
                              className="h-9 w-9 rounded-full shadow "
                            />
                          )}
                                                  
                      </div>
                      <div className="text-sm font-medium text-gray-900">{item.station}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-[12px] font-medium text-gray-900">{item.ipps_number}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="items-center">
                          <div className="text-[12px] font-medium text-gray-900">
                          {item.first_name} {item.last_name}
                          </div>
                          <div className="text-[12px] text-gray-500">{item.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                    
                    {item.profile.verified === true ?
                      <span
                        className="px-2 inline-flex text-[11px] leading-5
                            font-semibold rounded-sm bg-green-200 text-gray-800"
                      >  
                          Verified                             
                      </span> :   <span
                        className="px-2 inline-flex text-[11px] leading-5
                            font-semibold rounded-sm bg-red-100 text-red-800"
                      >      Not Verified                         
                      </span>}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                    {item.profile.department.length > 0 ? (
                            <div className="text-[12px] text-gray-900">
                              {item.profile.department} / {item.profile.degnisation}
                            </div>
                          ) : (
                            <div className="text-[12px] text-red-500"></div>
                      )}
                      
                    </td>

                    <td className="pr-6 py-4 whitespace-nowrap  text-[12px] font-medium">
                      <Link to="#" className="text-indigo-600  hover:text-indigo-900">
                      {item.profile.mobile}
                      </Link>
                    </td>
                  </tr>

              ))}
                </tbody>
              </table>
              <div className="flex text-[12px] font-medium justify-center items-center space-x-2 m-2">
                        {/* <button  className=" cursor-pointer disabled:bg-red-400 rounded-sm px-2 text-gray-600">
                          Previous
                        </button>
                        <button  className=" cursor-pointer disabled:bg-red-400 rounded-sm px-2 text-gray-600">
                          Next
                        </button> */}
                        {previousUrl &&
                        <button onClick={() => handlePageChange(previousUrl)} className="flex cursor-pointer bg-slate-100 border " >
                                 <span className="flex m-1 items-center justify-center text-center"><BsArrowLeft className="text-center mr-1"/>Previous</span>  
                        </button>
                        }
                               
                          {nextUrl &&
                                <button  onClick={() => handlePageChange(nextUrl)} className="flex cursor-pointer bg-slate-100 border ">                                  
                                  <span className="flex m-1 items-center justify-center text-center"> Next<BsArrowRight className="text-center ml-1"/></span>  
                                </button>
                          }
                </div>
                <div className="flex text-[11px] justify-center items-center  m-2">                       
                      
                                <span>
                                  Total Records {count}
                                </span>
                          
                </div>
     
            </div>
          </div>
        </div>
      ): (
        <>
          <div className="flex justify-center items-center text-center">
            <p className="text-lg font-medium text-red-600">No data available.</p>
          </div>
        </>
      )}

      </div>
    </div>
    </div>  
  )

};
export default UsersList;