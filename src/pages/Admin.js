import React, { useEffect, useState } from "react";
import Navbar1 from "./Navbar1";
import { Link, useNavigate } from "react-router-dom";

import { adloginUserAction , fakeloginUserAction } from "../redux/slices/UsersSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const Store = () => {
const dispatch = useDispatch()
const users = useSelector((state) => state?.myusers);
const { loading , error ,adloginUser } = users;
const [user,setuser] = useState("")
const [password, setpassword] = useState("")

const handleSubmit = e =>  {
  e.preventDefault();
 const data = {
  "email": user,
  "password": password
 
  }
console.log(data)
  dispatch(adloginUserAction(data))
}
let navigate = useNavigate();
useEffect(() => {
  // if (adloginUser?.success === undefined) {
  // }

  if (adloginUser?.success === 1) {
    localStorage.setItem('token' , adloginUser?.token )
    localStorage.setItem('email' , adloginUser?.user )
    localStorage.setItem('institution' , adloginUser?.institution )
    localStorage.setItem('admin' , adloginUser?.admin )
    localStorage.setItem('client' , adloginUser?.client )
    
    navigate('/admin1')
   }
   if (adloginUser?.success === 0) {
     toast("Wrong Credentials", { className: "toast-message" });
     dispatch(fakeloginUserAction())
   }

}, [adloginUser?.success]);

console.log(adloginUser)
  return (
    <>
     <Navbar1  />
     <ToastContainer
        position="bottom-right"
        autoClose={4000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <h4 className="text-xl items-center text-center mt-2   ">Admin Portal</h4>
      <div className="mx-[50px]    p-30 ">
       

        <div className="flex flex-row">
       

          <div className=" flex-col w-[400px] mt-20 py-4 mx-auto    gap-3 rounded-md shadow-lg  border-b-2 border-t-2 border-t-sky-300 border-b-sky-300">
            <div className="flex flex-col items-center justify-center ">
              <h4 className="text-xl mb-2   ">Sign In</h4>
              <h4 className="text-sm mb-2   ">Enter your credentials to login</h4>
            </div>

            <div className=" px-5 ">
                <form onSubmit={ (e) => handleSubmit(e) } >
                  <div className=" flex flex-col   gap-2 ">
               
                  
                    <div className="flex justify-between flex-col ">
                      <label for="Label" >
                        <span className="text-xl font-thin ">Email </span>
                      </label>
                      <input type="email" required onChange={ (e)  => setuser(e.target.value)  }  className="border w-full " name=""  />
                    </div>
                    <div className="flex justify-between flex-col">
                      <label for="Label" >
                        <span className="text-xl font-light ">Password</span>
                      </label>
                      <input type="password" required onChange={ (e)  => setpassword(e.target.value)  } className="border w-full " name=""  />
                    </div>
                    <div className="flex justify-between flex-col">
                      <label for="Label" >
                        <span className="text-sm font-light mr-2 ">Forgot Password?</span>
                       <Link to="/admin7" > <span className="text-sm font-light text-blue-700 ">Click here to reset password </span></Link>
                      </label>
                    
                    </div>
                    <label for="Label" >
                     
                     <Link to="/" > <span className="text-sm font-light text-blue-700 ">log In as Client </span></Link>
                    </label>
                 
                    <input
                      className="text-xl mt-3 w-full py-1 bg-sky-400 hover:bg-sky-500 cursor-pointer rounded-sm text-white"
                      type="submit"
                      id=""
                      value="Login"
                    />

                  </div>
                </form>
              </div>

       
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
