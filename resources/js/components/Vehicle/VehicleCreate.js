import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import swal from "sweetalert";

class VehicleCreate extends Component {

    state = {
        plate: '',
        model: '',
        error_list: [],
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    /**
     * Vehicle Create
     * @param e
     * @returns {Promise<void>}
     */
    saveVehicle = async (e) => {
        e.preventDefault();
        document.getElementById('createBtn').disabled = true
        document.getElementById('createBtn').innerText = "Yönlendiriliyorsunuz..";
        const res = await axios.post('http://localhost:8080/api/vehicle-create', this.state);
        if (res.data.success === true) {
            await swal({
                title: "Başarılı",
                text: res.data.message,
                icon: "success",
                button: "Tamam",
            });
            this.setState({
                plate: '',
                model: '',
            });
            window.location.replace('http://localhost:8080/vehicle');
        } else {
            document.getElementById('createBtn').disabled = false
            document.getElementById('createBtn').innerText = "Ekle";
            this.setState({
                error_list: res.data.errors
            });
        }
    }

    render() {

        return (
            <div className="container py-3">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center mb-3">Araç Sayfası</h2>
                        <hr className="mb-4"/>
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="card card-outline-secondary">
                                    <div className="card-header">
                                        <h3 className="mb-0">Araç Ekle
                                            <Link to="/vehicle" className="btn btn-primary btn-sm float-end">Geri</Link>
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={this.saveVehicle}>
                                            <div className="form-group">
                                                <label htmlFor="plate">Plaka</label>
                                                <input className="form-control" onChange={this.handleInput}
                                                       value={this.state.plate} id="plate"
                                                       name="plate" type="text"/>
                                                <span className="text-danger">{this.state.error_list.plate}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="model">Araç Modeli</label>
                                                <input className="form-control" onChange={this.handleInput}
                                                       value={this.state.model} id="model"
                                                       name="model" type="text"/>
                                                <span className="text-danger">{this.state.error_list.model}</span>
                                            </div>
                                            <button className="btn btn-success mt-3 btn-block" style={{width: "100%"}}
                                                    id="createBtn"  type="submit">Ekle
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

export default VehicleCreate;
