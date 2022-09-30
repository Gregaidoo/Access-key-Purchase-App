import React, { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";





const Protected = ({ user, children }) => {


    
 if (!user) {
 return <Navigate to="/"  replace  />;
 }
 return children;
};
export default Protected;