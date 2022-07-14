import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import swal from "sweetalert";
import {withUrlParams} from "../urlParams";

class TransferUpdate extends Component {

    state = {
        error_list: [],
        passenger: [],
        vehicle: [],
        driver: [],
        passenger_id:'',
        vehicle_id:'',
        driver_id:'',
        start_date: '',
        start_time: '',
        start_location: '',
        end_location: '',
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    /**
     * We get our data for passenger, vehicle and driver
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        const passenger_response = await axios.get('http://localhost:8080/api/passenger');
        if (passenger_response.data.success === true){
            this.setState({
                passenger: passenger_response.data.message,
            });
        }
        const vehicle_response = await axios.get('http://localhost:8080/api/vehicle');
        if (vehicle_response.data.success === true){
            this.setState({
                vehicle: vehicle_response.data.message,
            });
        }
        const driver_response = await axios.get('http://localhost:8080/api/driver');
        if (driver_response.data.success === true){
            this.setState({
                driver: driver_response.data.message,
            });
        }

        const { id } = this.props.params;
        const res = await axios.get(`http://localhost:8080/api/transfer-edit/${id}`);

        if (res.data.success === true){
            this.setState({
                passenger_id: res.data.message.passenger_id,
                vehicle_id: res.data.message.vehicle_id,
                driver_id: res.data.message.driver_id,
                start_date: res.data.message.start_date,
                start_time: res.data.message.start_time,
                start_location: res.data.message.start_location,
                end_location: res.data.message.end_location,
            });

            // Select the ones registered in the database
            document.getElementById('passenger_id').value = res.data.message.passenger_id;
            document.getElementById('vehicle_id').value = res.data.message.vehicle_id;
            document.getElementById('driver_id').value = res.data.message.driver_id;

        }else {
            await swal({
                title: "Başarısız",
                text: res.data.message,
                icon: "warning",
                button: "Tamam",
            });
            window.location.replace('http://localhost:8080/transfer');
        }
    }
    /**
     * Transfer Update
     * @param e
     * @returns {Promise<void>}
     */
    updateTransfer = async (e) => {
        e.preventDefault();
        document.getElementById('updateBtn').disabled = true
        document.getElementById('updateBtn').innerText = "Kaydediliyor..";
        const { id } = this.props.params;
        const res = await axios.put(`http://localhost:8080/api/transfer-update/${id}`, this.state);
        if (res.data.success === true) {
            await swal({
                title: "Başarılı",
                text: res.data.message,
                icon: "success",
                button: "Tamam",
            });
            window.location.replace('http://localhost:8080/transfer');
        } else {
            document.getElementById('updateBtn').disabled = false
            document.getElementById('updateBtn').innerText = "Güncelle";
            this.setState({
                error_list: res.data.errors
            });
        }
    }
    render() {
        /**
         * Passenger Select Option
         */
        var passenger_HTMLTABLE = "";
        passenger_HTMLTABLE =
            this.state.passenger.map((item) => {
                return (
                    <option key={item.id} value={item.id}>{item.name} {item.lastname}</option>
                );
            });
        /**
         * Vehicle Select Optipn
         */
        var vehicle_HTMLTABLE = "";
        vehicle_HTMLTABLE =
            this.state.vehicle.map((item) => {
                return (
                    <option key={item.id} value={item.id}>{item.plate} - {item.model}</option>
                );
            });
        /**
         * Driver Select Optipn
         */
        var driver_HTMLTABLE = "";
        driver_HTMLTABLE =
            this.state.driver.map((item) => {
                return (
                    <option key={item.id} value={item.id}>{item.name} {item.lastname}</option>
                );
            });

        return (
            <div className="container py-3">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center mb-3">Transfer Sayfası</h2>
                        <hr className="mb-4"/>
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="card card-outline-secondary">
                                    <div className="card-header">
                                        <h3 className="mb-0">Transfer Güncelle
                                            <Link to="/transfer" className="btn btn-primary btn-sm float-end">Geri</Link>
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={this.updateTransfer}>
                                            {/*  Passenger Select Option  */}
                                            <div className="form-group">
                                                <label htmlFor="passenger_id">Transfer</label>
                                                <select defaultValue={'DEFAULT'} name="passenger_id" id="passenger_id" onChange={this.handleInput}
                                                        className="form-control">
                                                    <option value="DEFAULT" disabled>Seçiniz</option>
                                                    {passenger_HTMLTABLE}

                                                </select>
                                                <span className="text-danger">{this.state.error_list.passenger_name}</span>
                                            </div>
                                            {/*  Vehicle Select Option  */}
                                            <div className="form-group">
                                                <label htmlFor="vehicle_id">Araç</label>
                                                <select defaultValue={'DEFAULT'} name="vehicle_id" id="vehicle_id" onChange={this.handleInput}
                                                        className="form-control">
                                                    <option value="DEFAULT" disabled>Seçiniz</option>
                                                    {vehicle_HTMLTABLE}

                                                </select>
                                                <span className="text-danger">{this.state.error_list.vehicle_name}</span>
                                            </div>
                                            {/*  Driver Select Option  */}
                                            <div className="form-group">
                                                <label htmlFor="driver_id">Sürücü</label>
                                                <select defaultValue={'DEFAULT'} name="driver_id" id="driver_id" onChange={this.handleInput}
                                                        className="form-control">
                                                    <option value="DEFAULT" disabled>Seçiniz</option>
                                                    {driver_HTMLTABLE}

                                                </select>
                                                <span className="text-danger">{this.state.error_list.driver_name}</span>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="start_date">Başlangıç Tarihi</label>
                                                <input className="form-control" id="start_date" onChange={this.handleInput}
                                                       value={this.state.start_date} name="start_date" type="date"/>
                                                <span className="text-danger">{this.state.error_list.start_date}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="start_time">Başlangıç Saati</label>
                                                <input className="form-control" id="start_time" onChange={this.handleInput}
                                                       value={this.state.start_time} name="start_time" type="time"/>
                                                <span className="text-danger">{this.state.error_list.start_time}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="start_location">Başlangıç Yeri</label>
                                                <input className="form-control" id="start_location" onChange={this.handleInput}
                                                       value={this.state.start_location} name="start_location" type="text"/>
                                                <span className="text-danger">{this.state.error_list.start_location}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="end_location">Bitiş Yeri</label>
                                                <input className="form-control" id="end_location" onChange={this.handleInput}
                                                       value={this.state.end_location} name="end_location" type="text"/>
                                                <span className="text-danger">{this.state.error_list.end_location}</span>
                                            </div>

                                            <button className="btn btn-success mt-3 btn-block" style={{width: "100%"}}
                                                    id="updateBtn"  type="submit">Güncelle
                                            </button>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withUrlParams(TransferUpdate);
