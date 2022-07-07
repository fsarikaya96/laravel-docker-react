import React, {Component} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

class PassengerCreate extends Component {

    state = {
        name: '',
        lastname: '',
        phone: '',
        type: '',
        error_list: [],
        data: [],
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    savePassenger = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:8080/api/passenger-create', this.state);
        if (res.data.success === true) {
            this.setState({
                name: '',
                lastname: '',
                phone: '',
                type: '',
            });
            window.location.replace('http://localhost:8080/passenger');
        } else {
            this.setState({
                error_list: res.data.validate_err
            });
        }
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8080/api/passenger-type');
        const data = await response.json();
        this.setState({ data });
    }

    render() {
        const {data} = this.state;
        return (
            <div className="container py-3">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center mb-3">Yolcu Sayfası</h2>
                        <hr className="mb-4"/>
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="card card-outline-secondary">
                                    <div className="card-header">
                                        <h3 className="mb-0">Yolcu Ekle</h3>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={this.savePassenger}>
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
                                                       value={this.state.lastname} id="lastname" name="lastname"
                                                       type="text"/>
                                                <span className="text-danger">{this.state.error_list.lastname}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phone">Telefon</label>
                                                <input className="form-control" id="phone" onChange={this.handleInput}
                                                       value={this.state.phone} name="phone" type="text"/>
                                                <span className="text-danger">{this.state.error_list.phone}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="type">Yolcu Tipi</label>
                                                <select defaultValue={'DEFAULT'} name="type" onChange={this.handleInput}
                                                        className="form-control">
                                                    <option value="DEFAULT" disabled>Seçiniz</option>
                                                    {data.map((item) => {
                                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                                    })}

                                                </select>
                                                <span className="text-danger">{this.state.error_list.type}</span>

                                            </div>
                                            <ul>

                                            </ul>
                                            <button className="btn btn-success mt-3 btn-block" style={{width: "100%"}}
                                                    type="submit">Ekle
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

export default PassengerCreate;
