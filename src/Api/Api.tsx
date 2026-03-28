import axios from "axios";

//Interceptors are like "checkpoints" or "security guards" that your data must pass through before a request is sent to the server, or before a response reaches your code.

//A "custom-configured version" of Axios that is specifically tailored for your project’s API, Instead of typing out the full URL every time you want to get data, you set up this "base" once and reuse it everywhere.
//axios.create : This is a built-in Axios function that generates a new instance
//BASE_URL : the "root" address of server
const Api = axios.create({
    baseURL : "https://backend-ai-d7iv.onrender.com/api",
});

export default Api;