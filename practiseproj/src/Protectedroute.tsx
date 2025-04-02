import { Navigate } from "react-router-dom";
import { useAuth } from "./authProvider";



function ProtectedRoute({children}:{children:React.ReactNode}){
    const auth = useAuth();
    const user = auth?.user;

    if(!user){
       return  <Navigate to="/login"/>
    }
    return children
}
export default ProtectedRoute