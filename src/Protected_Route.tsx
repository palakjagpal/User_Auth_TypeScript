import { Navigate } from "react-router-dom";
import { useAuthStore } from "./Store/Store";

//children: This is a special React prop. It represents whatever is wrapped inside the <ProtectedRoute> tags
//Example: If you write <ProtectedRoute><Dashboard /></ProtectedRoute>, then children is the <Dashboard /> component
// any: This is a TypeScript type. It tells React that children can be anything
function Protected_Route({children } : any){
    const token = useAuthStore((s) => s.token)
    
    if(!token){
        return <Navigate to="/" />
    }
    //If the code reaches this line, it means the if statement was skipped (a token exists!)
    return children;
}

export default Protected_Route;