/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import {baseURL } from "../../../../baseurl"
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { FiEye } from 'react-icons/fi'; 
import { AiOutlineDelete } from 'react-icons/ai';
// import { TbCurrencyNaira } from 'react-icons/tb'; 
import { BiMessageSquareAdd } from 'react-icons/bi';
// import { BiMessageSquareAdd } from 'react-icons/bi';


const ContractPaymentTableRow = ({ item, index }) => {
    const truncateDescription = (description, maxLength) => {
        if (description.length <= maxLength) {
          return description;
        } else {
          const truncated = description.split(' ').slice(0, maxLength).join(' ');
          return `${truncated} ...`;
        }
      };
    const ApprovalButton = ({ isApproved }) => {
        const getButtonStyle = () => {
          if (isApproved === 'processing') {
            return 'bg-red-200 text-[10px]';
          } else if (isApproved === 'approved') {
            return 'bg-yellow-300';
          } else if (isApproved === 'reviewed') {
            return 'bg-green-400';
          }else if (isApproved === 'audited') {
            return 'bg-green-400';
          } else if (isApproved === 'paid') {
            return 'bg-green-500';
          } 
          else {
            return '';
          }
        };
        const getButtonText = () => {
          if (isApproved === 'processing') {
            return 'Processing';
          } else if (isApproved === 'approved') {
            return 'Approved';
            
          }  else if (isApproved === 'reviewed') {
            return 'Reviewed';
            
          }  else if (isApproved === 'audited') {
            return 'Audited';
          } else if (isApproved === 'paid') {
            return 'Paid';
            
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
      
    // Extracted formatting logic for cleaner code
    const formattedSubTotal = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.sub_total);
    const formattedTotalTax = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.total_tax);
    const formattedGrandTotal = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.grand_total);
  
    return (
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-xs font-medium text-gray-900">{index + 1}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <p className="text-xs font-medium text-gray-900">{item.payee.company_name}</p>
        </td>
        <td className="px-6 py-4 whitespace-nowrap  ">
                            <p className="text-xs font-medium text-gray-900">{item.payee.tin_number}</p>
        </td>
        
        {/* ... (similar structure for other columns) */}
        
        {/* ... (similar structure for other columns) */}
        
       
                       
                          <td className="px-6 py-4 whitespace-nowrap  ">
                            <p className="text-xs font-medium text-gray-900">{formattedSubTotal}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap  ">
                            <p className="text-xs font-medium text-gray-900">{formattedTotalTax}</p>
                          </td>
                            
                          <td className="px-6 py-4 whitespace-nowrap justify-center text-center">
                            <div className="flex text-xs font-medium text-center text-gray-900">
                               
                                {formattedGrandTotal}
                            </div>
                            </td>
                          <td className="px-6 py-4 whitespace-nowrap justify-center text-center">                              
                            <div className="flex text-xs font-medium text-center text-gray-900"> {truncateDescription(item.description, 3)}</div>                
                                                      
                          </td>

                         
                        

                          <td className="px-6 text-end py-4 whitespace-nowrap rounded-md">
                          <ApprovalButton isApproved={item.is_approved} />                           
                          
                          </td>
                         

                          <td className="flex pr-6 py-4 whitespace-nowrap  text-xs font-medium space-x-2">
                            <Link to={`/dashboard/edit-cashadvance/` +item.id} className="text-indigo-600  hover:text-indigo-900">
                             
                               <FiEye size='1.2rem' className='text-green-400 hover:text-indigo-500  text-center justify-center'/>
                            </Link>
                            <Link to="#" className="text-indigo-600  hover:text-indigo-900">
                           
                            < AiOutlineDelete size='1.2rem' className='text-red-500 hover:text-yellow-400 text-center justify-center'/>
                            </Link>
                          </td>
      </tr>
                    
                        
                       
    );   
  };

