import { useContext } from "react";
import { AuthContext } from "../state/AuthContext";
import {Navigate, useLocation} from "react-router-dom";
import type { ReactNode } from 'react';

interface ProtectProps {
  children: ReactNode;
}
const Protect = ({ children }: ProtectProps) => {
    const authContext = useContext(AuthContext);
    const location = useLocation();
    console.error( "User is not Authenticated, redirecting to Login screen..." );

    if(authContext.username === ""){
        return <Navigate to="/" state={{ from: location}} replace />
    }

  return <>{children}</>;
  
}

export default Protect