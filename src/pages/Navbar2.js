import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fakeloginUserAction,
} from "../redux/slices/UsersSlice";


export const Logout = () => {
 
  const [user, setuser] = useState("");
  const [institution, setinstitution] = useState("");



  
  const users = useSelector((state) => state?.myusers);
  const { loading, error, loginUser } = users;
  const [nav, setNav] = useState(false);
  const [info, setinfo] = useState("");
  const handleClick = () => {
    setNav(!nav);
  };
  let navigate = useNavigate();



  useEffect(() => {
    // if( (localStorage.getItem('email')) || loginUser?.user === undefined ) {
    //   navigate('/admin6')
    // }
    
    
        if(localStorage.getItem('email') ){
         setuser(localStorage.getItem('email'))
         setinstitution(localStorage.getItem('institution'))
        }
       
       },[]);

const dispatch = useDispatch()
  const loggout = () =>{
  localStorage.removeItem('token')
  localStorage.removeItem('email')
  localStorage.removeItem('institution')
  localStorage.removeItem('admin')
  localStorage.removeItem('client')
  navigate('/admin6')
  dispatch(fakeloginUserAction())
}
  useEffect(() => {

    if (loginUser?.success === 1) {
      setinfo(loginUser?.user)
    }
  

  }, [loginUser]);

console.log(loginUser)
  // const dispatch  = useDispatch();
  return (
   
      <>

<div className=" p-3 px-[200px] flex justify-between items-center text-white  bg-blue-400  ">
  
    

    <h3 className="items-center text-2xl font-bold">OptimumPay Incorporated</h3>
  <div className="flex items-center " >
  <div className=" flex text-xl mr-5  ">User: {user ? user : info}{" "}</div>
    <div onClick={loggout} className="rounded p-2 text-xl bg-blue-600  flex  cursor-pointer hover:bg-blue-700 ">logout</div>
   
    </div>
</div>

{/* 
<div className="flex justify-center p-4  bg-blue-200">
<ul className="flex  mx-auto justify-center items-center  text-black" >
    <li className="text-xl  font-light mx-3 rounded-md border-4  border-white  " >All Keys</li>
    <li className="text-xl font-light mx-3 rounded-md border-4  border-white " >Pending Requested Keys</li>


 
</ul>
</div> */}
  </>
  );
};

export default Logout;
