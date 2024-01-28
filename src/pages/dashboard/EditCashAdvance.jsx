/* eslint-disable react-hooks/exhaustive-deps */

// import RNALogo from '../../assets/images/logo1.png';
import { NavLink, useParams } from 'react-router-dom';
import {baseURL } from "../../baseurl"
import { useState, useEffect} from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { TbCurrencyNaira } from 'react-icons/tb'; 




const EditCashAdvance = () => {
    const url = baseURL +`/cash-advance/`;
    const navigate = useNavigate();

const [loading, setLoading] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const token = localStorage.getItem('authAccess'); 
const {id}=useParams();
const [viewCashAdvance, setviewCashAdvance] = useState([]);
const [viewUser, setCashAdvanceUser] = useState([]);
const [userProfile, setUserProfile] = useState([]);

const [isApproved, setIsApproved] = useState(false);
const [accountRemark, setAccountRemark] = useState('');


// const formatDate = (dateString) => {
//     const dateParts = dateString.split("-");
//     return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; // Format: 'DD/MM/YYYY'
//   };
const handleApprovalChange = (event) => {
    setIsApproved(event.target.value);
  };

  const handleAccountRemarkChange = (event) => {
    setAccountRemark(event.target.value);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the data to be sent to the server
    const formdata = {
      is_approved: isApproved,
      account_remark: accountRemark,
    };
    setLoading(true);
    setIsSubmitting(true)

    const url = baseURL +`/cash-advances/` +id;
    const response = await fetch(url +`/update-approval/`,  {
        method: 'PUT',
        headers:{
            "Content-Type":"application/json",
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formdata),
    })
    // let data = await response.json();
    if (response.status === 200) {
        toast.success('Cash Advance Updated Successful!');
        // console.log(data)
        navigate("/dashboard/cashadvance-list");
        setLoading(false);
        setIsSubmitting(false)
    }else {
          console.log('Error Loging in'); 
        //   setLoading(false);    
  }

  };


useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(url +id,{
            // method: 'PUT',
                headers: {
                  "Content-Type":"application/json",
                  'Authorization': `Bearer ${token}`,
                },        
              })
        const data = await response.json();              
        setviewCashAdvance(data); 
        setCashAdvanceUser(data.user);
        setUserProfile(data.user.profile);

      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handlePrint = () => {
    if (document.fullscreenElement) {
      window.print();
    } else {
      document.documentElement.requestFullscreen().then(() => {
        window.print();
        document.exitFullscreen();
      });
    }
  }

      
  

if(loading)
{
  return <div className='text-center max-w-screen-xl max-h-screen-[72] mx-auto justify-center items-center '>
      <div role="status" className="mt-[20rem]">
  <svg aria-hidden="true" className="inline w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
  </svg>
  <span className="sr-only">Loading...</span>
</div>
  </div>
}

  return (
    <div className="w-full md:mt-8   ">
        <div className=" w-full h-auto  border-b-4 mx-2  rounded-lg p-2 sm:p-6 xl:py-1 ">
    <div className="bg-white  justify-center rounded-md  items-center max-w-screen-xl mx-auto">
        
    <div className="container m-auto px-6 space-y-8 md:px-12 lg:px-3">  
          
       
              
               <div className="container justify-center items-center max-w-screen-xl mx-auto">
               
                <div  className="w-full  justify-center items-center max-w-screen-xl mx-auto  border-11 ">
                <div className=" py-3  mx-auto max-w-screen-xl text-center  px-2 justify-center items-center">
                        {/* <div className='flex w-full justify-center items-center'>
                        <img src={RNALogo} className=" md:w-[80px] w-[50px] justify-center items-center flex" alt="Windster Logo" />
                    </div> */}
                    <h2 className=" md:text-xs  uppercase dark:bg-gray-900 font-bold ">Federel Radio Corporation of Nigeria</h2>
                    <h2 className=" uppercase dark:bg-gray-900 font-bold md:text-xs">Cash Advance </h2>
                </div>
                    <div className="flex flex-wrap  mb-2 justify-center items-center mx-2">
                        <div className="px-3 w-full justify-center items-center pt-1 ">
                            <label className="flex " for="grid-prefex">
                             <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold '>Payee:</span>  
                             <span className='text-center text-xs pl-2'>{viewUser.first_name} {viewUser.last_name}</span>
                             </label>                       
                        
                        </div>
                    </div>
                    <div className="flex flex-wrap mx-2  border-gray-200 ">
                        <div className="w-full md:w-1/4 px-3  md:mb-0  ">
                        <label className="flex  " >
                                <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold '> Staff No:</span>  
                             <span className='text-center text-xs pl-2'> {viewUser.staff_number}</span>
                          
                        </label>                        
                       
                        </div>
                        
                    </div>
                    <div className="flex flex-wrap mx-2 m-2 ">
                        <div className="w-full px-3 mb-2">                        
                        <label className="flex  " >
                                <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold '> Address:</span>  
                             <span className='text-center text-xs pl-2'> {userProfile.address}</span>
                          
                        </label> 
                       
                        
                        </div>
                    </div>
                    <div className="flex flex-wrap mx-2 ">
                        <div className="w-full md:w-1/2 px-3 ">
                        <label className="flex  mb-2" >
                                <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold '> Beneficiary Bank A/C No:</span>  
                             <span className='text-center text-xs pl-2'> {viewCashAdvance.account_number} </span>
                          
                        </label>   
                        
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                        <label className="flex  mb-2" >
                                <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold'> Bank:</span>  
                             <span className='text-center text-xs pl-2'> {viewCashAdvance.bank}</span>
                          
                        </label>   
                        
                        </div>
                    </div>
                    <div className="flex flex-wrap mx-2 m-2 ">
                        <div className="w-full px-3 mb-2">                        
                        <label className="flex  " >
                                <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold '>  Sort Code:</span>  
                             <span className='text-center text-xs pl-2'>{viewCashAdvance.sort_code}</span>
                          
                        </label> 
                       
                        
                        </div>
                    </div>
                    <div className="flex flex-wrap mx-2 mb-2 ">
                        <div className="w-full md:w-1/2 px-3  md:mb-0">
                        <label className="flex mb-2  " >
                                <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold '> Department:</span>  
                             <span className='text-center text-xs pl-2'>{userProfile.department}</span>
                          
                        </label>                                             
                   
                        </div>
                        <div className="w-full md:w-1/2 px-3">

                        <label className="flex  " >
                                <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold '> Designation:</span>  
                             <span className='text-center text-xs pl-2'>{userProfile.degnisation}</span>
                          
                        </label>                        
                        
                        </div>
                    </div>
                   
                 
                    <div className="flex flex-wrap mx-2 mb-6">
                         <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                            <label className=" mb-2" for="grid-city">
                             <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold '> Amount:</span>
                            </label>
                            <div className="flex appearance-none text-xs pl-2  w-full  text-gray-700 border   py-1 px-4 mb-1 " >
                            <TbCurrencyNaira className="text-md text-center"/> {viewCashAdvance.amount} 
                            </div>
                            
                        </div>
                        <div className="w-full md:w-1/2 px-3  ">
                            <label className="mb-2" for="grid-city">
                                     <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold '>  Supporting Ducument:</span>
                            </label>
                            <div className="appearance-none text-xs pl-2 block w-full  text-gray-700 border   py-1 px-4  " >
                           
                            <a href={viewCashAdvance.supporting_documents}target="_blank" rel="noopener noreferrer">
                                Click View  Supporting Ducument
                                </a>
                            </div>
                            
                        </div>
                       
                        
                    </div>
                    <div className="flex flex-wrap mx-2 mb-2">
                        <div className="w-full px-3">
                        <label className="" for="grid-password">
                              <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold '>Description of Cash Advance:</span>
                        </label>
                        <div className="appearance-none text-xs pl-2 block w-full h-[5rem]   text-gray-700 border   py-1 px-4 mb-3 " >
                        {viewCashAdvance.discription}
                       </div>
                        
                        </div>
                    </div>
                   
                    <div className="flex flex-wrap mx-2 mb-6">
                       
                       <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                       <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                             <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Prepare By:</span>
                       </label>
                       <div className="appearance-none text-xs pl-2 block w-full  text-gray-700 border   py-1 px-4 mb-3 " >
                        {viewUser.first_name} {viewUser.last_name}
                       </div>
                       </div>
                       <div className="w-full md:w-1/3 mb-6 px-3">
                       <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-orgnization">
                                  <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold '>Approved by HOD <i class="fas fa-hand-holding-heart    "></i> </span>
                       </label>
                       <div className="appearance-none text-xs pl-2 block w-full  text-gray-700 border   py-1 px-4 " >
                           {userProfile.department}
                       </div>
                       
                       </div>
                       <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                       <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Date </span>
                       </label>
                             
                      <div className="appearance-none text-xs pl-2 block w-full  text-gray-700 border   py-1 px-4 " >
                         {viewCashAdvance.formatted_date}
                       </div>
                       
                       
                       </div>
                   </div>

              
               </div>

               <form onSubmit={handleSubmit}> 
                    <div className="flex flex-wrap  mx-2 mt-3 mb-1 justify-center items-center">
                        <div className="px-3 w-full justify-center items-center ">
                            <label className="block uppercase tracking-wide text-red-500 text-sm font-bold mb-2" for="grid-prefex">
                            Account Office:
                        </label>                       
                        
                        </div>
                    </div>
            <div className="flex flex-wrap w-[30rem] mx-2 mb-3">
                    <div className="w-full justify-center  px-3 mb-2 md:mb-0">
                         <label className=" flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                            Cash Advance Status: {viewCashAdvance.is_approved === 'approved' ? <span className="pb-2 mb-2 pl-2 text-xs text-green-600">Approved</span>  :  
                            <span className="pl-2 pb-2 mb-2 text-xs text-red-600"></span> ? <span className="pb-2 mb-2 pl-2 text-xs text-green-600">{viewCashAdvance.is_approved}</span>  :  
                            <span className="pl-2 pb-2 mb-2 text-xs text-red-600"></span>} 
                        </label>

                        <div className="relative md:w-1/2 mt-2 text-xs">
                            <select value={isApproved} onChange={handleApprovalChange} className="block text-xs   appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder={viewCashAdvance.is_approved === 'approved' ? 'Approved'  :  'Not Approved'} required id="grid-gender">
                                   
                                    <option>Select</option>
                                    <option value="approved">Approved</option>
                                    <option value="processing">Not Approved</option>
                                    <option value="paid">Paid</option>
                            </select>
                            
                           
                            
                            {/* <span className="pb-2 mb-2 text-xs text-red-600">
                            {viewCashAdvance.is_approved === 'account' ? 'Account Approved'  :  'Not Approved'}
                            </span> */}
                        </div>
                    </div>
            </div>

        <div className="flex flex-wrap mx-2 mb-2">
                        <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Remark:
                        </label>
                        <textarea type="text"  onChange={handleAccountRemarkChange}    value={accountRemark} name="accountRemark" placeholder={viewCashAdvance.account_remark} className="appearance-none h-[8rem] block w-full bg-gray-200 text-black border border-gray-200 rounded py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" required  />
                        <span className="pb-2 mb-2 text-xs text-red-600"></span>
                        </div>
        </div>
      <div>
       
      </div>
                <div className="w-full item-center justify-center flex space-x-2 mb-6">
                    <NavLink  to="/dashboard/cashadvancelist"
                    className=" mb-2  text-center w-1/7 justify-center p-1  items-center bg-gradient-to-r from-green-600 to-green-800  text-white border-gray-800 rounded-md">
                       <button className='' >
                            
                            <span className="inline-block text-xs mr-2"> Back </span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                           
                        </button>
                    </NavLink>
                    <button  type="submit" disabled={isSubmitting} className=" mb-2 text-xs  text-center w-1/7 justify-center py-2 px-2 items-center bg-gradient-to-r from-green-600 to-green-800  text-white border-gray-800 rounded-md">
                        <span className="inline-block mr-2"> {isSubmitting ? "Submitting Data..." : "Submit"} </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
              </div>
                </form>
        <div className='flex w-full justify-center items-center my-4'>
            <button
                    className="bg-blue-500 justify-center items-center text-center hover:bg-blue-700 text-black font-bold py-1 px-2 rounded"
                    onClick={handlePrint}
                >Print</button>
        </div>
               
    </div>
    </div>
    </div>
    </div>
    </div>
  )

};
export default EditCashAdvance;