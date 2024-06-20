import AdminHeader from "./AdminHeader";
import AdminSearch from "./AdminSearch";
import AdminSide from "./AdminSide";
import AdminUserList from "./AdminUserList";
import { useState } from "react";


const Admin = () => {

    const [searchOption, setSearchOption] = useState({
        searchBy:"",
        searchQuery:"",
        selectRadio:"all",
    });
    
    return (
        <div>
           <AdminHeader />
           <AdminSide />
           <AdminSearch />
           <AdminUserList />

        </div>
    );
}
export default Admin;