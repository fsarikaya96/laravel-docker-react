import * as React from "react";
import {  Route, Routes, Link} from 'react-router-dom';
import Home from "./Home";
import Vehicle from "./Vehicle";

export default function Header() {

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
                {/*<Link className="navbar-brand" to="/">Logo</Link>*/}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Ana Sayfa</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/vehicle">Araçlar</Link>
                        </li>

                    </ul>
                </div>
            </nav>

            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/vehicle" element={<Vehicle/>}/>
            </Routes>

        </div>

    );
}
