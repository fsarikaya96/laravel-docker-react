import React, {useState, useEffect} from 'react';
import axios from "axios";

export default function Home() {

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
                <tr>
                    <th scope="row">1</th>
                    <td>Ferhat</td>
                    <td>Sarıkaya</td>
                </tr>
                </tbody>
            </table>
        </div>

    );
}
