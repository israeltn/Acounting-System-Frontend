
// import RNALogo from '../../assets/images/logo1.png';
// import { NavLink } from 'react-router-dom';
import { useState } from "react";

import {baseURL} from "../../../baseurl"
import { useNavigate } from 'react-router-dom';

import { toast } from "react-toastify";
// import swal from 'sweetalert';


const AddContractor = () => {


const navigate  = useNavigate();
const token = localStorage.getItem('authAccess'); 


const [loading, setLoading] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
// const [zonaStation, setIsZonal] = useState('');
// const [typeType, setType] = useState('');

    const [formValues, setFormValues] = useState({
      company_name: '',
      tin_number: '',
      account_number: '',
      phone: '',     
      bank: '',
      services_offered: '',
      sort_code: '',  
      address: '',   
      
      error_list: [],
    });

    // const handleZonalChange = (event) => {
    //   setIsZonal(event.target.value);
    // };
  
    // const handletypeChange = (event) => {
    //   setType(event.target.value);
    // };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
      };
    
     
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        for (const key in formValues) {
          formData.append(key, formValues[key]);
        }
    
        try {
        const url = baseURL + '/contractors/';    
          const response = await fetch(url, {
            method: 'POST',
            headers: {
               
                'Authorization': `Bearer ${token}`,
              },  
            body: formData,
          });
          const data = await response.json();
          if (response.status == 201) {
            // Handle success or redirect to another page
            console.log('contractor created successfully');
            setLoading(false)
            setIsSubmitting(false)
            toast.success('contractor created successfully');
            navigate("/dashboard/cantractors");  
          } else {
            // Handle error
            console.error('Failed to create Cantractor:', response);
            setFormValues({
              ...formValues,
              error_list: data,           
            });
          }
        } catch (error) {
          console.error('Error creating Cantractor:', error);
        }
      };

 

  

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
    <div className="md:flex w-full mt-8   ">
        <div className="shadow w-full h-auto  border-b-4 mx-2  rounded-lg p-2 sm:p-6 xl:py-1 ">
    <div className="bg-white  justify-center rounded-md  items-center max-w-screen-xl mx-auto">
        
    <div className="container m-auto md:px-24  px-6 space-y-8 ">   
          
        <div className=" max-w-screen-xl text-center mt-2  px-2 justify-center items-center">
                {/* <div className='flex w-full justify-center items-center'>
                <img src={RNALogo} className=" w-[80px] justify-center items-center flex" alt="Windster Logo" />
            </div> */}
        <h2 className="text-md pb-1 pt-5  uppercase dark:bg-gray-900 font-bold md:text-2xl">Federel Radio Corporation of Nigeria</h2>
            <h2 className="text-md mt-2 uppercase dark:bg-gray-900 font-bold md:text-xl">Contractor Form</h2>
        </div>
              
               <div className="container justify-center items-center max-w-screen-xl mx-auto">
               
                <form onSubmit={handleSubmit }  className="w-full  justify-center items-center max-w-screen-xl mx-auto ">
                    

                <div className="flex flex-wrap w-[10rem] -mx-3 mb-6 justify-center items-center">
                        <div className="px-3 mt-12 w-full justify-center items-center ">
                            <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold " for="grid-prefex">
                            Required:
                        </label>                       
                        
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3  mb-8">
                         <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                            Company Name
                            </label>
                            <input type="text" name="company_name" onChange={handleInputChange} value={formValues.company_name} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city"   />
                            <span className="pb-2 mb-2 text-sm text-red-600">
                            {formValues.error_list.company_name}
                            </span>
                        </div>                        
                    </div>
                 <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                              Tin Number
                          </label>    

                            <input type="number" name="tin_number" onChange={handleInputChange} value={formValues.tin_number} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city"   />
                            <span className="pb-2 mb-2 text-sm text-red-600">
                            {formValues.error_list.tin_number}
                            </span>
                  
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                             Account Number
                            </label>
                            <input type="number" name="account_number" onChange={handleInputChange} value={formValues.account_number} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city"   />
                            <span className="pb-2 mb-2 text-sm text-red-600">
                            {formValues.error_list.account_number}
                            </span>                   
                    
                    </div>
                        
                </div>
                   
                    <div className="flex flex-wrap -mx-3 mb-6">
                       
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                            Bank
                            </label>
                            <input type="text" name="bank" onChange={handleInputChange} value={formValues.bank} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city"   />
                            <span className="pb-2 mb-2 text-sm text-red-600"></span>
                        
                        </div>
                       
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Sort Code
                        </label>
                        <input type="number" name="sort_code" onChange={handleInputChange} value={formValues.sort_code} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name"   />
                         {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-8">
                         <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                         <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                           Phone
                        </label>
                        <input type="number" name="phone" onChange={handleInputChange} value={formValues.phone} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name"   />
                         {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                            Services Offered
                            </label>
                            <input type="text" name="services_offered" onChange={handleInputChange} value={formValues.services_offered} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city"   />
                            
                            <span className="pb-2 mb-2 text-sm text-red-600"></span>
                        </div>
                       
                        
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-3">
                        <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                         Address
                        </label>
                        <textarea type="text" name="address" onChange={handleInputChange} value={formValues.address} className="appearance-none h-[15rem] block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password"   />
                        <span className="pb-2 mb-2 text-sm text-red-600"></span>
                        </div>
                    </div>
                   
                    {/* <div disabled={loading} className="max-w-screen-xl mb-2 mx-auto text-center w-44 justify-center py-2 px-2 items-center bg-red-800 text-white border-gray-800 rounded-md ">
                        <button type="submit" className="flex justify-center items-center text-center max-w-screen-xl mx-auto">
                        {loading ? "Submitting Data..." : "Submit"}</button>
                    </div> */}
                <div className="w-full item-center justify-center flex space-x-2 mb-6">
                  
                    <button  type="submit" disabled={isSubmitting} className=" mb-2  text-center w-1/6 justify-center py-2 px-2 items-center bg-gradient-to-r from-green-600 to-green-800  text-white border-gray-800 rounded-md">
                        <span className="inline-block mr-2"> {isSubmitting ? "Submitting Data..." : "Submit"} </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
              </div>
                </form>
               </div>
               
    </div>
    </div>
    </div>
    </div>
  )

};
export default AddContractor;