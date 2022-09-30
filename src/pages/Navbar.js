import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fakeloginUserAction,
} from "../redux/slices/UsersSlice";


export const Logout = () => {
  const dispatch = useDispatch()
  const [user, setuser] = useState("");
  const [institution, setinstitution] = useState("");

  useEffect(() => {
    // if( (localStorage.getItem('email')) || loginUser?.user === undefined ) {
    //   navigate('/admin6')
    // }
    
    
        if(localStorage.getItem('email') ){
         setuser(localStorage.getItem('email'))
         setinstitution(localStorage.getItem('institution'))
        }
       
       },[]);



  const users = useSelector((state) => state?.myusers);
  const { loading, error, adloginUser } = users;
  const [nav, setNav] = useState(false);
  const [info, setinfo] = useState("");
  const handleClick = () => {
    setNav(!nav);
  };
  let navigate = useNavigate();
  const loggout = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('institution')
    localStorage.removeItem('admin')
    localStorage.removeItem('client')
    dispatch(fakeloginUserAction())
    navigate('/admin')
  
  }
  useEffect(() => {

    if (adloginUser?.success === 1) {
      setinfo(adloginUser?.user)
    }
  

  }, [adloginUser]);
console.log(adloginUser)
  return (
    <>
      <div className=" p-3 px-[300px] flex justify-between items-center text-white  bg-blue-400  ">
        <h3 className="items-center text-2xl font-bold">
          OptimumPay Incorporated
        </h3>
        <div className="flex items-center ">
        
          <div className=" flex  text-xl mr-5    ">User Email: {" "}{" "}</div>
          <div className=" flex text-xl mr-20  "> {user ? user : info}{" "}{" "}</div>
       
          <div onClick={loggout}  className="rounded-xl px-3 py-2 text-xl bg-blue-600  flex  cursor-pointer hover:bg-blue-700 ">
            logout
          </div>
        </div>
      </div>

      <div className="flex items-center  p-4  bg-blue-200">
        <div className="flex  px-[280px] items-center justify-center mx-auto px-auto text-black">
          <ul className="flex items-center justify-center mx-auto px-auto ">
            <Link to="/admin1">
              {" "}
              <li className="text-xl  font-light mx-1 rounded-[50px] py-1 border-4 text-white  bg-blue-500 ">
                All Keys
              </li>{" "}
            </Link>
            <Link to="/admin2">
              {" "}
              <li className="text-xl font-light mx-1 rounded-[50px] py-1 border-4 text-white  bg-blue-500 ">
                Pending Requested Keys
              </li>
            </Link>
            <Link to="/admin3">
              {" "}
              <li className="text-xl font-light mx-1 rounded-[50px] py-1 border-4 text-white  bg-blue-500 ">
                Create New Key
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Logout;
