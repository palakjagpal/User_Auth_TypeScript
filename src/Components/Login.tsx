import Api from "../Api/Api.tsx";
import toast from "react-hot-toast";
import { useAuthStore } from "../Store/Store.tsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "./Style.css";


function Login(){
    const [email,setemail] =  useState("");
    const [password,setpassword] = useState("");
    const navigate = useNavigate();

    //calling the useAuthStore hook we created
    //This connects your component to the "live" state of  application
    //(s) => s.setToken : This is called a Selector Function(everything inside useAuthStore), s represents the entire State, s.setToken: Tells Zustand exactly which part of the state you want to grab
    //Since setToken is a function that never changes, component never has to re-render unnecessarily.
    const setToken = useAuthStore((s) => s.setToken);
    const token = useAuthStore((s) => s.token);

    useEffect(()=>{
        if(token){
            navigate("/home")
        }
    },[token]);

    async function login(e:React.FormEvent){
        e.preventDefault();
        
        try{
            const response = await Api.post("/auth/login",{
                email,
                password
            });
            setToken(response.data.token);
            //This is the main object or function imported from your notification library. Think of it as the "Announcer" of application
            //.success(): Usually green with a checkmark icon.
            //.error(): Usually red with an "X" or warning icon.
            //.loading(): Shows a spinner while waiting for an API.
            //.info(): Usually blue, used for neutral tips.
            toast.success("Login Successful");
            console.log("Login Successful");
            navigate("/home");
        }catch(err: any){
            console.error("Error details:", err.response?.data);
            toast.error(err.response?.data?.message || "Login failed");
        }
    }

    return(
        <>
            <div className="main">
                <h1>Welcome back</h1>
                <form onSubmit={login}>
                    <div className="input">
                        <label>Email :</label>
                        <input type="email" value={email} placeholder="example@gmail.com" 
                        onChange={(e)=>setemail(e.target.value)}
                        ></input>
                    </div>
                    <div className="input">
                        <label>Password :</label>
                        <input type="password" value={password} placeholder="********"
                        onChange={(e) => setpassword(e.target.value)}
                        ></input>
                    </div>
                    <div className="l-cont">
                        <button className="lbtn">LOGIN</button>
                    </div>
                    <div  className="n" onClick={
                        ()=>navigate("/register")
                        }>
                        <p>New? Create Account</p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;