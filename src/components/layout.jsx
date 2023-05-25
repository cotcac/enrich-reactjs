import { Outlet } from "react-router-dom"
import Footer from "./footer"
import Navigation from "./nav"
import { UserContext } from "./context"
import { useEffect, useState } from "react";
import AuthService from "../api/authAPI";

export default function Layout() {
    const [userInfo, setUserInfo] = useState({});

     useEffect(() => {
        getUserInfo()
      },[]);

    const getUserInfo = async () => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            // get userinfo
            const {data} = await AuthService.getCurrentUser();
            console.log("user data",data);
            // const userData = null; //{ name: 'Vin' };
            setUserInfo(data);
        } else {
            setUserInfo({});
        }

    }
    return (
        <>
        <UserContext.Provider value={userInfo}>
            <Navigation />
            <Outlet />
            <Footer />
            </UserContext.Provider>
        </>
    )
}