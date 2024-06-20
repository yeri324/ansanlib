import React, { useState,useEffect } from "react";
import axios from "axios";

const AdminUserList = ()=>{
    const [faqForm, setFaqForm] = useState()

    useEffect(() => {
        getDataset();
    }, []);

    const getDataset = () => {
        axios.get('/faq/new')
            .then((res) => {

                setFaqForm(res.data);
            })
            .catch((err) => {
                setFaqForm([]);
            });
    };
    return (
        <div>
        <h2>결과</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Penalty</th>
                    <th>Late Fee</th>
                </tr>
            </thead>
            <tbody>
                    <tr>
                        <td>ID</td>
                         <td>Name</td>
                        <td> Penalty</td>
                         <td>Late Fee</td>
                    </tr>

            </tbody>
        </table>
    </div>
    );
    }
    export default AdminUserList;