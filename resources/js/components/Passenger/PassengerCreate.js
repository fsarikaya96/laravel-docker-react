import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import swal from "sweetalert";

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
    /**
     * Passenger Create
     * @param e
     * @returns {Promise<void>}
     */
    savePassenger = async (e) => {
        e.preventDefault();
        document.getElementById('createBtn').disabled = true
        document.getElementById('createBtn').innerText = "Yönlendiriliyorsunuz..";
        const res = await axios.post('http://localhost:8080/api/passenger-create', this.state);
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
                phone: '',
                type: '',
            });
            window.location.replace('http://localhost:8080/passenger');
        } else {
            document.getElementById('createBtn').disabled = false
            document.getElementById('createBtn').innerText = "Ekle";
            this.setState({
                error_list: res.data.errors
            });
        }
    }

    /**
     * We list according to passenger types
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        const response = await axios.get('http://localhost:8080/api/passenger-type');
        // console.log(response);
        if (response.data.success === true){
            this.setState({
                data: response.data.message,
            });
        }
    }

    render() {
        var type_HTMLTABLE = "";
        type_HTMLTABLE =
            this.state.data.map((item) => {
                return (
                    <option key={item.id} value={item.id}>{item.name}</option>
                );
            });
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
                                        <h3 className="mb-0">Yolcu Ekle
                                        <Link to="/passenger" className="btn btn-primary btn-sm float-end">Geri</Link>
                                        </h3>
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
                                                     {type_HTMLTABLE}

                                                </select>
                                                <span className="text-danger">{this.state.error_list.type}</span>

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

export default PassengerCreate;
