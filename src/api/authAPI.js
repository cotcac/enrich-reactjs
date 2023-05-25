import { httpNoAuth, http } from "../helper/httpCommon";
// import jwt_decode from "jwt-decode";

const login = (data) => {
    console.log("[login data]", data);

    return httpNoAuth.post("/token/", data);
};

const getCurrentUser = () => {
    return http.get("/auth/me/");
}
const register = (data) => {
    console.log("register new user>>",data);
    return httpNoAuth.post("/auth/register/", data);
}
const AuthService = {
    login,
    getCurrentUser,
    register
};
export default AuthService;