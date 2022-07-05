import React, {useState, useEffect} from 'react';
import axios from "axios";

export default function Home() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/api')
            .then(response => {
            setData(response.data)
        })
    }, []);
    return (
        <div className="container">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map(row => {
                        return (
                            <tr>
                                <th scope="row">{row.id}</th>
                                <td>{row.name}</td>
                                <td>{row.title}</td>
                            </tr>
                        )
                    })
                }

                </tbody>
            </table>
        </div>

    );
}
