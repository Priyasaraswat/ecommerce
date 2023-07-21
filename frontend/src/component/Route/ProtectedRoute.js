import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route,Navigate } from "react-router-dom";

const ProtectedRoute = ({isAdmin, Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if(isAdmin===true && user.role !== "admin")
  {
    return (<Navigate to="/login" />)
  }

  return ((!loading && isAuthenticated===true)?<Component />:<Navigate to="/login" />);
};

{/* <Fragment>
        
        return (!loading && isAuthenticated )
       {!loading && (
       
             if(!isAuthenticated) {
               return <Navigate to="/login" />;
             }
             return <Component {...props} />;
           
       )}
     </Fragment> */}
export default ProtectedRoute;
