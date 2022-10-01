import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar1 from "./Navbar1";
import { CreateUserAction, fakeloginUserAction } from "../redux/slices/UsersSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

export const Store = () => {
  const dispatch = useDispatch();

  const [user, setuser] = useState("");
  const [institution, setinstitution] = useState("");
  // const [institutionemail, setinstitutionemail] = useState("")
  const [password, setpassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      "email": user,
      "password": password,
      "institution": institution,
    };
    console.log(data);
    dispatch(CreateUserAction(data));
  };

  const users = useSelector((state) => state?.myusers);
  const { CreateUser } = users;

  let navigate = useNavigate();
  useEffect(() => {
    // if (loginUser?.success === undefined) {
    // }
  
    if (CreateUser?.success === 1) {
      localStorage.setItem('token' , CreateUser?.token )
      localStorage.setItem('email' , CreateUser?.user )
      localStorage.setItem('institution' , CreateUser?.institution )
      localStorage.setItem('admin' , CreateUser?.admin )
      localStorage.setItem('client' , CreateUser?.client )
      
      navigate('/admin4')
     }
     if (CreateUser?.success === 0) {
       toast("Wrong Credentials", { className: "toast-message" });
       dispatch(fakeloginUserAction())
     }
  
  }, [CreateUser?.success]);

  return (
    <>
      <Navbar1 />

      <div className="mx-[50px]    p-30 ">
        <div className="flex flex-row">
          <div className=" flex-col w-[400px] mt-20 py-4 mx-auto    gap-3 rounded-md shadow-lg  border-b-2 border-t-2 border-t-sky-300 border-b-sky-300">
            <div className="flex flex-col items-center justify-center ">
              <h4 className="text-xl mb-2   ">Sign Up</h4>
              <h4 className="text-sm mb-2   ">
                Fill out forms to create an account
              </h4>
            </div>

            <div className=" px-5 ">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className=" flex flex-col   gap-2 ">
                  <div className="flex justify-between flex-col ">
                    <label for="Label">
                      <span className="text-xl font-thin ">Email </span>
                    </label>
                    <input
                      onChange={(e) => setuser(e.target.value)}
                      type="email"
                      required
                      className="border w-full "
                      name=""
                    />
                  </div>
                  <div className="flex justify-between flex-col">
                    <label for="Label">
                      <span className="text-xl font-light ">institution </span>
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setinstitution(e.target.value)}
                      required
                      className="border w-full "
                      name=""
                    />
                  </div>
                  {/* <div className="flex justify-between flex-col">
                      <label for="Label" >
                        <span className="text-xl font-light ">
                          institution Email{" "}
                        </span>
                      </label>
                      <input type="email" onChange={ (e)  => setinstitutionemail(e.target.value)  } required   className="border w-full " name=""  />
                    </div> */}
                  <div className="flex justify-between flex-col ">
                    <label for="Label">
                      <span className="text-xl font-thin ">Password </span>
                    </label>
                    <input
                      type="password"
                      onChange={(e) => setpassword(e.target.value)}
                      required
                      className="border w-full "
                      name=""
                    />
                  </div>
                  <div className="flex justify-between flex-col">
                      <label for="Label" >
                        <span className="text-sm font-light mr-2 ">Already Registered ?</span>
                       <Link to="/admin6" > <span className="text-sm font-light text-blue-700 ">Click here to sign In </span></Link>
                      </label>
                    
                    </div>

                  <input
                    className="text-xl mt-3 w-full py-1 bg-sky-400 hover:bg-sky-500 cursor-pointer rounded-sm text-white"
                    type="submit"
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
