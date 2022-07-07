import * as React from "react";
import {  Route, Routes, Link} from 'react-router-dom';
import Home from "./Home";
import Vehicle from "./Vehicle";
import Passenger from "./Passenger/Passenger";
import PassengerAdd from "./Passenger/PassengerAdd";

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
                        <li className="nav-item">
                            <Link className="nav-link" to="/passenger">Yolcular</Link>
                        </li>

                    </ul>
                </div>
            </nav>

            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/vehicle" element={<Vehicle/>}/>
                <Route exact path="/passenger" element={<Passenger/>}/>
                <Route exact path="/passenger-add" element={<PassengerAdd/>}/>
            </Routes>

        </div>

    );
}
