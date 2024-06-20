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

    const onClickSearch = (_searchBy,_searchQuery,_selectRadio)=>{
        setSearchOption({
            searchBy : _searchBy,
            searchQuery:_searchQuery,
            selectRadio:_selectRadio,
        })
    };

    return (
        <div>
           <AdminHeader />
           <AdminSide />
           <AdminSearch />
           <AdminUserList searchOption={searchOption}/>

        </div>
    );
}
export default Admin;