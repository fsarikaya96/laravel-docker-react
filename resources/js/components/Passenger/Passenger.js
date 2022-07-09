import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import swal from "sweetalert";

class Passenger extends Component {
    state = {
        passenger: [],
        loading: true,
        sort: {
            column: null,
            direction: 'desc',
        }
    };

    /**
     * Passenger List
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        const res = await axios.get('http://localhost:8080/api/passenger');
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

    onSort = (column) => (e) => {
        const direction = this.state.sort.column ? (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'desc';
        const sortedData = this.state.passenger.sort((a, b) => {
            if (column === 'type') {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            } else {
                return a.contractValue - b.contractValue;
            }
        });

        if (direction === 'desc') {
            sortedData.reverse();
        }

        this.setState({
            passenger: sortedData,
            sort: {
                column,
                direction,
            }
        });
    };

    setArrow = (column) => {
        let className = 'sort-direction ';

        if (this.state.sort.column === column) {
            className += this.state.sort.direction === 'asc' ? 'asc ' : 'desc';
        }

        // console.log(className);
        // document.getElementById("sort").style.display = "none";


        return className;
    };
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
                                        <th onClick={this.onSort('type')}>Yolcu Tipi<i style={{color:"#bd6464"}} id="sort">(Sırala)</i>
                                            <span className={this.setArrow('type')}/>
                                        </th>
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
