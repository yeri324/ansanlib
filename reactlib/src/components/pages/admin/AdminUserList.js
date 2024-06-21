import React, { useState,useEffect } from "react";
import axios from "axios";

const AdminUserList = ({searchResult})=>{
   
  
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
                    {searchResult.map((user)=>(
                         <tr>
                         <td>{user.loginId}</td>
                          <td>{user.userName}</td>
                         <td> {user.penalty}</td>
                          <td>{user.lateFee}</td>
                     </tr>
                    ))};
                   

            </tbody>
        </table>
    </div>
    );
    }
    export default AdminUserList;