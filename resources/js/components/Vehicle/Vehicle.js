import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import swal from "sweetalert";

class Vehicle extends Component {
    state = {
        vehicle: [],
        loading: true,
    }

    /**
     * Passenger List
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        const res = await axios.get('http://localhost:8080/api/vehicle');
        if (res.data.success === true) {
            this.setState({
                vehicle: res.data.message,
                loading: false
            });
        }
    }

    /**
     * Driver Delete
     * @param e
     * @param id
     * @returns {Promise<void>}
     */
    vehicleDelete = async (e, id) => {
        const deleteBtn = e.currentTarget;
        deleteBtn.innerText = "Siliniyor";
        const res = await axios.delete(`http://localhost:8080/api/vehicle-delete/${id}`)
        if (res.data.success === true) {
            await swal({
                title: "Başarılı",
                text: res.data.message,
                icon: "success",
                button: "Tamam",
            });
            deleteBtn.closest("tr").remove();
        }
    }

    render() {

        var vehicle_HTMLTABLE = "";
        if (this.state.loading) {
            vehicle_HTMLTABLE = <tr>
                <td colSpan="7"><h4>Lütfen Bekleyiniz..</h4></td>
            </tr>
        } else {
            vehicle_HTMLTABLE =
                this.state.vehicle.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.plate}</td>
                            <td>{item.model}</td>
                            <td>
                                <Link to={`/vehicle-edit/${item.id}`}
                                      className="btn btn-success btn-sm">Düzenle</Link>
                            </td>
                            <td>
                                <button type="button" onClick={(e) => this.vehicleDelete(e, item.id)} className="btn btn-danger btn-sm">Sil
                                </button>
                            </td>
                        </tr>
                    );
                });
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4> Araç ve Sürücü Sayfası
                                    <Link to="/vehicle-create" className="btn btn-primary btn-sm float-end">Araç ve Sürücü
                                        Ekle</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Plaka</th>
                                        <th>Araç Modeli</th>
                                        <th>Düzenle</th>
                                        <th>Sil</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {vehicle_HTMLTABLE}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Vehicle;
