import React, { useEffect, useState } from "react";
import Navbar2 from "./Navbar2";
import {
  fetchinstitutionkey,
  createPendingkey,
} from "../redux/slices/KeysSlice";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Store = () => {
  // console.log (new Date().format('m-d-y') )

  const [user, setuser] = useState("");
  const [institution, setinstitution] = useState("");

  useEffect(() => {
    if (localStorage.getItem("email")) {
      setuser(localStorage.getItem("email"));
      setinstitution(localStorage.getItem("institution"));
    } else {
      console.log("its empty");
    }
  }, []);
  console.log(localStorage.getItem("email"));

  const dispatch = useDispatch();
  const keys = useSelector((state) => state?.mykeys);
  const { institutionkey, createPending } = keys;

  const users = useSelector((state) => state?.myusers);
  const { loading, error, loginUser } = users;

  var newdate = new Date();
  const datenew = `${newdate.getDate()}/${newdate.getMonth() + 1 }/${newdate.getFullYear()}`;
    
 
  console.log(user);
  const data = {
    user: user ? user : loginUser?.user,
    institution: institution ? institution : loginUser?.institution,
    requested_at: datenew,
  };
  function createkey(data) {
    dispatch(createPendingkey(data));
    console.log(createPending?.success);
  }
  var usevalue = user ? user : loginUser?.user;
  useEffect(() => {
    dispatch(fetchinstitutionkey(usevalue));
  }, [dispatch, usevalue]);

  useEffect(() => {
    if (createPending?.success === undefined) {
    }

    if (createPending?.success === 1) {
      toast("New Key Requested", { className: "toast-message1" });
    }
    if (createPending?.success === 0) {
      toast("Failed to Request Key", { className: "toast-message" });
    }
  }, [createPending?.success]);

  return (
    <>
      <Navbar2 />
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
        <div className="flex items-center mx-auto justify-between m-5 max-w-[1000px] ">
          {/* <div className="flex ">  <h3 className=" mr-5 text-xl font-semibold ">Institution : </h3> <h3 className=" text-xl  ">{institutionkey[0]?.institution} </h3></div> */}

          <div>
            <h2
              onClick={(e) => createkey(data)}
              className="text-xl mt-3 w-full py-1 px-2 bg-sky-400 hover:bg-sky-500 cursor-pointer rounded-sm text-white"
            >
              Request a New Key
            </h2>
          </div>
        </div>
        <div className="flex justify-center m-5 ">
          <h3 className=" text-xl ">All Procured Keys</h3>
        </div>

        <div className="flex flex-row">
          <div className=" flex flex-col px-5 flex-1 py-4  mx-auto rounded-md shadow-lg   border-b-8 border-t-8 border-t-sky-300 border-b-sky-300">
            <div className="flex items-center justify-center ">
              {/* <h4 className="text-xl mb-2 font-semibold  "> Keys List</h4> */}
            </div>
            <table class=" mx-auto  items-center justify-center text-xl font-thin text-left text-gray-500 dark:text-gray-400">
              <thead class="text-sm  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="py-3 px-6">
                    Id
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Key Code
                  </th>

                  {/* <th scope="col" class="py-3 px-6">
                  status 
                  </th> */}

                  {/* <th scope="col" class="py-3 px-6">
                   Date Created
                  </th> */}
                  <th scope="col" class="py-3 px-6">
                    Date Procured
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Expire Date
                  </th>
                  {/* <th scope="col" class="py-3 px-6">
                   Expired
                  </th> */}
                  <th scope="col" class="py-3 px-6">
                    Revoked
                  </th>

                  {/* <th scope="col" class="py-3 px-6">
                    Suppliers Contact
                  </th> */}
                  <th scope="col" class="py-3 px-6">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {institutionkey?.map((keys) => (
                  <tr
                    key={keys.key_id}
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      class="py-2 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {keys.key_id}
                    </th>
                    <td class="py-2 px-6">{keys.access_key}</td>

                    {/* <td class="py-2 px-6">{keys.created_at}</td> */}
                    <td class="py-2 px-6">{keys.procure_at}</td>
                    <td class="py-2 px-6">{keys.expire_at}</td>

                    {/* <td class="py-2 px-6">{ keys.expire_at }</td> */}
                    <td class="py-2 px-6 ">{keys.revoked}</td>
                    <td class="py-2 px-6">{keys.status}</td>

                    {/* <td class="py-4 px-6">$2999</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
