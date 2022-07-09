import * as React from "react";
import {Route, Routes, Link} from 'react-router-dom';

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

import Transfer from "./Transfer/Transfer";
import TransferCreate from "./Transfer/TransferCreate";
import TransferUpdate from "./Transfer/TransferUpdate";
import TodayTransfer from "./Transfer/TodayTransfer";


export default function Header() {

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 mb-3">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Bugünkü Transfler</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/transfer">Transferler</Link>
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
                <Route exact path="/" element={<TodayTransfer/>}/>
                <Route exact path="/transfer" element={<Transfer/>}/>
                <Route exact path="/transfer-create" element={<TransferCreate/>}/>
                <Route exact path="/transfer-edit/:id" element={<TransferUpdate/>}/>

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
