import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import swal from "sweetalert";

class Type extends Component {
    state = {
        type: [],
        loading: true,
    }

    /**
     * Passenger List
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        const res = await axios.get('http://localhost:8080/api/passenger-type');
        // console.log(res);
        if (res.data.success === true) {
            this.setState({
                type: res.data.message,
                loading: false
            });
        }
    }

    render() {

        var type_HTMLTABLE = "";
        if (this.state.loading) {
            type_HTMLTABLE = <tr>
                <td colSpan="7"><h4>Lütfen Bekleyiniz..</h4></td>
            </tr>
        } else {
            type_HTMLTABLE =
                this.state.type.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                                <Link to={`/type-edit/${item.id}`}
                                      className="btn btn-success btn-sm">Düzenle</Link>
                            </td>
                            <td>
                                <button type="button" className="btn btn-danger btn-sm">Sil
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
                                <h4> Yolcu Tipi Sayfası
                                    <Link to="/type-create" className="btn btn-primary btn-sm float-end">Yolcu
                                        Ekle</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Yolcu Tipi</th>
                                        <th>Düzenle</th>
                                        <th>Sil</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {type_HTMLTABLE}
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

export default Type;
