import axios from "axios";
import { createContext, useEffect, useState } from "react";



export const UserContext = createContext()

const UserContextProvider = (props)=>{

    const backendURL = "http://localhost:4000"

    const [isLoggedIn , setIsLoggedIn] = useState(false)
    const [userData , setUserData] = useState(false)

    const getUserData = async () => {
        try {
          const response = await axios.get(backendURL + "/api/user-data/data", {
            withCredentials: true,
          });
    
          if (response.data.success) {
            setUserData(response.data.user);
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
            setUserData(null);
          }
        } catch (error) {
          setIsLoggedIn(false);
          setUserData(null);
          console.error("Error fetching user data:", error);
        }
      };
      

    useEffect(()=>{
        getUserData()
    },[])




    const value = {
        backendURL,
        isLoggedIn,
        setIsLoggedIn,
        getUserData,
        userData,
        setUserData
    }

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider