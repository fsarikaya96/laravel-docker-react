import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import swal from "sweetalert";

class Vehicle extends Component {
    state = {
        driver: [],
        loading: true,
    }

    /**
     * Passenger List
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        const res = await axios.get('http://localhost:8080/api/driver');
        if (res.data.success === true) {
            this.setState({
                driver: res.data.message,
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
    driverDelete = async (e, id) => {
        const deleteBtn = e.currentTarget;
        deleteBtn.innerText = "Siliniyor";
        const res = await axios.delete(`http://localhost:8080/api/driver-delete/${id}`)
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

        var driver_HTMLTABLE = "";
        if (this.state.loading) {
            driver_HTMLTABLE = <tr>
                <td colSpan="7"><h4>Lütfen Bekleyiniz..</h4></td>
            </tr>
        } else {
            driver_HTMLTABLE =
                this.state.driver.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.lastname}</td>
                            <td>{item.age}</td>
                            <td>{item.tc}</td>
                            <td>
                                <Link to={`/driver-edit/${item.id}`}
                                      className="btn btn-success btn-sm">Düzenle</Link>
                            </td>
                            <td>
                                <button type="button" onClick={(e) => this.driverDelete(e, item.id)}
                                        className="btn btn-danger btn-sm">Sil
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
                                    <Link to="/driver-create" className="btn btn-primary btn-sm float-end">Sürücü
                                        Ekle</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>İsim</th>
                                        <th>Soyisim</th>
                                        <th>Yaş</th>
                                        <th>TC</th>
                                        <th>Düzenle</th>
                                        <th>Sil</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {driver_HTMLTABLE}
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
