import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import swal from "sweetalert";

class Transfer extends Component {
    state = {
        transfer: [],
        loading: true,
    }

    /**
     * Passenger List
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        const res = await axios.get('http://localhost:8080/api/transfer');
        if (res.data.success === true) {
            this.setState({
                transfer: res.data.message,
                loading: false
            });
        }
    }
    /**
     * Transfer Delete
     * @param e
     * @param id
     * @returns {Promise<void>}
     */
    transferDelete = async (e, id) => {
        const deleteBtn = e.currentTarget;
        deleteBtn.innerText = "Siliniyor";
        const res = await axios.delete(`http://localhost:8080/api/transfer-delete/${id}`)
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
        var transfer_HTMLTABLE = "";
        if (this.state.loading) {
            transfer_HTMLTABLE = <tr>
                <td colSpan="7"><h4>Lütfen Bekleyiniz..</h4></td>
            </tr>
        } else {
            transfer_HTMLTABLE =
                this.state.transfer.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.get_passenger.name} {item.get_passenger.lastname} & {item.get_passenger.phone}</td>
                            <td>{item.get_vehicle.plate} {item.get_vehicle.model}</td>
                            <td>{item.get_driver.name} {item.get_driver.lastname}</td>
                            <td>{item.start_date} & {item.start_time}</td>
                            <td>{item.start_location} & {item.end_location}</td>

                            <td>
                                <Link to={`/transfer-edit/${item.id}`}
                                      className="btn btn-success btn-sm">Düzenle</Link>
                            </td>
                            <td>
                                <button type="button" onClick={(e) => this.transferDelete(e, item.id)}
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
                                <h4> Transferler Sayfası
                                    <Link to="/transfer-create" className="btn btn-primary btn-sm float-end">Transfer
                                        Ekle</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Yolcu İsim Soyisim & Telefon</th>
                                        <th>Plaka - Araç</th>
                                        <th>Sürücü İsim Soyisim & Telefon</th>
                                        <th>Başlangıç Tarih & Saat</th>
                                        <th>Başlangıç Yeri & Bitiş Yeri</th>
                                        <th>Düzenle</th>
                                        <th>Sil</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {transfer_HTMLTABLE}
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

export default Transfer;
