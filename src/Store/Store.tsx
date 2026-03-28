import {create} from "zustand";

/*AuthState as a container that holds both the data (the token) and the actions (logging in/out) related to authentication.
*/
type AuthState = {
    //Stores the "key" (JWT or session ID) that proves the user is logged in. It’s null if the user is a guest.
    //This is a state
    token : string | null;

    //This is an action, A function used to update the token value, t takes one argument (t, which must be a string) and returns void (meaning it doesn't return any value; it just performs the update), You would call this right after a user successfully enters their password and the server sends back a token
    setToken : (t:string) => void;

    //This ia ac action, A function that handles the exit logic, It takes no arguments and returns nothing,When triggered, this function usually sets the token back to null and might clear local storage or redirect the user to the login page 
    logout : () => void;
}

//useAuthStore is a custom hook
//any function that uses React state or logic must start with the word use(prefix), This tells React (and your code editor) that this isn't just a regular function—it’s a Hook.
//create<AuthState> : Tells Zustand to create a store that strictly follows the AuthState rules (token, setToken, and logout).
//(set) => : This provides a set function, which is the "remote control" used to change the values inside this store.
export const useAuthStore = create<AuthState>((set) =>(
    {
        //Instead of starting at null, it looks at the browser's LocalStorage this prevents the user from being logged out the second they hit "Refresh." It tries to grab a saved session key from the browser's memory.
        token : localStorage.getItem("token"),

        //updates the "live" state. Every component using this store will instantly see the new token and react
        setToken : (t) => {
            localStorage.setItem("token",t);
            set({token : t});
        },

        //This resets the live state to null
        logout : () => {
            localStorage.removeItem("token");
            set({token : null});

        },
    }
))