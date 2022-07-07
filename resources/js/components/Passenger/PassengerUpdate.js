import React, {Component} from "react";
import axios from "axios";
import {withUrlParams} from "../urlParams";
import swal from "sweetalert";
import {Link} from "react-router-dom";

class PassengerUpdate extends Component {
    constructor(props) {
        super(props);
    }

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
     * Passenger Type List and Passenger Edit Passenger By ID
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        const response = await fetch('http://localhost:8080/api/passenger-type');
        const data = await response.json();
        this.setState({ data });


        const { id } = this.props.params;
        // console.log(id);
        const res = await axios.get(`http://localhost:8080/api/passenger-edit/${id}`);

        if (res.data.success === true){
            this.setState({
                name: res.data.message.name,
                lastname: res.data.message.lastname,
                phone: res.data.message.phone,
                type: res.data.message.type_id,
            });
            // Select what is in database
            document.getElementById('type').options[res.data.message.type_id].selected = true;
        }else {
            await swal({
                title: "Başarısız",
                text: res.data.message,
                icon: "warning",
                button: "Tamam",
            });
            window.location.replace('http://localhost:8080/passenger');
        }
    }

    /**
     * Passenger Update
     * @param e
     * @returns {Promise<void>}
     */
    updatePassenger = async (e) => {
        e.preventDefault();
        document.getElementById('updateBtn').disabled = true
        document.getElementById('updateBtn').innerText = "Kaydediliyor..";
        const { id } = this.props.params;
        const res = await axios.put(`http://localhost:8080/api/passenger-update/${id}`, this.state);
        if (res.data.success === true) {
            await swal({
                title: "Başarılı",
                text: res.data.message,
                icon: "success",
                button: "Tamam",
            });
            window.location.replace('http://localhost:8080/passenger');
        } else {
            document.getElementById('updateBtn').disabled = false
            document.getElementById('updateBtn').innerText = "Güncelle";
            this.setState({
                error_list: res.data.errors
            });
        }
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
                                        <h3 className="mb-0">Yolcu Güncelle
                                        <Link to="/passenger" className="btn btn-primary btn-sm float-end">Geri</Link>
                                        </h3>
                                    </div>
                                    <div className="card-body">

                                        <form onSubmit={this.updatePassenger}>
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
                                                <select defaultValue={'DEFAULT'} name="type" id="type" onChange={this.handleInput}
                                                        className="form-control">
                                                    <option value="DEFAULT" disabled>Seçiniz</option>
                                                    {data.map((item) => {
                                                        return <option  key={item.id} value={item.id}>{item.name}</option>
                                                    })}

                                                </select>
                                                <span className="text-danger">{this.state.error_list.type}</span>

                                            </div>
                                            <ul>

                                            </ul>
                                            <button className="btn btn-success mt-3 btn-block" style={{width: "100%"}}
                                                   id="updateBtn" type="submit">Güncelle
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

export default withUrlParams(PassengerUpdate);
