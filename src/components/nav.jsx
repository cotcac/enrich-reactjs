export default function Navigation() {
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
                            <a className="nav-link" href="javascript:void(0)">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="javascript:void(0)">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="javascript:void(0)">Link</a>
                        </li>
                    </ul>

                    <ul className="navbar-nav ms-auto">
                            <li className="nav-item dropdown me-auto">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                    User 1
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                    <a href="/dashboard" className="dropdown-item">Dashboard</a>
                                    <a href="#" className="dropdown-item">Settings</a>
                                    <div className="dropdown-divider">User 1</div>
                                    <a href="#" className="dropdown-item">Logout</a>
                                </div>
                            </li>
                        </ul>
                </div>
            </div>
        </nav>
    )
}