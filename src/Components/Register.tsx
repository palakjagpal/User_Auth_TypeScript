import Api from "../Api/Api.tsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useState } from "react";
import "./Style.css";

function Register(){
    const [name,setname] = useState("");
    const [email,setemail] =  useState("");
    const [password,setpassword] = useState("");
    const [data,setdata] = useState("");

    const navigate = useNavigate();

    async function register(e : React.FormEvent){
        e.preventDefault();

        try{
            const response = await Api.post("/auth/register",{
                name,
                email,
                password
            })
            setdata(response.data);
            toast.success("Register Successful");
            console.log("Register Successful");
            navigate("/");
        }catch(err : any){
            console.log("Full Error:", err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Register Failed");
            setdata("");
        }

    }

    return(
        <>

        <div className="main">
            <h1>Create an Account</h1>
            <form onSubmit={register}>
                <div className="input">
                    <label>Name : </label>
                    <input type="text" value={name} placeholder="John Doe"
                    onChange={(e) => setname(e.target.value)}
                    ></input>
                </div>
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
                <div className="r-cont">
                    <button className="rbtn" >REGISTER</button>
                </div>
                <div className="n" onClick={
                        ()=>navigate("/")
                        }>
                        <p>Already have an account?Login</p>
                </div>
            </form>
        </div>
        
        </>
    )
}

export default Register;