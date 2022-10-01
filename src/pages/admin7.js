import React, { useState } from "react";
import Navbar1 from "./Navbar1";
import { Link  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { passwordResetAction ,passwordsendmail  } from "../redux/slices/UsersSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Store = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state?.myusers);
  const [view, setview] = useState(false);
  const [message, setmessage] = useState(false);
  const { passwordReset } = users;
  

  useEffect(() => {
    if(passwordReset?.success === 1 ){
      setview(true)
      setmessage("A recovery Link is Sent to your Email")  }
      if(passwordReset?.success === 0 ){
      setview(true)
      setmessage("Failed to Send Recovery Mail  ")
    }
    console.log(passwordReset?.success)
  }, [passwordReset?.success]);

  const [user,setuser] = useState("")
  
  const handleSubmit = e =>  {
    e.preventDefault();
   const data = {
    "email": user
    }
  console.log(data)
    dispatch(passwordsendmail(data))
  }
  return (
    <>
      <Navbar1 />

      <div className="mx-[50px]    p-30 ">
       

        <div className="flex flex-row">
       

          <div className=" flex-col w-[400px] mt-20 py-4 mx-auto    gap-3 rounded-md shadow-lg  border-b-2 border-t-2 border-t-sky-300 border-b-sky-300">
            <div className="flex flex-col items-center justify-center ">
              <h4 className="text-xl mb-2   ">Reset Password</h4>
              <h4 className="text-sm mb-2   ">Enter your email</h4>
            </div>

            <div className=" px-5 ">
                <form onSubmit={ (e) => handleSubmit(e) } >
                  <div className=" flex flex-col   gap-2 ">
               
                  <h1 className={
              view
                ?  " flex items-center mx-auto" : "hidden"  }>{message} </h1>
                    <div className="flex justify-between flex-col ">
                     
                      <input type="text" required onChange={ (e)  => setuser(e.target.value)  }  className="border w-full " name=""  />
                    </div>
                 
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
