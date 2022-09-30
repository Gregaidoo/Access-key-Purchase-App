import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

function App(){
  const notify = () => toast("Wow so easy !");

  return (
    <div>
      <button onMouseUp={notify}>Notify !</button>
      <ToastContainer position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover />
    </div>
  );
}
export default App;