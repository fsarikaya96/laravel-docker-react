import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import swal from "sweetalert";

class Passenger extends Component {
    state = {
        passenger: [],
        loading: true,
    }

    /**
     * Passenger List
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        const res = await axios.get('http://localhost:8080/api/passenger');
        // console.log(res);
        if (res.data.success === true) {
            this.setState({
                passenger: res.data.message,
                loading: false
            });
        }
    }

    /**
     * Passenger Delete
     * @param e
     * @param id
     * @returns {Promise<void>}
     */
    passengerDelete = async (e, id) => {
        const deleteBtn = e.currentTarget;
        deleteBtn.innerText = "Siliniyor";
        const res = await axios.delete(`http://localhost:8080/api/passenger-delete/${id}`)
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

        var passenger_HTMLTABLE = "";
        if (this.state.loading) {
            passenger_HTMLTABLE = <tr>
                <td colSpan="7"><h4>Lütfen Bekleyiniz..</h4></td>
            </tr>
        } else {
            passenger_HTMLTABLE =
                this.state.passenger.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.lastname}</td>
                            <td>{item.phone}</td>
                            <td>{item.type.name}</td>
                            <td>
                                <Link to={`/passenger-edit/${item.id}`}
                                      className="btn btn-success btn-sm">Düzenle</Link>
                            </td>
                            <td>
                                <button type="button" onClick={(e) => this.passengerDelete(e, item.id)}
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
                                <h4> Yolcu Sayfası
                                    <Link to="/passenger-create" className="btn btn-primary btn-sm float-end">Yolcu
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
                                        <th>Telefon</th>
                                        <th>Yolcu Tipi</th>
                                        <th>Düzenle</th>
                                        <th>Sil</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {passenger_HTMLTABLE}
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

export default Passenger;
