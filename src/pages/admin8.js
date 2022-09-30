import React, { useEffect, useState } from "react";
import Navbar1 from "./Navbar1";
import { Link, useNavigate, useParams } from "react-router-dom";
import {  passwordResetAction } from "../redux/slices/UsersSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Store = () => {
const dispatch = useDispatch()
const users = useSelector((state) => state?.myusers);
const { loading , error ,passwordReset } = users;

const [password, setpassword] = useState("")
const [confirmPassword, setconfirmPassword] = useState("")
const [alert, setSetAlert] = useState(false)
let  { email , token} = useParams();

let navigate = useNavigate();
const handleSubmit = e =>  {
  e.preventDefault();
 const data = {
  //get email by params
  "email": email,
  "password": password,
  //get token by params
  "token": token

  }
  console.log(email)

if(password === confirmPassword){
  setSetAlert(false);
  dispatch(passwordResetAction(data));

}else{
  setSetAlert(true)
}
 
}

useEffect(() => {
 
  if(password === confirmPassword){
    setSetAlert(false);
  
  }else{
    setSetAlert(true)
  }
}, [password,confirmPassword ]);

useEffect(() => {
  // if (passwordReset?.success === undefined) {
  // }

  if (passwordReset?.success === 1) {
    toast("Password Reset Successful", { className: "toast-message1" });
  }
  if (passwordReset?.success === 0) {
    toast("LinK Broken or Expired", { className: "toast-message" });
  }

}, [passwordReset?.success]);
  return (
    <>
      <Navbar1 />
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

      <div className="mx-[50px]    p-30 ">
       

        <div className="flex flex-row">
       

          <div className=" flex-col w-[400px] mt-20 py-4 mx-auto    gap-3 rounded-md shadow-lg  border-b-2 border-t-2 border-t-sky-300 border-b-sky-300">
            <div className="flex flex-col items-center justify-center ">
              <h4 className="text-xl mb-2   ">Reset Password</h4>
              <h4 className="text-sm mb-2   ">Enter New Password</h4>
            </div>

            <div className=" px-5 ">
                <form onSubmit={ (e) => handleSubmit(e) }>
                  <div className=" flex flex-col   gap-2 ">
               
                  
                    <div className="flex justify-between flex-col ">
                      <label for="Label" >
                        <span className="text-xl font-thin ">Password </span>
                      </label>
                      <input type="password" required onChange={ (e)  => setpassword(e.target.value)  } className="border w-full " name=""  />
                    </div>
                    <div className="flex justify-between flex-col">
                      <label for="Label" >
                        <span className="text-xl font-light ">Confirm Password</span>
                      </label>
                      <input type="password" required  onChange={ (e)  => setconfirmPassword(e.target.value)  }  className="border w-full " name=""  />
                    </div>
                    <div className={ alert ? 'text-sm font-light' : 'hidden' }>Passwords Do Not Match</div>
                    <div className="flex justify-between flex-col">
                      <label for="Label" >
                   
                       <Link to="/admin6" > <span className="text-sm font-light text-blue-700 ">Back to sign in</span></Link>
                      </label>
                    
                    </div>
                 
                    <input
                      className="text-xl mt-3 w-full py-1 bg-sky-400 hover:bg-sky-500 cursor-pointer rounded-sm text-white"
                      type="submit"
                      id=""
                      value="Submit"
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
