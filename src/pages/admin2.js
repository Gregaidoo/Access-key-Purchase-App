import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  fetchsinglePendingkey,
  fetchPendingkey,
  createnewkey,
  deletesinglePendingkey
} from "../redux/slices/KeysSlice";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fakeloginUserAction } from "../redux/slices/UsersSlice";


export const Store = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [view, setview] = useState(false);
  const dispatch = useDispatch();
  const keys = useSelector((state) => state?.mykeys);
  const { Pendingkey, singlePendingkey , error , newkey ,deletesingle } = keys;

  function selected(val) {
    dispatch(fetchsinglePendingkey(val));
    setview("true");
  }

  function deleteselect(req_id) {
    dispatch(deletesinglePendingkey(req_id));
   
  }

 

  
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
 
  const [expire_at, setexpire_at] = useState(new Date());

  var newdate = expire_at;

  const datenew = `${newdate.getDate()}/${newdate.getMonth()+1}/${newdate.getFullYear()}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      user: singlePendingkey.user,
      institution: singlePendingkey.institution,
      created_at: date,
      expire_at: datenew,
      procure_at: date,
    };

    dispatch(createnewkey(data));
  };

  console.log(singlePendingkey);

  useEffect(() => {
    dispatch(fetchPendingkey());
  }, [ deletesingle?.success ]);



  useEffect(() => {
    if (deletesingle?.success === undefined) {  
    }

    if (deletesingle?.success === 1) {
      toast("Request Deleted Successfully", { className: "toast-message1" });
    }
    if (deletesingle?.success === 0) {
      toast("Failed to Delete Request", { className: "toast-message" });
      
    }

  }, [deletesingle?.success]);




  useEffect(() => {
    if (newkey?.success === undefined) {
    }
    if (newkey?.success === "no") {
      toast("Active Key exists", { className: "toast-message" });
      dispatch(fakeloginUserAction())
    }
    if (newkey?.success === 1) {
      toast("Key Created Successfully", { className: "toast-message1" });
      dispatch(fakeloginUserAction())
    }
    if (newkey?.success === 0) {
      toast("Failed to Create New Key", { className: "toast-message" });
      dispatch(fakeloginUserAction())
    }

  }, [newkey?.success]);
// console.log("dddd"+process.env.TOKEN)
  return (
    <>
      <Navbar />

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="mx-[50px]    p-30 ">
        <div className="flex justify-center m-5 ">
          <h3 className=" text-xl ">Pending Requested Keys</h3>
        </div>

        <div className="flex flex-row">
          <div className=" flex flex-col  flex-1 py-4  mx-auto rounded-md shadow-lg   border-b-8 border-t-8 border-t-sky-300 border-b-sky-300">
            <div className="flex items-center justify-center ">
              <h4 className="text-xl mb-2 font-semibold  ">
                Pending Requested Keys List
              </h4>
            </div>
            <table class=" mx-auto  items-center justify-center text-xl font-thin text-left text-gray-500 dark:text-gray-400">
              <thead class="text-sm  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="py-3 px-6">
                    Req No.
                  </th>
                  <th scope="col" class="py-3 px-6">
                    user
                  </th>
                  <th scope="col" class="py-3 px-6">
                    institution
                  </th>
                  {/* <th scope="col" class="py-3 px-6">
                  institution Email
                  </th> */}
                  {/* <th scope="col" class="py-3 px-6">
                  status 
                  </th> */}
                  <th scope="col" class="py-3 px-6">
                    Request Date
                  </th>

                  {/* <th scope="col" class="py-3 px-6">
                    Suppliers Contact
                  </th> */}
                  <th scope="col" class="py-3 px-6">
                    Actions
                  </th>
                
                </tr>
              </thead>
              <tbody>
                {Pendingkey?.map((keys) => (
                  <tr
                    key={keys.req_id}
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      class="py-2 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {keys.req_id}
                    </th>
                    <td class="py-2 px-6">{keys.user}</td>
                    <td class="py-2 px-6">{keys.institution}</td>
                    <td class="py-2 px-6">{keys.requested_at}</td>
                    {/* <td class="py-2 px-6">{keys.institution_email}</td> */}
                    {/* <td class="py-2 px-6">{ keys.status}</td> */}

                    <td class="flex gap-1 py-2 items-center justify-center my-auto ">
                      <h1
                        onClick={(e) => selected(keys.req_id)}
                        className=" text-sm font-bold  p-1 items-center py-1 justify-center flex  bg-sky-400 rounded-sm hover:bg-sky-500 cursor-pointer my-auto  text-white  "
                      >
                        Create Key
                      </h1>
                      <h1
                        onClick={(e) => deleteselect(keys.req_id)}
                        className=" text-sm font-bold  p-1 items-center py-1 justify-center flex  bg-red-600 rounded-sm hover:bg-red-700 cursor-pointer my-auto  text-white  "
                      >
                        Delete
                      </h1>
                    </td>

                    

                 
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={
              !view
                ? "hidden" : "flex-col w-[400px]  py-4    gap-3 rounded-md shadow-lg  border-b-8 border-t-8 border-t-sky-300 border-b-sky-300"}>
            <div className="flex items-center justify-center ">
              <h4 className="text-xl mb-2 font-semibold  ">
                Create Key Details
              </h4>
            </div>

            <div className=" px-5 ">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className=" flex flex-col   gap-2 ">
                  <div className="flex justify-between flex-col">
                    <label for="Label">
                      <span className="text-xl font-light ">Request Number </span>
                    </label>
                    <input
                      type="text"
                      className="border w-full "
                      name=""
                      value={singlePendingkey?.req_id}
                    />
                  </div>
                  <div className="flex justify-between flex-col ">
                    <label for="Label">
                      <span className="text-xl font-thin ">Email </span>
                    </label>
                    <input
                      type="text"
                      className="border w-full "
                      name=""
                      value={singlePendingkey?.user}
                    />
                  </div>
                  <div className="flex justify-between flex-col">
                    <label for="Label">
                      <span className="text-xl font-light ">institution </span>
                    </label>
                    <input
                      type="text"
                      className="border w-full "
                      name=""
                      value={singlePendingkey?.institution}
                    />
                  </div>

                  <div className="flex justify-between flex-col ">
                    <label for="Label">
                      <span className="text-xl font-thin ">Expire Date </span>
                    </label>
                    <DatePicker selected={expire_at} onChange={(date) => setexpire_at(date)}  />
                  </div>
             
         

                  <input    onClick={(e) => setview(false)}    
                    className="text-xl mt-3 w-full py-1 bg-sky-400 hover:bg-sky-500 cursor-pointer rounded-sm text-white"
                    type="submit"
                    id=""
                    value="Create Key"
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
