import React, { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";





const Protectedad = ({ user, children }) => {


    
 if (!user) {
 return <Navigate to="/admin"  />;
 }
 return children;
};
export default Protectedad;