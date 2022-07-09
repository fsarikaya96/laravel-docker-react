import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import swal from "sweetalert";

class DriverCreate extends Component {

    state = {
        name: '',
        lastname: '',
        age: '',
        tc: '',
        error_list: [],
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    /**
     * Driver Create
     * @param e
     * @returns {Promise<void>}
     */
    saveDriver = async (e) => {
        e.preventDefault();
        document.getElementById('createBtn').disabled = true
        document.getElementById('createBtn').innerText = "Yönlendiriliyorsunuz..";
        const res = await axios.post('http://localhost:8080/api/driver-create', this.state);
        if (res.data.success === true) {
            await swal({
                title: "Başarılı",
                text: res.data.message,
                icon: "success",
                button: "Tamam",
            });
            this.setState({
                name: '',
                lastname: '',
                age: '',
                tc: '',
            });
            window.location.replace('http://localhost:8080/driver');
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
                        <h2 className="text-center mb-3">Sürücü Sayfası</h2>
                        <hr className="mb-4"/>
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="card card-outline-secondary">
                                    <div className="card-header">
                                        <h3 className="mb-0">Sürücü Ekle
                                            <Link to="/driver" className="btn btn-primary btn-sm float-end">Geri</Link>
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={this.saveDriver}>
                                            <div className="form-group">
                                                <label htmlFor="name">İsim</label>
                                                <input className="form-control" onChange={this.handleInput}
                                                       value={this.state.name} id="name"
                                                       name="name" type="text"/>
                                                <span className="text-danger">{this.state.error_list.name}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="lastname">Soyisim</label>
                                                <input className="form-control" onChange={this.handleInput}
                                                       value={this.state.lastname} id="lastname"
                                                       name="lastname" type="text"/>
                                                <span className="text-danger">{this.state.error_list.lastname}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="age">Yaş</label>
                                                <input className="form-control" onChange={this.handleInput}
                                                       value={this.state.age} id="age"
                                                       name="age" type="text"/>
                                                <span className="text-danger">{this.state.error_list.age}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="tc">TC</label>
                                                <input className="form-control" onChange={this.handleInput}
                                                       value={this.state.tc} id="tc"
                                                       name="tc" type="text"/>
                                                <span className="text-danger">{this.state.error_list.tc}</span>
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

export default DriverCreate;
