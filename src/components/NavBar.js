import { useEffect, useState } from "react";

export default function NavBar({ loggedIn, updateRootLoginStatus, updateRootSearchText }) {
    const [isHomeOrMoviePage, setIsHomeOrMoviePage] = useState(true);

    useEffect(() => {
        if (window.location.pathname === "/") {
            setIsHomeOrMoviePage(true)
        }
        else {
            setIsHomeOrMoviePage(false);
        }
    }, []);

    const handleInputChange = (e) => {
        updateRootSearchText(e.target.value);
    }

    return (
        <nav id="list" className="navbar navbar-expand-lg navbar-light">
            {! sessionStorage.user ? null : (
                <span className="navbar-text" style={{color: "white"}}>Hi, {sessionStorage.user}</span>
            )}
            {! sessionStorage.user ?
                (<ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/login">Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/createaccount">Create account</a>
                    </li>
                </ul>)
                : (<div className="navbar-nav mr-auto">
                    <a class="nav-link">
                        <form onSubmit={() => {
                            sessionStorage.removeItem('user');
                            updateRootLoginStatus(false);
                        }}>
                            <input type="submit" className="btn btn-dark" name="logout" value="Logout" />
                        </form>
                    </a>
                </div>)}
                { isHomeOrMoviePage ?
                    (<input type="text" id="search" className="search" placeholder="Search movies..." onChange={handleInputChange}/>)
                    : null
                }
        </nav>
    );
}
