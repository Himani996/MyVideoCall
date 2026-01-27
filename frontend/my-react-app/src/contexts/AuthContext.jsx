

import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";




export const AuthContext = createContext({});

const client = axios.create({
    baseURL:"http://localhost:8000/api/v1/users"
})


export const AuthProvider = ({ children }) => {

    const authContext = useContext(AuthContext);


    const [userData, setUserData] = useState(authContext);


    const router = useNavigate();

    const handleRegister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password
            })


            if (request.status === httpStatus.CREATED) {
                return request.data.message;
            }
        } catch (err) {
            throw err;
        }
    }

    const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/login", {
                username: username,
                password: password
            });
            console.log(request.data)

            if (request.status === httpStatus.OK) {
                localStorage.setItem("token", request.data.token);
                router("/home")
            }
        } catch (err) {
            throw err;
        }
    }

    


   const getHistoryOfUser = async () => {
    const token = localStorage.getItem("token"); // ya jo bhi token store kiya hai
    if (!token) {
      console.error("Token not found!");
      return [];
    }

    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/users/get_all_activity",
        {
          params: { token }, // ✅ token query param ke liye
        }
      );
      console.log("HISTORY FROM API:", res.data);
      // If backend returns object, convert to array
      return Array.isArray(res.data.history)
        ? res.data.history
        : res.data
        ? [res.data]
        : [];
    } catch (error) {
      console.error("History fetch error:", error);
      return [];
    }
  };


    const addToUserHistory = async (meetingCode) => {
        try {
            let request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request
        } catch (e) {
            throw e;
        }
    }


    const data = {
        userData, setUserData, addToUserHistory, getHistoryOfUser, handleRegister, handleLogin
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )

}

