import { Outlet, Link } from "react-router-dom";
import { UserContext } from "./context"
import { useContext, useEffect } from "react";

export default function Navigation() {
    const user = useContext(UserContext);
    console.log("[user]", user);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/";
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="javascript:void(0)">Logo</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mynavbar">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/about"> About </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact"> Contact </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/topic"> Topic </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/list"> New Posts </Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav ms-auto">
                        {!user.first_name && <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">register</Link>
                            </li>
                        </>}
                        {user.first_name && (<>
                            <Link className="nav-link" to="/write/0">Write</Link>
                            <li className="nav-item dropdown me-auto">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                    {user.first_name} <img src={user.avatar} class="rounded-circle"
                                        height="32" alt="Avatar" loading="lazy" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                    <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
                                    <a href="#" className="dropdown-item">Settings</a>
                                    <div className="dropdown-divider"></div>
                                    <a href="#" onClick={handleLogout} className="dropdown-item">Logout</a>
                                </div>
                            </li></>)}
                    </ul>
                </div>
            </div>
        </nav>
    )
}