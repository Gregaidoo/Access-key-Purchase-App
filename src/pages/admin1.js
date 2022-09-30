import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  fetchkeyAction,
  fetchSinglekey,
  fetchPendingkey,
  revokekey,
  fakeloginUserAction,
} from "../redux/slices/KeysSlice";
import { useSelector, useDispatch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Store() {
  // const [user, setsuser] = useState("");
  // const [institution, setinstitution] = useState("");
  // const [status, setstatus] = useState("");
  // const [created, setcreated] = useState("");
  // const [expire, setexpire] = useState("");
  // const [procure, setprocure] = useState("");
  // const [revoke, setrevoke] = useState("");
  // const [code, setcode] = useState("");

  const [view, setview] = useState(false);

  const dispatch = useDispatch();
  const keys = useSelector((state) => state?.mykeys);
  const { keysList, loading, error, Singlekey, revokes  } = keys;

  function selected(val) {
    dispatch(fetchSinglekey(val));
    setview("true");
  }

  function revoking(keys) {
    
    dispatch(revokekey(keys));
    
  }

 



  useEffect(() => {
    if (revokes?.success === undefined) {
    }

    if (revokes?.success === 1) {
      toast("Revoked Successfully", { className: "toast-message1" });
      dispatch(fakeloginUserAction())
      
    }
    if (revokes?.success === 0) {
      toast("Failed to Revoke Key", { className: "toast-message" });
      dispatch(fakeloginUserAction())
    }

  }, [revokes?.success]);
  

  const [selectValue, setselectValue] = useState("");
  const [select, setselect] = useState("");

  useEffect(() => {
    dispatch(fetchkeyAction());
  }, [dispatch, setselectValue ]);

  if (error) {
    toast(error, { className: "toast-message" });
  }
// console.log()
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
          <h3 className=" text-xl ">All Access Keys Granted</h3>
        </div>

        <div className="flex flex-row">
          <div className=" flex flex-col max-w-[1000px]  flex-1 py-4  mx-auto rounded-md shadow-lg   border-b-8 border-t-8 border-t-sky-300 border-b-sky-300">
            {/* <div className="flex items-center justify-center ">
              <h4 className="text-xl mb-2 font-semibold  ">Access Key List</h4>
            </div> */}
            <table class=" mx-auto  items-center justify-center text-xl font-thin text-left text-gray-500 dark:text-gray-400">
              <thead class="text-sm  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="py-3 px-6">
                    Key No.
                  </th>
                  {/* <th scope="col" class="py-3 px-6">
                    key_id
                  </th> */}
                  <th scope="col" class="py-3 px-6">
                    user Email
                  </th>
                  <th scope="col" class="py-3 px-6">
                    institution
                  </th>
                  {/* <th scope="col" class="py-3 px-6">
                    institution Email
                  </th> */}
                  {/* <th scope="col" class="py-3 px-6">
                    Key Code
                  </th> */}
                  {/* <th scope="col" class="py-3 px-6">
                    revoked
                  </th> */}

                  {/* <th scope="col" class="py-3 px-6">
                    Suppliers Contact
                  </th> */}
                  <th scope="col" class="py-3 px-6">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {keysList?.map((keys) => (
                  <tr
                    key={keys?.key_id}
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      class="py-2 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                       {keys?.key_id}
                    </th>
                    {/* <th
                      scope="row"
                      class="py-2 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >  {keys?.hash_id}
                    
                    </th> */}
                    <td class="py-2 px-6">{keys?.user}</td>
                    <td class="py-2 px-6">{keys?.institution}</td>
                    {/* <td class="py-2 px-6">{keys.institution_email}</td> */}
                    {/* <td class="py-2 px-6">{keys.access_key}</td> */}
                    {/* <td class="py-2 px-6">{keys.revoked}</td> */}

                    <td class="flex gap-1 py-2 items-center justify-center my-auto ">
                      <h1
                        onClick={() => revoking(keys?.key_id)}
                        // onMouseDown={() => showToast()}
                        className=" text-sm font-bold cursor-pointer p-1 items-center py-1 justify-center flex rounded-sm bg-orange-700 my-auto  text-white  "
                      >
                        Revoke Key
                      </h1>
                      <h1
                        onClick={(e) => selected(keys?.key_id)}
                        className=" font-bold  p-1 items-center py-1 cursor-pointer justify-center flex rounded-sm bg-blue-400 text-sm my-auto  text-white  "
                      >
                        View
                      </h1>
                    </td>
                    {/* <td class="py-4 px-6">$2999</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            className={
              !view
                ? "hidden"
                : " flex-col w-[300px]  py-4    gap-3 rounded-md shadow-lg  border-b-8 border-t-8 border-t-sky-300 border-b-sky-300"
            }
          >
            <div className="flex items-center justify-center ">
              <h4 className="text-xl mb-2 font-semibold  ">Key Details</h4>
            </div>

            <div className="flex px-5  w-full   ">
              <div className=" flex flex-col  w-full  gap-1  ">
                <div className="flex w-full  ">
                  <div className="flex flex-col justify-between ">
                    <div className="flex flex-col w-full  justify-between ">
                      {/* <h1 className="text-xl font-thin flex justify-start  ">Name </h1> */}
                      <h1 className="text-xl   flex  font-light mr-5 ">
                        Access Code{" "}
                      </h1>
                      <h1 className="text-slate-800 border-b-5 border-t-5 border-t-sky-700 border-b-sky-700 my-0.5 ">
                        {Singlekey?.access_key}
                      </h1>
                      <h1 className="text-xl   flex  font-light mr-5 ">
                        Email:{" "}
                      </h1>
                      <h1 className="text-slate-800 border-b-5 border-t-5 border-t-sky-700 border-b-sky-700 my-0.5 ">
                        {Singlekey?.user}
                      </h1>
                      <h1 className="text-xl  font-light mr-5 ">Institution</h1>
                      <h1 className="text-slate-800 border-b-5 border-t-5 border-t-sky-700 border-b-sky-700 my-0.5 ">
                        {Singlekey?.institution}
                      </h1>
                      {/* <h1 className="text-xl  font-light mr-5 ">
                        institution Email : {Singlekey?.institution_email}
                      </h1> */}
                      <h1 className="text-xl  font-light mr-5 ">Status </h1>
                      <h1 className="text-slate-800 border-b-5 border-t-5 border-t-sky-700 border-b-sky-700 my-0.5 ">
                        {" "}
                        {Singlekey?.status}
                      </h1>
                      <h1 className="text-xl  font-light mr-5 ">
                        Date Created{" "}
                      </h1>
                      <h1 className="text-slate-800 border-b-5 border-t-5 border-t-sky-700 border-b-sky-700 my-0.5 ">
                        {Singlekey?.created_at}
                      </h1>
                      <h1 className="text-xl  font-light mr-5 ">
                        Date Procured{" "}
                      </h1>
                      <h1 className="text-slate-800 border-b-5 border-t-5 border-t-sky-700 border-b-sky-700 my-0.5 ">
                        {Singlekey?.procure_at}
                      </h1>
                      <h1 className="text-xl  font-light mr-5 ">
                        Expire Date{" "}
                      </h1>{" "}
                      <h1 className="text-slate-800 border-b-5 border-t-5 border-t-sky-700 border-b-sky-700 my-0.5 ">
                        {" "}
                        {Singlekey?.expire_at}
                      </h1>
                      <h1 className="text-xl  font-light mr-5 ">Revoked </h1>
                      <h1 className="text-slate-800 border-b-5 border-t-5 border-t-sky-700 border-b-sky-700 my-0.5 ">
                        {Singlekey?.revoked}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-1 flex-row px-5 ">
              <input
                onClick={(e) => setview(false)}
                className="text-xl mt-3 w-full py-1 bg-sky-400 rounded-sm hover:bg-sky-500 cursor-pointer text-white"
                type="submit"
                id=""
                value="Hide Details"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Store;
