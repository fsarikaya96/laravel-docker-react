import * as React from "react";
import {  Route, Routes, Link} from 'react-router-dom';
import Home from "./Home";

import Vehicle from "./Vehicle/Vehicle";
import VehicleCreate from "./Vehicle/VehicleCreate";
import VehicleUpdate from "./Vehicle/VehicleUpdate";

import Passenger from "./Passenger/Passenger";
import PassengerCreate from "./Passenger/PassengerCreate";
import PassengerUpdate from "./Passenger/PassengerUpdate";

import Type from "./Type/Type";
import TypeCreate from "./Type/TypeCreate";
import TypeUpdate from "./Type/TypeUpdate";

import Driver from "./Driver/Driver";
import DriverCreate from "./Driver/DriverCreate";
import DriverUpdate from "./Driver/DriverUpdate";




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
                            <Link className="nav-link" to="/driver">Sürücüler</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/passenger">Yolcular</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/passenger-type">Yolcu Tipi</Link>
                        </li>

                    </ul>
                </div>
            </nav>

            <Routes>
                <Route exact path="/" element={<Home/>}/>

                <Route exact path="/driver" element={<Driver/>}/>
                <Route exact path="/driver-create" element={<DriverCreate/>}/>
                <Route exact path="/driver-edit/:id" element={<DriverUpdate/>}/>




                <Route exact path="/vehicle" element={<Vehicle/>}/>
                <Route exact path="/vehicle-create" element={<VehicleCreate/>}/>
                <Route exact path="/vehicle-edit/:id" element={<VehicleUpdate/>}/>

                <Route exact path="/passenger" element={<Passenger/>}/>
                <Route exact path="/passenger-create" element={<PassengerCreate/>}/>
                <Route exact path="/passenger-edit/:id" element={<PassengerUpdate/>}/>

                <Route exact path="/passenger-type" element={<Type/>}/>
                <Route exact path="/type-create" element={<TypeCreate/>}/>
                <Route exact path="/type-edit/:id" element={<TypeUpdate/>}/>

            </Routes>

        </div>

    );
}
