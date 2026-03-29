import { useNavigate } from "react-router";
import { useAuthStore } from "../Store/Store";
import "./Style.css";


function Home(){
    //Destructuring to pull the token and the logout function out of useAuthStore store
    //useAuthStore(): This calls store and returns the entire state object
    //{token, logout}: This "reaches into" that object and grabs only those two specific pieces, assigning them to local variables you can use in component.
    const {token, logout} = useAuthStore();
    const navigate = useNavigate();

    const log_out = () =>{
        logout();
        navigate("/");
        console.log("Logged out successfully");
    }

    return(
        <>
            <div className="home">
                <h1>Home</h1>
                <button className="logout" onClick={log_out}>Logout</button>
            </div>
        </>
    )
}

export default Home;