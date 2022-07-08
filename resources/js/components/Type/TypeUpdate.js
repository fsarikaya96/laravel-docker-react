import React, {Component} from "react";
import axios from "axios";
import {withUrlParams} from "../urlParams";
import swal from "sweetalert";
import {Link} from "react-router-dom";

class TypeUpdate extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        name: '',
        error_list: [],
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    /**
     * Passenger PassengerType List and Passenger Edit Passenger By ID
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        const { id } = this.props.params;
        // console.log(id);
        const res = await axios.get(`http://localhost:8080/api/type-edit/${id}`);

        if (res.data.success === true){
            this.setState({
                name: res.data.message.name,
            });
        }else {
            await swal({
                title: "Başarısız",
                text: res.data.message,
                icon: "warning",
                button: "Tamam",
            });
            window.location.replace('http://localhost:8080/passenger-type');
        }
    }

    /**
     * Passenger Update
     * @param e
     * @returns {Promise<void>}
     */
    updateType = async (e) => {
        e.preventDefault();
        document.getElementById('updateBtn').disabled = true
        document.getElementById('updateBtn').innerText = "Kaydediliyor..";
        const { id } = this.props.params;
        const res = await axios.put(`http://localhost:8080/api/type-update/${id}`, this.state);
        if (res.data.success === true) {
            await swal({
                title: "Başarılı",
                text: res.data.message,
                icon: "success",
                button: "Tamam",
            });
            window.location.replace('http://localhost:8080/passenger-type');
        } else {
            console.log(res);
            console.log(res.data);
            document.getElementById('updateBtn').disabled = false
            document.getElementById('updateBtn').innerText = "Güncelle";
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
                        <h2 className="text-center mb-3">Yolcu Tipi Sayfası</h2>
                        <hr className="mb-4"/>
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="card card-outline-secondary">
                                    <div className="card-header">
                                        <h3 className="mb-0">Yolcu Tipi Güncelle
                                            <Link to="/passenger-type" className="btn btn-primary btn-sm float-end">Geri</Link>
                                        </h3>
                                    </div>
                                    <div className="card-body">

                                        <form onSubmit={this.updateType}>
                                            <div className="form-group">
                                                <label htmlFor="name">İsim</label>
                                                <input className="form-control" onChange={this.handleInput}
                                                       value={this.state.name} id="name"
                                                       name="name" type="text"/>
                                                <span className="text-danger">{this.state.error_list.name}</span>
                                            </div>

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

export default withUrlParams(TypeUpdate);