const AllContractPayment = () => {

    const [loading, setLoading] = useState(true);     
    const token = localStorage.getItem('authAccess'); 
    const [viewCashAdvance, setviewCashAdvance] = useState([]);
    const [previousUrl, setpreviousUrl] = useState();
    const [nextUrl, setnextUrl] = useState();
    const [count, setcount] = useState();
    const [searchQuery, setSearchQuery] = useState('');
  

    const handleSearch = () => {  
      const url = baseURL +`/contract-payment-vouchers/?search=${searchQuery}`;  
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
         
          setviewCashAdvance(data.results); 
          setpreviousUrl(data.previous)
          setnextUrl(data.next)
          setcount(data.count)   
           
          setLoading(false);
        
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        });
        
        
      };

      useEffect(() => {
        handleSearch();
      }, [searchQuery]);

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
          setviewCashAdvance(data.results);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };

      
    
   
      

  return (
    <div className="grid grid-cols-1 mx-12 mt-4 ">
    <div className="my-6">
    <div className="flex mx-3 flex-col">
    <div className="flex items-center justify-between mt-2 mx-4">
                       
                       <div className="flex md:justify-start md:items-end ">
                           <Link  to="/dashboard/add-capital">
                             <h2 class="text-gray-600  mt-2 my-4 md:text-xl text-sm font-semibold text-center">
                             Latest Contract 
                             </h2>
                           </Link>
                           
                       </div>

                       <div className="mb-4 w-[100px] flex space-x-2 justify-center items-center mr-5 ">
                               <div className="bg-white border-red-400 border-2  rounded-xl mt-2 my-4 ">
                               <Link  to="/dashboard/approved-cantractor" >
                                 <h2 class="text-red-600 hover:text-gray-600 mx-4 my-[1px]  text-xs font-semibold text-center">
                                 Audited
                                 </h2>
                               </Link>
                               </div>
                               <div className="bg-white border-green-400 border-2  rounded-xl mt-2 my-4 ">
                               <Link  to="/dashboard/add-capital" >
                                 <h2 class="text-green-600 hover:text-gray-600 mx-4 my-[1px]  text-xs font-semibold text-center">
                                 Paid
                                 </h2>
                               </Link>
                               </div>

                       </div>
    </div>

    <div className="w-full flex  text-center">
                       
                  
      </div>
                <div class="w-full justify-between space-x-2  mb-4 flex flex-row mt-2 ">
                       
                    
                    <div className="flex lg:w-[84%] w-1/2 justify-start  ">
                        <input
                        type="text"
                        placeholder="Search by Company, Tin No..."
                        className=" w-1/4 justify-center items-center border-gray-400 hover:border-green-600 border-2 h-7 p-2 text-xs rounded-lg"
                        value={searchQuery}
                        onChange={event => setSearchQuery(event.target.value)}
                        />
                    
                    </div>
                    <div className=" flex lg:w-[15%] w-1/2 justify-end   ">
                                    <Link  to="/dashboard/add-cantractor-payment"
                                    className="w-[90px] mx-6 justify-center flex text-black h-7   text-center   items-center border-2 border-gray-400 hover:bg-white hover:border-green-600 rounded-md">
                                    <div className="flex justify-center items-center" >
                                            
                                            <span className="inline-block text-black text-xs"> Add New  </span>                            
                                            <BiMessageSquareAdd className="flex  w-[20px] text-red-700  text-xs text-center" />
                                        </div>
                                    </Link>
                            
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
              ) : viewCashAdvance.length > 0 ? (
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow md:overflow-hidden overflow-x-auto border-b border-gray-200 sm:rounded-lg">
            
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-400 w-full">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 whitespace-nowrap py-3 text-left text-[11px] font-bold text-gray-700 uppercase tracking-wider"
                          >
                            S/N
                          </th>
                          <th
                            scope="col"
                            className=" whitespace-nowrap px-6 py-3 text-left text-[11px] font-bold text-gray-700 uppercase tracking-wider"
                          >
                            Contractor
                          </th>
                          <th
                            scope="col"
                            className=" w-auto  whitespace-nowrap px-6 py-3 text-left text-[11px] font-bold text-gray-700 uppercase tracking-wider"
                          >
                            Tin No:
                          </th>
                          <th
                            scope="col"
                            className=" whitespace-nowrap px-6 py-3 text-left text-[11px] font-bold text-gray-700 uppercase tracking-wider"
                          >
                            Ammount
                          </th>
                          <th
                            scope="col"
                            className=" whitespace-nowrap px-6 py-3 text-left text-[11px] font-bold text-gray-700 uppercase tracking-wider"
                          >
                            Total Tax
                          </th>
                          <th
                            scope="col"
                            className=" whitespace-nowrap px-6 py-3 text-left text-[11px] font-bold text-gray-700 uppercase tracking-wider"
                          >
                         Grand Total 
                          </th>
                          <th
                            scope="col"
                            className=" whitespace-nowrap px-6 py-3 text-left text-[11px] font-bold text-gray-700 uppercase tracking-wider"
                          >
                            Naration
                          </th>
                        
                          <th
                            scope="col"
                            className=" whitespace-nowrap px-6 py-3 text-left text-[11px] font-bold text-gray-700 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-1 py-3 text-left text-[11px] font-bold text-gray-700 uppercase tracking-wider"
                          >
                            Action
                          </th>
                         

                       
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {viewCashAdvance.map((item, i) => (
                            <ContractPaymentTableRow key={item.id} item={item} index={i} />
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
export default AllContractPayment;