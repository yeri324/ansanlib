import AdminHeader from "./AdminHeader";
import AdminSearch from "./AdminSearch";
import AdminSide from "./AdminSide";
import AdminUserList from "./AdminUserList";
import { useEffect, useState } from "react";


const Admin = () => {

    const [searchOption, setSearchOption] = useState({
        searchBy:"",
        searchQuery:"",
        selectRadio:"all",
    });

    useEffect(() => {
        setSearchOption();
        console.log(searchOption);
    },[searchOption])

    const onClickSearch = (_searchBy,_searchQuery,_selectRadio)=>{
        setSearchOption({
            ...searchOption,
            searchBy : _searchBy,
            searchQuery:_searchQuery,
            selectRadio:_selectRadio,
        })
    };

    return (
        <div>
           <AdminHeader />
           <AdminSide />
           <AdminSearch onClickSearch={onClickSearch} />
           <AdminUserList searchOption={searchOption}/>

        </div>
    );
}
export default Admin;