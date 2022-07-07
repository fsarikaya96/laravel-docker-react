import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

export default function Passenger() {

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/api/passenger')
            .then(response => {
                setData(response.data)
            })
    }, []);
    return (
        <div className="container">
            <Link className="btn btn-primary" to="/passenger-add">Ekle</Link>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">İsim</th>
                        <th scope="col">Soyisim</th>
                        <th scope="col">Telefon</th>
                        <th scope="col">Yolcu Tipi</th>
                        <th className="d-flex justify-content-end" scope="col">Eylemler</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row,index )=> {
                        return  (
                                <tr key={index}>
                                    <th scope="row">{row.id}</th>
                                    <td>{row.name}</td>
                                    <td>{row.lastname}</td>
                                    <td>{row.phone}</td>
                                    <td>{row.type.name}</td>
                                    <td className="d-flex justify-content-end">
                                        <Link className="btn btn-success" to={`/passenger-edit/${row.id}`}>Düzenle</Link>
                                        <Link className="btn btn-danger" to={`/api/passenger-delete/${row.id}`}>Sil</Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
        </div>
);
}
